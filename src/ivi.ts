/**
 * Entry point for `ivi` package.
 */

/**
 * Global variables.
 */
declare global {
    /* tslint:disable:no-unused-variable */
    /**
     * Global variable that enables Development Mode.
     *
     * @define {boolean}
     */
    const __IVI_DEV__: boolean;
    /**
     * Global variable that indicates that code is executed in a browser environment.
     */
    const __IVI_BROWSER__: boolean;
    /* tslint:enable:no-unused-variable */
}

/**
 * Common:
 */
export { DevModeFlags, DEV_MODE, setDevModeFlags, printError } from "./common/dev_mode";
export { FeatureFlags, FEATURES } from "./common/feature_detection";
export { UserAgentFlags, USER_AGENT } from "./common/user_agent";
export { nodeDepth, SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "./common/dom";
export { NOOP } from "./common/noop";
export { isPropsNotIdentical, isPropsNotShallowEqual } from "./common/equality";
export {
    setInitialNestingState, pushNestingState, restoreNestingState, nestingStateAncestorFlags, nestingStateParentTagName,
    checkNestingViolation, AncestorFlags,
} from "./common/html_nesting_rules";

/**
 * Scheduler:
 */
export {
    FrameTasksGroup, clock, scheduleMicrotask, scheduleMacrotask, currentFrame, nextFrame
} from "./scheduler/scheduler";

/**
 * Events:
 */
export { NativeEventDispatcherFlags, EventHandlerFlags, SyntheticEventFlags } from "./events/flags";
export { EventDispatcher } from "./events/event_dispatcher";
export { NativeEventDispatcher } from "./events/native_event_dispatcher";
export { EventHandler, EventHandlerList } from "./events/event_handler";
export {
    NativeEventDispatchersList, NativeActiveEventDispatchersList, NativeEventDispatchers, NativeActiveEventDispatchers,
    Events, ActiveEvents,
} from "./events/events";
export {
    SyntheticEvent, SyntheticDOMEvent, SyntheticUIEvent, SyntheticDragEvent, SyntheticClipboardEvent,
    SyntheticAriaRequestEvent, SyntheticErrorEvent, SyntheticEventClass, SyntheticFocusEvent, SyntheticKeyboardEvent,
    SyntheticMediaEncryptedEvent, SyntheticMediaStreamErrorEvent, SyntheticMouseEvent, SyntheticPointerEvent,
    SyntheticProgressEvent, SyntheticTouchEvent, SyntheticWheelEvent,
} from "./events/synthetic_event";
export { DispatchTarget, accumulateDispatchTargetsFromElement, accumulateDispatchTargets } from "./events/traverse_dom";
export { dispatchEvent } from "./events/dispatch_event";
export { getEventTarget, getEventOptions } from "./events/utils";

/**
 * Virtual DOM:
 */
export { Context, ROOT_CONTEXT } from "./vdom/context";
export { ComponentClass, ComponentFunction, Component, checkPropsIdentity } from "./vdom/component";
export { VNodeFlags } from "./vdom/flags";
export { VNode, isTextNode, isElementNode, isSVGNode, isComponentNode, getDOMRef, getComponentRef } from "./vdom/vnode";
export { VNodeBuilder, cloneVNode, normalizeVNodes, $t, $h, $s, $c, $i, $m } from "./vdom/vnode_builder";
export { Root, findRoot, render, augment } from "./vdom/root";
export { STACK_TRACE } from "./vdom/stack_trace";

if (__IVI_DEV__) {
    if (__IVI_BROWSER__) {
        if (document) {
            document.title += " [DEV MODE]";
        }
    }
    console.info("IVI: DEVELOPMENT MODE");
}
