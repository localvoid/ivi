import { frag, render, $sc, $fsc } from "./utils";
import { Component } from "../src/vdom/component";
import { IVNode } from "../src/vdom/ivnode";
import { $t, $c, $ctx } from "../src/vdom/vnode";
import { expect } from "chai";

interface ContextTestComponentProps {
    value: number;
    child: IVNode<any>;
}

class ContextTestPrinter extends Component<null> {
    render() {
        return $t(this.getContext<{ value: string }>().value);
    }
}

describe("context", () => {
    describe("component API", () => {
        it("<C>10</C>", () => {
            const n = render<HTMLElement>($ctx({ value: 10 }, $c(ContextTestPrinter)));
            expect(n.nodeValue).to.equal("10");
        });

        it("<C>10</C> => <C>20</C>", () => {
            const f = frag();
            render<HTMLElement>($ctx({ value: 10 }, $c(ContextTestPrinter)), f);
            const b = render<HTMLElement>($ctx({ value: 20 }, $c(ContextTestPrinter)), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><S>10</S></C> => <C><S>20</S></C>", () => {
            const f = frag();
            render<HTMLElement>($ctx({ value: 10 }, $sc($c(ContextTestPrinter))), f);
            const b = render<HTMLElement>($ctx({ value: 20 }, $sc($c(ContextTestPrinter))), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><SF>10</SF></C> => <C><SF>20</SF></C>", () => {
            const f = frag();
            render<HTMLElement>($ctx({ value: 10 }, $fsc($c(ContextTestPrinter))), f);
            const b = render<HTMLElement>($ctx({ value: 20 }, $fsc($c(ContextTestPrinter))), f);
            expect(b.nodeValue).to.equal("20");
        });
    });
});
