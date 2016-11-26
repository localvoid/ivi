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
export { DevModeFlags, DEV_MODE, setDevModeFlags, printError, printWarn } from "./dev_mode/dev_mode";
export { FeatureFlags, FEATURES } from "./common/feature_detection";
export { UserAgentFlags, USER_AGENT } from "./common/user_agent";
export { nodeDepth, SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, getEventTarget } from "./common/dom";
export { NOOP } from "./common/noop";
export { isPropsNotIdentical, isPropsNotShallowEqual } from "./common/equality";

/**
 * Dev Mode:
 */
export {
    setInitialNestingState, pushNestingState, restoreNestingState, nestingStateAncestorFlags, nestingStateParentTagName,
    checkNestingViolation, AncestorFlags,
} from "./dev_mode/html_nesting_rules";


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
export { getEventOptions } from "./events/utils";

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

/**
 * Dev Mode exported functions:
 */
import { VERSION, GLOBAL_EXPORT } from "./dev_mode/dev_mode";
import { DebugNode, componentTree, findComponentByNode } from "./dev_mode/component_tree";
import { Component, findComponentByDebugId } from "./vdom/component";

function _printComponentTreeVisitNode(node: DebugNode): void {
    if (node.instance) {
        console.groupCollapsed(`[C]${node.name} #${node.instance._debugId}`);
        console.log(node.instance);
    } else {
        console.groupCollapsed(`[F]${node.name}`);
    }
    if (node.children) {
        _printComponentTreeVisitChildren(node.children);
    }
    console.groupEnd();
}

function _printComponentTreeVisitChildren(nodes: DebugNode[]): void {
    for (let i = 0; i < nodes.length; i++) {
        _printComponentTreeVisitNode(nodes[i]);
    }
}

function printComponentTree(nodes: DebugNode[]): void {
    _printComponentTreeVisitChildren(nodes);
}

if (__IVI_DEV__) {
    console.info(`IVI [${VERSION}]: DEVELOPMENT MODE`);

    if (__IVI_BROWSER__) {
        if (document) {
            document.title += " [DEV MODE]";
        }

        const devModeExport = {
            "VERSION": VERSION,
            "componentTree": componentTree,
            "findComponentByDebugId": findComponentByDebugId,
            "findComponentByNode": findComponentByNode,
            "$": function (v?: number | Node | Component<any>) {
                let result;
                if (v === undefined) {
                    result = componentTree();
                } else if (typeof v === "number") {
                    const c = findComponentByDebugId(v);
                    if (c) {
                        result = componentTree(c);
                    }
                } else if (v instanceof Node) {
                    const c = findComponentByNode(v);
                    if (c) {
                        result = componentTree(c);
                    }
                } else if (v instanceof Component) {
                    result = componentTree(v as Component<any>);
                } else {
                    throw new Error("Invalid value");
                }
                if (result) {
                    printComponentTree(result);
                }
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
