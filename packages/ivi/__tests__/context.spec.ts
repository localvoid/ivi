import { Context } from "ivi-core";
import { frag, render, staticComponent, staticComponentFunction } from "./utils";
import * as h from "./utils/html";
import { context, connect } from "../src/vdom/vnode_factories";
import { expect } from "iko";

function ContextTestPrinter(value: string) {
  return h.t(value);
}

interface ContextTestPrinterSelect {
  in: string;
  out: string;
}

const $ContextTestPrinter = connect(
  function (
    prev: ContextTestPrinterSelect,
    props: null,
    ctx: Context<{ value: string }>,
  ): ContextTestPrinterSelect {
    return {
      in: ctx.value,
      out: ctx.value,
    };
  },
  ContextTestPrinter,
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

    it("<C><SF>10</SF></C> => <C><SF>20</SF></C>", () => {
      const f = frag();
      render<HTMLElement>(context({ value: 10 }, staticComponentFunction($ContextTestPrinter())), f);
      const b = render<HTMLElement>(context({ value: 20 }, staticComponentFunction($ContextTestPrinter())), f);
      expect(b.nodeValue).toBe("20");
    });
  });
});
