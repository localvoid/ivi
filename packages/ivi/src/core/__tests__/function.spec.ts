import { getFunctionName } from "ivi";

function wrap(fn: Function): Function {
  return fn;
}

test(`basic name`, () => {
  function A() { /* */ }

  expect(getFunctionName(A)).toBe("A");
});

test(`displayName`, () => {
  function A() { /* */ }
  A.displayName = "B";

  expect(getFunctionName(A)).toBe("B");
});

test(`anonymous`, () => {
  const A = wrap(() => { /* */ });

  expect(getFunctionName(A)).toBe("(anonymous function)");
});
