import { Context } from "ivi-core";
import { frag, render, staticComponent } from "./utils";
import * as h from "./utils/html";
import { context, connect } from "../src/vdom/vnode_factories";
import { expect } from "iko";

const $ContextTestPrinter = connect(
  function (props: { value: string }) {
    return h.t(props.value);
  },
  function (prev, props, ctx: Context<{ value: string }>) {
    return { value: ctx.value };
  },
);

describe("context", () => {
  describe("component API", () => {
    it("<C>10</C>", () => {
      const n = render<HTMLElement>(context({ value: 10 }, $ContextTestPrinter()));
      expect(n.nodeValue).toBe("10");
    });

    it("<C>10</C> => <C>20</C>", () => {
      const f = frag();
      render<HTMLElement>(context({ value: 10 }, $ContextTestPrinter()), f);
      const b = render<HTMLElement>(context({ value: 20 }, $ContextTestPrinter()), f);
      expect(b.nodeValue).toBe("20");
    });

    it("<C><S>10</S></C> => <C><S>20</S></C>", () => {
      const f = frag();
      render<HTMLElement>(context({ value: 10 }, staticComponent($ContextTestPrinter())), f);
      const b = render<HTMLElement>(context({ value: 20 }, staticComponent($ContextTestPrinter())), f);
      expect(b.nodeValue).toBe("20");
    });
  });
});
