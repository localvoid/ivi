import { useResetDOM, useTest } from "ivi-jest";

useResetDOM();
const t = useTest();

describe("render errors", () => {
  test("render into document body", () => {
    expect(() => t.render(null, document.body)).toThrowError();
  });

  test("render into unmounted element", () => {
    expect(() => t.render(null, document.createElement("div"))).toThrowError();
  });
});
