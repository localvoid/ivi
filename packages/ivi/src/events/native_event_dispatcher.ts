import { doc } from "../dom/shortcuts";
import { OpState } from "../vdom/state";
import { append, unorderedArrayDelete } from "../core";
import { withSchedulerTick } from "../scheduler";
import { DispatchTarget } from "./dispatch_target";
import { collectDispatchTargets } from "./collect_dispatch_targets";
import { dispatchEvent, DispatchEventDirective } from "./dispatch_event";

/**
 * NativeEventDispatcherFlags.
 */
export const enum NativeEventDispatcherFlags {
  /**
   * Bubbles flag indicating that the event is bubbling.
   */
  Bubbles = 1,
}

export type NativeEventHandler = <E extends Event>(event: E, currentTarget?: OpState) => DispatchEventDirective | void;

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
  a: Array<(event: E) => void> | null;
  /**
   * Hooks that will be executed before dispatching an event.
   */
  b: Array<(event: E) => void> | null;
}

function dispatchNativeEvent(event: Event, currentTarget: DispatchTarget<NativeEventHandler>): DispatchEventDirective {
  const flags = currentTarget.h.h(event, currentTarget.t);
  return flags === void 0 ? 0 : flags;
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
  flags: NativeEventDispatcherFlags,
  name: string,
  options: { capture?: boolean, passive?: boolean } | boolean = true,
): NativeEventDispatcher<E> {
  const source: NativeEventDispatcher<E> = { a: null, b: null };

  doc.addEventListener(name, withSchedulerTick((event: Event): void => {
    const targets = collectDispatchTargets(event.target as Element, source);
    if (targets.length > 0 || source.b || source.a) {
      dispatchToListeners(source.b, event as E);
      dispatchEvent(
        targets,
        event,
        (flags & NativeEventDispatcherFlags.Bubbles) !== 0,
        dispatchNativeEvent,
      );
      dispatchToListeners(source.a, event as E);
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
export function beforeNativeEvent<E extends Event>(source: NativeEventDispatcher<E>, cb: (event: E) => void): void {
  source.b = append(source.b, cb);
}

/**
 * afterNativeEvent attaches a hook that will be executed after dispatching an event.
 *
 * @typeparam E Native event type.
 * @param source Event dispatcher source.
 * @param cb Hook.
 */
export function afterNativeEvent<E extends Event>(source: NativeEventDispatcher<E>, cb: (event: E) => void): void {
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
  cb: (event: E) => void,
): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
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
  cb: (event: E) => void,
): void {
  /* istanbul ignore else */
  if (process.env.NODE_ENV !== "production") {
    if (source.a === null) {
      throw new Error("removeAfterNativeEvent() failed, unable to find registered callback");
    }
  }
  unorderedArrayDelete(source.a!, cb);
}

function dispatchToListeners<E extends Event>(listeners: Array<(ev: E) => void> | null, event: E): void {
  if (listeners !== null) {
    const cbs = listeners.slice();
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](event);
    }
  }
}
