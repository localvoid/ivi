import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`<textarea>`, () => {
  testRenderDOM<HTMLTextAreaElement>(r => {
    const n = r(h.textarea())!;

    expect(n.tagName.toLowerCase()).toBe("textarea");
  });
});

test(`<textarea>abc</textarea>`, () => {
  testRenderDOM<HTMLTextAreaElement>(r => {
    const n = r(h.textarea("", { value: h.VALUE("abc") }))!;

    expect(n.value).toBe("abc");
  });
});
