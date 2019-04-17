import { useResetJSDOM, useResetModules, useDOMElement, useTest } from "ivi-jest";
import { useDOMOpsCounters } from "./jest";

useResetJSDOM();
useResetModules();
const c = useDOMElement();
const domOps = useDOMOpsCounters();
const t = useTest();
const r = (text: string | number | null) => t.render(text, c()).domNode!;

describe("mount text node", () => {
  test("empty string", () => {
    const n = r("");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string", () => {
    const n = r("abc");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("zero number", () => {
    const n = r(0);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("number", () => {
    const n = r(123);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });
});

describe("update text node", () => {
  test("null to empty string", () => {
    r(null);
    const n = r("");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("null to string", () => {
    r(null);
    const n = r("abc");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("null to zero number", () => {
    r(null);
    const n = r(0);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("null to number", () => {
    r(null);
    const n = r(123);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("empty string to null", () => {
    r("");
    const n = r(null);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("empty string to string", () => {
    r("");
    const n = r("abc");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("empty string to zero number", () => {
    r("");
    const n = r(0);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("empty string to number", () => {
    r("");
    const n = r(123);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string to null", () => {
    r("abc");
    const n = r(null);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string to empty string", () => {
    r("abc");
    const n = r("");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string to zero number", () => {
    r("abc");
    const n = r(0);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string to number", () => {
    r("abc");
    const n = r(123);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("zero number to null", () => {
    r(0);
    const n = r(null);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("zero number to string", () => {
    r(0);
    const n = r("abc");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("zero number to empty string", () => {
    r(0);
    const n = r("");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("zero number to number", () => {
    r(0);
    const n = r(123);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("number to null", () => {
    r(123);
    const n = r(null);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("number to string", () => {
    r(123);
    const n = r("abc");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("number to empty string", () => {
    r(123);
    const n = r("");
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("number to zero number", () => {
    r(123);
    const n = r(0);
    expect(n).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });

  test("string to fragment", () => {
    r("abc");
    const { domNode } = t.render([1, 2, 3], c());
    expect(domNode).toMatchSnapshot();
    expect(domOps()).toMatchSnapshot();
  });
});
