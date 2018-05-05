import { render } from "./utils";
import * as h from "./utils/html";

test(`<input>`, () => {
  const n = render<HTMLInputElement>(h.input());

  expect(n.tagName.toLowerCase()).toBe("input");
  expect(n.type).toBe("text");
});

test(`<input value="abc">`, () => {
  const n = render<HTMLInputElement>(h.input().value("abc"));

  expect(n.value).toBe("abc");
});

test(`<input type="checkbox">`, () => {
  const n = render<HTMLInputElement>(h.inputCheckbox());

  expect(n.tagName.toLowerCase()).toBe("input");
  expect(n.type).toBe("checkbox");
});

test(`<input type="checkbox" checked="false">`, () => {
  const n = render<HTMLInputElement>(h.inputCheckbox().checked(false));

  expect(n.checked).toBe(false);
});

test(`<input type="checkbox" checked="true">`, () => {
  const n = render<HTMLInputElement>(h.inputCheckbox().checked(true));

  expect(n.checked).toBe(true);
});
