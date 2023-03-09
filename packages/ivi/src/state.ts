import type { Component } from "./index.js";
import { invalidate } from "./index.js";

/**
 * Creates a memoized function.
 *
 * @example
 *
 *     const FullName = component((c) => {
 *       const fullName = memo(
 *         ([firstName, lastName]) => `${firstName} ${lastName}`,
 *         (prev, next) => prev[0] === next[0] && prev[1] === next[1],
 *       );
 *
 *       return ({firstName, lastName}) => htm`
 *         div.fullName ${fullName([firstName, lastName])}
 *       `;
 *     });
 *
 * @typeparam T Input type.
 * @typeparam U Output type.
 * @param fn
 * @param areEqual `areEqual` function.
 * @returns memoized function.
 */
export const memo = <T, U>(
  fn: (props: T) => U,
  areEqual: (prev: T, next: T) => boolean,
): (props: T) => U => {
  var prev: T | undefined;
  var v: U | undefined;
  return (props: T) => (
    (v === void 0 || areEqual(prev!, props) === false)
      ? v = fn(prev = props)
      : v
  );
};

/**
 * Creates a reactive state.
 *
 * @example
 *
 *     const Counter = component((c) => {
 *        const [getCounter, setCounter] = useState(c, 0);
 *        const inc = () => {
 *          setCounter(getCounter() + 1);
 *        };
 *
 *        return () => htm`
 *          div.app
 *            div.counter ${getCounter()}
 *            button @click=${inc} 'Increment'
 *        `;
 *      });
 *
 * @typeparam S State type.
 * @param component Component instance.
 * @param state Initial state value.
 * @returns A tuple with a getter and setter functions.
 */
export const useState = <S>(
  component: Component,
  state: S,
): [() => S, (s: S) => void] => ([
  // getter
  () => state,
  // setter
  (next: S) => {
    if (next !== state) {
      state = next;
      invalidate(component);
    }
  }
]);

/**
 * Creates a reactive state reducer.
 *
 * @example
 *
 *     const Counter = component((c) => {
 *        const counter = useReducer(c, 0, (state, action) => {
 *          if (action === "inc") {
 *            return state + 1;
 *          }
 *          return state;
 *        });
 *        const inc = () => {
 *          counter("inc");
 *        };
 *
 *        return () => htm`
 *          div.app
 *            div.counter ${counter()}
 *            button @click=${inc} 'Increment'
 *        `;
 *      });
 *
 * @typeparam S State type.
 * @typeparam A Reducer action type.
 * @param component Component instance.
 * @param state Initial state.
 * @param reducer Reducer function.
 * @returns State reducer.
 */
export const useReducer = <S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): (action?: A) => S => (
  (action?: A) => {
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
  (component: Component) => useReducer(component, initialState, reducerFn)
);
