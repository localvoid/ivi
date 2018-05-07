import { render } from "./utils";
import * as h from "./utils/html";

test(`<button>`, () => {
  const n = render<HTMLButtonElement>(h.button());

  expect(n.tagName.toLowerCase()).toBe("button");
  expect(n.type).toBe("button");
});

test(`<button type="submit">`, () => {
  const n = render<HTMLButtonElement>(h.buttonSubmit());

  expect(n.tagName.toLowerCase()).toBe("button");
  expect(n.type).toBe("submit");
});
