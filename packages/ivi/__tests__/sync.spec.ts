import { ComponentFlags } from "../src/vdom/flags";
import { VNode, getComponentInstanceFromVNode } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { component } from "../src/vdom/vnode_factories";
import { render, startRender, $tc, $tcf, checkDOMOps, DOMOpsCounter, domOps, resetDOMCounter } from "./utils";
import * as h from "./utils/html";

function genVNodes(item: any, keys: boolean): VNode | VNode[] {
  if (typeof item === "number") {
    return keys ? h.t(item.toString()).k(item.toString()) : h.t(item.toString());
  } else if (Array.isArray(item)) {
    const result: VNode[] = [];
    for (let i = 0; i < item.length; i++) {
      result.push(genVNodes(item[i], keys) as VNode);
    }
    return result;
  } else {
    const e = keys ? h.div().k(item.key) : h.div();
    if (keys) {
      e.c(...genVNodes(item.children, keys) as VNode[]);
    } else {
      e.c(...genVNodes(item.children, keys) as VNode[]);
    }
    return e;
  }
}

function checkInnerHtmlEquals(ax: VNode[], bx: VNode[], cx: VNode[], keys: boolean, counter: DOMOpsCounter): void {
  const a = h.div();
  const b = h.div();
  const c = h.div();
  if (keys) {
    a.c(...ax);
    b.c(...bx);
    c.c(...cx);
  } else {
    a.c(...ax);
    b.c(...bx);
    c.c(...cx);
  }

  const aDiv = document.createElement("div");
  const bDiv = document.createElement("div");
  render(a, aDiv);
  render(b, bDiv);

  resetDOMCounter(counter);
  render(c, aDiv);

  expect(aDiv.innerHTML).toBe(bDiv.innerHTML);
}

