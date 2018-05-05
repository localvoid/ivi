import { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "ivi-core";
import { render, $tc, $tcf, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";
import * as s from "./utils/svg";

describe("render", () => {
  test("'abc'", () => {
    checkDOMOps((c) => {
      const n = render<Text>(h.t("abc"));
      expect(n.nodeValue).toBe("abc");
      expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
    });
  });

  test("<div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div());
      expect(n.tagName.toLowerCase()).toBe("div");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<span>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.span());
      expect(n.tagName.toLowerCase()).toBe("span");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div> (null props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().a(null));
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div> ({} props)", () => {
    checkDOMOps((c) => {
      render<HTMLElement>(h.div().a({}));
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div tabIndex='1'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ tabIndex: 1 }));
      expect(n.tabIndex).toBe(1);
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div tabIndex='1' title='2'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ tabIndex: 1, title: "2" }));
      expect(n.tabIndex).toBe(1);
      expect(n.title).toBe("2");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div data-abc='a'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ "data-abc": "a" }));
      expect(n.getAttribute("data-abc")).toBe("a");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div aria-type='button'", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().a({ "aria-type": "button" }));
      expect(n.getAttribute("aria-type")).toBe("button");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div class=''>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div(""));
      expect(n.getAttributeNode("class")).not.toBeNull();
      expect(n.className).toBe("");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div class='a'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a"));
      expect(n.classList.length).toBe(1);
      expect(n.classList.contains("a")).toBe(true);
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div class='a b'>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div("a b"));
      expect(n.classList.length).toBe(2);
      expect(n.classList.contains("a")).toBe(true);
      expect(n.classList.contains("b")).toBe(true);
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div style=null>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s(null));
      expect(n.style.cssText).toBe("");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div style={top: 10px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ top: "10px" }));
      expect(n.style.top).toBe("10px");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div style={float: 'left'}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ float: "left" }));
      expect(n.style.cssFloat).toBe("left");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div style={top: 10px; left: 20px}>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().s({ top: "10px", left: "20px" }));
      expect(n.style.top).toBe("10px");
      expect(n.style.left).toBe("20px");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div></div> (null children)", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(null));
      expect(n.childNodes.length).toBe(0);
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });

  test("<div>'abc'</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c("abc"));
      expect(n.childNodes.length).toBe(1);
      expect(n.firstChild!.nodeValue).toBe("abc");
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });

  test("<div>10</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(10));
      expect(n.childNodes.length).toBe(1);
      expect(n.firstChild!.nodeValue).toBe("10");
      expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
    });
  });

  test("<div><span></div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(h.span()));
      expect(n.childNodes.length).toBe(1);
      expect(n.children[0].tagName.toLowerCase()).toBe("span");
      expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
    });
  });

  test("<div>[<span>, <strong>]</div>", () => {
    checkDOMOps((c) => {
      const n = render<HTMLElement>(h.div().c(h.span(), h.strong()));
      expect(n.childNodes.length).toBe(2);
      expect(n.children[0].tagName.toLowerCase()).toBe("span");
      expect(n.children[1].tagName.toLowerCase()).toBe("strong");
      expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
    });
  });

  test("<div>[" +
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

        expect(c).toEqual(domOps(9, 0, 2, 0, 11, 0, 0));
      });
    });

  describe("svg", () => {
    test("<circle>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle());
        expect(n.tagName.toLowerCase()).toBe("circle");
        expect(n.namespaceURI).toBe(SVG_NAMESPACE);
        expect(c).toEqual(domOps(0, 1, 0, 0, 1, 0, 0));
      });
    });

    test("<circle class='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle("a"));
        expect(n.getAttribute("class")).toBe("a");
        expect(c).toEqual(domOps(0, 1, 0, 0, 1, 0, 0));
      });
    });

    test("<circle style={top: 10px}>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().s({ top: "10px" }));
        expect(n.style.top).toBe("10px");
        expect(c).toEqual(domOps(0, 1, 0, 0, 1, 0, 0));
      });
    });

    test("<circle xlink:href='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().a({ "xlink:href": "a" }));
        expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).toBe("a");
        expect(c).toEqual(domOps(0, 1, 0, 0, 1, 0, 0));
      });
    });

    test("<circle xml:text='a'>", () => {
      checkDOMOps((c) => {
        const n = render<SVGCircleElement>(s.circle().a({ "xml:test": "a" }));
        expect(n.getAttributeNS(XML_NAMESPACE, "test")).toBe("a");
        expect(c).toEqual(domOps(0, 1, 0, 0, 1, 0, 0));
      });
    });
  });

  describe("children normalization", () => {
    // test("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
    //   checkDOMOps((c) => {
    //     const n = render<HTMLElement>(
    //       h.div().c(
    //         h.span(),
    //         [h.strong().k("strong"), h.a().k("a")], h.span(),
    //       ),
    //     );
    //     expect(n.childNodes.length).toBe(4);
    //     expect(n.children[0].tagName.toLowerCase()).toBe("span");
    //     expect(n.children[1].tagName.toLowerCase()).toBe("strong");
    //     expect(n.children[2].tagName.toLowerCase()).toBe("a");
    //     expect(n.children[3].tagName.toLowerCase()).toBe("span");
    //     expect(c).toEqual(domOps(5, 0, 0, 0, 5, 0, 0));
    //   });
    // });

    // test("<div>['abc', []]</div>", () => {
    //   checkDOMOps((c) => {
    //     const n = render<HTMLElement>(h.div().c("abc", []));
    //     expect(n.childNodes.length).toBe(1);
    //     expect(n.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
    //     expect(n.childNodes[0].nodeValue).toBe("abc");
    //     expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    //   });
    // });

    test("<div>[<div>, null, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), null, h.span()));
        expect(n.childNodes.length).toBe(2);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
      });
    });

    test("<div>[<div>, 'abc', <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), "abc", h.span()));
        expect(n.childNodes.length).toBe(3);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.childNodes[1].nodeValue).toBe("abc");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toEqual(domOps(3, 0, 1, 0, 4, 0, 0));
      });
    });

    test("<div>[<div>, 123, <span>]</div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().c(h.div(), 123, h.span()));
        expect(n.childNodes.length).toBe(3);
        expect(n.children[0].tagName.toLowerCase()).toBe("div");
        expect(n.childNodes[1].nodeValue).toBe("123");
        expect(n.children[1].tagName.toLowerCase()).toBe("span");
        expect(c).toEqual(domOps(3, 0, 1, 0, 4, 0, 0));
      });
    });

    test("<div unsafeHTML='<span>abc</span>'></div>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>(h.div().unsafeHTML("<span>abc</span>"));
        expect(n.childNodes.length).toBe(1);
        expect(n.children[0].tagName.toLowerCase()).toBe("span");
        expect(n.children[0].firstChild!.nodeValue).toBe("abc");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });
  });

  describe("component", () => {
    test("<C><div></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc());
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<C>''</C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(""));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });

    test("<C><C><C><div></C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<C><C><C>''</C></C></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc("", 3));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });

    test("<F><div></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf());
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<F>''</F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(""));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });

    test("<F><F><F><div></F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf(h.div(), 3));
        expect(n.tagName.toLowerCase()).toBe("div");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<F><F><F>''</F></F></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf("", 3));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });

    test("<F><C>''</C></F>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tcf($tc("")));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });

    test("<C><F>''</F></C>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLElement>($tc($tcf("")));
        expect(n.nodeType).toBe(Node.TEXT_NODE);
        expect(n.nodeValue).toBe("");
        expect(c).toEqual(domOps(0, 0, 1, 0, 1, 0, 0));
      });
    });
  });

  describe("special elements", () => {
    test("<input type='text'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.input());
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("text");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<input type='text' value='abc'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.input().value("abc"));
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("text");
        expect(n.value).toBe("abc");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<input type='checkbox'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox());
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("checkbox");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<input type='checkbox' checked='true'>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLInputElement>(h.inputCheckbox().checked(true));
        expect(n.tagName.toLowerCase()).toBe("input");
        expect(n.type).toBe("checkbox");
        expect(n.checked).toBe(true);
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea());
        expect(n.tagName.toLowerCase()).toBe("textarea");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<textarea>abc</textarea>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLTextAreaElement>(h.textarea().value("abc"));
        expect(n.tagName.toLowerCase()).toBe("textarea");
        expect(n.value).toBe("abc");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });

    test("<audio>", () => {
      checkDOMOps((c) => {
        const n = render<HTMLAudioElement>(h.audio());
        expect(n.tagName.toLowerCase()).toBe("audio");
        expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
      });
    });
  });

  describe("nesting rules violation", () => {
    test("<table><tr></table>", () => {
      expect(() => { render(h.table().c(h.tr())); }).toThrow(Error);
    });

    test("<h1><h2></h1>", () => {
      expect(() => { render(h.h1().c(h.h2())); }).toThrow(Error);
    });

    test("<h1><span><h2></span></h1>", () => {
      expect(() => { render(h.h1().c(h.span().c(h.h2()))); }).toThrow(Error);
    });
  });
});
