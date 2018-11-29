import { _, OpState, createNativeEvent, dispatchEvent, onClick, EventFlags } from "ivi";
import { SyntheticEventFlags } from "../flags";

function createEvent(flags: SyntheticEventFlags, timestamp: number, node: OpState | null) {
  return { flags, timestamp, node };
}

test("empty dispatch target array should not raise exceptions", () => {
  expect(() => {
    dispatchEvent(
      [],
      createEvent(0, 0, null),
      true,
    );
  }).not.toThrow();
});

test("empty dispatch target array should not invoke custom dispatch function", () => {
  let invoked = false;
  dispatchEvent(
    [],
    createEvent(0, 0, null),
    true,
    () => { invoked = true; },
  );

  expect(invoked).toBe(false);
});

test("dispatch onClick", () => {
  let invoked = 0;

  const t = {};
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ t, h }],
    createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(1);
});

test("dispatch to adjacent onClick handlers", () => {
  let invoked = 0;

  const t = {};
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ t, h: [h, h] }],
    createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(2);
});

test("dispatch to several onClick handlers", () => {
  let invoked = 0;

  const t = {};
  const h = onClick(() => { invoked++; });

  dispatchEvent(
    [{ t, h: h }, { t, h: h }],
    createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
    true,
  );

  expect(invoked).toBe(2);
});

describe("event flow", () => {
  test("adjacent handlers should be invoked from left to right", () => {
    const order: number[] = [];

    const t = {};
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ t, h: [h1, h2] }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1, 2]);
  });

  test("bubbling phase should execute handlers from left to right (bottom-to-up)", () => {
    const order: number[] = [];

    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ t: {}, h: h1 }, { t: {}, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1, 2]);
  });

  test("capture phase should execute handlers from right to left (top-to-bottom)", () => {
    const order: number[] = [];

    const h1 = onClick(() => { order.push(1); }, true);
    const h2 = onClick(() => { order.push(2); }, true);

    dispatchEvent(
      [{ t: {}, h: h1 }, { t: {}, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2, 1]);
  });

  test("capture phase should be executed before bubbling", () => {
    const order: number[] = [];

    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => { order.push(2); }, true);

    dispatchEvent(
      [{ t: {}, h: h1 }, { t: {}, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2, 1]);
  });

  test("bubbling phase should be stopped with stopPropagation()", () => {
    const order: number[] = [];

    const t1 = {};
    const t2 = {};
    const h1 = onClick(() => (order.push(1), EventFlags.StopPropagation));
    const h2 = onClick(() => { order.push(2); });

    dispatchEvent(
      [{ t: t1, h: h1 }, { t: t2, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([1]);
  });

  test("capture phase should be stopped with stopPropagation()", () => {
    const order: number[] = [];

    const t1 = {};
    const t2 = {};
    const h1 = onClick(() => { order.push(1); }, true);
    const h2 = onClick(() => (order.push(2), EventFlags.StopPropagation), true);

    dispatchEvent(
      [{ t: t1, h: h1 }, { t: t2, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2]);
  });

  test("bubbling phase should be stopped with stopPropagation() from capture phase", () => {
    const order: number[] = [];

    const t1 = {};
    const t2 = {};
    const h1 = onClick(() => { order.push(1); });
    const h2 = onClick(() => (order.push(2), EventFlags.StopPropagation), true);

    dispatchEvent(
      [{ t: t1, h: h1 }, { t: t2, h: h2 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );

    expect(order).toEqual([2]);
  });
});

test(`returning invalid EventFlags should raise an exception`, () => {
  const t1 = {};
  const h1 = onClick(() => (10));

  expect(() => {
    dispatchEvent(
      [{ t: t1, h: h1 }],
      createNativeEvent<MouseEvent>(0, 0, null, new MouseEvent("click")),
      true,
    );
  }).toThrowError(`Invalid`);
});
