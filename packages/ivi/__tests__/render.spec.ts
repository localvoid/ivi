import { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "ivi-core";
import { render, checkDOMOps, $tc, $tcf } from "./utils";
import { cloneVNode } from "../src/vdom/clone";
import * as h from "./utils/html";
import { expect } from "iko";

describe("render", () => {
  it("'abc'", () => {
    checkDOMOps((c) => {
      const n = render<Text>(h.t("abc"));
      expect(n.nodeValue).toBeEqual("abc");
      expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
    });
  });

  it("<div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div());
      expect(n.tagName.toLowerCase()).toBeEqual("div");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<span>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.span());
      expect(n.tagName.toLowerCase()).toBeEqual("span");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div> (null props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().props(null));
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div> ({} props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().props({}));
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div tabIndex='1'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().props({ tabIndex: 1 }));
      expect(n.tabIndex).toBeEqual(1);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div tabIndex='1' title='2'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().props({ tabIndex: 1, title: "2" }));
      expect(n.tabIndex).toBeEqual(1);
      expect(n.title).toBeEqual("2");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div data-abc='a'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().props({ "data-abc": "a" }));
      expect(n.getAttribute("data-abc")).toBeEqual("a");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div aria-type='button'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().props({ "aria-type": "button" }));
      expect(n.getAttribute("aria-type")).toBeEqual("button");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class=null>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().className(null));
      expect(n.className).toBeEqual("");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class=''>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div(""));
      expect(n.getAttributeNode("class")).notToBeNull();
      expect(n.className).toBeEqual("");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class='a'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a"));
      expect(n.classList.length).toBeEqual(1);
      expect(n.classList.contains("a")).toBeEqual(true);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div class='a b'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a b"));
      expect(n.classList.length).toBeEqual(2);
      expect(n.classList.contains("a")).toBeEqual(true);
      expect(n.classList.contains("b")).toBeEqual(true);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style=null>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().style(null));
      expect(n.style.cssText).toBeEqual("");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={top: 10px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().style({ top: "10px" }));
      expect(n.style.top).toBeEqual("10px");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={float: 'left'}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().style({ float: "left" }));
      expect(n.style.cssFloat).toBeEqual("left");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div style={top: 10px; left: 20px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().style({ top: "10px", left: "20px" }));
      expect(n.style.top).toBeEqual("10px");
      expect(n.style.left).toBeEqual("20px");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div></div> (null children)", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children(null));
      expect(n.childNodes.length).toBeEqual(0);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>'abc'</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children("abc"));
      expect(n.childNodes.length).toBeEqual(1);
      expect(n.firstChild!.nodeValue).toBeEqual("abc");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>10</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children(10));
      expect(n.childNodes.length).toBeEqual(1);
      expect(n.firstChild!.nodeValue).toBeEqual("10");
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div><span></div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children(h.span()));
      expect(n.childNodes.length).toBeEqual(1);
      expect(n.children[0].tagName.toLowerCase()).toBeEqual("span");
      expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
    });
  });

  it("<div>[]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children([]));
      expect(n.childNodes.length).toBeEqual(0);
      expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
    });
  });

  it("<div>[<span>]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children(h.span()));
      expect(n.childNodes.length).toBeEqual(1);
      expect(n.children[0].tagName.toLowerCase()).toBeEqual("span");
      expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
    });
  });

  it("<div>[<span>, <strong>]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().children(h.span(), h.strong()));
      expect(n.childNodes.length).toBeEqual(2);
      expect(n.children[0].tagName.toLowerCase()).toBeEqual("span");
      expect(n.children[1].tagName.toLowerCase()).toBeEqual("strong");
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
        const n = render<HTMLElement>(h.div().children(
          h.div().children("hello"),
          h.div().children(h.span().children("world"), h.div().children(h.span())),
          h.div().children(h.div()),
          h.div(),
        ));
        expect(n.childNodes.length).toBeEqual(4);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("div");
        expect(n.children[1].tagName.toLowerCase()).toBeEqual("div");
        expect(n.children[2].tagName.toLowerCase()).toBeEqual("div");
        expect(n.children[3].tagName.toLowerCase()).toBeEqual("div");

        expect(n.children[0].childNodes.length).toBeEqual(1);
        expect(n.children[1].childNodes.length).toBeEqual(2);
        expect(n.children[2].childNodes.length).toBeEqual(1);
        expect(n.children[3].childNodes.length).toBeEqual(0);

        expect(n.children[0].firstChild!.nodeValue).toBeEqual("hello");

        expect(n.children[1].children[0].tagName.toLowerCase()).toBeEqual("span");
        expect(n.children[1].children[0].firstChild!.nodeValue).toBeEqual("world");
        expect(n.children[1].children[1].tagName.toLowerCase()).toBeEqual("div");
        expect(n.children[1].children[1].childNodes.length).toBeEqual(1);
        expect(n.children[1].children[1].children[0].tagName.toLowerCase()).toBeEqual("span");

        expect(n.children[2].children[0].tagName.toLowerCase()).toBeEqual("div");

        expect(c).toMatchDOMOps(9, 0, 0, 0, 9, 0, 0);
      });
    });

  describe("svg", () => {
    it("<circle>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(h.circle());
        expect(n.tagName.toLowerCase()).toBeEqual("circle");
        expect(n.namespaceURI).toBeEqual(SVG_NAMESPACE);
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle class='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(h.circle("a"));
        expect(n.getAttribute("class")).toBeEqual("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle style={top: 10px}>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(h.circle().style({ top: "10px" }));
        expect(n.style.top).toBeEqual("10px");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle xlink:href='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(h.circle().props({ "xlink:href": "a" }));
        expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBeEqual("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });

    it("<circle xml:text='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(h.circle().props({ "xml:test": "a" }));
        expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBeEqual("a");
        expect(c).toMatchDOMOps(0, 1, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("children normalization", () => {
    it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(
          h.div().children(
            h.span(),
            [h.strong().key("strong"), h.a().key("a")], h.span(),
          ),
        );
        expect(n.childNodes.length).toBeEqual(4);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("span");
        expect(n.children[1].tagName.toLowerCase()).toBeEqual("strong");
        expect(n.children[2].tagName.toLowerCase()).toBeEqual("a");
        expect(n.children[3].tagName.toLowerCase()).toBeEqual("span");
        expect(c).toMatchDOMOps(5, 0, 0, 0, 5, 0, 0);
      });
    });

    it("<div>['abc', []]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().children("abc", []));
        expect(n.childNodes.length).toBeEqual(1);
        expect(n.childNodes[0].nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.childNodes[0].nodeValue).toBeEqual("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<div>[<div>, null, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().children(h.div(), null, h.span()));
        expect(n.childNodes.length).toBeEqual(2);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("div");
        expect(n.children[1].tagName.toLowerCase()).toBeEqual("span");
        expect(c).toMatchDOMOps(3, 0, 0, 0, 3, 0, 0);
      });
    });

    it("<div>[<div>, 'abc', <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().children(h.div(), "abc", h.span()));
        expect(n.childNodes.length).toBeEqual(3);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("div");
        expect(n.childNodes[1].nodeValue).toBeEqual("abc");
        expect(n.children[1].tagName.toLowerCase()).toBeEqual("span");
        expect(c).toMatchDOMOps(3, 0, 1, 0, 4, 0, 0);
      });
    });

    it("<div>[<div>, 123, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().children(h.div(), 123, h.span()));
        expect(n.childNodes.length).toBeEqual(3);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("div");
        expect(n.childNodes[1].nodeValue).toBeEqual("123");
        expect(n.children[1].tagName.toLowerCase()).toBeEqual("span");
        expect(c).toMatchDOMOps(3, 0, 1, 0, 4, 0, 0);
      });
    });

    it("<div unsafeHTML='<span>abc</span>'></div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().unsafeHTML("<span>abc</span>"));
        expect(n.childNodes.length).toBeEqual(1);
        expect(n.children[0].tagName.toLowerCase()).toBeEqual("span");
        expect(n.children[0].firstChild!.nodeValue).toBeEqual("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("component", () => {
    it("<C><div></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc());
        expect(n.tagName.toLowerCase()).toBeEqual("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C>''</C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(""));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><C><C><div></C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBeEqual("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<C><C><C>''</C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc("", 3));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><div></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf());
        expect(n.tagName.toLowerCase()).toBeEqual("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<F>''</F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(""));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><F><F><div></F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBeEqual("div");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<F><F><F>''</F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf("", 3));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<F><C>''</C></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf($tc("")));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });

    it("<C><F>''</F></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc($tcf("")));
        expect(n.nodeType).toBeEqual(Node.TEXT_NODE);
        expect(n.nodeValue).toBeEqual("");
        expect(c).toMatchDOMOps(0, 0, 1, 0, 1, 0, 0);
      });
    });
  });

  describe("special elements", () => {
    it("<input type='text'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputText());
        expect(n.tagName.toLowerCase()).toBeEqual("input");
        expect(n.type).toBeEqual("text");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='text' value='abc'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputText().value("abc"));
        expect(n.tagName.toLowerCase()).toBeEqual("input");
        expect(n.type).toBeEqual("text");
        expect(n.value).toBeEqual("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='checkbox'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox());
        expect(n.tagName.toLowerCase()).toBeEqual("input");
        expect(n.type).toBeEqual("checkbox");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<input type='checkbox' checked='true'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox().checked(true));
        expect(n.tagName.toLowerCase()).toBeEqual("input");
        expect(n.type).toBeEqual("checkbox");
        expect(n.checked).toBeEqual(true);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea());
        expect(n.tagName.toLowerCase()).toBeEqual("textarea");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<textarea>abc</textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea().value("abc"));
        expect(n.tagName.toLowerCase()).toBeEqual("textarea");
        expect(n.value).toBeEqual("abc");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<audio>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLAudioElement>(h.audio());
        expect(n.tagName.toLowerCase()).toBeEqual("audio");
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<audio volume=0.5>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLAudioElement>(h.audio().props({ volume: 0.5 }));
        expect(n.tagName.toLowerCase()).toBeEqual("audio");
        expect(n.volume).toBeEqual(0.5);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });

    it("<video volume=0.5>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLVideoElement>(h.video().props({ volume: 0.5 }));
        expect(n.tagName.toLowerCase()).toBeEqual("video");
        expect(n.volume).toBeEqual(0.5);
        expect(c).toMatchDOMOps(1, 0, 0, 0, 1, 0, 0);
      });
    });
  });

  describe("reusing vnodes", () => {
    it("<div>a</div>", () => {
      checkDOMOps((c) => {
        const v = h.div().children("a");
        const a = render<HTMLDivElement>(v, undefined, true);
        const b = render<HTMLDivElement>(cloneVNode(v), undefined, true);
        expect(a.childNodes.length).toBeEqual(1);
        expect(a.firstChild!.nodeValue).toBeEqual("a");
        expect(b.childNodes.length).toBeEqual(1);
        expect(b.firstChild!.nodeValue).toBeEqual("a");
        expect(c).toMatchDOMOps(2, 0, 0, 0, 2, 0, 0);
      });
    });
  });

  describe("nesting rules violation", () => {
    it("<table><tr></table>", () => {
      expect(() => { render(h.table().children(h.tr())); }).toThrow(Error);
    });

    it("<h1><h2></h1>", () => {
      expect(() => { render(h.h1().children(h.h2())); }).toThrow(Error);
    });

    it("<h1><span><h2></span></h1>", () => {
      expect(() => { render(h.h1().children(h.span().children(h.h2()))); }).toThrow(Error);
    });
  });
});
