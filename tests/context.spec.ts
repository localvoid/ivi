import { frag, render, StaticComponentFunctionTest, StaticComponentTest } from "./utils";
import { Context } from "../src/vdom/context";
import { Component } from "../src/vdom/component";
import { VNode } from "../src/vdom/vnode";
import { $t, $c } from "../src/vdom/vnode_builder";

const expect = chai.expect;

interface ContextTestComponentProps {
    value: number;
    child: VNode<any>;
}

class ContextTestPrinter extends Component<null> {
    render() {
        return $t(this.context.get<number>("value") !);
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
    describe("get values", () => {
        const root = new Context({ "a": 1, "b": 2 });
        const context = new Context({ "b": 3 }, root);

        it(`get("a")`, () => {
            expect(context.get("a")).to.equal(1);
        });

        it(`get("b")`, () => {
            expect(context.get("b")).to.equal(3);
        });

        it(`get("c")`, () => {
            expect(context.get("c")).to.undefined;
        });

        it(`get({})`, () => {
            expect(context.map({}))
                .to.eql({});
        });

        it(`get({"a"})`, () => {
            expect(context.map({ "a": undefined })).to.eql({ "a": 1 });
        });

        it(`get({"b"})`, () => {
            expect(context.map({ "b": undefined })).to.eql({ "b": 3 });
        });

        it(`get({"c"})`, () => {
            expect(context.map({ "c": undefined })).to.eql({ "c": undefined });
        });

        it(`get({"a", "b"})`, () => {
            expect(context.map({ "a": undefined, "b": undefined }))
                .to.eql({ "a": 1, "b": 3 });
        });

        it(`get({"a", "b", "c"})`, () => {
            expect(context.map({ "a": undefined, "b": undefined, "c": undefined }))
                .to.eql({ "a": 1, "b": 3, "c": undefined });
        });

        it(`get({"a", "b"})`, () => {
            expect(context.map({ "a": undefined, "b": undefined }))
                .to.eql({ "a": 1, "b": 3 });
        });

        it(`get({"a", "b"})`, () => {
            expect(context.map({ "a": undefined, "c": undefined }))
                .to.eql({ "a": 1, "c": undefined });
        });

        it(`get({"b", "c"})`, () => {
            expect(context.map({ "b": undefined, "c": undefined }))
                .to.eql({ "b": 3, "c": undefined });
        });
    });

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
