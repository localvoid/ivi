import { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "ivi-core";
import { render, checkDOMOps, $tc, $tcf } from "./utils";
import { cloneVNode } from "../src/vdom/clone";
import * as h from "./utils/html";
import * as s from "./utils/svg";
import { expect } from "iko";

describe("render", () => {
  it("'abc'", () => {
    checkDOMOps((c) => {
      const n = render<Text>(h.t("abc"));
      expect(n.nodeValue).toBe("abc");
      expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
    });
  });

  it("<div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div());
      expect(n.tagName.toLowerCase()).toBe("div");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<span>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.span());
      expect(n.tagName.toLowerCase()).toBe("span");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div> (null props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().a(null));
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div> ({} props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().a({}));
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div tabIndex='1'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ tabIndex: 1 }));
      expect(n.tabIndex).toBe(1);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div tabIndex='1' title='2'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ tabIndex: 1, title: "2" }));
      expect(n.tabIndex).toBe(1);
      expect(n.title).toBe("2");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div data-abc='a'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ "data-abc": "a" }));
      expect(n.getAttribute("data-abc")).toBe("a");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div aria-type='button'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ "aria-type": "button" }));
      expect(n.getAttribute("aria-type")).toBe("button");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class=''>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div(""));
      expect(n.getAttributeNode("class")).notToBeNull();
      expect(n.className).toBe("");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class='a'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a"));
      expect(n.classList.length).toBe(1);
      expect(n.classList.contains("a")).toBe(true);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class='a b'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a b"));
      expect(n.classList.length).toBe(2);
      expect(n.classList.contains("a")).toBe(true);
      expect(n.classList.contains("b")).toBe(true);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style=null>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s(null));
      expect(n.style.cssText).toBe("");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={top: 10px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ top: "10px" }));
      expect(n.style.top).toBe("10px");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={float: 'left'}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ float: "left" }));
      expect(n.style.cssFloat).toBe("left");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ top: "10px", left: "20px" }));
      expect(n.style.top).toBe("10px");
      expect(n.style.left).toBe("20px");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div></div> (null children)", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(null));
      expect(n.childNodes.length).toBe(0);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>'abc'</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c("abc"));
      expect(n.childNodes.length).toBe(1);
      expect(n.firstChild!.nodeValue).toBe("abc");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>10</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(10));
      expect(n.childNodes.length).toBe(1);
      expect(n.firstChild!.nodeValue).toBe("10");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div><span></div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(h.span()));
      expect(n.childNodes.length).toBe(1);
      expect(n.children[0].tagName.toLowerCase()).toBe("span");
      expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
    });
  });

  it("<div>[]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c([]));
      expect(n.childNodes.length).toBe(0);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>[<span>]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(h.span()));
      expect(n.childNodes.length).toBe(1);
      expect(n.children[0].tagName.toLowerCase()).toBe("span");
      expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
    });
  });

  it("<div>[<span>, <strong>]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(h.span(), h.strong()));
      expect(n.childNodes.length).toBe(2);
      expect(n.children[0].tagName.toLowerCase()).toBe("span");
      expect(n.children[1].tagName.toLowerCase()).toBe("strong");
      expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
    });
  });

  it("<div>[" +
    "  <div>'hello'</div>," +
    "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
    "  <div><div></div>," +
    "  <div>" +
    "]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(
          h.div().c("hello"),
          h.div().c(h.span().c("world"), h.div().c(h.span())),
          h.div().c(h.div()),
          h.div(),
        ));
        expect(n.childNodes.length).toBe(4);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.children[1].tagName.toLowerCase()).toBe("div");
        expect(n.children[2].tagName.toLowerCase()).toBe("div");
        expect(n.children[3].tagName.toLowerCase()).toBe("div");

        expect(n.children[0].childNodes.length).toBe(1);
        expect(n.children[1].childNodes.length).toBe(2);
        expect(n.children[2].childNodes.length).toBe(1);
        expect(n.children[3].childNodes.length).toBe(0);

        expect(n.children[0].firstChild!.nodeValue).toBe("hello");

        expect(n.children[1].children[0].tagName.toLowerCase()).toBe("span");
        expect(n.children[1].children[0].firstChild!.nodeValue).toBe("world");
        expect(n.children[1].children[1].tagName.toLowerCase()).toBe("div");
        expect(n.children[1].children[1].childNodes.length).toBe(1);
        expect(n.children[1].children[1].children[0].tagName.toLowerCase()).toBe("span");

        expect(n.children[2].children[0].tagName.toLowerCase()).toBe("div");

        expect(c).toMatchDOMOps(9, 0, 0, 0, 9, 0, 0);
      });
    });

  describe("svg", () => {
    it("<circle>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle());
        expect(n.tagName.toLowerCase()).toBe("circle");
        expect(n.namespaceURI).toBe(SVG_NAMESPACE);
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle class='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle("a"));
        expect(n.getAttribute("class")).toBe("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle style={top: 10px}>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().s({ top: "10px" }));
        expect(n.style.top).toBe("10px");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle xlink:href='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().a({ "xlink:href": "a" }));
        expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBe("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle xml:text='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().a({ "xml:test": "a" }));
        expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("children normalization", () => {
    it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(
          h.div().c(
            h.span(),
            [h.strong().k("strong"), h.a().k("a")], h.span(),
          ),
        );
        expect(n.childNodes.length).toBe(4);
        expect(n.children[0].tagName.toLowerCase()).toBe("span");
        expect(n.children[1].tagName.toLowerCase()).toBe("strong");
        expect(n.children[2].tagName.toLowerCase()).toBe("a");
        expect(n.children[3].tagName.toLowerCase()).toBe("span");
        expect(c).toMatchDOMOps(5, 0, 0, 0, 5, 0, 0);
      });
    });

    it("<div>['abc', []]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c("abc", []));
        expect(n.childNodes.length).toBe(1);
        expect(n.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
        expect(n.childNodes[0].nodeValue).toBe("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<div>[<div>, null, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), null, h.span()));
        expect(n.childNodes.length).toBe(2);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
      });
    });

    it("<div>[<div>, 'abc', <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), "abc", h.span()));
        expect(n.childNodes.length).toBe(3);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.childNodes[1].nodeValue).toBe("abc");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toMatchDOMOps(3, 0, 1, 0, 4, 0, 0);
      });
    });

    it("<div>[<div>, 123, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), 123, h.span()));
        expect(n.childNodes.length).toBe(3);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.childNodes[1].nodeValue).toBe("123");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toMatchDOMOps(3, 0, 1, 0, 4, 0, 0);
      });
    });

    it("<div unsafeHTML='<span>abc</span>'></div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().unsafeHTML("<span>abc</span>"));
        expect(n.childNodes.length).toBe(1);
        expect(n.children[0].tagName.toLowerCase()).toBe("span");
        expect(n.children[0].firstChild!.nodeValue).toBe("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc());
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C>''</C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(""));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><C><C><div></C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C><C><C>''</C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc("", 3));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><div></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf());
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<F>''</F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(""));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><F><F><div></F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<F><F><F>''</F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf("", 3));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><C>''</C></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf($tc("")));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><F>''</F></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc($tcf("")));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.input());
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("text");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='text' value='abc'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.input().value("abc"));
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("text");
        expect(n.value).toBe("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='checkbox'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox());
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("checkbox");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='checkbox' checked='true'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox().checked(true));
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("checkbox");
        expect(n.checked).toBe(true);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea());
        expect(n.tagName.toLowerCase()).toBe("textarea");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<textarea>abc</textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea().value("abc"));
        expect(n.tagName.toLowerCase()).toBe("textarea");
        expect(n.value).toBe("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<audio>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLAudioElement>(h.audio());
        expect(n.tagName.toLowerCase()).toBe("audio");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("reusing vnodes", () => {
    it("<div>a</div>", () => {
      checkDOMOps((c) => {
        const v = h.div().c("a");
        const a = render<HTMLDivElement>(v, undefined, true);
        const b = render<HTMLDivElement>(cloneVNode(v), undefined, true);
        expect(a.childNodes.length).toBe(1);
        expect(a.firstChild!.nodeValue).toBe("a");
        expect(b.childNodes.length).toBe(1);
        expect(b.firstChild!.nodeValue).toBe("a");
        expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
      });
    });
  });

  describe("nesting rules violation", () => {
    it("<table><tr></table>", () => {
      expect(() => { render(h.table().c(h.tr())); }).toThrow(Error);
    });

    it("<h1><h2></h1>", () => {
      expect(() => { render(h.h1().c(h.h2())); }).toThrow(Error);
    });

    it("<h1><span><h2></span></h1>", () => {
      expect(() => { render(h.h1().c(h.span().c(h.h2()))); }).toThrow(Error);
    });
  });
});
