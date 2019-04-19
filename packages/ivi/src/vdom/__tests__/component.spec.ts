import { useResetDOM, useResetModules, useDOMElement, useIVI, useTest, useComputedValue, useHTML } from "ivi-jest";
import { Op } from "ivi";
import { useDOMOpsCounters, useLifecycleCounters } from "./jest";

useResetDOM();
useResetModules();
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
      describe("shouldUpdate", () => {
        test("props", () => {
          const shouldUpdate = jest.fn(() => true);
          const C = ivi.component(() => () => null, shouldUpdate);

          r(C(1));
          r(C(2));

          expect(shouldUpdate).toBeCalledTimes(1);
          expect(shouldUpdate).toBeCalledWith(1, 2);
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
          expect(unmount).toBeCalledWith(true);
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
        expect(unmount1).toBeCalledWith(true);
        expect(unmount2).toBeCalledTimes(1);
        expect(unmount2).toBeCalledWith(true);
      });
    });

    describe("lifecycle", () => {
      const Static = useComputedValue(() => ivi.component(() => (op: Op) => op, () => false));
      const lifecycle = useLifecycleCounters();
      const createLifecycleTester = (id: string) => (ivi.component<Op>(
        (component) => {
          lifecycle.touch(id, "constructor");
          const mutation = ivi.useMutationEffect(component, () => { lifecycle.touch(id, "mutationEffect"); });
          const layout = ivi.useLayoutEffect(component, () => { lifecycle.touch(id, "layoutEffect"); });
          const effect = ivi.useEffect(component, () => { lifecycle.touch(id, "effect"); });
          ivi.useUnmount(component, () => { lifecycle.touch(id, "unmount"); });
          return (child) => (mutation(), layout(), effect(), lifecycle.touch(id, "render"), child);
        },
        (prev, next) => (lifecycle.touch(id, "shouldUpdate"), true),
      ));

      test("1", () => {
        r(createLifecycleTester("1")(null));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "mutationEffect")).toBe(2);
        expect(lifecycle.get("1", "layoutEffect")).toBe(3);
        expect(lifecycle.get("1", "effect")).toBe(4);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });

      test("2", () => {
        r(createLifecycleTester("1")(null));
        r(null);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "mutationEffect")).toBe(2);
        expect(lifecycle.get("1", "layoutEffect")).toBe(3);
        expect(lifecycle.get("1", "effect")).toBe(4);
        expect(lifecycle.get("1", "unmount")).toBe(5);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);
      });

      test("3", () => {
        r(createLifecycleTester("1")(createLifecycleTester("2")(null)));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("2", "constructor")).toBe(2);
        expect(lifecycle.get("2", "render")).toBe(3);
        expect(lifecycle.get("1", "mutationEffect")).toBe(4);
        expect(lifecycle.get("2", "mutationEffect")).toBe(5);
        expect(lifecycle.get("1", "layoutEffect")).toBe(6);
        expect(lifecycle.get("2", "layoutEffect")).toBe(7);
        expect(lifecycle.get("1", "effect")).toBe(8);
        expect(lifecycle.get("2", "effect")).toBe(9);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);

        expect(lifecycle.get("2", "shouldUpdate")).toBe(-1);
        expect(lifecycle.get("2", "unmount")).toBe(-1);
      });

      test("4", () => {
        r(createLifecycleTester("1")(createLifecycleTester("2")(null)));
        r(null);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("2", "constructor")).toBe(2);
        expect(lifecycle.get("2", "render")).toBe(3);
        expect(lifecycle.get("1", "mutationEffect")).toBe(4);
        expect(lifecycle.get("2", "mutationEffect")).toBe(5);
        expect(lifecycle.get("1", "layoutEffect")).toBe(6);
        expect(lifecycle.get("2", "layoutEffect")).toBe(7);
        expect(lifecycle.get("1", "effect")).toBe(8);
        expect(lifecycle.get("2", "effect")).toBe(9);
        expect(lifecycle.get("2", "unmount")).toBe(10);
        expect(lifecycle.get("1", "unmount")).toBe(11);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);

        expect(lifecycle.get("2", "shouldUpdate")).toBe(-1);
      });

      test("5", () => {
        const lc = createLifecycleTester("1")(null);
        r(lc);
        r(lc);

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "mutationEffect")).toBe(2);
        expect(lifecycle.get("1", "layoutEffect")).toBe(3);
        expect(lifecycle.get("1", "effect")).toBe(4);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);
        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });

      test("6", () => {
        r(Static(createLifecycleTester("1")(null)));
        r(Static(createLifecycleTester("1")(null)));

        expect(lifecycle.get("1", "constructor")).toBe(0);
        expect(lifecycle.get("1", "render")).toBe(1);
        expect(lifecycle.get("1", "mutationEffect")).toBe(2);
        expect(lifecycle.get("1", "layoutEffect")).toBe(3);
        expect(lifecycle.get("1", "effect")).toBe(4);

        expect(lifecycle.get("1", "shouldUpdate")).toBe(-1);

        expect(lifecycle.get("1", "unmount")).toBe(-1);
      });
    });
  });
});
