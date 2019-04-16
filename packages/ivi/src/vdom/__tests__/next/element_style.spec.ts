import { useResetJSDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useSVG, useTest } from "ivi-jest";

useResetJSDOM();
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
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("empty style object", () => {
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("property with undefined value", () => {
        const n = r({ top: void 0 });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("one property", () => {
        const n = r({ top: "10px" });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("two properties", () => {
        const n = r({ top: "10px", left: "20px" });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
        expect(removeProperty().mock.calls).toEqual([]);
      });
    });

    describe("update", () => {
      describe("undefined to", () => {
        const initialState = void 0;

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("empty style object to", () => {
        const initialState = {};

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("property with undefined value", () => {
        const initialState = { top: void 0 };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("one property", () => {
        const initialState = { top: "10px" };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("property with same value", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with different value", () => {
          r(initialState);
          const n = r({ top: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["top", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("different property", () => {
          r(initialState);
          const n = r({ left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("two properties", () => {
        const initialState = { top: "10px", left: "20px" };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("properties with same values", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("properties with different values", () => {
          r(initialState);
          const n = r({ top: "30px", left: "40px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([
            ["top", "10px"], ["left", "20px"],
            ["top", "30px"], ["left", "40px"],
          ]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property with same value", () => {
          r(initialState);
          const n = r({ left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("one property with different value", () => {
          r(initialState);
          const n = r({ left: "30px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"], ["left", "30px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });
      });
    });
  });

  describe("SVG", () => {
    const s = useSVG();
    const r = (style?: {}) => t.render<SVGElement>(s.circle(_, { style }), c()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        const n = r();
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("empty style object", () => {
        const n = r({});
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("property with undefined value", () => {
        const n = r({ top: void 0 });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("one property", () => {
        const n = r({ top: "10px" });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
        expect(removeProperty().mock.calls).toEqual([]);
      });

      test("two properties", () => {
        const n = r({ top: "10px", left: "20px" });
        expect(n).toMatchSnapshot();
        expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
        expect(removeProperty().mock.calls).toEqual([]);
      });
    });

    describe("update", () => {
      describe("undefined to", () => {
        const initialState = void 0;

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("empty style object to", () => {
        const initialState = {};

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("property with undefined value", () => {
        const initialState = { top: void 0 };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("one property", () => {
        const initialState = { top: "10px" };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("property with same value", () => {
          r(initialState);
          const n = r({ top: "10px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("property with different value", () => {
          r(initialState);
          const n = r({ top: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["top", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("different property", () => {
          r(initialState);
          const n = r({ left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("two properties", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });
      });

      describe("two properties", () => {
        const initialState = { top: "10px", left: "20px" };

        test("undefined", () => {
          r(initialState);
          const n = r();
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("empty style object", () => {
          r(initialState);
          const n = r({});
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("property with undefined value", () => {
          r(initialState);
          const n = r({ top: void 0 });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"], ["left"]]);
        });

        test("properties with same values", () => {
          r(initialState);
          const n = r({ top: "10px", left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("properties with different values", () => {
          r(initialState);
          const n = r({ top: "30px", left: "40px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([
            ["top", "10px"], ["left", "20px"],
            ["top", "30px"], ["left", "40px"],
          ]);
          expect(removeProperty().mock.calls).toEqual([]);
        });

        test("one property with same value", () => {
          r(initialState);
          const n = r({ left: "20px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });

        test("one property with different value", () => {
          r(initialState);
          const n = r({ left: "30px" });
          expect(n).toMatchSnapshot();
          expect(setProperty().mock.calls).toEqual([["top", "10px"], ["left", "20px"], ["left", "30px"]]);
          expect(removeProperty().mock.calls).toEqual([["top"]]);
        });
      });
    });
  });
});
