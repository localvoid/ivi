import { SVG_NAMESPACE, render } from "ivi";
import * as h from "ivi-html";
import * as s from "ivi-svg";
import { testRenderDOM } from "ivi-test";

describe(`TextNode`, () => {
  test(`"abc"`, () => {
    testRenderDOM(r => {
      const n = r("abc")!;

      expect(n.nodeValue).toBe("abc");
    });
  });
});

describe(`HTML`, () => {
  test(`<div>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div())!;

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<span>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.span())!;

      expect(n.tagName.toLowerCase()).toBe("span");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle>`, () => {
    testRenderDOM<SVGCircleElement>(r => {
      const n = r(s.circle())!;

      expect(n.tagName.toLowerCase()).toBe("circle");
      expect(n.namespaceURI).toBe(SVG_NAMESPACE);
    });
  });
});

test(`render into document body should raise an exception`, () => {
  expect(() => render(h.div(), document.body)).toThrowError();
});

test(`render into unmounted element should raise an exception`, () => {
  expect(() => render(h.div(), document.createElement("div"))).toThrowError();
});
