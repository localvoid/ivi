import { useResetDOM, useDOMElement, useIVI, useHTML, useTest } from "ivi-jest";
import { Op } from "ivi";

useResetDOM();
const root = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const input = (value: boolean, className?: string) => h.input(className, { autofocus: ivi.AUTOFOCUS(value) });
const r = (op: Op) => t.render(op, root()).domNode;

describe("attribute directive AUTOFOCUS", () => {
  describe("mount", () => {
    test("true", () => {
      const n = r(input(true));
      expect(document.activeElement).toBe(n);
    });

    test("false", () => {
      const n = r(input(false));
      expect(document.activeElement).not.toBe(n);
    });

    test("two focused elements", () => {
      r([input(true, "focused"), input(true)]);
      expect(document.activeElement).toBe(root().querySelector(".focused"));
    });
  });

  describe("update", () => {
    test("undefined to true", () => {
      r(h.input());
      const n = r(input(true));
      expect(document.activeElement).toBe(n);
    });

    test("false to true", () => {
      r(input(false));
      const n = r(input(true));
      expect(document.activeElement).not.toBe(n);
    });

    test("true to false", () => {
      r(input(true));
      const n = r(input(false));
      expect(document.activeElement).toBe(n);
    });
  });
});
