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
export { component, statelessComponent, context, connect } from "./vdom/vnode_factories";
export { cloneVNode, shallowCloneVNode } from "./vdom/clone";

/**
 * API available only in browser environment
 */
export { VNodeFlags } from "./vdom/flags";
export { render, renderNextFrame, update, updateNextFrame } from "./vdom/root";

/**
 * Entry
 */
import { setUpdateDOMHandler } from "ivi-scheduler";
import { update } from "./vdom/root";

setUpdateDOMHandler(update);
