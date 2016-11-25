/**
 * Entry point for `ivi` package.
 */

/**
 * Global variables.
 */
declare global {
    /* tslint:disable:no-unused-variable */
    /**
     * Global variable with a version string.
     *
     * @define {string}
     */
    const __IVI_VERSION__: string;
    /**
     * Global variable that enables Development Mode.
     *
     * @define {boolean}
     */
    const __IVI_DEV__: boolean;
    /**
     * Global variable that indicates that code is executed in a browser environment.
     *
     * @define {boolean}
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
    FrameTasksGroup, DOMReader, clock, scheduleMicrotask, scheduleTask, currentFrame, nextFrame, syncFrameUpdate,
    registerDOMReader,
} from "./scheduler/scheduler";

/**
 * Events:
 */
export { NativeEventDispatcherFlags, EventHandlerFlags, SyntheticEventFlags } from "./events/flags";
export {
    EventDispatcher, EventDispatcherSubscriptionFlags, EventDispatcherSubscription,
} from "./events/event_dispatcher";
export { NativeEventDispatcher } from "./events/native_event_dispatcher";
export { EventHandler, EventHandlerList } from "./events/event_handler";
export {
    NativeEventDispatchersList, NativeActiveEventDispatchersList, NativeEventDispatchers, NativeActiveEventDispatchers,
    Events, ActiveEvents, createEventHandler,
} from "./events/events";
export {
    SyntheticEvent, SyntheticUIEvent, SyntheticDragEvent, SyntheticClipboardEvent,
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
export {
    ComponentClass, ComponentFunction, Component, getDOMInstanceFromComponent, findComponentByDebugId,
    checkPropsIdentity, checkPropsShallowEquality,
} from "./vdom/component";
export { VNodeFlags, ElementDescriptorFlags } from "./vdom/flags";
export {
    VNode, isTextNode, isElementNode, isSVGNode, isComponentNode, getDOMInstanceFromVNode, getComponentRef,
} from "./vdom/vnode";
export {
    ElementDescriptor, createElementDescriptor, createSVGElementDescriptor, createInputElementDescriptor,
    createMediaElementDescriptor, createCustomElementDescriptor,
} from "./vdom/element_descriptor";
export { VNodeBuilder, cloneVNode, normalizeVNodes, $t, $h, $s, $c, $i, $m, $e, $w } from "./vdom/vnode_builder";
export { Root, findRoot, render, renderNextFrame, augment } from "./vdom/root";
export { STACK_TRACE } from "./vdom/stack_trace";

/**
 * Dev Mode exported functions:
 */
import { VERSION, GLOBAL_EXPORT } from "./common/dev_mode";
import { findComponentByDebugId } from "./vdom/component";

if (__IVI_DEV__) {
    console.info(`IVI [${VERSION}]: DEVELOPMENT MODE`);

    if (__IVI_BROWSER__) {
        if (document) {
            document.title += " [DEV MODE]";
        }

        const devModeExport = {
            "VERSION": VERSION,
            "findComponentByDebugId": findComponentByDebugId,
            "$": function (v: any) {
                return findComponentByDebugId(Number(v));
            },
        };

        if (GLOBAL_EXPORT && !window.hasOwnProperty(GLOBAL_EXPORT)) {
            (window as any)[GLOBAL_EXPORT] = devModeExport;
            console.info(`DevMode API is exported to: ${GLOBAL_EXPORT}`);
        } else if (!window.hasOwnProperty("ivi")) {
            (window as any)["ivi"] = devModeExport;
            console.info(`DevMode API is exported to: ivi`);
        } else {
            console.info(`DevMode API is not exported`);
        }
    }
}
