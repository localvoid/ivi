import { catchError } from "ivi-core";

export class Store<T, U> {
  private reducer: (prev: T, action: U) => T;

  constructor(
    private state: T,
    reducer: (prev: T, action: U) => T,
    private onChange: () => void,
  ) {
    this.reducer = catchError(reducer) as (prev: T, action: U) => T;
  }

  getState(): T {
    return this.state;
  }

  dispatch(action: U) {
    const newState = this.reducer(this.state, action);
    if (this.state !== newState) {
      this.state = newState;
      this.onChange();
    }
  }
}

export function createStore<T, U>(
  state: T,
  reducer: (prev: T, action: U) => T,
  onChange: () => void,
): Store<T, U> {
  return new Store(state, reducer, onChange);
}
