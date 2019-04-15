import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const ivi = useModule<typeof import("ivi")>("ivi");
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");
const _ = void 0;

describe("attribute directive AUTOFOCUS", () => {
  test("mount with true", () => {
    const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
    expect(document.activeElement).toBe(domNode);
  });

  test("mount with false value", () => {
    const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
    expect(document.activeElement).not.toBe(domNode);
  });

  test("mount two focused elements", () => {
    const r = ivi.box(null);
    t.render([
      ivi.Ref(r,
        h.input(_, { autofocus: ivi.AUTOFOCUS(true) }),
      ),
      h.input(_, { autofocus: ivi.AUTOFOCUS(true) }),
    ], c());
    expect(document.activeElement).toBe(ivi.getDOMNode(r.v!));
  });

  test("update from undefined to true", () => {
    t.render(h.input(), c());
    const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
    expect(document.activeElement).toBe(domNode);
  });

  test("update from false to true", () => {
    t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
    const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
    expect(document.activeElement).not.toBe(domNode);
  });

  test("update from true to false", () => {
    t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(true) }), c());
    const { domNode } = t.render(h.input(_, { autofocus: ivi.AUTOFOCUS(false) }), c());
    expect(document.activeElement).toBe(domNode);
  });
});
