import {
  useComputedValue, useResetJSDOM, useResetModules, useDOMElement, useDOMOpsCounters, useIVI, useHTML, useTest,
} from "ivi-jest";
import { Op } from "../../operations";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const Component = useComputedValue(() => ivi.component<Op>(() => (ops) => ops));
const r = (op: Op) => t.render(op, c());

describe("fragment", () => {
  describe("mount", () => {
    test("empty", () => {
      r([]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("single child", () => {
      r([h.h1()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("two children", () => {
      r([h.h1(), h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("null between two children", () => {
      r([h.h1(), null, h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    describe("components", () => {
      test("first null", () => {
        r([Component()(null), Component()(h.h1()), Component()(h.h2())]);
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });

      test("last null", () => {
        r([Component()(h.h1()), Component()(h.h2()), Component()(null)]);
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });

      test("null between two children", () => {
        r([Component()(h.h1()), Component()(null), Component()(h.h2())]);
        expect(c()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });
  });

  describe("update", () => {
    test("null to two children", () => {
      r(null);
      r([h.h1(), h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("null to fragment with a hole", () => {
      r(null);
      r([null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("one child to two children", () => {
      r([h.h1()]);
      r([h.h1(), h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("two children to one child", () => {
      r([h.h1(), h.h2()]);
      r([h.h1()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 1", () => {
      r([null, null]);
      r([h.h1(), null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 2", () => {
      r([null, null]);
      r([null, h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 3", () => {
      r([null, null]);
      r([h.h1(), h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 4", () => {
      r([h.h1(), null]);
      r([null, null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 5", () => {
      r([null, h.h2()]);
      r([null, null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 6", () => {
      r([h.h1(), h.h2()]);
      r([null, null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 7", () => {
      r([h.h1(), null]);
      r([null, h.h2()]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("hole 8", () => {
      r([null, h.h2()]);
      r([h.h1(), null]);
      expect(c()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });
  });
});
