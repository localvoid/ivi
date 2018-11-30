import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<button>`, () => {
  testRenderDOM<HTMLButtonElement>(r => {
    const n = r(h.button())!;

    expect(n.tagName.toLowerCase()).toBe("button");
    expect(n.type).toBe("submit");
  });
});
