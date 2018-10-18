import { UNSAFE_HTML, _ } from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

test(`<div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender<HTMLElement>(r => {
    const v = h.div(_, { unsafeHTML: UNSAFE_HTML("<span>abc</span>") });
    const n = r(v);

    expect(n.childNodes.length).toBe(1);
    expect(n.children[0].tagName.toLowerCase()).toBe("span");
    expect(n.children[0].firstChild!.nodeValue).toBe("abc");
  });
});
