import { catchError } from "ivi-shared";

export interface Store<T, U> {
  state: T;
  dispatch(action: U): void;
}

export function createStore<T, U>(
  state: T,
  reducer: (prev: T, action: U) => T,
  onChange: () => void,
): Store<T, U> {
  reducer = catchError(reducer);
  const store = {
    state,
    dispatch(action: U) {
      const newState = reducer(store.state, action);
      if (store.state !== newState) {
        store.state = newState;
        onChange();
      }
    },
  };
  return store;
}
