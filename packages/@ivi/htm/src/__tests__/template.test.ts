import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import "global-jsdom/register";
import { createRoot } from "ivi/test";
import { htm } from "../index.js";
import { type VAny } from "ivi";

const mount = <T extends Node>(v: VAny) => {
  const root = createRoot();
  root.update(v);
  return root.findDOMNode<T>();
};

describe("template", () => {
  describe("mount", () => {
    describe("whitespaces", () => {
      test("1", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 0);
      });

      test("2", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>

          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 0);
      });

      test("3", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1> </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, " ");
      });

      test("4", () => {
        const n = mount<HTMLDivElement>(htm`
          <div>
            <h2></h2>
            <h2></h2>
          </div>
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 2);
        strictEqual((n.childNodes[0] as Element).tagName, "H2");
        strictEqual((n.childNodes[1] as Element).tagName, "H2");
      });

      test("5", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
            ab
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "ab");
      });

      test("6", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
            ab
            cd
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "ab cd");
      });

      test("7", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
            ab  cd
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "ab cd");
      });

      test("8", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>  ab  cd  </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, " ab cd ");
      });

      test("9", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
            \vab
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, " ab");
      });

      test("10", () => {
        const n = mount<HTMLDivElement>(htm`
          <h1>
            ab\v
          </h1>
        `)!;
        strictEqual(n.tagName, "H1");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "ab ");
      });
    });

    describe("structure", () => {
      test("1", () => {
        const n = mount<HTMLDivElement>(htm`<div></div>`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 0);
      });

      test("2", () => {
        const n = mount<HTMLDivElement>(htm`<div><span></span></div>`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 1);
        strictEqual(n.children[0].tagName, "SPAN");
      });

      test("3", () => {
        const n = mount<HTMLDivElement>(htm`<div>a</div>`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "a");
      });

      test("4", () => {
        const n = mount<HTMLDivElement>(htm`
          <div>
            <span></span>
          </div>
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 1);
        strictEqual(n.children[0].tagName, "SPAN");
      });

      test("7", () => {
        const n = mount<HTMLDivElement>(htm`
          <div>
            a
          </div>
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "a");
      });

      test("8", () => {
        const n = mount<HTMLDivElement>(htm`
          <div>
            a
            <span>
              b
            </span>
          </div>
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 2);
        strictEqual(n.childNodes[0].nodeValue, "a");
        strictEqual((n.childNodes[1] as Element).tagName, "SPAN");
        strictEqual(n.childNodes[1].childNodes[0].nodeValue, "b");
      });
    });

    describe("properties", () => {
      test("className 1", () => {
        const n = mount<HTMLDivElement>(htm`
          <div class="a b"></div>
        `)!;
        strictEqual(n.className, "a b");
      });

      test("attr 1", () => {
        const n = mount<HTMLDivElement>(htm`
          <div attr></div>
        `)!;
        strictEqual(n.getAttribute("attr"), "");
      });

      test("attr 2", () => {
        const n = mount<HTMLDivElement>(htm`
          <div
            attr
          ></div>
        `)!;
        strictEqual(n.getAttribute("attr"), "");
      });

      test("attr 3", () => {
        const n = mount<HTMLDivElement>(htm`
          <div attr="a"></div>
        `)!;
        strictEqual(n.getAttribute("attr"), "a");
      });

      test(".className", () => {
        const n = mount<HTMLDivElement>(htm`
          <div class=${"a b"}></div>
        `)!;
        strictEqual(n.className, "a b");
      });

      test(":attr", () => {
        const n = mount<HTMLDivElement>(htm`
          <div attr=${"a"}></div>
        `)!;
        strictEqual(n.getAttribute("attr"), "a");
      });

      test(".prop", () => {
        const n = mount<HTMLDivElement>(htm`
          <div .ariaValueMin=${"a"}></div>
        `)!;
        strictEqual(n.ariaValueMin, "a");
      });

      test("*prop", () => {
        const n = mount<HTMLDivElement>(htm`
          <div *ariaValueMin=${"a"}></div>
        `)!;
        strictEqual(n.ariaValueMin, "a");
      });

      test("static style 1", () => {
        const n = mount<HTMLDivElement>(htm`
          <div ~top="10px"></div>
        `)!;
        strictEqual(n.style.top, "10px");
      });

      test("static style merge with attribute", () => {
        const n = mount<HTMLDivElement>(htm`
          <div style="left:5px" ~top="10px"></div>
        `)!;
        strictEqual(n.style.left, "5px");
        strictEqual(n.style.top, "10px");
      });

      test("dynamic style 1", () => {
        const n = mount<HTMLDivElement>(htm`
          <div ~top=${"10px"}></div>
        `)!;
        strictEqual(n.style.top, "10px");
      });

      test("@event", () => {
        let clicked = 0;
        const onClick = () => { clicked++; };
        const n = mount<HTMLDivElement>(htm`
          <div @click=${onClick}></div>
        `)!;
        n.click();
        strictEqual(clicked, 1);
      });

      test(".textContent", () => {
        const n = mount<HTMLDivElement>(htm`
          <div .textContent=${"a"}></div>
        `)!;
        strictEqual(n.textContent, "a");
      });

      test("$directive", () => {
        let e;
        const onMount = (element: Element) => { e = element; };
        const n = mount<HTMLDivElement>(htm`
          <div>
            <span ${onMount}></span>
          </div>
        `)!;
        strictEqual(n.childNodes[0], e);
      });
    });
  });
});

describe("update", () => {
  test(".textContent: '' => 'a'", () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test(""));
    strictEqual(root.findDOMNode<HTMLDivElement>()!.firstChild, null);
    root.update(test("a"));
    strictEqual(root.findDOMNode<HTMLDivElement>()!.firstChild?.nodeValue, "a");
  });

  test(".textContent: 'a' => 'b'", () => {
    const test = (s: string) => htm`
        <div .textContent=${s}></div>
      `;
    const root = createRoot();
    root.update(test("a"));
    strictEqual(root.findDOMNode<HTMLDivElement>()!.firstChild?.nodeValue, "a");
    root.update(test("b"));
    strictEqual(root.findDOMNode<HTMLDivElement>()!.firstChild?.nodeValue, "b");
  });
});
