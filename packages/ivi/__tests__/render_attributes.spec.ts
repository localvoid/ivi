import { XML_NAMESPACE, XLINK_NAMESPACE } from "ivi-core";
import { render } from "./utils";
import * as h from "./utils/html";
import * as s from "./utils/svg";

describe(`HTML`, () => {
  test(`<div attrs=null>`, () => {
    const n = render<HTMLElement>(h.div().a(null));
    expect(n.attributes.length).toBe(0);
  });

  test(`<div attrs={}>`, () => {
    const n = render<HTMLElement>(h.div().a({}));
    expect(n.attributes.length).toBe(0);
  });

  test(`<div attrs={ tabIndex: "1" }>`, () => {
    const n = render<HTMLElement>(h.div().a({ tabIndex: 1 }));
    expect(n.attributes.length).toBe(1);
    expect(n.getAttribute("tabIndex")).toBe("1");
    expect(n.tabIndex).toBe(1);
  });

  test(`<div attrs={ tabIndex: "1", title: "2" }>`, () => {
    const n = render<HTMLElement>(h.div().a({ tabIndex: 1, title: "2" }));
    expect(n.attributes.length).toBe(2);
    expect(n.getAttribute("tabIndex")).toBe("1");
    expect(n.getAttribute("title")).toBe("2");
    expect(n.tabIndex).toBe(1);
    expect(n.title).toBe("2");
  });

  test(`<div attrs={ "data-abc": "a" }>`, () => {
    const n = render<HTMLElement>(h.div().a({ "data-abc": "a" }));
    expect(n.attributes.length).toBe(1);
    expect(n.getAttribute("data-abc")).toBe("a");
  });

  test(`<div attrs={ "aria-type": "button" }>`, () => {
    const n = render<HTMLElement>(h.div().a({ "aria-type": "button" }));
    expect(n.attributes.length).toBe(1);
    expect(n.getAttribute("aria-type")).toBe("button");
  });
});

describe(`SVG`, () => {
  test(`<circle attrs={ "xlink:href": "a">`, () => {
    const n = render<SVGCircleElement>(s.circle().a({ "xlink:href": "a" }));
    expect(n.attributes.length).toBe(1);
    expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBe("a");
  });

  test(`<circle attrs={ "xml:text": "a" }>`, () => {
    const n = render<SVGCircleElement>(s.circle().a({ "xml:test": "a" }));
    expect(n.attributes.length).toBe(1);
    expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("a");
  });
});
