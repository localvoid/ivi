import { VNode, isTextNode, isElementNode, isSVGNode, isComponentNode } from "../src/vdom/vnode";
import { $t, $h, $s, $c } from "../src/vdom/vnode_builder";

const expect = chai.expect;

function EmptyComponent(): VNode<any> | undefined {
    return;
}

describe("VNode", () => {
    it("isTextNode($t)", () => {
        expect(isTextNode($t("a"))).to.true;
    });

    it("isTextNode($h)", () => {
        expect(isTextNode($h("div"))).to.false;
    });

    it("isElementNode($t)", () => {
        expect(isElementNode($t("a"))).to.false;
    });

    it("isElementNode($h)", () => {
        expect(isElementNode($h("div"))).to.true;
    });

    it("isSVGNode($h)", () => {
        expect(isSVGNode($h("div"))).to.false;
    });

    it("isSVGNode($s)", () => {
        expect(isSVGNode($s("circle"))).to.true;
    });

    it("isComponentNode($c)", () => {
        expect(isComponentNode($c(EmptyComponent))).to.true;
    });

    it("isComponentNode($h)", () => {
        expect(isComponentNode($h("div"))).to.false;
    });
});
