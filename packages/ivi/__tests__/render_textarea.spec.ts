import { render } from "./utils";
import * as h from "./utils/html";

test(`<textarea>`, () => {
  const n = render<HTMLTextAreaElement>(h.textarea());

  expect(n.tagName.toLowerCase()).toBe("textarea");
});

test(`<textarea>abc</textarea>`, () => {
  const n = render<HTMLTextAreaElement>(h.textarea().value("abc"));

  expect(n.value).toBe("abc");
});
