import { isVoidElement } from "../dom";

const VOID_ELEMENTS = [
  "audio",
  "video",
  "embed",
  "input",
  "param",
  "source",
  "textarea",
  "track",
  "area",
  "base",
  "link",
  "meta",
  "br",
  "col",
  "hr",
  "img",
  "wbr",
];

for (const tagName of VOID_ELEMENTS) {
  test(`${tagName} should be a void element`, () => {
    expect(isVoidElement(tagName)).toBe(true);
  });
}

test(`div should not be a void element`, () => {
  expect(isVoidElement("div")).toBe(false);
});
