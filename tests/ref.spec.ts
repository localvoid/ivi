import { frag, render, TestComponent, TestComponentFunction } from "./utils";
import { getComponentRef } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { $t, $h, $c } from "../src/vdom/vnode_builder";

const expect = chai.expect;

describe("ref", () => {
    describe("mount", () => {
        it("'abc'", () => {
            let r: Node | null | undefined;
            const n = render<HTMLDivElement>($t("abc").ref((ref) => r = ref));
            expect(r).to.equal(n);
        });

        it("<div>", () => {
            let r: Node | null | undefined;
            const n = render<HTMLDivElement>($h("div").ref((ref) => r = ref));
            expect(r).to.equal(n);
        });

        it("<C><div></C>", () => {
            let r: Component<any> | null | undefined;
            const v = $c(TestComponent, {}).ref((ref: Component<any>) => r = ref);
            render<Text>(v);
            expect(r).to.equal(getComponentRef(v));
        });

        it("<F><div></F>", () => {
            let r: Node | null | undefined;
            const n = render<HTMLDivElement>($c(TestComponentFunction, {}).ref((ref: Node) => r = ref));
            expect(r).to.equal(n);
        });
    });

    describe("unmount", () => {
        it("'abc'", () => {
            const f = frag();
            let r: Node | null | undefined;
            render<Text>($t("abc").ref((ref) => r = ref), f);
            render<Text>($h("div"), f);
            expect(r).to.equal(null);
        });

        it("<div>", () => {
            const f = frag();
            let r: Node | null | undefined;
            render<Text>($h("div").ref((ref) => r = ref), f);
            render<Text>($t("abc"), f);
            expect(r).to.equal(null);
        });

        it("<C><div></C>", () => {
            const f = frag();
            let r: Component<any> | null | undefined;
            render<Text>($c(TestComponent, {}).ref((ref: Component<any>) => r = ref), f);
            render<Text>($t("abc"), f);
            expect(r).to.equal(null);
        });

        it("<F><div></F>", () => {
            const f = frag();
            let r: Component<any> | null | undefined;
            render<Text>($c(TestComponentFunction, {}).ref((ref: Component<any>) => r = ref), f);
            render<Text>($t("abc"), f);
            expect(r).to.equal(null);
        });
    });
});
