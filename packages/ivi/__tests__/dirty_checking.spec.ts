import { connect, context, stopDirtyChecking } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`identical node should trigger dirty checking`, () => {
  startRender((r) => {
    let triggered = 0;
    const c = connect(
      () => (triggered++),
      () => h.div(),
    );

    const v = (
      h.div().c(
        c(),
      )
    );

    r(v);
    r(v);

    expect(triggered).toBe(2);
  });
});

test(`stopDirtyChecking should stop dirty checking`, () => {
  startRender((r) => {
    let triggered = 0;
    const c = connect(
      () => (triggered++),
      () => h.div(),
    );

    const v = (
      h.div().c(
        stopDirtyChecking(
          c(),
        ),
      )
    );

    r(v);
    r(v);

    expect(triggered).toBe(1);
  });
});

test(`update context during dirty checking`, () => {
  startRender((r) => {
    let innerTest = -1;
    let outerTest = -1;
    const c = connect<number, undefined, { outer: number, inner: number }>(
      (prev, _, { outer, inner }) => (innerTest = inner, outerTest = outer),
      () => h.div(),
    );

    const v = (
      h.div().c(
        context({ inner: 10 },
          c(),
        ),
      )
    );

    r(context({ outer: 0, inner: 0 }, v));

    expect(outerTest).toBe(0);
    expect(innerTest).toBe(10);

    r(context({ outer: 1, inner: 1 }, v));

    expect(outerTest).toBe(1);
    expect(innerTest).toBe(10);
  });
});

test(`update inner context during dirty checking`, () => {
  startRender((r) => {
    let i = 0;
    let innerTest = -1;
    const c = connect<number, undefined, { inner: number }>(
      (prev, _, { inner }) => (innerTest = inner),
      () => h.div(),
    );
    const incContext = connect(
      () => i++,
      (p) => context({ inner: p }, c()),
    );

    const v = (
      h.div().c(
        incContext(),
      )
    );

    r(v);

    expect(innerTest).toBe(0);

    r(v);

    expect(innerTest).toBe(1);
  });
});
