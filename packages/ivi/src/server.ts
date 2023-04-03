export { strictEq, shallowEq, shallowEqArray } from "./shared/equal.js";
export {
  type VAny,
  type Component, type ComponentFactory, type UseEffectFactory,
  component, getProps, invalidate,
  useUnmount, useEffect, useLayoutEffect, useIdleEffect,
  List,
  type VContext, context,
  type Root,
  defineRoot, createRoot, dirtyCheck, update, unmount, hydrate,
  renderToString,
  _$T, _$E, _$P, _$t,
  _h, _hN, _hE, _s, _sN, _sE, _T, _t,
} from "./server/core.js";
export {
  useMemo,
  useState,
  type Dispatch,
  useReducer,
} from "./server/state.js";
export {
  eventDispatcher, findDOMNode, containsDOMElement, hasDOMElement,
} from "./server/utils.js";
