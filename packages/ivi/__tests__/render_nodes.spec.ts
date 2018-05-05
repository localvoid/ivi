import { SVG_NAMESPACE } from "ivi-core";
import { render } from "./utils";
import * as h from "./utils/html";
import * as s from "./utils/svg";

describe(`TextNode`, () => {
  test(`"abc"`, () => {
    const n = render<Text>(h.t("abc"));

    expect(n.nodeValue).toBe("abc");
  });
});

describe(`HTML`, () => {
  test(`<div>`, () => {
    const n = render<HTMLElement>(h.div());

    expect(n.tagName.toLowerCase()).toBe("div");
  });

  test(`<span>`, () => {
    const n = render<HTMLElement>(h.span());

    expect(n.tagName.toLowerCase()).toBe("span");
  });
});

describe(`SVG`, () => {
  test(`<circle>`, () => {
    const n = render<SVGCircleElement>(s.circle());

    expect(n.tagName.toLowerCase()).toBe("circle");
    expect(n.namespaceURI).toBe(SVG_NAMESPACE);
  });
});
