import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const ivi = useModule<typeof import("ivi")>("ivi");
const h = useModule<typeof import("ivi-html")>("ivi-html");
const t = useModule<typeof import("ivi-test")>("ivi-test");
const _ = void 0;

describe("attribute directive PROPERTY", () => {
  test("mount", () => {
    const value = {};
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), c());
    expect(domNode!._custom).toBe(value);
  });

  test("update", () => {
    const value = {};
    t.render<any>(h.div(_, { _custom: ivi.PROPERTY({}) }), c());
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), c());
    expect(domNode!._custom).toBe(value);
  });

  test("update with the same value", () => {
    const value = {};
    t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), c());
    const { domNode } = t.render<any>(h.div(_, { _custom: ivi.PROPERTY(value) }), c());
    expect(domNode!._custom).toBe(value);
  });
});
