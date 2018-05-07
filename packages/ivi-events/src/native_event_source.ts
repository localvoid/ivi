import { append, unorderedArrayDelete, catchError } from "ivi-core";
import { getEventTarget, getNativeEventOptions } from "./utils";
import { NativeEventSourceFlags, SyntheticEventFlags } from "./flags";
import { SyntheticNativeEvent } from "./synthetic_event";
import { EventSource } from "./event_source";
import { EventHandler } from "./event_handler";
import { accumulateDispatchTargets } from "./traverse_dom";
import { DispatchTarget, dispatchEvent } from "./dispatch";

/**
 * NativeEventSource dispatches native events.
 *
 * It is using two-phase dispatching algorithm similar to native DOM events flow.
 */
export class NativeEventSource<E extends Event> {
  /**
   * Public EventSource interface.
   */
  readonly eventSource: EventSource;
  /**
   * Number of active dependencies.
   *
   * When there are active dependencies, event source will be activated by attaching native event listeners to the
   * document. When it goes to zero it will be deactivated, and all event listeners will be removed.
   */
  private dependencies: number;
  /**
   * Number of active listeners.
   */
  private listeners: number;
  /**
   * See `NativeEventSourceFlags` for details.
   */
  readonly flags: NativeEventSourceFlags;
  /**
   * DOM event name.
   */
  readonly name: string;
  private onBeforeListeners: Array<(ev: SyntheticNativeEvent<E>) => void> | null;
  private onAfterListeners: Array<(ev: SyntheticNativeEvent<E>) => void> | null;

  constructor(
    flags: NativeEventSourceFlags,
    name: string,
  ) {
    this.eventSource = {
      addListener: () => {
        ++this.listeners;
        this.incDependencies();
      },
      removeListener: () => {
        --this.listeners;
        this.decDependencies();
      },
    };
    this.dependencies = 0;
    this.listeners = 0;
    this.flags = flags;
    this.name = name;
    this.onBeforeListeners = null;
    this.onAfterListeners = null;
  }

  private matchEventSource = (h: EventHandler) => h.source === this.eventSource;

  private dispatch = catchError((ev: E): void => {
    const targets: DispatchTarget[] = [];
    if (this.listeners > 0) {
      accumulateDispatchTargets(targets, getEventTarget(ev) as Element, this.matchEventSource);
    }

    if (targets.length > 0 || this.onBeforeListeners !== null || this.onAfterListeners !== null) {
      const s = new SyntheticNativeEvent<E>(
        0,
        getEventTarget(ev),
        ev.timeStamp,
        ev,
      );
      if (this.onBeforeListeners !== null) {
        const cbs = this.onBeforeListeners.slice(0);
        for (let i = 0; i < cbs.length; ++i) {
          cbs[i](s);
        }
      }
      if (targets.length > 0) {
        dispatchEvent(targets, s, (this.flags & NativeEventSourceFlags.Bubbles) !== 0);
      }
      if (this.onAfterListeners !== null) {
        const cbs = this.onAfterListeners.slice(0);
        for (let i = 0; i < cbs.length; ++i) {
          cbs[i](s);
        }
      }
      if ((s.flags & SyntheticEventFlags.PreventedDefault) !== 0) {
        ev.preventDefault();
      }
    }
  });

  addBeforeListener(cb: (e: SyntheticNativeEvent<E>) => void): void {
    this.onBeforeListeners = append(this.onBeforeListeners, cb);
    this.incDependencies();
  }

  addAfterListener(cb: (e: SyntheticNativeEvent<E>) => void): void {
    this.onAfterListeners = append(this.onAfterListeners, cb);
    this.incDependencies();
  }

  removeBeforeListener(cb: (e: SyntheticNativeEvent<E>) => void): void {
    if (this.onBeforeListeners !== null) {
      unorderedArrayDelete(this.onBeforeListeners, this.onBeforeListeners.indexOf(cb));
      this.decDependencies();
    }
  }

  removeAfterListener(cb: (e: SyntheticNativeEvent<E>) => void): void {
    if (this.onAfterListeners !== null) {
      unorderedArrayDelete(this.onAfterListeners, this.onAfterListeners.indexOf(cb));
      this.decDependencies();
    }
  }

  private incDependencies(): void {
    if (this.dependencies++ === 0) {
      document.addEventListener(
        this.name,
        this.dispatch,
        getNativeEventOptions(this.flags) as boolean,
      );
    }
  }

  private decDependencies(): void {
    if (--this.dependencies === 0) {
      document.removeEventListener(
        this.name,
        this.dispatch,
        getNativeEventOptions(this.flags) as boolean,
      );
    }
  }
}
