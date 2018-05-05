import { connect, context } from "../src/vdom/vnode_factories";
import { frag, render, staticComponent } from "./utils";
import * as h from "./utils/html";

const ContextTestPrinterConnector = connect<{ value: string }, undefined, { value: string }>(
  (prev, props, ctx) => ({ value: ctx.value }),
  (props) => h.t(props.value),
);

describe("context", () => {
  describe("component API", () => {
    test("<C>10</C>", () => {
      const n = render<HTMLElement>(context({ value: 10 }, ContextTestPrinterConnector()));
      expect(n.nodeValue).toBe("10");
    });

    test("<C>10</C> => <C>20</C>", () => {
      const f = frag();
      render<HTMLElement>(context({ value: 10 }, ContextTestPrinterConnector()), f);
      const b = render<HTMLElement>(context({ value: 20 }, ContextTestPrinterConnector()), f);
      expect(b.nodeValue).toBe("20");
    });

    test("<C><S>10</S></C> => <C><S>20</S></C>", () => {
      const f = frag();
      render<HTMLElement>(context({ value: 10 }, staticComponent(ContextTestPrinterConnector())), f);
      const b = render<HTMLElement>(context({ value: 20 }, staticComponent(ContextTestPrinterConnector())), f);
      expect(b.nodeValue).toBe("20");
    });
  });
});
