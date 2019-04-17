import { useResetJSDOM, useResetModules, useDOMElement, useIVI, useTest, useComputedValue, useHTML } from "ivi-jest";
import { Op } from "ivi";
import { useDOMOpsCounters, useLifecycleCounters } from "./jest";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const r = (op: Op) => t.render(op, c()).domNode;
const Stateful = useComputedValue(() => ivi.component(() => (op: Op) => op));
const Static = useComputedValue(() => ivi.component(() => (op: Op) => op, () => false));

describe("component", () => {
  describe("mount", () => {
    test("null root node", () => {
      const n = r(Stateful()(null));
      expect(n).toMatchSnapshot();
    });

    test("basic root node", () => {
      const n = r(Stateful()(123));
      expect(n).toMatchSnapshot();
    });

    test("component root node", () => {
      const n = r(Stateful()(Stateful()(123)));
      expect(n).toMatchSnapshot();
    });

    test("fragment root node", () => {
      const n = r(Stateful()([1, 2, 3]));
      expect(n).toMatchSnapshot();
    });
  });

  describe("update", () => {
    describe("root node", () => {
      test("1", () => {
        const a = r(h.div());
        const b = r(Stateful()(h.div()));
        expect(b).toMatchSnapshot();
        expect(a).not.toBe(b);
        expect(domOps()).toMatchSnapshot();
      });

      test("2", () => {
        const a = r(Stateful()(h.div()));
        const b = r(h.div());
        expect(b).toMatchSnapshot();
        expect(a).not.toBe(b);
        expect(domOps()).toMatchSnapshot();
      });

      test("3", () => {
        const a = r(Stateful()(h.div()));
        const b = r(Stateful()(h.div()));
        expect(b).toMatchSnapshot();
        expect(a).toBe(b);
        expect(domOps()).toMatchSnapshot();
      });

      test("4", () => {
        const a = r(Stateful()(null));
        const b = r(Stateful()(h.div()));
        expect(b).toMatchSnapshot();
        expect(a).not.toBe(b);
        expect(domOps()).toMatchSnapshot();
      });

      test("5", () => {
        const a = r(Stateful()(h.div()));
        const b = r(Stateful()(null));
        expect(b).toMatchSnapshot();
        expect(a).not.toBe(b);
        expect(domOps()).toMatchSnapshot();
      });

      test("6", () => {
        const root = h.div();
        const a = r(Stateful()(root));
        const b = r(Stateful()(root));
        expect(b).toMatchSnapshot();
        expect(a).toBe(b);
        expect(domOps()).toMatchSnapshot();
      });
    });

    describe("move", () => {
      test("1", () => {
        r(ivi.TrackByKey([
          ivi.key(0, Stateful()(0)),
          ivi.key(1, Stateful()(1)),
        ]));
        r(ivi.TrackByKey([
          ivi.key(1, Stateful()(1)),
          ivi.key(0, Stateful()(0)),
        ]));
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });

      test("2", () => {
        const c0 = Stateful()(0);
        const c1 = Stateful()(1);
        r(ivi.TrackByKey([
          ivi.key(0, c0),
          ivi.key(1, c1),
        ]));
        r(ivi.TrackByKey([
          ivi.key(1, c1),
          ivi.key(0, c0),
        ]));
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });

      test("3", () => {
        const c0 = Stateful()(0);
        const c1 = Stateful()(null);
        r(ivi.TrackByKey([
          ivi.key(0, c0),
          ivi.key(1, c1),
        ]));
        r(ivi.TrackByKey([
          ivi.key(1, c1),
          ivi.key(0, c0),
        ]));
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });
  });

  describe("hooks", () => {
    describe("shouldUpdate", () => {
      test("props", () => {
        const shouldUpdate = jest.fn(() => true);
        const component = ivi.component(() => () => null, shouldUpdate);

        r(component(1));
        r(component(2));

        expect(shouldUpdate.mock.calls).toEqual([[1, 2]]);
      });
    });
  });

  describe("lifecycle", () => {
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
      r(Static()(createLifecycleTester("1")(null)));
      r(Static()(createLifecycleTester("1")(null)));

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
