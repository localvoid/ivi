import { strictEqual } from "node:assert";
import { describe, test } from "node:test";
import "global-jsdom/register";
import { createRoot } from "ivi/test";
import { htm } from "../index.js";
import { type VAny } from "ivi";

describe("template", () => {
  describe("mount", () => {
    const mount = <T extends Node>(v: VAny) => {
      const root = createRoot();
      root.update(v);
      return root.findDOMNode<T>();
    };

    describe("structure", () => {
      test("1", () => {
        const n = mount<HTMLDivElement>(htm`div`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 0);
      });

      test("2", () => {
        const n = mount<HTMLDivElement>(htm`div span`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 1);
        strictEqual(n.children[0].tagName, "SPAN");
      });

      test("3", () => {
        const n = mount<HTMLDivElement>(htm`div 'a'`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "a");
      });

      test("4", () => {
        const n = mount<HTMLDivElement>(htm`div 'a' 'b'`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "ab");
      });

      test("5", () => {
        const n = mount<HTMLDivElement>(htm`div 'a' span 'b'`)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 2);
        strictEqual(n.childNodes[0].nodeValue, "a");
        strictEqual((n.childNodes[1] as Element).tagName, "SPAN");
        strictEqual(n.childNodes[1].childNodes[0].nodeValue, "b");
      });

      test("6", () => {
        const n = mount<HTMLDivElement>(htm`
          div
            span
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.children.length, 1);
        strictEqual(n.children[0].tagName, "SPAN");
      });

      test("7", () => {
        const n = mount<HTMLDivElement>(htm`
          div
            'a'
        `)!;
        strictEqual(n.tagName, "DIV");
        strictEqual(n.childNodes.length, 1);
        strictEqual(n.childNodes[0].nodeValue, "a");
      });

      test("8", () => {
        const n = mount<HTMLDivElement>(htm`
          div
            'a'
            span
              'b'
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
          div.a.b
        `)!;
        strictEqual(n.className, "a b");
      });

      test("attr 1", () => {
        const n = mount<HTMLDivElement>(htm`
          div :attr
        `)!;
        strictEqual(n.getAttribute("attr"), "");
      });

      test("attr 2", () => {
        const n = mount<HTMLDivElement>(htm`
          div
            :attr
        `)!;
        strictEqual(n.getAttribute("attr"), "");
      });

      test("attr 3", () => {
        const n = mount<HTMLDivElement>(htm`
          div :attr='a'
        `)!;
        strictEqual(n.getAttribute("attr"), "a");
      });

      test("attr 4", () => {
        const n = mount<HTMLDivElement>(htm`
          div
            :attr='a'
        `)!;
        strictEqual(n.getAttribute("attr"), "a");
      });

      test(".className", () => {
        const n = mount<HTMLDivElement>(htm`
          div${"a b"}
        `)!;
        strictEqual(n.className, "a b");
      });

      test(":attr", () => {
        const n = mount<HTMLDivElement>(htm`
          div :attr=${"a"}
        `)!;
        strictEqual(n.getAttribute("attr"), "a");
      });

      test(".prop", () => {
        const n = mount<HTMLDivElement>(htm`
          div .ariaValueMin=${"a"}
        `)!;
        strictEqual(n.ariaValueMin, "a");
      });

      test("*prop", () => {
        const n = mount<HTMLDivElement>(htm`
          div *ariaValueMin=${"a"}
        `)!;
        strictEqual(n.ariaValueMin, "a");
      });

      test("~style", () => {
        const n = mount<HTMLDivElement>(htm`
          div ~top=${"10px"}
        `)!;
        strictEqual(n.style.top, "10px");
      });

      test("@event", () => {
        let clicked = 0;
        const onClick = () => { clicked++; };
        const n = mount<HTMLDivElement>(htm`
          div @click=${onClick}
        `)!;
        n.click();
        strictEqual(clicked, 1);
      });

      test("=textContent", () => {
        const n = mount<HTMLDivElement>(htm`
          div =${"a"}
        `)!;
        strictEqual(n.textContent, "a");
      });

      test("$directive", () => {
        let e;
        const onMount = (element: Element) => { e = element; };
        const n = mount<HTMLDivElement>(htm`
          div span $${onMount}
        `)!;
        strictEqual(n.childNodes[0], e);
      });
    });
  });
});
