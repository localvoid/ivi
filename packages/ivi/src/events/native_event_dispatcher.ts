import { append, unorderedArrayDelete, catchError } from "ivi-core";
import { SyntheticEventFlags, NativeEventSourceFlags } from "./flags";
import { EventDispatcher } from "./event_dispatcher";
import { EventHandler } from "./event_handler";
import { DispatchTarget } from "./dispatch_target";
import { accumulateDispatchTargets } from "./accumulate_dispatch_targets";
import { dispatchEvent } from "./dispatch_event";
import { getEventTarget, getNativeEventOptions } from "./utils";
import { SyntheticNativeEvent } from "./synthetic_native_event";

/**
 * NativeEventSource dispatches native events.
 *
 * It is using two-phase dispatching algorithm similar to native DOM events flow.
 */
export interface NativeEventDispatcher<E extends Event> {
  /**
   * Public EventSource interface.
   */
  readonly src: EventDispatcher;
  /**
   * Number of active dependencies.
   *
   * When there are active dependencies, event source will be activated by attaching native event listeners to the
   * document. When it goes to zero it will be deactivated, and all event listeners will be removed.
   */
  deps: number;
  /**
   * Number of active listeners.
   */
  listeners: number;
  /**
   * See `NativeEventSourceFlags` for details.
   */
  flags: NativeEventSourceFlags;
  /**
   * DOM event name.
   */
  readonly name: string;
  before: Array<(ev: SyntheticNativeEvent<E>) => void> | null;
  after: Array<(ev: SyntheticNativeEvent<E>) => void> | null;
  dispatch: (() => void) | null;
}

export function createNativeEventDispatcher<E extends Event>(
  flags: NativeEventSourceFlags,
  name: string,
): NativeEventDispatcher<E> {
  const source: NativeEventDispatcher<E> = {
    src: {
      add: () => { ++source.listeners; incDependencies(source); },
      remove: () => { --source.listeners; decDependencies(source); },
    },
    deps: 0,
    listeners: 0,
    flags,
    name,
    before: null,
    after: null,
    dispatch: null,
  };

  const matchEventSource = (h: EventHandler) => h.src === source.src;

  source.dispatch = catchError((ev: E): void => {
    const domTarget = getEventTarget(ev) as Element;
    const targets: DispatchTarget[] = [];

    if (source.listeners > 0) {
      accumulateDispatchTargets(targets, domTarget, matchEventSource);
    }

    if (targets.length || source.before !== null || source.after !== null) {
      const syntheticEvent = new SyntheticNativeEvent<E>(0, domTarget, ev.timeStamp, ev);

      dispatchToListeners(source.before, syntheticEvent);
      if (targets.length) {
        dispatchEvent(targets, syntheticEvent, (source.flags & NativeEventSourceFlags.Bubbles) !== 0);
      }
      dispatchToListeners(source.after, syntheticEvent);

      if ((syntheticEvent.flags & SyntheticEventFlags.PreventedDefault) !== 0) {
        ev.preventDefault();
      }
    }
  });

  return source;
}

export function beforeNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  source.before = append(source.before, cb);
  incDependencies(source);
}

export function afterNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  source.after = append(source.after, cb);
  incDependencies(source);
}

export function removeBeforeNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  if (source.before !== null) {
    unorderedArrayDelete(source.before, source.before.indexOf(cb));
    decDependencies(source);
  }
}

export function removeAfterNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  if (source.after !== null) {
    unorderedArrayDelete(source.after, source.after.indexOf(cb));
    decDependencies(source);
  }
}

function incDependencies<E extends Event>(source: NativeEventDispatcher<E>): void {
  if (source.deps++ === 0) {
    document.addEventListener(
      source.name,
      source.dispatch!,
      getNativeEventOptions(source.flags) as boolean,
    );
  }
}

function decDependencies<E extends Event>(source: NativeEventDispatcher<E>): void {
  if (--source.deps === 0) {
    document.removeEventListener(
      source.name,
      source.dispatch!,
      getNativeEventOptions(source.flags) as boolean,
    );
  }
}

function dispatchToListeners<E extends Event>(
  listeners: Array<(ev: SyntheticNativeEvent<E>) => void> | null,
  ev: SyntheticNativeEvent<E>,
): void {
  if (listeners !== null) {
    const cbs = listeners.slice();
    for (const cb of cbs) {
      cb(ev);
    }
  }
}
