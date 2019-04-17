import { useResetDOM, useResetModules, useDOMElement, useMockFn, useIVI, useHTML, useTest } from "ivi-jest";

useResetDOM();
useResetModules();
const c = useDOMElement();
const handler1 = useMockFn();
const handler2 = useMockFn();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;

describe("attribute directive EVENTS", () => {
  test("mount", () => {
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), c());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(1);
  });

  test("update with the same handler", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), c());
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), c());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(1);
  });

  test("update with different handler", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), c());
    const { domNode } = t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler2) }), c());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(0);
    expect(handler2.mock.calls.length).toBe(1);
  });

  test("update with undefined", () => {
    t.render<HTMLButtonElement>(h.button(_, { click: ivi.EVENT(handler1) }), c());
    const { domNode } = t.render<HTMLButtonElement>(h.button(), c());
    domNode!.click();
    expect(handler1.mock.calls.length).toBe(0);
  });
});
