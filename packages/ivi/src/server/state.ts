import type { Component } from "./core.js";

export const useMemo = <T, U>(
  areEqual: (prev: T, next: T) => boolean,
  fn: (props: T) => U,
): (props: T) => U => fn;

export const useState = <S>(
  component: Component,
  state: S,
): [
    get: () => S,
    set: (s: S) => void,
  ] => ([
    () => state,
    _useStateSetter,
  ]);

export type Dispatch<A> = (action: A) => void;

export const useReducer = <S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): [
    get: () => S,
    dispatch: Dispatch<A>,
  ] => ([
    () => state,
    _useReducerDispatch,
  ]);

const _useStateSetter = () => {
  throw Error("useState setter function isn't available during Server-Side Rendering.");
};

const _useReducerDispatch = () => {
  throw Error("useReducer dispatch function isn't available during Server-Side Rendering.");
};
