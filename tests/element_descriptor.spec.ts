import { createElementDescriptor } from "../src/vdom/element_descriptor";
import { render } from "./utils";
import { $e } from "../src/vdom/vnode_builder";

const expect = chai.expect;

describe("render", () => {
    const DivClassName = createElementDescriptor("div")
        .className("abc");
    // const DivStyle = createElementDescriptor("div")
    //     .style({ top: "10px" });

    it("<div class='abc'></div>", () => {
        const n = render<HTMLDivElement>($e(DivClassName));
        expect(n.tagName.toLowerCase()).to.equal("div");
        expect(n.className).to.equal("abc");
    });
});
