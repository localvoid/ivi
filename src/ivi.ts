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
export {
    nodeDepth, SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, getEventTarget, getEventCharCode, getEventKey, firstLeaf,
    nextSibling, setInnerHTML, MouseButtons, KeyCode, KeyName, KeyLocation,
} from "./common/dom";
export { NOOP } from "./common/noop";
export { isPropsNotIdentical, isPropsNotShallowEqual } from "./common/equality";
export { isVisible, addVisibilityObserver, removeVisibilityObserver } from "./common/visibility";

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
export { FrameTasksGroup } from "./scheduler/frame_tasks_group";
export { clock } from "./scheduler/clock";
export { scheduleMicrotask } from "./scheduler/microtask";
export { scheduleTask } from "./scheduler/task";
export { addDOMReader } from "./scheduler/dom_reader";
export { startComponentAnimation, stopComponentAnimation, addAnimation } from "./scheduler/animation";
export { frameStartTime, currentFrame, nextFrame, syncFrameUpdate } from "./scheduler/frame";

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
    SyntheticErrorEvent, SyntheticEventClass, SyntheticFocusEvent, SyntheticKeyboardEvent,
    SyntheticMediaEncryptedEvent, SyntheticMediaStreamErrorEvent, SyntheticMouseEvent, SyntheticPointerEvent,
    SyntheticProgressEvent, SyntheticTouchEvent, SyntheticWheelEvent,
} from "./events/synthetic_event";
export { DispatchTarget, accumulateDispatchTargetsFromElement, accumulateDispatchTargets } from "./events/traverse_dom";
export { dispatchEvent } from "./events/dispatch_event";
export { getEventOptions } from "./events/utils";

/**
 * Virtual DOM:
 */
export {
    ComponentClass, ComponentFunction, Component, getDOMInstanceFromComponent, findComponentByDebugId,
    checkPropsIdentity, checkPropsShallowEquality, staticComponent,
} from "./vdom/component";
export { VNodeFlags, ElementDescriptorFlags, SyncFlags } from "./vdom/flags";
export {
    IVNode, isTextNode, isElementNode, isSVGNode, isComponentNode, getDOMInstanceFromVNode, getComponentRef,
} from "./vdom/ivnode";
export {
    ElementDescriptor, createElementDescriptor, createSVGElementDescriptor, createInputElementDescriptor,
    createMediaElementDescriptor, createCustomElementDescriptor,
} from "./vdom/element_descriptor";
export {
    VNodeArray,
    VNode, cloneVNode, shallowCloneVNode, normalizeVNodes,
    $t, $h, $s, $c, $i, $m, $e, $w,
} from "./vdom/vnode";
export { Root, findRoot, render, renderNextFrame, augment } from "./vdom/root";

/**
 * Dev Mode exported functions:
 */
import { VERSION, GLOBAL_EXPORT, printError } from "./dev_mode/dev_mode";
import { DebugNode, componentTree, findComponentByNode } from "./dev_mode/component_tree";
import { printComponentStackTrace } from "./dev_mode/stack_trace";
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

    // Minification test.
    const testFunc = function testFn() {
        /* tslint:disable:no-empty */
        /* tslint:enable:no-empty */
    };
    if ((testFunc.name || testFunc.toString()).indexOf("testFn") === -1) {
        console.info(
            "It looks like you're using a minified script in Development Mode. " +
            "When deploying ivi apps to production, disable Development Mode. It" +
            "will remove many runtime checks and will work significantly faster.");
    }

    if (typeof Array.isArray !== "function") {
        printError("`Array.isArray` function is missing.");
    }
    if (typeof Object.assign !== "function") {
        printError("`Object.assign` function is missing.");
    }
    if (typeof Object.keys !== "function") {
        printError("`Object.keys` function is missing.");
    }
    if (typeof Map !== "function") {
        printError("`Map` constructor is missing.");
    }

    if (__IVI_BROWSER__) {
        if (document) {
            document.title += " [DEV MODE]";
        }

        const devModeExport = {
            "VERSION": VERSION,
            "componentTree": componentTree,
            "findComponentByDebugId": findComponentByDebugId,
            "findComponentByNode": findComponentByNode,
            "stackTrace": printComponentStackTrace,
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
