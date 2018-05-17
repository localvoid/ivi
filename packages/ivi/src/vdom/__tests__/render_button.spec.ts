import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<button>`, () => {
  startRender<HTMLButtonElement>((r) => {
    const n = r(h.button());

    expect(n.tagName.toLowerCase()).toBe("button");
    expect(n.type).toBe("submit");
  });
});
