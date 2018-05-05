import { render } from "./utils";
import * as h from "./utils/html";

test(`<div unsafeHTML="<span>abc</span>"></div>`, () => {
  const v = h.div().unsafeHTML("<span>abc</span>");
  const n = render<HTMLElement>(v);

  expect(n.childNodes.length).toBe(1);
  expect(n.children[0].tagName.toLowerCase()).toBe("span");
  expect(n.children[0].firstChild!.nodeValue).toBe("abc");
});
