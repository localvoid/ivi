import { useResetDOM, useDOMElement, useIVI, useHTML, useTest, useComputedValue } from "ivi-jest";
import { Op } from "ivi";
import { useDOMOpsCounters } from "./jest";

useResetDOM();
const root = useDOMElement();
const domOps = useDOMOpsCounters();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;
const i = (n: number) => ivi.key(n, n);
const k = (...is: number[]) => ivi.TrackByKey(is.map(i));

describe("TrackByKey", () => {
  describe("errors", () => {
    test("unique keys", () => {
      expect(() => { ivi.TrackByKey([ivi.key(0, 0), ivi.key(0, 1)]); }).toThrowError("key");
    });
  });

  describe("mount", () => {
    const r = (...a: number[]) => t.render(h.div(_, _, k(...a)), root()).domNode;

    test("empty", () => {
      expect(r()).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("one item", () => {
      expect(r(1)).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });

    test("three items", () => {
      expect(r(1, 2, 3)).toMatchSnapshot();
      expect(domOps()).toMatchSnapshot();
    });
  });

  describe("update", () => {
    describe("general", () => {
      const r = (a: number[], b: number[]) => {
        t.render(h.div(_, _, k(...a)), root());
        return t.render(h.div(_, _, k(...b)), root()).domNode;
      };
      describe("insert and remove", () => {
        test("1", () => {
          expect(r([], [])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          expect(r([0], [0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          expect(r([0], [1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          expect(r([0, 1, 2], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          expect(r([], [0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          expect(r([0], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("7", () => {
          expect(r([0], [1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("8", () => {
          expect(r([0], [0, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("9", () => {
          expect(r([0], [1, 2, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("10", () => {
          expect(r([0], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("11", () => {
          expect(r([0], [1, 0, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("12", () => {
          expect(r([2], [0, 1, 2, 3, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("13", () => {
          expect(r([1, 2], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("14", () => {
          expect(r([0, 1], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("15", () => {
          expect(r([0, 2], [0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("16", () => {
          expect(r([2, 3], [0, 1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("17", () => {
          expect(r([0, 1], [0, 1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("18", () => {
          expect(r([1, 2], [0, 1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("19", () => {
          expect(r([1, 3], [0, 1, 2, 3, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("20", () => {
          expect(r([2, 5], [0, 1, 2, 3, 4, 5, 6, 7])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("21", () => {
          expect(r([1, 3], [0, 1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("22", () => {
          expect(r([0, 2], [0, 1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("23", () => {
          expect(r([2, 5], [0, 1, 2, 3, 4, 5])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("24", () => {
          expect(r([0, 3], [0, 1, 2, 3, 4, 5])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("25", () => {
          expect(r([0], [])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("26", () => {
          expect(r([0, 1], [1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("27", () => {
          expect(r([0, 1], [0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("28", () => {
          expect(r([0, 1, 2], [1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("29", () => {
          expect(r([0, 1, 2], [0, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("30", () => {
          expect(r([0, 1, 2], [0, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("31", () => {
          expect(r([0, 1], [])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("32", () => {
          expect(r([0, 1, 2], [2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("33", () => {
          expect(r([0, 1, 2], [0, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("34", () => {
          expect(r([0, 1, 2, 3], [2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("35", () => {
          expect(r([0, 1, 2, 3], [0, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("36", () => {
          expect(r([0, 1, 2, 3], [1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("37", () => {
          expect(r([0, 1, 2, 3], [0, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("38", () => {
          expect(r([0, 1, 2, 3, 4, 5], [0, 1, 2, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("39", () => {
          expect(r([0], [1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("40", () => {
          expect(r([0, 1], [2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("41", () => {
          expect(r([0, 2], [1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("42", () => {
          expect(r([0, 2], [2, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("43", () => {
          expect(r([0, 1, 2], [3, 4, 5])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("44", () => {
          expect(r([0, 1, 2], [2, 4, 5])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("45", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 7, 8, 9])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("46", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 4, 8])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("47", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 7, 3, 8])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("move", () => {
        test("1", () => {
          expect(r([0, 1], [1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          expect(r([0, 1, 2, 3], [3, 2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          expect(r([0, 1, 2, 3], [0, 2, 3, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          expect(r([0, 1, 2, 3], [3, 0, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          expect(r([0, 1, 2, 3], [1, 0, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          expect(r([0, 1, 2, 3], [2, 0, 1, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("7", () => {
          expect(r([0, 1, 2, 3], [0, 1, 3, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("8", () => {
          expect(r([0, 1, 2, 3], [0, 2, 3, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("9", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6], [2, 1, 0, 3, 4, 5, 6])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("10", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6], [0, 3, 4, 1, 2, 5, 6])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("11", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6], [0, 2, 3, 5, 6, 1, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("12", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6], [0, 1, 5, 3, 2, 4, 6])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("13", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 1, 3, 4, 5, 6, 0, 7, 2, 9])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("14", () => {
          expect(r([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 5, 0, 7, 1, 2, 3, 4, 6, 8])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("insert, remove and move", () => {
        test("1", () => {
          expect(r([0, 1], [2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          expect(r([0, 1], [1, 0, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          expect(r([0, 1, 2], [3, 0, 2, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          expect(r([0, 1, 2], [0, 2, 1, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          expect(r([0, 1, 2], [0, 2, 3, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          expect(r([0, 1, 2], [1, 2, 3, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("7", () => {
          expect(r([0, 1, 2, 3, 4], [5, 4, 3, 2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("8", () => {
          expect(r([0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("9", () => {
          expect(r([0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0, 7])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("10", () => {
          expect(r([0, 1, 2], [1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("11", () => {
          expect(r([2, 0, 1], [1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("12", () => {
          expect(r([7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 8, 3, 2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("13", () => {
          expect(r([7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 8, 3, 2, 1, 0, 9])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("14", () => {
          expect(r([7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 3, 2, 1, 0, 9])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("15", () => {
          expect(r([7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0, 9])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("16", () => {
          expect(r([7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("17", () => {
          expect(r([0, 1, 2], [2, 3, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("18", () => {
          expect(r([0, 1, 2], [3, 2, 1])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("19", () => {
          expect(r([0, 1, 2], [2, 1, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("20", () => {
          expect(r([0, 1, 2], [3, 1, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("21", () => {
          expect(r([0, 1, 2], [1, 2, 3])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("22", () => {
          expect(r([0, 1, 2], [1, 3, 2])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("23", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 1, 3, 2, 4, 7])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("24", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("25", () => {
          expect(r([0, 1, 2, 3, 4, 5], [6, 7, 3, 2, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("26", () => {
          expect(r([0, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4])).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });
    });

    describe("nested", () => {
      const r = (op: Op) => t.render(op, root()).domNode;

      test("1", () => {
        r(ivi.TrackByKey([ivi.key(0, k(1, 2)), ivi.key(1, k(3, 4))]));
        r(ivi.TrackByKey([ivi.key(1, k(3, 4)), ivi.key(0, k(1, 2))]));
        expect(root()).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });

    describe("holes", () => {
      const r = (op: Op) => t.render(op, root()).domNode;

      describe("text", () => {
        const v = (key: number, value?: Op) => ivi.key(key, value === void 0 ? key : value);

        test("1", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("elements", () => {
        const v = (key: number, value?: Op) => (
          ivi.key(key, value === void 0 ? h.div(_, _, key) : value === null ? null : h.div(_, _, value))
        );

        test("1", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("components", () => {
        const Component = useComputedValue(() => ivi.component<Op>((c) => (op) => op));
        const v = (key: number, value?: Op) => ivi.key(key, Component(value === void 0 ? key : value));

        test("1", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("static components", () => {
        const Component = useComputedValue(() => ivi.component<Op>((c) => (op) => op, () => false));
        const v = (key: number, value?: Op) => (
          ivi.key(key, value === void 0 ? Component(key) : value === null ? null : Component(value))
        );

        test("1", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });

      describe("fragments with nested components", () => {
        const Nested = useComputedValue(() => ivi.component<Op>((c) => (op) => op, () => false));
        const Component = useComputedValue(() => ivi.component<Op>(
          (c) => (op) => ([h.div(_, _, Nested(op)), Nested(op)]),
          () => false,
        ));
        const v = (key: number, value?: Op) => (
          ivi.key(key, value === void 0 ? Component(key) : value === null ? null : Component(value))
        );

        test("1", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("2", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("3", () => {
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("4", () => {
          r(ivi.TrackByKey([v(4), v(3), v(2), v(1), v(0, null)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("5", () => {
          r(ivi.TrackByKey([v(4), v(3), v(0, null), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });

        test("6", () => {
          r(ivi.TrackByKey([v(0, null), v(4), v(3), v(2), v(1)]));
          r(ivi.TrackByKey([v(0), v(1), v(2), v(3), v(4)]));
          expect(root()).toMatchSnapshot();
          expect(domOps()).toMatchSnapshot();
        });
      });
    });
  });
});
