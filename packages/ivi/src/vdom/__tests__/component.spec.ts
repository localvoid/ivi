import { useResetDOM, useDOMElement, useIVI, useTest, useComputedValue, useHTML, useMockFn } from "ivi-jest";
import { Op } from "ivi";
import { useDOMOpsCounters, useLifecycleCounters } from "./jest";

useResetDOM();
const root = useDOMElement();
const domOps = useDOMOpsCounters();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const r = (op: Op) => t.render(op, root()).domNode;

describe("component", () => {
  describe("stateless", () => {
    const Component = useComputedValue(() => ivi.statelessComponent((op: Op) => op));

    describe("mount", () => {
      test("null root node", () => {
        const n = r(Component(null));
        expect(n).toMatchSnapshot();
      });

      test("basic root node", () => {
        const n = r(Component(123));
        expect(n).toMatchSnapshot();
      });

      test("component root node", () => {
        const n = r(Component(Component(123)));
        expect(n).toMatchSnapshot();
      });

      test("fragment root node", () => {
        const n = r(Component([1, 2, 3]));
        expect(n).toMatchSnapshot();
      });
    });

    describe("update", () => {
      describe("root node", () => {
        test("1", () => {
          const a = r(h.div());
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          const a = r(Component(h.div()));
          const b = r(h.div());
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          const a = r(Component(h.div()));
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          const a = r(Component(null));
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          const a = r(Component(h.div()));
          const b = r(Component(null));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          const n = h.div();
          const a = r(Component(n));
          const b = r(Component(n));
          expect(b).toMatchSnapshot();
          expect(a).toBe(b);
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("move", () => {
        test("1", () => {
          r(ivi.TrackByKey([
            ivi.key(0, Component(0)),
            ivi.key(1, Component(1)),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, Component(1)),
            ivi.key(0, Component(0)),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          const c0 = Component(0);
          const c1 = Component(1);
          r(ivi.TrackByKey([
            ivi.key(0, c0),
            ivi.key(1, c1),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, c1),
            ivi.key(0, c0),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          const c0 = Component(0);
          const c1 = Component(null);
          r(ivi.TrackByKey([
            ivi.key(0, c0),
            ivi.key(1, c1),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, c1),
            ivi.key(0, c0),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });
    });
  });

  describe("stateful", () => {
    const Component = useComputedValue(() => ivi.component(() => (op: Op) => op));

    describe("mount", () => {
      test("null root node", () => {
        const n = r(Component(null));
        expect(n).toMatchSnapshot();
      });

      test("basic root node", () => {
        const n = r(Component(123));
        expect(n).toMatchSnapshot();
      });

      test("component root node", () => {
        const n = r(Component(Component(123)));
        expect(n).toMatchSnapshot();
      });

      test("fragment root node", () => {
        const n = r(Component([1, 2, 3]));
        expect(n).toMatchSnapshot();
      });
    });

    describe("update", () => {
      describe("root node", () => {
        test("1", () => {
          const a = r(h.div());
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          const a = r(Component(h.div()));
          const b = r(h.div());
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          const a = r(Component(h.div()));
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          const a = r(Component(null));
          const b = r(Component(h.div()));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          const a = r(Component(h.div()));
          const b = r(Component(null));
          expect(b).toMatchSnapshot();
          expect(a).not.toBe(b);
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          const n = h.div();
          const a = r(Component(n));
          const b = r(Component(n));
          expect(b).toMatchSnapshot();
          expect(a).toBe(b);
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("move", () => {
        test("1", () => {
          r(ivi.TrackByKey([
            ivi.key(0, Component(0)),
            ivi.key(1, Component(1)),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, Component(1)),
            ivi.key(0, Component(0)),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          const c0 = Component(0);
          const c1 = Component(1);
          r(ivi.TrackByKey([
            ivi.key(0, c0),
            ivi.key(1, c1),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, c1),
            ivi.key(0, c0),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          const c0 = Component(0);
          const c1 = Component(null);
          r(ivi.TrackByKey([
            ivi.key(0, c0),
            ivi.key(1, c1),
          ]));
          r(ivi.TrackByKey([
            ivi.key(1, c1),
            ivi.key(0, c0),
          ]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });
    });

    describe("hooks", () => {
      describe("areEqual", () => {
        test("different props", () => {
          const areEqual = jest.fn(() => false);
          const C = ivi.component(() => (p: number) => null, areEqual);

          r(C(1));
          r(C(2));

          expect(areEqual).toBeCalledTimes(1);
          expect(areEqual).toBeCalledWith(1, 2);
        });

        test("identical props", () => {
          const value = {};
          const areEqual = jest.fn(() => false);
          const C = ivi.component(() => (p: {}) => null, areEqual);

          r(C(value));
          r(C(value));

          expect(areEqual).not.toBeCalled();
        });
      });

      describe("useUnmount", () => {
        test("one hook", () => {
          const unmount = jest.fn();
          const C = ivi.component((c) => {
            ivi.useUnmount(c, unmount);
            return () => null;
          });
          r(C());
          r(null);
          expect(unmount).toBeCalledTimes(1);
          expect(unmount).toBeCalledWith(ivi.UNMOUNT_TOKEN);
        });
      });

      test("two hooks", () => {
        const unmount1 = jest.fn();
        const unmount2 = jest.fn();
        const C = ivi.component((c) => {
          ivi.useUnmount(c, unmount1);
          ivi.useUnmount(c, unmount2);
          return () => null;
        });
        r(C());
        r(null);
        expect(unmount1).toBeCalledTimes(1);
        expect(unmount1).toBeCalledWith(ivi.UNMOUNT_TOKEN);
        expect(unmount2).toBeCalledTimes(1);
        expect(unmount2).toBeCalledWith(ivi.UNMOUNT_TOKEN);
      });

      test("three hooks", () => {
        const unmount1 = jest.fn();
        const unmount2 = jest.fn();
        const unmount3 = jest.fn();
        const C = ivi.component((c) => {
          ivi.useUnmount(c, unmount1);
          ivi.useUnmount(c, unmount2);
          ivi.useUnmount(c, unmount3);
          return () => null;
        });
        r(C());
        r(null);
        expect(unmount1).toBeCalledTimes(1);
        expect(unmount1).toBeCalledWith(ivi.UNMOUNT_TOKEN);
        expect(unmount2).toBeCalledTimes(1);
        expect(unmount2).toBeCalledWith(ivi.UNMOUNT_TOKEN);
        expect(unmount1).toBeCalledTimes(1);
        expect(unmount1).toBeCalledWith(ivi.UNMOUNT_TOKEN);
      });
    });

    describe("useEffect", () => {
      test("update value", () => {
        const effector = jest.fn();
        const C = ivi.component<number>((c) => {
          const effect = ivi.useEffect<number>(c, effector);
          return (n) => (effect(n), null);
        });
        r(C(1));
        r(C(2));
        expect(effector).toBeCalledTimes(2);
        expect(effector).toHaveBeenNthCalledWith(1, 1);
        expect(effector).toHaveBeenNthCalledWith(2, 2);
      });

      test("update with identical value", () => {
        const value = {};
        const effector = jest.fn();
        const C = ivi.component<{ value: {} }>((c) => {
          const effect = ivi.useEffect<{}>(c, effector);
          return (n) => (effect(n.value), null);
        });
        r(C({ value }));
        r(C({ value }));
        expect(effector).toBeCalledTimes(1);
        expect(effector).toBeCalledWith(value);
      });

      test("areEqual false", () => {
        const v1 = {};
        const v2 = {};
        const effector = jest.fn();
        const areEqual = jest.fn().mockReturnValue(false);
        const C = ivi.component<{ value: {} }>((c) => {
          const effect = ivi.useEffect<{}>(c, effector, areEqual);
          return (n) => (effect(n.value), null);
        });
        r(C({ value: v1 }));
        r(C({ value: v2 }));
        expect(areEqual).toBeCalledTimes(1);
        expect(areEqual).toBeCalledWith(v1, v2);
        expect(effector).toBeCalledTimes(2);
        expect(effector).toHaveBeenNthCalledWith(1, v1);
        expect(effector).toHaveBeenNthCalledWith(2, v2);
      });

      test("areEqual true", () => {
        const v1 = {};
        const v2 = {};
        const effector = jest.fn();
        const areEqual = jest.fn().mockReturnValue(true);
        const C = ivi.component<{ value: {} }>((c) => {
          const effect = ivi.useEffect<{}>(c, effector, areEqual);
          return (n) => (effect(n.value), null);
        });
        r(C({ value: v1 }));
        r(C({ value: v2 }));
        expect(areEqual).toBeCalledTimes(1);
        expect(areEqual).toBeCalledWith(v1, v2);
        expect(effector).toBeCalledTimes(1);
        expect(effector).toBeCalledWith(v1);
      });

      test("cleanup", () => {
        const cleanup = jest.fn();
        const C = ivi.component((c) => {
          const effect = ivi.useEffect(c, () => cleanup);
          return () => (effect(), null);
        });
        r(C());
        r(null);
        expect(cleanup).toBeCalledTimes(1);
      });
    });

    describe("useSelect", () => {
      describe("render", () => {
        const selector = useMockFn((fn) => { fn.mockImplementation((v) => v); });

        test("return value", () => {
          const C = ivi.component<number>((c) => {
            const select = ivi.useSelect<number, number>(c, selector);
            return (i) => select(i);
          });
          expect(r(C(1))).toMatchSnapshot();
        });

        test("update value", () => {
          const C = ivi.component<number>((c) => {
            const select = ivi.useSelect<number, number>(c, selector);
            return (i) => (select(i), null);
          });
          r(C(1));
          r(C(2));
          expect(selector).toBeCalledTimes(2);
          expect(selector).toHaveBeenNthCalledWith(1, 1, void 0);
          expect(selector).toHaveBeenNthCalledWith(2, 2, void 0);
        });

        test("update with identical value", () => {
          const value = {};
          const C = ivi.component<{ value: {} }>((c) => {
            const select = ivi.useSelect<{}, {}>(c, selector);
            return (n) => (select(n.value), null);
          });
          r(C({ value }));
          r(C({ value }));
          expect(selector).toBeCalledTimes(2);
          expect(selector).toHaveBeenNthCalledWith(1, value, void 0);
          expect(selector).toHaveBeenNthCalledWith(2, value, value);
        });

        test("areEqual false", () => {
          const v1 = {};
          const v2 = {};
          const areEqual = jest.fn().mockReturnValue(false);
          const C = ivi.component<{ value: {} }>((c) => {
            const select = ivi.useSelect<{}, {}>(c, selector, areEqual);
            return (n) => (select(n.value), null);
          });
          r(C({ value: v1 }));
          r(C({ value: v2 }));
          expect(areEqual).toBeCalledTimes(1);
          expect(areEqual).toBeCalledWith(v1, v2);
          expect(selector).toBeCalledTimes(2);
          expect(selector).toHaveBeenNthCalledWith(1, v1, void 0);
          expect(selector).toHaveBeenNthCalledWith(2, v2, void 0);
        });

        test("areEqual true", () => {
          const v1 = {};
          const v2 = {};
          const areEqual = jest.fn().mockReturnValue(true);
          const C = ivi.component<{ value: {} }>((c) => {
            const select = ivi.useSelect<{}, {}>(c, selector, areEqual);
            return (n) => (select(n.value), null);
          });
          r(C({ value: v1 }));
          r(C({ value: v2 }));
          expect(areEqual).toBeCalledTimes(1);
          expect(areEqual).toBeCalledWith(v1, v2);
          expect(selector).toBeCalledTimes(2);
          expect(selector).toHaveBeenNthCalledWith(1, v1, void 0);
          expect(selector).toHaveBeenNthCalledWith(2, v2, v1);
        });
      });

      describe("dirty checking", () => {
        test("one selector", () => {
          const selector = jest.fn((v) => v);
          const C = ivi.component<number>((c) => {
            const select = ivi.useSelect<number, number>(c, selector);
            return (n) => (select(n), null);
          });
          r(C(1));
          t.dirtyCheck();
          expect(selector).toBeCalledTimes(2);
          expect(selector).toHaveBeenNthCalledWith(1, 1, void 0);
          expect(selector).toHaveBeenNthCalledWith(2, 1, 1);
        });

        test("two selectors", () => {
          const selector1 = jest.fn((v) => v);
          const selector2 = jest.fn((v) => v);
          let render;
          const C = ivi.component<number>((c) => {
            const select1 = ivi.useSelect<number, number>(c, selector1);
            const select2 = ivi.useSelect<number, number>(c, selector2);
            return render = jest.fn((n) => (select1(n), select2(n + 1), null));
          });
          r(C(1));
          t.dirtyCheck();
          expect(render).toBeCalledTimes(1);
          expect(selector1).toBeCalledTimes(2);
          expect(selector1).toHaveBeenNthCalledWith(1, 1, void 0);
          expect(selector1).toHaveBeenNthCalledWith(2, 1, 1);
          expect(selector2).toBeCalledTimes(2);
          expect(selector2).toHaveBeenNthCalledWith(1, 2, void 0);
          expect(selector2).toHaveBeenNthCalledWith(2, 2, 2);
        });

        test("two dirty selectors", () => {
          let i = 1;
          const selector1 = jest.fn((v) => v + i++);
          const selector2 = jest.fn((v) => v + i++);
          let render;
          const C = ivi.component<number>((c) => {
            const select1 = ivi.useSelect<number, number>(c, selector1);
            const select2 = ivi.useSelect<number, number>(c, selector2);
            return render = jest.fn((n) => (select1(n), select2(n + 1), null));
          });
          r(C(1));
          t.dirtyCheck();
          expect(render).toBeCalledTimes(2);
          expect(selector1).toBeCalledTimes(2);
          expect(selector1).toHaveBeenNthCalledWith(1, 1, void 0);
          expect(selector1).toHaveBeenNthCalledWith(2, 1, 2);
          expect(selector2).toBeCalledTimes(2);
          expect(selector2).toHaveBeenNthCalledWith(1, 2, void 0);
          expect(selector2).toHaveBeenNthCalledWith(2, 2, 4);
        });
      });
    });

    describe("lifecycle", () => {
      const Static = useComputedValue(() => ivi.component(() => (op: Op) => op, () => true));
      const lifecycle = useLifecycleCounters();
      const createLifecycleTester = (id: string) => (ivi.component<Op>(
        (component) => {
          lifecycle.touch(id, "constructor");
          const mutation = ivi.useMutationEffect(component, () => { lifecycle.touch(id, "mutationEffect"); });
          const layout = ivi.useLayoutEffect(component, () => { lifecycle.touch(id, "layoutEffect"); });
          const effect = ivi.useEffect(component, () => { lifecycle.touch(id, "effect"); });
          ivi.useUnmount(component, () => { lifecycle.touch(id, "unmount"); });
          return (child) => (lifecycle.touch(id, "render"), mutation(), layout(), effect(), child);
        },
        (prev, next) => (lifecycle.touch(id, "areEqual"), false),
      ));

      test("1", () => {
        r(createLifecycleTester("1")(null));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("1", "mutationEffect")).toBe(3);
        expect(lifecycle.get("1", "layoutEffect")).toBe(4);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });

      test("2", () => {
        r(createLifecycleTester("1")(null));
        r(null);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("1", "mutationEffect")).toBe(3);
        expect(lifecycle.get("1", "layoutEffect")).toBe(4);
        expect(lifecycle.get("1", "unmount")).toBe(5);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);
      });

      test("3", () => {
        r(createLifecycleTester("1")(createLifecycleTester("2")(null)));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("2", "constructor")).toBe(3);
        expect(lifecycle.get("2", "render")).toBe(4);
        expect(lifecycle.get("2", "effect")).toBe(5);
        expect(lifecycle.get("1", "mutationEffect")).toBe(6);
        expect(lifecycle.get("2", "mutationEffect")).toBe(7);
        expect(lifecycle.get("1", "layoutEffect")).toBe(8);
        expect(lifecycle.get("2", "layoutEffect")).toBe(9);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);

        expect(lifecycle.get("2", "areEqual")).toBe(-1);
        expect(lifecycle.get("2", "unmount")).toBe(-1);
      });

      test("4", () => {
        r(createLifecycleTester("1")(createLifecycleTester("2")(null)));
        r(null);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("2", "constructor")).toBe(3);
        expect(lifecycle.get("2", "render")).toBe(4);
        expect(lifecycle.get("2", "effect")).toBe(5);
        expect(lifecycle.get("1", "mutationEffect")).toBe(6);
        expect(lifecycle.get("2", "mutationEffect")).toBe(7);
        expect(lifecycle.get("1", "layoutEffect")).toBe(8);
        expect(lifecycle.get("2", "layoutEffect")).toBe(9);
        expect(lifecycle.get("2", "unmount")).toBe(10);
        expect(lifecycle.get("1", "unmount")).toBe(11);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);

        expect(lifecycle.get("2", "areEqual")).toBe(-1);
      });

      test("5", () => {
        const lc = createLifecycleTester("1")(null);
        r(lc);
        r(lc);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("1", "mutationEffect")).toBe(3);
        expect(lifecycle.get("1", "layoutEffect")).toBe(4);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });

      test("6", () => {
        r(Static(createLifecycleTester("1")(null)));
        r(Static(createLifecycleTester("1")(null)));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "effect")).toBe(2);
        expect(lifecycle.get("1", "mutationEffect")).toBe(3);
        expect(lifecycle.get("1", "layoutEffect")).toBe(4);

        expect(lifecycle.get("1", "areEqual")).toBe(-1);

        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });
    });
  });
});
