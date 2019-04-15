import { useResetModules, useModule, useDOMElement, useSpyOn } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const ivi = useModule<typeof import("ivi")>("ivi");
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");
const innerHTML = useSpyOn(() => Element.prototype, "innerHTML", "set");
const _ = void 0;

describe("attribute directive unsafeHTML", () => {
  test("mount", () => {
    const { domNode } = t.render(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("<span>1</span>") }), c());
    expect(innerHTML().mock.calls.length).toBe(1);
    expect(domNode).toMatchSnapshot();
  });

  test("mount empty string", () => {
    const { domNode } = t.render(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("") }), c());
    expect(innerHTML().mock.calls.length).toBe(0);
    expect(domNode).toMatchSnapshot();
  });

  test("update", () => {
    t.render<any>(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("<span>1</span>") }), c());
    const { domNode } = t.render(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("<span>2</span>") }), c());
    expect(innerHTML().mock.calls.length).toBe(2);
    expect(domNode).toMatchSnapshot();
  });

  test("update with the same value", () => {
    const a = t.render<HTMLSpanElement>(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("<span>1</span>") }), c());
    const b = t.render<HTMLSpanElement>(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("<span>1</span>") }), c());
    expect(innerHTML().mock.calls.length).toBe(1);
    expect(a.domNode!.firstChild).toBe(b.domNode!.firstChild);
  });

  test("update with empty string should not assign innerHTML", () => {
    t.render(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("") }), c());
    const { domNode } = t.render(h.div(_, { unsafeHTML: ivi.UNSAFE_HTML("") }), c());
    expect(innerHTML().mock.calls.length).toBe(0);
    expect(domNode).toMatchSnapshot();
  });
});
