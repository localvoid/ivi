import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("getFunctionName", () => {
  function wrap(fn: Function): Function {
    return fn;
  }

  test("basic name", () => {
    function A() { /* */ }

    expect(ivi.getFunctionName(A)).toBe("A");
  });

  test("displayName", () => {
    function A() { /* */ }
    A.displayName = "B";

    expect(ivi.getFunctionName(A)).toBe("B");
  });

  test("anonymous", () => {
    const A = wrap(() => { /* */ });

    expect(ivi.getFunctionName(A)).toBe("(anonymous function)");
  });
});
