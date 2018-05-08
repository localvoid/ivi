import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<button>`, () => {
  startRender<HTMLButtonElement>((r) => {
    const n = r(h.button());

    expect(n.tagName.toLowerCase()).toBe("button");
    expect(n.type).toBe("button");
  });
});

test(`<button type="submit">`, () => {
  startRender<HTMLButtonElement>((r) => {
    const n = r(h.buttonSubmit());

    expect(n.tagName.toLowerCase()).toBe("button");
    expect(n.type).toBe("submit");
  });
});
