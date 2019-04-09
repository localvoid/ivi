import { doc } from "../dom/shortcuts";
import { OpState } from "../vdom/state";
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

export type NativeEventHandler = <E extends Event>(
  event: E,
  currentTarget?: OpState,
  src?: {},
) => DispatchEventDirective | void;

function dispatchNativeEvent(
  event: Event,
  currentTarget: DispatchTarget<NativeEventHandler>,
  src: {},
): DispatchEventDirective {
  const flags = currentTarget.h.h(event, currentTarget.t, src);
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
): {} {
  const source = {};
  doc.addEventListener(name, withSchedulerTick((event: Event): void => {
    const targets = collectDispatchTargets(event.target as Element, source);
    if (targets.length > 0) {
      dispatchEvent(
        source,
        targets,
        event,
        (flags & NativeEventDispatcherFlags.Bubbles) !== 0,
        dispatchNativeEvent,
      );
    }
  }), options);

  return source;
}
