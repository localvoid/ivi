import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<textarea>`, () => {
  startRender<HTMLTextAreaElement>((r) => {
    const n = r(h.textarea());

    expect(n.tagName.toLowerCase()).toBe("textarea");
  });
});

test(`<textarea>abc</textarea>`, () => {
  startRender<HTMLTextAreaElement>((r) => {
    const n = r(h.textarea("", { value: h.TEXTAREA_VALUE("abc") }));

    expect(n.value).toBe("abc");
  });
});
