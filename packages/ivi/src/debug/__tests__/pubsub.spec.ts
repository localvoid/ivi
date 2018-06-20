import { debugPub, debugSub } from "ivi";

let value1 = "";
let value2 = "";

debugSub("a", (s: string) => {
  value1 = s;
});

debugSub("a", (s: string) => {
  value2 = s;
});

beforeEach(() => {
  value1 = "";
  value2 = "";
});

test(`should not throw when there are no subscribers`, () => {
  expect(() => { debugPub("topic", "A"); }).not.toThrow();
});

test(`subscribers should receive state`, () => {
  debugPub("a", "A");
  expect(value1).toBe("A");
  expect(value2).toBe("A");
});
