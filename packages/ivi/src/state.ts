import type { SComponent } from "./index.js";
import { invalidate } from "./index.js";

/**
 * useReducer creates a state reducer.
 *
 * @typeparam T State type.
 * @typeparam U Reducer type.
 * @param component Component instance.
 * @param reducer Reducer function.
 * @param state Initial state.
 * @returns State reducer.
 */
export const useReducer = <T, U>(
  component: SComponent,
  reducer: (state: T, action: U) => T,
  state: T,
) => (
  (action?: U) => {
    if (action !== void 0) {
      var nextState = reducer(state, action);
      if (state !== nextState) {
        state = nextState;
        invalidate(component);
      }
    }
    return state;
  }
);


/**
 * reducer creates a state reducer hook.
 *
 * @typeparam T State type.
 * @typeparam U Reducer type.
 * @param reducerFn Reducer function.
 * @param initialState Initial state.
 * @returns State reducer hook.
 */
export const reducer = <T, U>(reducerFn: (state: T, action: U) => T, initialState: T) => (
  (component: SComponent) => useReducer(component, reducerFn, initialState)
);
