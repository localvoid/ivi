import { _, OpState, DispatchEventDirective, EventHandlerNode, EventHandlerFlags, dispatchEvent } from "ivi";

function createEvent(timestamp: number, node: OpState | null) {
  return { timestamp, node };
}

const BUBBLE_DESCRIPTOR = {
  src: {},
  flags: EventHandlerFlags.Bubble
};
const CAPTURE_DESCRIPTOR = {
  src: {},
  flags: EventHandlerFlags.Capture
};

function onBubble(): EventHandlerNode {
  return {
    d: BUBBLE_DESCRIPTOR,
    h: null,
  };
}

function onCapture(): EventHandlerNode {
  return {
    d: CAPTURE_DESCRIPTOR,
    h: null,
  };
}

test("empty dispatch target array should not raise exceptions", () => {
  expect(() => {
    dispatchEvent(
      [],
      createEvent(0, null),
      true,
      () => 0,
    );
  }).not.toThrow();
});

test("empty dispatch target array should not invoke custom dispatch function", () => {
  let invoked = false;
  dispatchEvent(
    [],
    createEvent(0, null),
    true,
    () => (invoked = true, 0),
  );

  expect(invoked).toBe(false);
});

test("dispatch event", () => {
  let invoked = 0;

  const t = {};

  dispatchEvent(
    [{ t, h: onCapture() }],
    createEvent(0, null),
    true,
    () => (invoked++ , 0),
  );

  expect(invoked).toBe(1);
});

test("dispatch to several targets", () => {
  let invoked = 0;

  const t = {};

  dispatchEvent(
    [{ t, h: onCapture() }, { t, h: onCapture() }],
    createEvent(0, null),
    true,
    () => (invoked++ , 0)
  );

  expect(invoked).toBe(2);
});

describe("event flow", () => {
  test("bubbling phase should execute handlers from left to right (bottom-to-up)", () => {
    const order: EventHandlerNode[] = [];

    const t = {};
    const h1 = onBubble();
    const h2 = onBubble();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), 0),
    );

    expect(order).toEqual([h1, h2]);
  });

  test("capture phase should execute handlers from right to left (top-to-bottom)", () => {
    const order: EventHandlerNode[] = [];

    const t = {};
    const h1 = onCapture();
    const h2 = onCapture();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), 0),
    );

    expect(order).toEqual([h2, h1]);
  });

  test("capture phase should be executed before bubbling", () => {
    const order: EventHandlerNode[] = [];

    const t = {};

    const h1 = onBubble();
    const h2 = onCapture();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), 0),
    );

    expect(order).toEqual([h2, h1]);
  });

  test("bubbling phase should be stopped with stopPropagation()", () => {
    const order: EventHandlerNode[] = [];

    const t = {};
    const h1 = onBubble();
    const h2 = onBubble();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), DispatchEventDirective.StopPropagation),
    );

    expect(order).toEqual([h1]);
  });

  test("capture phase should be stopped with StopPropagation", () => {
    const order: EventHandlerNode[] = [];

    const t = {};
    const h1 = onCapture();
    const h2 = onCapture();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), DispatchEventDirective.StopPropagation),
    );

    expect(order).toEqual([h2]);
  });

  test("bubbling phase should be stopped with StopPropagation from capture phase", () => {
    const order: EventHandlerNode[] = [];

    const t = {};
    const h1 = onBubble();
    const h2 = onCapture();

    dispatchEvent(
      [{ t, h: h1 }, { t, h: h2 }],
      createEvent(0, null),
      true,
      (target) => (order.push(target.h), DispatchEventDirective.StopPropagation),
    );

    expect(order).toEqual([h2]);
  });
});
