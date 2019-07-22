import {
  useIVI, useResetModules, useRequestAnimationFrame, useMockFn, usePromiseQueue, useDOMElement, useTest,
} from "ivi-jest";
import { Component } from "ivi";

useResetModules();
const promise = usePromiseQueue();
const raf = useRequestAnimationFrame();
const ivi = useIVI();

describe("next frame", () => {
  describe("withNextFrame", () => {
    test("execute handler", () => {
      const fn = jest.fn();
      ivi.withNextFrame(fn)(10);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(10);
    });

    test("frameStartTime", () => {
      let startTime;
      ivi.beforeMutations(() => {
        startTime = ivi.frameStartTime();
      });
      ivi.withNextFrame(() => {
        ivi.requestDirtyCheck();
      })(10);
      expect(startTime).toBe(10);
    });
  });

  describe("effects", () => {
    test("scheduleMutationEffect", () => {
      const fn = jest.fn();
      ivi.scheduleMutationEffect(fn);
      raf.flush();
      expect(fn.mock.calls.length).toBe(1);
    });

    test("scheduleLayoutEffect", () => {
      const fn = jest.fn();
      ivi.scheduleLayoutEffect(fn);
      raf.flush();
      expect(fn.mock.calls.length).toBe(1);
    });
  });

  describe("hooks", () => {
    test("beforeMutations", () => {
      const fn = jest.fn();
      ivi.beforeMutations(fn);
      ivi.requestNextFrame();
      raf.flush();
      expect(fn.mock.calls.length).toBe(1);
    });

    test("afterMutations", () => {
      const fn = jest.fn();
      ivi.afterMutations(fn);
      ivi.requestNextFrame();
      raf.flush();
      expect(fn.mock.calls.length).toBe(1);
    });
  });

  test("execution order", () => {
    const order: string[] = [];
    const fn = (name: string) => () => { order.push(name); };

    ivi.beforeMutations(fn("beforeMutations"));
    ivi.afterMutations(fn("afterMutations"));
    ivi.scheduleMutationEffect(fn("mutationEffect"));
    ivi.scheduleLayoutEffect(fn("layoutEffect"));

    raf.flush();

    expect(order).toEqual(["beforeMutations", "mutationEffect", "afterMutations", "layoutEffect"]);
  });

  describe("requestNextFrame", () => {
    const fn = useMockFn();

    test("sync", async () => {
      ivi.beforeMutations(fn);
      ivi.requestNextFrame(ivi.UpdateFlags.RequestSyncUpdate);
      await promise.wait();
      expect(fn).toBeCalled();
    });

    test("raf after sync", async () => {
      ivi.requestNextFrame(ivi.UpdateFlags.RequestSyncUpdate);
      await promise.wait();
      ivi.beforeMutations(fn);
      raf.flush();
      expect(fn).not.toBeCalled();
    });
  });

  describe("invalidate", () => {
    const root = useDOMElement();
    const t = useTest();

    test("component", () => {
      const render = jest.fn(() => null);
      let cref: Component;
      const C = ivi.component((c) => (cref = c, render));
      t.render(C(), root());
      ivi.invalidate(cref!);
      raf.flush();
      expect(render).toHaveBeenCalledTimes(2);
    });
  });
});
