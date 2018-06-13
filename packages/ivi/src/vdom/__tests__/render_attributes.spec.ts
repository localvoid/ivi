import { XML_NAMESPACE, XLINK_NAMESPACE } from "ivi-core";
import * as h from "ivi-html";
import * as s from "ivi-svg";
import { startRender } from "./utils";

describe(`HTML`, () => {
  test(`<div attrs=undefined>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", void 0));
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={}>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", {}));
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ tabIndex: "1" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { tabIndex: 1 }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("tabIndex")).toBe("1");
      expect(n.tabIndex).toBe(1);
    });
  });

  test(`<div attrs={ tabIndex: undefined }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { tabIndex: undefined }));
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ bool: false }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { bool: false }));
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<div attrs={ bool: true }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { bool: true }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("bool")).toBe("");
    });
  });

  test(`<div attrs={ tabIndex: "1", title: "2" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { tabIndex: 1, title: "2" }));
      expect(n.attributes.length).toBe(2);
      expect(n.getAttribute("tabIndex")).toBe("1");
      expect(n.getAttribute("title")).toBe("2");
      expect(n.tabIndex).toBe(1);
      expect(n.title).toBe("2");
    });
  });

  test(`<div attrs={ "data-abc": "a" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { "data-abc": "a" }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("data-abc")).toBe("a");
    });
  });

  test(`<div attrs={ "aria-type": "button" }>`, () => {
    startRender<HTMLElement>((r) => {
      const n = r(h.div("", { "aria-type": "button" }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("aria-type")).toBe("button");
    });
  });
});

describe(`SVG`, () => {
  test(`<circle attrs={ "id": "a">`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "id": "a" }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("id")).toBe("a");
    });
  });

  test(`<circle attrs={ "test-attribute": "a">`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "test-attribute": "a" }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("test-attribute")).toBe("a");
    });
  });

  test(`<circle attrs={ "xxx:test": "a">`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xxx:test": "a" }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttribute("xxx:test")).toBe("a");
    });
  });

  test(`<circle attrs={ "xlink:href": "a">`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xlink:href": s.XLINK_ATTR("a") }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBe("a");
    });
  });

  test(`<circle attrs={ "xml:text": "a" }>`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR("a") }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("a");
    });
  });

  test(`<circle attrs={ "xml:text": undefined }>`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR(undefined) }));
      expect(n.attributes.length).toBe(0);
    });
  });

  test(`<circle attrs={ "xml:text": true }>`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR(true) }));
      expect(n.attributes.length).toBe(1);
      expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("");
    });
  });

  test(`<circle attrs={ "xml:text": false }>`, () => {
    startRender<SVGElement>((r) => {
      const n = r(s.circle("", { "xml:test": s.XML_ATTR(false) }));
      expect(n.attributes.length).toBe(0);
    });
  });
});
