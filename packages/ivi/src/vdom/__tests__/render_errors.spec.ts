import { useResetJSDOM, useResetModules, useHTML, useTest, useDOMElement } from "ivi-jest";
import { Op } from "ivi";

useResetJSDOM();
useResetModules();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("render errors", () => {
  test("render into document body", () => {
    expect(() => t.render(null, document.body)).toThrowError();
  });

  test("render into unmounted element", () => {
    expect(() => t.render(null, document.createElement("div"))).toThrowError();
  });

  describe("nesting rules", () => {
    const c = useDOMElement();
    const r = (op: Op) => t.render(op, c());

    test("table without tbody", () => {
      expect(() => { r(h.table(_, _, h.tr())); }).toThrowError("nesting rule");
    });

    test("ul in paragraph", () => {
      expect(() => { r(h.p(_, _, h.ul())); }).toThrowError("nesting rule");
    });
  });
});
