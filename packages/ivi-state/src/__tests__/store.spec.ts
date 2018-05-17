import { createStore } from "ivi-state";

describe("src/store.ts", function () {
  test("init", function () {
    const store = createStore(
      { a: 1 },
      (state: any) => state,
      () => undefined,
    );
    expect(store.getState().a).toBe(1);
  });

  test("should not trigger onUpdate when state isn't changed", function () {
    let updated = false;
    const store = createStore(
      { a: 1 },
      (state: any) => state,
      () => { updated = true; },
    );
    store.dispatch(0);
    expect(updated).toBe(false);
  });

  test("should trigger onUpdate when state is changed", function () {
    let updated = false;
    const store = createStore(
      { a: 1 },
      (state: any) => ({ ...state }),
      () => { updated = true; },
    );
    store.dispatch(0);
    expect(updated).toBe(true);
  });

  test("should update state after dispatch", function () {
    const store = createStore(
      { a: 1, b: 2 },
      (state: any) => ({ ...state, ...{ b: 3 } }),
      () => { return; },
    );
    store.dispatch(0);
    expect(store.getState().a).toBe(1);
    expect(store.getState().b).toBe(3);
  });

  test("should pass action to reducer", function () {
    const store = createStore(
      { a: 0 },
      (state: any, action: any) => ({ ...state, ...{ a: action } }),
      () => { return; },
    );
    store.dispatch(1);
    expect(store.getState().a).toBe(1);
  });
});
