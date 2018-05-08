import { SVG_NAMESPACE } from "ivi-core";
import * as h from "ivi-html";
import * as s from "ivi-svg";
import { startRender } from "./utils";

describe(`TextNode`, () => {
  test(`"abc"`, () => {
    startRender((r) => {
      const n = r(h.t("abc"));

      expect(n.nodeValue).toBe("abc");
    });
  });
});

describe(`HTML`, () => {
  test(`<div>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div());

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<span>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.span());

      expect(n.tagName.toLowerCase()).toBe("span");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle>`, () => {
    startRender<SVGCircleElement>((r) => {
      const n = r(s.circle());

      expect(n.tagName.toLowerCase()).toBe("circle");
      expect(n.namespaceURI).toBe(SVG_NAMESPACE);
    });
  });
});
