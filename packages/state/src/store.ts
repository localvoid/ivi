export class Store<T, U> {
  private state: T;
  private reducer: (prev: T, action: U) => T;
  private onChange: () => void;

  constructor(
    state: T,
    reducer: (prev: T, action: U) => T,
    onChange: () => void,
  ) {
    this.state = state;
    this.reducer = reducer;
    this.onChange = onChange;
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
