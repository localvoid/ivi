import { frag, render, StaticComponentFunctionTest, StaticComponentTest } from "./utils";
import { Component } from "../src/vdom/component";
import { IVNode } from "../src/vdom/ivnode";
import { $t, $c } from "../src/vdom/vnode";

const expect = chai.expect;

interface ContextTestComponentProps {
    value: number;
    child: IVNode<any>;
}

class ContextTestPrinter extends Component<null> {
    render() {
        return $t(this.context["value"]);
    }
}

class ContextTestComponent extends Component<ContextTestComponentProps> {
    updateContext() {
        return {
            value: this.props.value,
        };
    }

    render() {
        return this.props.child;
    }
}

describe("context", () => {
    describe("component API", () => {
        it("<C>10</C>", () => {
            const n = render<HTMLElement>($c(ContextTestComponent, {
                value: 10,
                child: $c(ContextTestPrinter),
            }));
            expect(n.nodeValue).to.equal("10");
        });

        it("<C>10</C> => <C>20</C>", () => {
            const f = frag();
            render<HTMLElement>($c(ContextTestComponent, {
                value: 10,
                child: $c(ContextTestPrinter),
            }), f);
            const b = render<HTMLElement>($c(ContextTestComponent, {
                value: 20,
                child: $c(ContextTestPrinter),
            }), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><S>10</S></C> => <C><S>20</S></C>", () => {
            const f = frag();
            render<HTMLElement>($c(ContextTestComponent, {
                value: 10,
                child: $c(StaticComponentTest, $c(ContextTestPrinter)),
            }), f);
            const b = render<HTMLElement>($c(ContextTestComponent, {
                value: 20,
                child: $c(StaticComponentTest, $c(ContextTestPrinter)),
            }), f);
            expect(b.nodeValue).to.equal("20");
        });

        it("<C><SF>10</SF></C> => <C><SF>20</SF></C>", () => {
            const f = frag();
            render<HTMLElement>($c(ContextTestComponent, {
                value: 10,
                child: $c(StaticComponentFunctionTest, $c(ContextTestPrinter)),
            }), f);
            const b = render<HTMLElement>($c(ContextTestComponent, {
                value: 20,
                child: $c(StaticComponentFunctionTest, $c(ContextTestPrinter)),
            }), f);
            expect(b.nodeValue).to.equal("20");
        });
    });
});
