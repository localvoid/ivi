export {
  EMPTY_ARRAY,
  // Opaque Stateful Nodes
  type SNode,
  type Root, type Component,
  // Opaque Stateless Nodes
  type VAny, type VRoot, type VTemplate, type VComponent, type VList,
  // Template
  type TemplateDescriptor, type ElementDirective,
  _h, _hN, _hE, _s, _sN, _sE, _T, _Td, _t,
  // Components
  type ComponentFactory, type Effect,
  component, getProps, invalidate,
  useUnmount, useEffect, useLayoutEffect, useIdleEffect,
  type VContext,
  context,
  // Dynamic List
  List,
  // Root
  type RootFactory,
  defineRoot, dirtyCheck, update, unmount, hydrate,
  createRoot,
} from "./client/core.js";
export {
  eventDispatcher, findDOMNode, containsDOMElement, hasDOMElement,
} from "./client/utils.js";
export {
  useMemo,
  useState,
  type Dispatch, useReducer,
} from "./client/state.js";
export {
  preventUpdates, strictEq, shallowEq, shallowEqArray,
} from "./shared/equal.js";
export { escapeHTMLAttribute, escapeHTMLText } from "./shared/escape.js";
