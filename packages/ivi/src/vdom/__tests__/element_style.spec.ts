import { useResetDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useSVG, useTest } from "ivi-jest";

useResetDOM();
useResetModules();
const setProperty = useSpyOn(() => CSSStyleDeclaration.prototype, "setProperty");
const removeProperty = useSpyOn(() => CSSStyleDeclaration.prototype, "removeProperty");
const c = useDOMElement();
const t = useTest();
const _ = void 0;

describe("element style", () => {
  describe("HTML", () => {
    const h = useHTML();
    const r = (style?: {}) => t.render<HTMLElement>(h.div(_, { style }), c()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("empty style object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("property with undefined value", () => {
        expect(r({ top: void 0 })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("one property", () => {
        expect(r({ top: "10px" })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("two properties", () => {
        expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
        expect(removeProperty.mock.calls).toEqual([]);
      });
    });

    describe("update", () => {
      describe("undefined to", () => {
        beforeEach(() => {
          r();
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("empty style object to", () => {
        beforeEach(() => {
          r({});
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("property with undefined value", () => {
        beforeEach(() => {
          r({ top: void 0 });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("one property", () => {
        beforeEach(() => {
          r({ top: "10px" });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("property with same value", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with different value", () => {
          expect(r({ top: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("different property", () => {
          expect(r({ left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("two properties", () => {
        beforeEach(() => {
          r({ top: "10px", left: "20px" });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("properties with same values", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("properties with different values", () => {
          expect(r({ top: "30px", left: "40px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "30px"], ["left", "40px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property with same value", () => {
          expect(r({ left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("one property with different value", () => {
          expect(r({ left: "30px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "30px"]]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });
      });
    });
  });

  describe("SVG", () => {
    const s = useSVG();
    const r = (style?: {}) => t.render<SVGElement>(s.circle(_, { style }), c()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        expect(r()).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("empty style object", () => {
        expect(r({})).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("property with undefined value", () => {
        expect(r({ top: void 0 })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("one property", () => {
        expect(r({ top: "10px" })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
        expect(removeProperty.mock.calls).toEqual([]);
      });

      test("two properties", () => {
        expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
        expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
        expect(removeProperty.mock.calls).toEqual([]);
      });
    });

    describe("update", () => {
      describe("undefined to", () => {
        beforeEach(() => {
          r();
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("empty style object to", () => {
        beforeEach(() => {
          r({});
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("property with undefined value", () => {
        beforeEach(() => {
          r({ top: void 0 });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("one property", () => {
        beforeEach(() => {
          r({ top: "10px" });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("property with same value", () => {
          expect(r({ top: "10px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("property with different value", () => {
          expect(r({ top: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("different property", () => {
          expect(r({ left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("two properties", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "20px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });
      });

      describe("two properties", () => {
        beforeEach(() => {
          r({ top: "10px", left: "20px" });
          setProperty.mockClear();
          removeProperty.mockClear();
        });

        test("undefined", () => {
          expect(r()).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("empty style object", () => {
          expect(r({})).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("property with undefined value", () => {
          expect(r({ top: void 0 })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"], ["left"]]);
        });

        test("properties with same values", () => {
          expect(r({ top: "10px", left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("properties with different values", () => {
          expect(r({ top: "30px", left: "40px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["top", "30px"], ["left", "40px"]]);
          expect(removeProperty.mock.calls).toEqual([]);
        });

        test("one property with same value", () => {
          expect(r({ left: "20px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });

        test("one property with different value", () => {
          expect(r({ left: "30px" })).toMatchSnapshot();
          expect(setProperty.mock.calls).toEqual([["left", "30px"]]);
          expect(removeProperty.mock.calls).toEqual([["top"]]);
        });
      });
    });
  });
});
