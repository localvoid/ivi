/**
 * Common types and functions re-exported from ivi-core.
 */
export {
  map, mapRange, mapFilterUndefined,
  Context, SelectorData, SelectorDataRef, selectorDataRef, selectorData, memoizeSelector,
  KeyCode, KeyLocation, MouseButtons,
} from "ivi-core";

/**
 * Virtual DOM:
 */
export {
  ComponentClass, StatelessComponent, Component, checkPropsShallowEquality, staticComponent, isComponentAttached,
  isComponentClass,
} from "./vdom/component";
export { KeepAliveHandler } from "./vdom/keep_alive";
export { ConnectDescriptor } from "./vdom/connect_descriptor";
export {
  VNode, getDOMInstanceFromVNode, getComponentInstanceFromVNode,
  isTextVNode, isElementVNode, isComponentVNode, getKeyFromVNode, getElementClassNameFromVNode,
  getElementPropsFromVNode, getElementStyleFromVNode,
  disableDirtyCheck,
} from "./vdom/vnode";
export {
  ComponentFactory, isComponentFactory, componentFactory, context, connect, keepAlive,
} from "./vdom/vnode_factories";
export { cloneVNode, shallowCloneVNode } from "./vdom/clone";

/**
 * API available only in browser environment.
 */
export { VNodeFlags } from "./vdom/flags";
export { render, renderNextFrame, augment, update, updateNextFrame } from "./vdom/root";

/**
 * SSR API.
 */
export { BlueprintNode, createBlueprint, linkBlueprint, renderToString, serializeState } from "./vdom/ssr";

/**
 * Entry.
 */
import { FEATURES, FeatureFlags, Context } from "ivi-core";
import { setUpdateFunction } from "ivi-scheduler";
import { VERSION, GLOBAL_EXPORT, printError, getFunctionName } from "./dev_mode/dev_mode";
import { findVNodeByDebugId, findVNodeByNode, visitComponents } from "./dev_mode/component_tree";
import { Component, ComponentClass, StatelessComponent } from "./vdom/component";
import { ConnectDescriptor } from "./vdom/connect_descriptor";
import { KeepAliveHandler } from "./vdom/keep_alive";
import { VNodeFlags } from "./vdom/flags";
import { VNode } from "./vdom/vnode";
import { update } from "./vdom/root";

setUpdateFunction(update);

function _printComponentTreeVisitor(vnode: VNode<any>) {
  if ((vnode._flags & VNodeFlags.ComponentClass) !== 0) {
    const cls = vnode._tag as ComponentClass<any>;
    const instance = vnode._instance as Component<any>;
    console.groupCollapsed(`[C]${getFunctionName(cls.constructor)} #${instance._debugId}`);
    console.log(instance);
  } else {
    if ((vnode._flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext | VNodeFlags.KeepAlive)) !== 0) {
      if ((vnode._flags & VNodeFlags.Connect) !== 0) {
        const d = vnode._tag as ConnectDescriptor<any, any, any>;
        console.groupCollapsed(`[+]${getFunctionName(d.select)} => ${getFunctionName(d.render)}`);
      } else if ((vnode._flags & VNodeFlags.UpdateContext) !== 0) {
        const context = vnode._instance as Context;
        console.groupCollapsed(`[^]${Object.keys(context)}`);
        console.log(context);
      } else {
        const handler = vnode._tag as KeepAliveHandler;
        console.groupCollapsed(`[K]${getFunctionName(handler)}`);
      }
    } else {
      console.groupCollapsed(`[F]${getFunctionName(vnode._tag as StatelessComponent)}`);
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

  if (document) {
    document.title += " [DEV MODE]";
  }

  const printFeatureGroup = function (name: string, flag: number) {
    console.groupCollapsed(`${((FEATURES & flag) ? "✔" : "✖")} ${name}`);
  };

  const printFeature = function (name: string, flag: number) {
    console.log(`${((FEATURES & flag) ? "✔" : "✖")} ${name}`);
  };

  console.groupCollapsed("Detected browser features");
  printFeature("Passive Events", FeatureFlags.PassiveEvents);
  printFeature("SVG innerHTML property", FeatureFlags.SVGInnerHTML);
  printFeature("KeyboardEvent key property", FeatureFlags.KeyboardEventKey);
  printFeature("MouseEvent buttons property", FeatureFlags.MouseEventButtons);
  printFeature("Touch Events", FeatureFlags.TouchEvents);
  if (FEATURES & FeatureFlags.PointerEvents) {
    printFeatureGroup("Pointer Events", FeatureFlags.PointerEvents);
    printFeature("Touch Screen", FeatureFlags.PointerEventsTouch);
    printFeature("Multitouch Screen", FeatureFlags.PointerEventsMultiTouch);
    console.groupEnd();
  } else {
    printFeature("Pointer Events", FeatureFlags.PointerEvents);
  }
  printFeature("InputDeviceCapabilities", FeatureFlags.InputDeviceCapabilities);
  console.groupEnd();

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