describe("sync", () => {
  describe("children", () => {
    const TESTS = [
      [[0], [0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [0, 1, 2], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],

      [[], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[], [4, 9], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[], [9, 3, 6, 1, 0], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],

      [[999], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[999], [1, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[999], [999, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[999], [4, 9, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[999], [999, 4, 9], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[999], [9, 3, 6, 1, 0, 999], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],
      [[999], [999, 9, 3, 6, 1, 0], [0, 0, 5, 0, 5, 0, 0], [0, 0, 5, 0, 5, 0, 0]],
      [[999], [0, 999, 1], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[999], [0, 3, 999, 1, 4], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
      [[999], [0, 999, 1, 4, 5], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],

      [[998, 999], [1, 998, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[998, 999], [998, 999, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[998, 999], [998, 1, 999], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[998, 999], [1, 2, 998, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[998, 999], [998, 999, 1, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[998, 999], [1, 998, 999, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[998, 999], [1, 998, 2, 999, 3], [0, 0, 3, 0, 3, 0, 0], [0, 0, 3, 0, 3, 0, 0]],
      [[998, 999], [1, 4, 998, 2, 5, 999, 3, 6], [0, 0, 6, 0, 6, 0, 0], [0, 0, 6, 0, 6, 0, 0]],
      [[998, 999], [1, 998, 2, 999], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[998, 999], [998, 1, 999, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[998, 999], [1, 2, 998, 3, 4, 999], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
      [[998, 999], [998, 1, 2, 999, 3, 4], [0, 0, 4, 0, 4, 0, 0], [0, 0, 4, 0, 4, 0, 0]],
      [[998, 999], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 998, 999], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
      [[998, 999], [998, 999, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
      [[998, 999], [0, 1, 2, 3, 4, 998, 999, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
      [[998, 999], [0, 1, 2, 998, 3, 4, 5, 6, 999, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
      [[998, 999], [0, 1, 2, 3, 4, 998, 5, 6, 7, 8, 9, 999], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],
      [[998, 999], [998, 0, 1, 2, 3, 4, 999, 5, 6, 7, 8, 9], [0, 0, 10, 0, 10, 0, 0], [0, 0, 10, 0, 10, 0, 0]],

      [[1], [], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2], [2], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2], [1], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3], [2, 3], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3], [1, 2], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3], [1, 3], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3, 4, 5], [2, 3, 4, 5], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3, 4, 5], [1, 2, 3, 4], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[1, 2, 3, 4, 5], [1, 2, 4, 5], [0, 0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 0, 1]],

      [[1, 2], [], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2, 3], [3], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3], [1], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4], [3, 4], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4], [1, 2], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4], [1, 4], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4, 5, 6], [2, 3, 4, 5], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4, 5, 6], [2, 3, 5, 6], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[1, 2, 3, 4, 5, 6], [1, 2, 3, 5], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 4, 5, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 6, 7, 8], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 1, 2, 4, 6, 7, 8, 9], [0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 2]],

      [[0, 1], [1, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3], [3, 2, 1, 0], [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [1, 2, 3, 4, 0], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [4, 0, 1, 2, 3], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [1, 0, 2, 3, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [2, 0, 1, 3, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [0, 1, 4, 2, 3], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [0, 1, 3, 4, 2], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4], [0, 1, 3, 2, 4], [0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6], [2, 1, 0, 3, 4, 5, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6], [0, 3, 4, 1, 2, 5, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6], [0, 2, 3, 5, 6, 1, 4], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6], [0, 1, 5, 3, 2, 4, 6], [0, 0, 0, 0, 2, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [8, 1, 3, 4, 5, 6, 0, 7, 2, 9],
      [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [9, 5, 0, 7, 1, 2, 3, 4, 6, 8],
      [0, 0, 0, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],

      [[0, 1], [2, 1, 0], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1], [1, 0, 2], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2], [3, 0, 2, 1], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2], [0, 2, 1, 3], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2], [0, 2, 3, 1], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2], [1, 2, 3, 0], [0, 0, 1, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2, 3, 4], [5, 4, 3, 2, 1, 0], [0, 0, 1, 0, 5, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0], [0, 0, 2, 0, 6, 0, 0], [0, 0, 2, 0, 2, 0, 0]],
      [[0, 1, 2, 3, 4], [5, 4, 3, 6, 2, 1, 0, 7], [0, 0, 3, 0, 7, 0, 0], [0, 0, 3, 0, 3, 0, 0]],

      [[0, 1, 2], [1, 0], [0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[2, 0, 1], [1, 0], [0, 0, 0, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 8, 3, 2, 1, 0], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 8, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[7, 0, 1, 8, 2, 3, 4, 5, 9], [7, 5, 4, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 1], [0, 0, 0, 0, 0, 0, 1]],
      [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0, 9], [0, 0, 0, 0, 5, 0, 2], [0, 0, 0, 0, 0, 0, 2]],
      [[7, 0, 1, 8, 2, 3, 4, 5, 9], [5, 4, 3, 2, 1, 0], [0, 0, 0, 0, 5, 0, 3], [0, 0, 0, 0, 0, 0, 3]],

      [[0], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0], [1, 2], [0, 0, 2, 0, 2, 0, 0], [0, 0, 1, 0, 1, 0, 0]],
      [[0, 2], [1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1]],
      [[0, 2], [1, 2], [0, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 2], [2, 1], [0, 0, 1, 0, 1, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [3, 4, 5], [0, 0, 3, 0, 3, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [2, 4, 5], [0, 0, 2, 0, 2, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [0, 0, 6, 0, 6, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 4, 8], [0, 0, 3, 0, 3, 0, 3], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 7, 3, 8], [0, 0, 3, 0, 3, 0, 5], [0, 0, 0, 0, 0, 0, 2]],

      [[0, 1, 2], [3, 2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2], [2, 1, 3], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2, 0], [2, 1, 3], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[1, 2, 0], [3, 2, 1], [0, 0, 1, 0, 2, 0, 1], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 1, 3, 2, 4, 7], [0, 0, 2, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4], [0, 0, 2, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0, 0]],
      [[0, 1, 2, 3, 4, 5], [6, 7, 3, 2, 4], [0, 0, 2, 0, 3, 0, 3], [0, 0, 0, 0, 0, 0, 1]],
      [[0, 2, 3, 4, 5], [6, 1, 7, 3, 2, 4], [0, 0, 3, 0, 4, 0, 2], [0, 0, 1, 0, 1, 0, 0]],

      [[{ key: 0, children: [0] }],
      [{ key: 0, children: [] }],
      [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],

      [[0, 1, { children: [0], key: 2 }],
      [{ key: 2, children: [] }],
      [0, 0, 0, 0, 0, 0, 2], [1, 0, 0, 0, 0, 1, 2]],

      [[{ key: 0, children: [] }],
      [1, 2, { key: 0, children: [0] }],
      [0, 0, 3, 0, 3, 0, 0], [1, 0, 3, 0, 3, 1, 0]],

      [[0, { key: 1, children: [0, 1] }, 2],
      [3, 2, { key: 1, children: [1, 0] }],
      [0, 0, 1, 0, 3, 0, 1], [1, 0, 3, 0, 2, 2, 0]],

      [[0, { key: 1, children: [0, 1] }, 2],
      [2, { key: 1, children: [1, 0] }, 3],
      [0, 0, 1, 0, 3, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

      [[{ key: 1, children: [0, 1] }, { key: 2, children: [0, 1] }, 0],
      [{ key: 2, children: [1, 0] }, { key: 1, children: [1, 0] }, 3],
      [0, 0, 1, 0, 4, 0, 1], [0, 0, 0, 0, 0, 0, 0]],

      [[{ key: 1, children: [0, 1] }, { key: 2, children: [] }, 0],
      [3, { key: 2, children: [1, 0] }, { key: 1, children: [] }],
      [0, 0, 3, 0, 4, 0, 1], [1, 0, 3, 0, 2, 2, 0]],

      [[0, { key: 1, children: [] }, 2, { key: 3, children: [1, 0] }, 4, 5],
      [6, { key: 1, children: [0, 1] }, { key: 3, children: [] }, 2, 4, 7],
      [0, 0, 4, 0, 5, 0, 2], [1, 0, 3, 0, 2, 2, 0]],

      [[0,
        { key: 1, children: [] },
        { key: 2, children: [] },
        { key: 3, children: [] },
        { key: 4, children: [] }, 5],
      [{ key: 6, children: [{ key: 1, children: [1] }] },
        7,
      { key: 3, children: [1] },
      { key: 2, children: [1] },
      { key: 4, children: [1] }],
      [2, 0, 5, 0, 8, 0, 3], [2, 0, 5, 0, 5, 2, 1]],

      [[0, 1, { key: 2, children: [0] }, 3, { key: 4, children: [0] }, 5],
      [6, 7, 3, { key: 2, children: [] }, { key: 4, children: [] }],
      [0, 0, 2, 0, 3, 0, 3], [1, 0, 1, 0, 0, 2, 1]],
    ];

    describe("with keys", () => {
      TESTS.forEach((t) => {
        const name = JSON.stringify(t[0]) + " => " + JSON.stringify(t[1]);
        const testFn = () => {
          checkDOMOps((c) => {
            checkInnerHtmlEquals(genVNodes(t[0], true) as VNode[],
              genVNodes(t[1], true) as VNode[],
              genVNodes(t[1], true) as VNode[],
              true,
              c,
            );
            expect(c).toEqual(domOps.apply(undefined, t[2]));
          });
        };
        test(name, testFn);
      });
    });
  });

  describe("components", () => {
    test(`<span> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <div>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<div> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><div></C> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<C><div></C> => <C>''</C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc());
          const b = r($tc(""));
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<C>''</C> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(""));
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tc(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<span> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<span> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <div>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r(h.div()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<div> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r(h.div());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<F><div></F> => <F>''</F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf());
          const b = r($tcf("")) as HTMLElement;
          expect(b.nodeType).toBe(Node.TEXT_NODE);
          expect(b.nodeValue).toBe("");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<F>''</F> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(""));
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(1, 0, 1, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <span>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r($tcf(h.div(), 3));
          const b = r(h.span()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("span");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<span> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.span());
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).toBe(b);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<C><div></C> => <F><div></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc());
          const b = r($tcf()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><div></F> => <C><div></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf());
          const b = r($tc()) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<C><C><C><div></C></C></C> => <F><F><F><div></F></F></F>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tc(h.div(), 3));
          const b = r($tcf(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<F><F><F><div></F></F></F> => <C><C><C><div></C></C></C>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = r($tcf(h.div(), 3));
          const b = r($tc(h.div(), 3)) as HTMLElement;
          expect(b.tagName.toLowerCase()).toBe("div");
          expect(a).not.toBe(b);
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });
  });

  describe("special elements", () => {
    test(`<input type='text'> => <input type='checkbox'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.input());
          const b = r(h.inputCheckbox()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<input type='text'> => <input type='text' value='cde'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.input());
          const b = r(h.input().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='text' value='abc'> => <input type='text' value='cde'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.input().value("abc"));
          const b = r(h.input().value("cde")) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='text' value='abc'> => <input type='text'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.input().value("abc"));
          const b = r(h.input()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(b.value).toBe("abc");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='checkbox'> => <input type='checkbox checked=true'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox());
          const b = r(h.inputCheckbox().checked(true)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(true);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='checkbox' checked=true> => <input type='checkbox checked=false'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox().checked(false)) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(false);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='checkbox' checked=true> => <input type='checkbox'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.inputCheckbox().checked(true));
          const b = r(h.inputCheckbox()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("checkbox");
          expect(b.checked).toBe(true);
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<input type='text'> => <textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.input());
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<textarea> => <input type='text'>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.input()) as HTMLInputElement;
          expect(b.tagName.toLowerCase()).toBe("input");
          expect(b.type).toBe("text");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });

    test(`<textarea></textarea> => <textarea>cde</textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea());
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<textarea>abc</textarea> => <textarea>cde</textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea().value("cde")) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("cde");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<textarea>abc</textarea> => <textarea></textarea>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.textarea().value("abc"));
          const b = r(h.textarea()) as HTMLTextAreaElement;
          expect(b.tagName.toLowerCase()).toBe("textarea");
          expect(b.value).toBe("abc");
          expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
        });
      });
    });

    test(`<audio> => <video>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          r(h.audio());
          const b = r(h.video()) as HTMLMediaElement;
          expect(b.tagName.toLowerCase()).toBe("video");
          expect(c).toEqual(domOps(2, 0, 0, 0, 1, 1, 0));
        });
      });
    });
  });

  describe("complex transformations", () => {
    /**
     * When component is an entry point for update and it completely changes a root node, refs to DOM Nodes on
     * parent vnodes should be updated, or parent vnodes shouldn't rely on this refs and use another way to find
     * DOM Nodes.
     */

    class A extends Component<number> {
      state = this.props;

      isPropsChanged() {
        return false;
      }

      render() {
        if (this.state === 1) {
          return h.span().c(1);
        }
        return h.div().c(0);
      }

      updateState(state: number) {
        this.state = state;
        this.flags |= ComponentFlags.DirtyState;
      }
    }

    class B extends Component<VNode> {
      render() {
        return this.props;
      }
    }

    const ca = component(A);
    const cb = component(B);

    test(`<h1><A.0> => <h1><A.1> => <A.1><h1>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).k(1);
          r(h.div().c(
            h.h1().k(0),
            a,
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            ca(1).k(1),
            h.h1().k(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).toBe("span");
          expect(n.children[0].firstChild!.nodeValue).toBe("1");
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    test(`<h1><B><A.0></B> => <h1><B><A.1></B> => <B><A.1></B><h1>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().c(
            h.h1().k(0),
            cb(a).k(1),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            cb(ca(1)).k(1),
            h.h1().k(0),
          )) as HTMLDivElement;
          expect(n.children[0].tagName.toLowerCase()).toBe("span");
          expect(n.children[0].firstChild!.nodeValue).toBe("1");
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    // same tests in the opposite direction
    test(`<A.0><h1> => <A.1><h1> => <h1><A.1>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0).k(1);
          r(h.div().c(
            a,
            h.h1().k(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            h.h1().k(0),
            ca(1).k(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).toBe("span");
          expect(n.children[1].firstChild!.nodeValue).toBe("1");
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });

    test(`<B><A.0></B><h1> => <B><A.1></B><h1> => <h1><B><A.1></B>`, () => {
      startRender((r) => {
        checkDOMOps((c) => {
          const a = ca(0);
          r(h.div().c(
            cb(a).k(1),
            h.h1().k(0),
          ));
          getComponentInstanceFromVNode<A>(a)!.updateState(1);
          const n = r(h.div().c(
            h.h1().k(0),
            cb(ca(1)).k(1),
          )) as HTMLDivElement;
          expect(n.children[1].tagName.toLowerCase()).toBe("span");
          expect(n.children[1].firstChild!.nodeValue).toBe("1");
          expect(c).toEqual(domOps(4, 0, 2, 0, 6, 1, 0));
        });
      });
    });
  });
});
