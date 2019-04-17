import { useResetDOM, useResetModules, useDOMElement, useHTML, useTest } from "ivi-jest";

useResetDOM();
useResetModules();
const c = useDOMElement();
const h = useHTML();
const t = useTest();
const _ = void 0;
const DIRECTIVE = <T>(v: T) => ({ v, u: jest.fn() });
const r = (attrs?: {}) => t.render<HTMLElement>(h.div(_, attrs), c()).domNode!;

describe("attribute directive", () => {
  test("mount", () => {
    const directive = DIRECTIVE("abc");
    const n = r({ directive });
    expect(directive.u.mock.calls).toEqual([[n, "directive", void 0, "abc"]]);
  });

  describe("update", () => {
    test("from undefined", () => {
      const directive = DIRECTIVE("abc");
      r();
      const n = r({ directive });
      expect(directive.u.mock.calls).toEqual([[n, "directive", void 0, "abc"]]);
    });

    test("to undefined", () => {
      const directive = DIRECTIVE("abc");
      r({ directive });
      const n = r();
      expect(directive.u.mock.calls).toEqual([
        [n, "directive", void 0, "abc"],
        [n, "directive", "abc", void 0],
      ]);
    });

    test("to strictly equal directive", () => {
      const directive = DIRECTIVE("abc");
      r({ directive });
      const n = r({ directive });
      expect(directive.u.mock.calls).toEqual([
        [n, "directive", void 0, "abc"],
        [n, "directive", "abc", "abc"],
      ]);
    });

    test("to different directive", () => {
      const a = DIRECTIVE("a");
      const b = DIRECTIVE("b");

      r({ directive: a });
      const n = r({ directive: b });
      expect(a.u.mock.calls).toEqual([[n, "directive", void 0, "a"]]);
      expect(b.u.mock.calls).toEqual([[n, "directive", "a", "b"]]);
    });

    describe("invalid transitions", () => {
      test("transition from basic value to attribute directive", () => {
        r({ directive: "abc" });
        expect(() => { r({ directive: DIRECTIVE(_) }); }).toThrowError();
      });

      test("transition from attribute directive to basic value", () => {
        r({ directive: DIRECTIVE(_) });
        expect(() => { r({ directive: "abc" }); }).toThrowError();
      });
    });
  });
});
