export {
  EMPTY_ARRAY,
  // Stateful Nodes
  type SNode,
  type Root, type Component,
  // Stateless Nodes
  type VAny, type VRoot, type VTemplate, type VComponent, type VList,
  // Template
  type TemplateDescriptor, type ElementDirective,
  _hN, _hE, _sN, _sE, _T, _t,
  // Components
  type ComponentFactory, type Effect,
  component, getProps, invalidate,
  useUnmount, useEffect,
  createEffectHandler, useAnimationFrameEffect, useIdleEffect,
  type VContext,
  context,
  // Dynamic List
  List,
  // Root
  type RootFactory,
  defineRoot, dirtyCheck, update, unmount,
  createRoot,
} from "./lib/core.js";
export {
  eventDispatcher, findDOMNode, containsDOMElement, hasDOMElement,
} from "./lib/utils.js";
export {
  useMemo,
  useState,
  type Dispatch, useReducer,
} from "./lib/state.js";
export {
  preventUpdates, strictEq, shallowEq, shallowEqArray,
} from "./lib/equal.js";
export { html, svg } from "./html/index.js";