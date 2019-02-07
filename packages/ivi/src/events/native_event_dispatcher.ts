import { append, unorderedArrayDelete } from "../core";
import { withSchedulerTick } from "../scheduler";
import { SyntheticEventFlags, NativeEventSourceFlags } from "./flags";
import { EventHandlerNode } from "./event_handler";
import { DispatchTarget } from "./dispatch_target";
import { accumulateDispatchTargets } from "./accumulate_dispatch_targets";
import { dispatchEvent } from "./dispatch_event";
import { SyntheticNativeEvent, createNativeEvent } from "./synthetic_native_event";

/**
 * NativeEventSource dispatches native events.
 *
 * It is using two-phase dispatching algorithm similar to native DOM events flow.
 *
 * @typeparam E Native event type.
 */
export interface NativeEventDispatcher<E extends Event> {
  /**
   * Hooks that will be executed after dispatching an event.
   */
  a: Array<(ev: SyntheticNativeEvent<E>) => void> | null;
  /**
   * Hooks that will be executed before dispatching an event.
   */
  b: Array<(ev: SyntheticNativeEvent<E>) => void> | null;
}

/**
 * Creates a native event dispatcher.
 *
 * @typeparam E Native event type.
 * @param flags See {@link NativeEventSourceFlags} for details.
 * @param name Event name
 * @param options Event handler options
 * @returns {@link NativeEventDispatcher} instance
 */
export function createNativeEventDispatcher<E extends Event>(
  flags: NativeEventSourceFlags,
  name: string,
  options: { capture?: boolean, passive?: boolean } | boolean = true,
): NativeEventDispatcher<E> {
  const source: NativeEventDispatcher<E> = { a: null, b: null };
  const matchEventSource = (h: EventHandlerNode) => h.d.src === source;

  document.addEventListener(name, withSchedulerTick((ev: Event): void => {
    const target = ev.target as Element;
    const targets: DispatchTarget[] = [];

    accumulateDispatchTargets(targets, target, matchEventSource);

    if (targets.length || source.b || source.a) {
      const syntheticEvent = createNativeEvent(0, ev.timeStamp, null, ev as E);

      dispatchToListeners(source.b, syntheticEvent);
      if (targets.length) {
        dispatchEvent(targets, syntheticEvent, (flags & NativeEventSourceFlags.Bubbles) !== 0);
      }
      dispatchToListeners(source.a, syntheticEvent);

      if (syntheticEvent.flags & SyntheticEventFlags.PreventedDefault) {
        ev.preventDefault();
      }
    }
  }), options);

  return source;
}

/**
 * beforeNativeEvent attaches a hook that will be executed before dispatching an event.
 *
 * @typeparam E Native event type.
 * @param source Event dispatcher source.
 * @param cb Hook.
 */
export function beforeNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  source.b = append(source.b, cb);
}

/**
 * afterNativeEvent attaches a hook that will be executed after dispatching an event.
 *
 * @typeparam E Native event type.
 * @param source Event dispatcher source.
 * @param cb Hook.
 */
export function afterNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  source.a = append(source.a, cb);
}

/**
 * removeBeforeNativeEvent removes a hook that is executed before dispatching an event.
 *
 * @typeparam E Native event type.
 * @param source Event dispatcher source.
 * @param cb Hook.
 */
export function removeBeforeNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  /* istanbul ignore else */
  if (__IVI_DEBUG__) {
    if (source.b === null) {
      throw new Error("removeBeforeNativeEvent() failed, unable to find registered callback");
    }
  }
  unorderedArrayDelete(source.b!, cb);
}

/**
 * removeAfterNativeEvent removes a hook that is executed after dispatching an event.
 *
 * @typeparam E Native event type.
 * @param source Event dispatcher source.
 * @param cb Hook
 */
export function removeAfterNativeEvent<E extends Event>(
  source: NativeEventDispatcher<E>,
  cb: (e: SyntheticNativeEvent<E>) => void,
): void {
  /* istanbul ignore else */
  if (__IVI_DEBUG__) {
    if (source.a === null) {
      throw new Error("removeAfterNativeEvent() failed, unable to find registered callback");
    }
  }
  unorderedArrayDelete(source.a!, cb);
}

function dispatchToListeners<E extends Event>(
  listeners: Array<(ev: SyntheticNativeEvent<E>) => void> | null,
  ev: SyntheticNativeEvent<E>,
): void {
  if (listeners !== null) {
    ev.node = null;
    const cbs = listeners.slice();
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](ev);
    }
  }
}
