import { XML_NAMESPACE, XLINK_NAMESPACE, _ } from "ivi";
import * as h from "ivi-html";
import * as s from "ivi-svg";
import { testRenderDOM } from "ivi-test";

describe(`HTML`, () => {
  test(`<div attrs=undefined>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, void 0))!;
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={}>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, {}))!;
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ tabIndex: "1" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { tabIndex: 1 }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("tabIndex")).toBe("1");
      expect(n.tabIndex).toBe(1);
    });
  });

  test(`<div attrs={ tabIndex: undefined }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { tabIndex: undefined }))!;
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ bool: false }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { bool: false }))!;
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ bool: true }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { bool: true }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("bool")).toBe("");
    });
  });

  test(`<div attrs={ tabIndex: "1", title: "2" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { tabIndex: 1, title: "2" }))!;
      expect(n.attributes.length).toBe(2);
      expect(n.getAttribute("tabIndex")).toBe("1");
      expect(n.getAttribute("title")).toBe("2");
      expect(n.tabIndex).toBe(1);
      expect(n.title).toBe("2");
    });
  });

  test(`<div attrs={ "data-abc": "a" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { "data-abc": "a" }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("data-abc")).toBe("a");
    });
  });

  test(`<div attrs={ "aria-type": "button" }>`, () => {
    testRenderDOM<HTMLElement>(r => {
      const n = r(h.div(_, { "aria-type": "button" }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("aria-type")).toBe("button");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle attrs={ "id": "a">`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "id": "a" }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("id")).toBe("a");
    });
  });

  test(`<circle attrs={ "test-attribute": "a">`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "test-attribute": "a" }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("test-attribute")).toBe("a");
    });
  });

  test(`<circle attrs={ "xxx:test": "a">`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xxx:test": "a" }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("xxx:test")).toBe("a");
    });
  });

  test(`<circle attrs={ "xlink:href": "a">`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xlink:href": s.XLINK_ATTR("a") }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBe("a");
    });
  });

  test(`<circle attrs={ "xml:text": "" }>`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR("") }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("");
    });
  });

  test(`<circle attrs={ "xml:text": "a" }>`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR("a") }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("a");
    });
  });

  test(`<circle attrs={ "xml:text": true }>`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR(true) }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("true");
    });
  });

  test(`<circle attrs={ "xml:text": false }>`, () => {
    testRenderDOM<SVGElement>(r => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR("false") }))!;
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("false");
    });
  });
});
