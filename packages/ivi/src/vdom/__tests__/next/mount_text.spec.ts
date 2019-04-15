import { useResetModules, useModule, useDOMElement } from "ivi-jest";

useResetModules();
const c = useDOMElement();
const t = useModule<typeof import("ivi-test")>("ivi-test");

describe("mount text node", () => {
  test("empty string", () => {
    const { domNode } = t.render("", c());
    expect(domNode).toMatchSnapshot();
  });

  test("string", () => {
    const { domNode } = t.render("abc", c());
    expect(domNode).toMatchSnapshot();
  });

  test("zero number", () => {
    const { domNode } = t.render(0, c());
    expect(domNode).toMatchSnapshot();
  });

  test("number", () => {
    const { domNode } = t.render("123", c());
    expect(domNode).toMatchSnapshot();
  });
});
