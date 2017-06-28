/* tslint:disable:no-unused-expression */

import { SVG_NAMESPACE, XLINK_NAMESPACE, XML_NAMESPACE } from "ivi-core";
import { render, checkDOMOps, expectDOMOps, $tc, $tcf } from "./utils";
import { text, html, svg, input, media } from "../src/vdom/vnode_dom";
import { cloneVNode } from "../src/vdom/clone";
import { expect } from "chai";

describe("render", () => {
    it("'abc'", () => {
        checkDOMOps((c) => {
            const n = render<Text>(text("abc"));
            expect(n.nodeValue).to.equal("abc");
            expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
        });
    });

    it("<div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div"));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<span>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("span"));
            expect(n.tagName.toLowerCase()).to.equal("span");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div> (null props)", () => {
        checkDOMOps((c) => {
            render<HTMLElement>(html("div").props(null));
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div> ({} props)", () => {
        checkDOMOps((c) => {
            render<HTMLElement>(html("div").props({}));
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div tabIndex='1'>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").props({ tabIndex: 1 }));
            expect(n.tabIndex).to.equal(1);
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div tabIndex='1' title='2'>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").props({ tabIndex: 1, title: "2" }));
            expect(n.tabIndex).to.equal(1);
            expect(n.title).to.equal("2");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div data-abc='a'", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").props({ "data-abc": "a" }));
            expect(n.getAttribute("data-abc")).to.equal("a");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div aria-type='button'", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").props({ "aria-type": "button" }));
            expect(n.getAttribute("aria-type")).to.equal("button");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div class=null>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").className(null));
            expect(n.className).to.equal("");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div class=''>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div", ""));
            expect(n.getAttributeNode("class")).to.not.null;
            expect(n.className).to.equal("");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div class='a'>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div", "a"));
            expect(n.classList.length).to.equal(1);
            expect(n.classList.contains("a")).to.true;
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div class='a b'>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div", "a b"));
            expect(n.classList.length).to.equal(2);
            expect(n.classList.contains("a")).to.true;
            expect(n.classList.contains("b")).to.true;
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div style=null>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").style(null));
            expect(n.style.cssText).to.equal("");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div style={top: 10px}>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").style({ top: "10px" }));
            expect(n.style.top).to.equal("10px");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div style={float: 'left'}>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").style({ float: "left" }));
            expect(n.style.cssFloat).to.equal("left");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div style={top: 10px; left: 20px}>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").style({ top: "10px", left: "20px" }));
            expect(n.style.top).to.equal("10px");
            expect(n.style.left).to.equal("20px");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div></div> (null children)", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children(null));
            expect(n.childNodes.length).to.equal(0);
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div>'abc'</div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children("abc"));
            expect(n.childNodes.length).to.equal(1);
            expect(n.firstChild!.nodeValue).to.equal("abc");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div>10</div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children(10));
            expect(n.childNodes.length).to.equal(1);
            expect(n.firstChild!.nodeValue).to.equal("10");
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div><span></div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children(html("span")));
            expect(n.childNodes.length).to.equal(1);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
        });
    });

    it("<div>[]</div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children([]));
            expect(n.childNodes.length).to.equal(0);
            expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
        });
    });

    it("<div>[<span>]</div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children(html("span")));
            expect(n.childNodes.length).to.equal(1);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
        });
    });

    it("<div>[<span>, <strong>]</div>", () => {
        checkDOMOps((c) => {
            const n = render<HTMLElement>(html("div").children(html("span"), html("strong")));
            expect(n.childNodes.length).to.equal(2);
            expect(n.children[0].tagName.toLowerCase()).to.equal("span");
            expect(n.children[1].tagName.toLowerCase()).to.equal("strong");
            expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
        });
    });

    it("<div>[" +
        "  <div>'hello'</div>," +
        "  <div>[<span>'world'</span>, <div><span></div>]</div>," +
        "  <div><div></div>," +
        "  <div>" +
        "]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").children(
                    html("div").children("hello"),
                    html("div").children(html("span").children("world"), html("div").children(html("span"))),
                    html("div").children(html("div")),
                    html("div"),
                ));
                expect(n.childNodes.length).to.equal(4);
                expect(n.children[0].tagName.toLowerCase()).to.equal("div");
                expect(n.children[1].tagName.toLowerCase()).to.equal("div");
                expect(n.children[2].tagName.toLowerCase()).to.equal("div");
                expect(n.children[3].tagName.toLowerCase()).to.equal("div");

                expect(n.children[0].childNodes.length).to.equal(1);
                expect(n.children[1].childNodes.length).to.equal(2);
                expect(n.children[2].childNodes.length).to.equal(1);
                expect(n.children[3].childNodes.length).to.equal(0);

                expect(n.children[0].firstChild!.nodeValue).to.equal("hello");

                expect(n.children[1].children[0].tagName.toLowerCase()).to.equal("span");
                expect(n.children[1].children[0].firstChild!.nodeValue).to.equal("world");
                expect(n.children[1].children[1].tagName.toLowerCase()).to.equal("div");
                expect(n.children[1].children[1].childNodes.length).to.equal(1);
                expect(n.children[1].children[1].children[0].tagName.toLowerCase()).to.equal("span");

                expect(n.children[2].children[0].tagName.toLowerCase()).to.equal("div");

                expectDOMOps(c, 9, 0, 0, 0, 9, 0, 0);
            });
        });

    describe("svg", () => {
        it("<circle>", () => {
            checkDOMOps((c) => {
                const n = render<SVGCircleElement>(svg("circle"));
                expect(n.tagName.toLowerCase()).to.equal("circle");
                expect(n.namespaceURI).to.equal(SVG_NAMESPACE);
                expectDOMOps(c, 0, 1, 0, 0, 1, 0, 0);
            });
        });

        it("<circle class='a'>", () => {
            checkDOMOps((c) => {
                const n = render<SVGCircleElement>(svg("circle", "a"));
                expect(n.getAttribute("class")).to.equal("a");
                expectDOMOps(c, 0, 1, 0, 0, 1, 0, 0);
            });
        });

        it("<circle style={top: 10px}>", () => {
            checkDOMOps((c) => {
                const n = render<SVGCircleElement>(svg("circle").style({ top: "10px" }));
                expect(n.style.top).to.equal("10px");
                expectDOMOps(c, 0, 1, 0, 0, 1, 0, 0);
            });
        });

        it("<circle xlink:href='a'>", () => {
            checkDOMOps((c) => {
                const n = render<SVGCircleElement>(svg("circle").props({ "xlink:href": "a" }));
                expect(n.getAttributeNS(XLINK_NAMESPACE, "href")).to.equal("a");
                expectDOMOps(c, 0, 1, 0, 0, 1, 0, 0);
            });
        });

        it("<circle xml:text='a'>", () => {
            checkDOMOps((c) => {
                const n = render<SVGCircleElement>(svg("circle").props({ "xml:test": "a" }));
                expect(n.getAttributeNS(XML_NAMESPACE, "test")).to.equal("a");
                expectDOMOps(c, 0, 1, 0, 0, 1, 0, 0);
            });
        });
    });

    describe("children normalization", () => {
        it("<div>[<span>, [<strong>, <a>], <span>]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(
                    html("div").children(html("span"), [html("strong").key("strong"), html("a").key("a")], html("span")));
                expect(n.childNodes.length).to.equal(4);
                expect(n.children[0].tagName.toLowerCase()).to.equal("span");
                expect(n.children[1].tagName.toLowerCase()).to.equal("strong");
                expect(n.children[2].tagName.toLowerCase()).to.equal("a");
                expect(n.children[3].tagName.toLowerCase()).to.equal("span");
                expectDOMOps(c, 5, 0, 0, 0, 5, 0, 0);
            });
        });

        it("<div>['abc', []]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").children("abc", []));
                expect(n.childNodes.length).to.equal(1);
                expect(n.childNodes[0].nodeType).to.equal(Node.TEXT_NODE);
                expect(n.childNodes[0].nodeValue).to.equal("abc");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<div>[<div>, null, <span>]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").children(html("div"), null, html("span")));
                expect(n.childNodes.length).to.equal(2);
                expect(n.children[0].tagName.toLowerCase()).to.equal("div");
                expect(n.children[1].tagName.toLowerCase()).to.equal("span");
                expectDOMOps(c, 3, 0, 0, 0, 3, 0, 0);
            });
        });

        it("<div>[<div>, 'abc', <span>]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").children(html("div"), "abc", html("span")));
                expect(n.childNodes.length).to.equal(3);
                expect(n.children[0].tagName.toLowerCase()).to.equal("div");
                expect(n.childNodes[1].nodeValue).to.equal("abc");
                expect(n.children[1].tagName.toLowerCase()).to.equal("span");
                expectDOMOps(c, 3, 0, 1, 0, 4, 0, 0);
            });
        });

        it("<div>[<div>, 123, <span>]</div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").children(html("div"), 123, html("span")));
                expect(n.childNodes.length).to.equal(3);
                expect(n.children[0].tagName.toLowerCase()).to.equal("div");
                expect(n.childNodes[1].nodeValue).to.equal("123");
                expect(n.children[1].tagName.toLowerCase()).to.equal("span");
                expectDOMOps(c, 3, 0, 1, 0, 4, 0, 0);
            });
        });

        it("<div unsafeHTML='<span>abc</span>'></div>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>(html("div").unsafeHTML("<span>abc</span>"));
                expect(n.childNodes.length).to.equal(1);
                expect(n.children[0].tagName.toLowerCase()).to.equal("span");
                expect(n.children[0].firstChild!.nodeValue).to.equal("abc");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });
    });

    describe("component", () => {
        it("<C><div></C>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tc());
                expect(n.tagName.toLowerCase()).to.equal("div");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<C>''</C>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tc(""));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });

        it("<C><C><C><div></C></C></C>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tc(html("div"), 3));
                expect(n.tagName.toLowerCase()).to.equal("div");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<C><C><C>''</C></C></C>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tc("", 3));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });

        it("<F><div></F>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tcf());
                expect(n.tagName.toLowerCase()).to.equal("div");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<F>''</F>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tcf(""));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });

        it("<F><F><F><div></F></F></F>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tcf(html("div"), 3));
                expect(n.tagName.toLowerCase()).to.equal("div");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<F><F><F>''</F></F></F>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tcf("", 3));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });

        it("<F><C>''</C></F>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tcf($tc("")));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });

        it("<C><F>''</F></C>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLElement>($tc($tcf("")));
                expect(n.nodeType).to.equal(Node.TEXT_NODE);
                expect(n.nodeValue).to.equal("");
                expectDOMOps(c, 0, 0, 1, 0, 1, 0, 0);
            });
        });
    });

    describe("special elements", () => {
        it("<input type='text'>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLInputElement>(input("text"));
                expect(n.tagName.toLowerCase()).to.equal("input");
                expect(n.type).to.equal("text");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<input type='text' value='abc'>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLInputElement>(input("text").value("abc"));
                expect(n.tagName.toLowerCase()).to.equal("input");
                expect(n.type).to.equal("text");
                expect(n.value).to.equal("abc");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<input type='checkbox'>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLInputElement>(input("checkbox"));
                expect(n.tagName.toLowerCase()).to.equal("input");
                expect(n.type).to.equal("checkbox");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<input type='checkbox checked=true'>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLInputElement>(input("checkbox").checked(true));
                expect(n.tagName.toLowerCase()).to.equal("input");
                expect(n.type).to.equal("checkbox");
                expect(n.checked).to.equal(true);
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<textarea>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLTextAreaElement>(input("textarea"));
                expect(n.tagName.toLowerCase()).to.equal("textarea");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<textarea>abc</textarea>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLTextAreaElement>(input("textarea").value("abc"));
                expect(n.tagName.toLowerCase()).to.equal("textarea");
                expect(n.value).to.equal("abc");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<audio>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLAudioElement>(media("audio"));
                expect(n.tagName.toLowerCase()).to.equal("audio");
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<audio volume=0.5>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLAudioElement>(media("audio").props({ volume: 0.5 }));
                expect(n.tagName.toLowerCase()).to.equal("audio");
                expect(n.volume).to.equal(0.5);
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });

        it("<video volume=0.5>", () => {
            checkDOMOps((c) => {
                const n = render<HTMLVideoElement>(media("video").props({ volume: 0.5 }));
                expect(n.tagName.toLowerCase()).to.equal("video");
                expect(n.volume).to.equal(0.5);
                expectDOMOps(c, 1, 0, 0, 0, 1, 0, 0);
            });
        });
    });

    describe("reusing vnodes", () => {
        it("<div>a</div>", () => {
            checkDOMOps((c) => {
                const v = html("div").children("a");
                const a = render<HTMLDivElement>(v, undefined, true);
                const b = render<HTMLDivElement>(cloneVNode(v), undefined, true);
                expect(a.childNodes.length).to.equal(1);
                expect(a.firstChild!.nodeValue).to.equal("a");
                expect(b.childNodes.length).to.equal(1);
                expect(b.firstChild!.nodeValue).to.equal("a");
                expectDOMOps(c, 2, 0, 0, 0, 2, 0, 0);
            });
        });
    });

    describe("nesting rules violation", () => {
        it("<table><tr></table>", () => {
            expect(() => { render(html("table").children(html("tr"))); }).to.throw(Error);
        });

        it("<h1><h2></h1>", () => {
            expect(() => { render(html("h1").children(html("h2"))); }).to.throw(Error);
        });

        it("<h1><span><h2></span></h1>", () => {
            expect(() => { render(html("h1").children(html("span").children(html("h2")))); }).to.throw(Error);
        });
    });
});
