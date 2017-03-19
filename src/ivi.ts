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
export { Context } from "./common/types";
export { FeatureFlags, FEATURES } from "./common/feature_detection";
export { UserAgentFlags, USER_AGENT } from "./common/user_agent";
export {
    nodeDepth, SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE, getEventTarget, getEventCharCode, getEventKey, firstLeaf,
    nextSibling, setInnerHTML, MouseButtons, KeyCode, KeyName, KeyLocation,
} from "./common/dom";
export { NOOP } from "./common/noop";
export { isPropsNotShallowEqual } from "./common/equality";
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
    ComponentClass, ComponentFunction, Component, checkPropsShallowEquality, staticComponent, isComponentAttached,
} from "./vdom/component";
export { VNodeFlags, ElementDescriptorFlags, SyncFlags } from "./vdom/flags";
export {
    IVNode, isTextNode, isElementNode, isSVGNode, isComponentNode, getDOMInstanceFromVNode,
    getComponentInstanceFromVNode,
} from "./vdom/ivnode";
export {
    ElementDescriptor, createElementDescriptor, createSVGElementDescriptor, createInputElementDescriptor,
    createMediaElementDescriptor, createCustomElementDescriptor,
} from "./vdom/element_descriptor";
export { ConnectDescriptor, SelectorData } from "./vdom/connect_descriptor";
export { KeepAliveHandler } from "./vdom/keep_alive";
export { VNode } from "./vdom/vnode";
export { $t, $h, $s, $i, $m, $e, $w } from "./vdom/vnode_dom";
export { $c, $connect, $ctx, $keepAlive } from "./vdom/vnode_components";
export { $list, $map, $filter, $range } from "./vdom/vnode_lists";
export { cloneVNode, shallowCloneVNode } from "./vdom/clone";
export { Root, findRoot, render, renderNextFrame, augment, update, updateNextFrame } from "./vdom/root";

/**
 * State:
 */
export { Mutable, mut } from "./state/mutable";
export { selectorData, memoizeSelector, memoizeSelectorGlobally } from "./state/selector";
export { connect } from "./state/connect";
export { Store, createStore } from "./state/store";

/**
 * Dev Mode exported functions:
 */
import { VERSION, GLOBAL_EXPORT, printError, getFunctionName } from "./dev_mode/dev_mode";
import { findVNodeByDebugId, findVNodeByNode, visitComponents } from "./dev_mode/component_tree";
import { Context } from "./common/types";
import { Component, ComponentClass, ComponentFunction } from "./vdom/component";
import { ConnectDescriptor } from "./vdom/connect_descriptor";
import { KeepAliveHandler } from "./vdom/keep_alive";
import { IVNode } from "./vdom/ivnode";
import { VNodeFlags } from "./vdom/flags";

function _printComponentTreeVisitor(vnode: IVNode<any>) {
    if (vnode._flags & VNodeFlags.ComponentClass) {
        const cls = vnode._tag as ComponentClass<any>;
        const instance = vnode._instance as Component<any>;
        console.groupCollapsed(`[C]${getFunctionName(cls.constructor)} #${instance._debugId}`);
        console.log(instance);
    } else {
        if (vnode._flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext | VNodeFlags.KeepAlive)) {
            if (vnode._flags & VNodeFlags.Connect) {
                const d = vnode._tag as ConnectDescriptor<any, any, any>;
                console.groupCollapsed(`[+]${getFunctionName(d.select)} => ${getFunctionName(d.render)}`);
            } else if (vnode._flags & VNodeFlags.UpdateContext) {
                const context = vnode._instance as Context;
                console.groupCollapsed(`[^]${Object.keys(context)}`);
                console.log(context);
            } else {
                const handler = vnode._tag as KeepAliveHandler;
                console.groupCollapsed(`[K]${getFunctionName(handler)}`);
            }
        } else {
            console.groupCollapsed(`[F]${getFunctionName(vnode._tag as ComponentFunction)}`);
        }
    }
    console.groupEnd();
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
            "findVNodeByDebugId": findVNodeByDebugId,
            "findVNodeByNode": findVNodeByNode,
            "$": function (v?: number | Node) {
                if (v === undefined) {
                    visitComponents(_printComponentTreeVisitor);
                } else if (typeof v === "number") {
                    const c = findVNodeByDebugId(v);
                    if (c) {
                        visitComponents(_printComponentTreeVisitor, c);
                    }
                } else if (v instanceof Node) {
                    const c = findVNodeByNode(v);
                    if (c) {
                        visitComponents(_printComponentTreeVisitor, c);
                    }
                } else {
                    throw new Error("Invalid value");
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
