import { SyntheticEvent, SyntheticNativeEvent, dispatchEvent, onClick, EventFlags } from "ivi-events";

test("empty dispatch target array should not raise exceptions", () => {
  expect(() => {
    dispatchEvent(
      [],
      new SyntheticEvent(0, 0),
      true,
    );
  }).not.toThrow();
});

test("empty dispatch target array should not invoke custom dispatch function", () => {
  let invoked = false;
  dispatchEvent(
    [],
    new SyntheticEvent(0, 0),
    true,
    () => { invoked = true; },
  );

  expect(invoked).toBe(false);
});

test("dispatch onClick", () => {
  let invoked = 0;

  const target = document.createElement("div");
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ target: target, handlers: h }],
    new SyntheticNativeEvent<MouseEvent>(0, target, 0, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(1);
});

test("dispatch to adjacent onClick handlers", () => {
  let invoked = 0;

  const target = document.createElement("div");
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ target: target, handlers: [h, h] }],
    new SyntheticNativeEvent<MouseEvent>(0, target, 0, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(2);
});

test("dispatch to several onClick handlers", () => {
  let invoked = 0;

  const target = document.createElement("div");
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ target: target, handlers: h }, { target: target, handlers: h }],
    new SyntheticNativeEvent<MouseEvent>(0, target, 0, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(2);
});

describe("event flow", () => {
  test("adjacent handlers should be invoked from left to right", () => {
    const order: number[] = [];

    const target = document.createElement("span");
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ target: target, handlers: [h1, h2] }],
      new SyntheticNativeEvent<MouseEvent>(0, target, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1, 2]);
  });

  test("bubbling phase should execute handlers from left to right (bottom-to-up)", () => {
    const order: number[] = [];

    const t1 = document.createElement("span");
    const t2 = document.createElement("div");
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1, 2]);
  });

  test("capture phase should execute handlers from right to left (top-to-bottom)", () => {
    const order: number[] = [];

    const t1 = document.createElement("span");
    const t2 = document.createElement("div");
    const h1 = onClick(() => { order.push(1); }, true);
    const h2 = onClick(() => { order.push(2); }, true);

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2, 1]);
  });

  test("capture phase should be executed before bubbling", () => {
    const order: number[] = [];

    const t1 = document.createElement("span");
    const t2 = document.createElement("div");
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); }, true);

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2, 1]);
  });

  test("bubbling phase should be stopped with stopPropagation()", () => {
    const order: number[] = [];

    const t1 = document.createElement("div");
    const t2 = document.createElement("span");
    const h1 = onClick(() => (order.push(1), EventFlags.StopPropagation));
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1]);
  });

  test("capture phase should be stopped with stopPropagation()", () => {
    const order: number[] = [];

    const t1 = document.createElement("div");
    const t2 = document.createElement("span");
    const h1 = onClick(() => { order.push(1); }, true);
    const h2 = onClick(() => (order.push(2), EventFlags.StopPropagation), true);

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2]);
  });

  test("bubbling phase should be stopped with stopPropagation() from capture phase", () => {
    const order: number[] = [];

    const t1 = document.createElement("div");
    const t2 = document.createElement("span");
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => (order.push(2), EventFlags.StopPropagation), true);

    dispatchEvent(
      [{ target: t1, handlers: h1 }, { target: t2, handlers: h2 }],
      new SyntheticNativeEvent<MouseEvent>(0, t2, 0, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2]);
  });
});
