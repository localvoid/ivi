import type { Component } from "./index.js";
import { invalidate } from "./index.js";

/**
 * Creates a memoized function.
 *
 * @example
 *
 *     const Example = component((c) => {
 *       const fullName = memo(shallowEqArray, ([firstName, lastName]) => (
 *         `${firstName} ${lastName}`
 *       ));
 *
 *       return ({firstName, lastName}) => htm`
 *         div.fullName ${fullName([firstName, lastName])}
 *       `;
 *     });
 *
 * @typeparam T Input type.
 * @typeparam U Output type.
 * @param areEqual Function that checks if input value hasn't changed.
 * @param fn Function to memoize.
 * @returns Memoized function.
 */
export const memo = <T, U>(
  areEqual: (prev: T, next: T) => boolean,
  fn: (props: T) => U,
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
 *     const Example = component((c) => {
 *       const [getCounter, setCounter] = useState(c, 0);
 *       const inc = () => { setCounter(getCounter() + 1); };
 *
 *       return () => htm`
 *         div.app
 *           div.counter ${getCounter()}
 *           button @click=${inc} 'Increment'
 *       `;
 *     });
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
 * Reducer Dispatch Function.
 *
 * @typeparam A Action Type.
 */
export type Dispatch<A> = (action: A) => void;

/**
 * Creates a reactive state reducer.
 *
 * @example
 *
 *     function reducer(state, action) {
 *       switch (action.type) {
 *         case "inc":
 *           return state + 1;
 *       }
 *       return state;
 *     }
 *
 *     const Example = component((c) => {
 *        const [counter, dispatch] = useReducer(c, 0, reducer);
 *        const inc = () => { dispatch("inc"); };
 *
 *       return () => htm`
 *         div.app
 *           div.counter ${counter()}
 *           button @click=${inc} 'Increment'
 *       `;
 *     });
 *
 * @typeparam S State type.
 * @typeparam A Reducer action type.
 * @param component Component instance.
 * @param state Initial state.
 * @param reducer Reducer function.
 * @returns State getter and dispatch functions.
 */
export const useReducer = <S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): [() => S, Dispatch<A>] => ([
  () => state,
  (action: A) => {
    const nextState = reducer(state, action);
    if (state !== nextState) {
      state = nextState;
      invalidate(component);
    }
    return state;
  }
]);
