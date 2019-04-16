import { useResetJSDOM, useResetModules, useSpyOn, useDOMElement, useHTML, useSVG, useTest } from "ivi-jest";

useResetJSDOM();
useResetModules();
const setProperty = useSpyOn(() => CSSStyleDeclaration.prototype, "setProperty");
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
        expect(setProperty().mock.calls.length).toBe(0);
        expect(n).toMatchSnapshot();
      });

      test("property with undefined value", () => {
        const n = r({ top: void 0 });
        expect(setProperty().mock.calls.length).toBe(0);
        expect(n).toMatchSnapshot();
      });

      test("one property", () => {
        const n = r({ top: "10px" });
        expect(setProperty().mock.calls.length).toBe(1);
        expect(n).toMatchSnapshot();
      });

      test("two properties", () => {
        const n = r({ top: "10px", left: "20px" });
        expect(setProperty().mock.calls.length).toBe(2);
        expect(n).toMatchSnapshot();
      });
    });
  });

  describe("SVG", () => {
    const s = useSVG();
    const r = (style?: {}) => t.render<SVGElement>(s.circle(_, { style }), c()).domNode!;

    describe("mount", () => {
      test("undefined", () => {
        const n = r();
        expect(setProperty().mock.calls.length).toBe(0);
        expect(n).toMatchSnapshot();
      });

      test("property with undefined value", () => {
        const n = r({ top: void 0 });
        expect(setProperty().mock.calls.length).toBe(0);
        expect(n).toMatchSnapshot();
      });

      test("one property", () => {
        const n = r({ top: "10px" });
        expect(setProperty().mock.calls.length).toBe(1);
        expect(n).toMatchSnapshot();
      });

      test("two properties", () => {
        const n = r({ top: "10px", left: "20px" });
        expect(setProperty().mock.calls.length).toBe(2);
        expect(n).toMatchSnapshot();
      });
    });
  });
});
