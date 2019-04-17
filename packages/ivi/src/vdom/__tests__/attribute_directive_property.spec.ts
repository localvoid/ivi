import { useResetDOM, useResetModules, useDOMElement, useIVI, useHTML, useTest } from "ivi-jest";

useResetDOM();
useResetModules();
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
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
