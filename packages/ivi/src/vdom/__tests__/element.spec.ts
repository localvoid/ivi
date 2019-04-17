import {
  useResetJSDOM, useResetModules, useDOMElement, useDOMOpsCounters, useIVI, useHTML, useSVG, useTest,
} from "ivi-jest";
import { Op } from "ivi";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const t = useTest();

describe("element", () => {
  describe("HTML", () => {
    const h = useHTML();
    const r = (op: Op) => t.render<HTMLElement>(op, c()).domNode!;

    describe("mount", () => {
      test("div", () => {
        const n = r(h.div());
        expect(n).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });

    describe("update", () => {
      test("div to span", () => {
        r(h.span());
        const n = r(h.div());
        expect(n).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });
  });

  describe("SVG", () => {
    const ivi = useIVI();
    const s = useSVG();
    const r = (op: Op) => t.render<SVGElement>(op, c()).domNode!;

    describe("mount", () => {
      test("circle", () => {
        const n = r(s.circle());
        expect(n.namespaceURI).toBe(ivi.SVG_NAMESPACE);
        expect(n).toMatchSnapshot();
        expect(domOps()).toMatchSnapshot();
      });
    });
  });
});
