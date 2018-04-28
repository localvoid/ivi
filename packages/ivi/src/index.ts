/**
 * Common types and functions re-exported from ivi-core.
 */
export {
  map, mapRange, mapFilterUndefined,
  memoizeSelector,
  KeyCode, KeyLocation, MouseButtons,
} from "ivi-core";

/**
 * Virtual DOM
 */
export { StatefulComponent, StatelessComponent, Component, isComponentAttached } from "./vdom/component";
export { ConnectDescriptor } from "./vdom/connect_descriptor";
export {
  VNode, Children,
  changeClassName, mergeAttrs, mergeStyle,
  getDOMInstanceFromVNode, getComponentInstanceFromVNode,
  isTextVNode, isElementVNode, isComponentVNode, getKeyFromVNode, getElementClassNameFromVNode,
  getElementPropsFromVNode, getElementStyleFromVNode,
  disableDirtyChecking,
} from "./vdom/vnode";
export { elementFactory } from "./vdom/element";
export { componentFactory, statelessComponentFactory, context, connect } from "./vdom/vnode_factories";
export { cloneVNode, shallowCloneVNode } from "./vdom/clone";

/**
 * API available only in browser environment
 */
export { VNodeFlags } from "./vdom/flags";
export { render, renderNextFrame, update, updateNextFrame } from "./vdom/root";

/**
 * Entry
 */
import { FEATURES, FeatureFlags } from "ivi-core";
import { setUpdateDOMHandler } from "ivi-scheduler";
import { VERSION } from "./dev_mode/dev_mode";
import { update } from "./vdom/root";

setUpdateDOMHandler(update);

if (DEBUG) {
  console.info(`IVI [${VERSION}]: DEVELOPMENT MODE`);

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
}
