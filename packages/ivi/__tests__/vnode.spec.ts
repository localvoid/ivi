import * as h from "./utils/html";

test("assigning children to audio element should raise an exception", () => {
  expect(() => h.audio().c("123")).toThrow(Error);
});

test("assigning unsafeHTML to audio element should raise an exception", () => {
  expect(() => h.audio().unsafeHTML("123")).toThrow(Error);
});
