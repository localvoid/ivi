import { useResetJSDOM, useResetModules, useDOMElement, useIVI, useHTML, useTest } from "ivi-jest";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("attribute directive AUTOFOCUS", () => {
  describe("mount", () => {
    test("true", () => {
      const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
      expect(document.activeElement).toBe(domNode);
    });

    test("false", () => {
      const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
      expect(document.activeElement).not.toBe(domNode);
    });

    test("two focused elements", () => {
      const r = ivi.box(null);
      t.render([
        ivi.Ref(r,
          h.input(_, { autofocus: ivi.AUTOFOCUS(true) }),
        ),
        h.input(_, { autofocus: ivi.AUTOFOCUS(true) }),
      ], c());
      expect(document.activeElement).toBe(ivi.getDOMNode(r.v!));
    });
  });

  describe("update", () => {
    test("undefined to true", () => {
      t.render(h.input(), c());
      const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
      expect(document.activeElement).toBe(domNode);
    });

    test("false to true", () => {
      t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
      const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
      expect(document.activeElement).not.toBe(domNode);
    });

    test("true to false", () => {
      t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
      const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
      expect(document.activeElement).toBe(domNode);
    });
  });
});
