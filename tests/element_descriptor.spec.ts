import { SVG_NAMESPACE } from "../src/common/dom";
import {
    createElementDescriptor, createSVGElementDescriptor, createInputElementDescriptor, createMediaElementDescriptor,
} from "../src/vdom/element_descriptor";
import { render } from "./utils";
import { $e } from "../src/vdom/vnode_dom";
import { expect } from "chai";

describe("ElementDescriptor", () => {
    describe("render", () => {
        const DivClassName = createElementDescriptor("div")
            .className("abc");
        const DivStyle = createElementDescriptor("div")
            .style({ "top": "10px" });
        const DivProps = createElementDescriptor("div")
            .props({ "id": "div" });

        it("<div class></div>", () => {
            const n = render<HTMLDivElement>($e(DivClassName));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.className).to.equal("abc");
        });

        it("<div style></div>", () => {
            const n = render<HTMLDivElement>($e(DivStyle));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.style.top).to.equal("10px");
        });

        it("<div props></div>", () => {
            const n = render<HTMLDivElement>($e(DivProps));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.id).to.equal("div");
        });

        it("<div class=override></div>", () => {
            const n = render<HTMLDivElement>($e(DivClassName, "override"));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.className).to.equal("override");
        });

        it("<div style=override></div>", () => {
            const n = render<HTMLDivElement>($e(DivStyle).style({ "top": "20px" }));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.style.top).to.equal("20px");
        });

        it("<div props=override></div>", () => {
            const n = render<HTMLDivElement>($e(DivProps).props({ "id": "override" }));
            expect(n.tagName.toLowerCase()).to.equal("div");
            expect(n.id).to.equal("override");
        });

        it("<circle></circle>", () => {
            const d = createSVGElementDescriptor("circle")
                .className("abc");
            const n = render<SVGCircleElement>($e(d));
            expect(n.tagName.toLowerCase()).to.equal("circle");
            expect(n.namespaceURI).to.equal(SVG_NAMESPACE);
            expect(n.getAttribute("class")).to.equal("abc");
        });

        it("<input></input>", () => {
            const d = createInputElementDescriptor("text");
            const n = render<HTMLInputElement>($e(d).value("abc"));
            expect(n.tagName.toLowerCase()).to.equal("input");
            expect(n.type).to.equal("text");
            expect(n.value).to.equal("abc");
        });

        it("<textarea></textarea>", () => {
            const d = createInputElementDescriptor("textarea");
            const n = render<HTMLInputElement>($e(d).value("abc"));
            expect(n.tagName.toLowerCase()).to.equal("textarea");
            expect(n.value).to.equal("abc");
        });

        it("<audio></audio>", () => {
            const d = createMediaElementDescriptor("audio");
            const n = render<HTMLAudioElement>($e(d));
            expect(n.tagName.toLowerCase()).to.equal("audio");
        });

        it("Clone: <div></div>", () => {
            const d = createElementDescriptor("div", true);
            const n = render<HTMLDivElement>($e(d));
            expect(n.tagName.toLowerCase()).to.equal("div");
        });

    });

    describe("full protect", () => {
        const DivClassName = createElementDescriptor("div")
            .className("abc", true);
        const DivStyle = createElementDescriptor("div")
            .style({ "top": "10px" }, true);
        const DivProps = createElementDescriptor("div")
            .props({ "id": "div" }, true);

        it("<div class=override></div>", () => {
            expect(() => { $e(DivClassName, "override"); }).to.throw(Error);
            expect(() => { $e(DivClassName).className("override"); }).to.throw(Error);
        });

        it("<div style=override></div>", () => {
            expect(() => { $e(DivStyle).style({ "top": "20px" }); }).to.throw(Error);
        });

        it("<div props=override></div>", () => {
            expect(() => { $e(DivProps).props({ "id": "override" }); }).to.throw(Error);
        });
    });

    describe("partial protect", () => {
        const DivStyle = createElementDescriptor("div")
            .style({ "top": "10px", "left": "20px" }, { "top": true });
        const DivProps = createElementDescriptor("div")
            .props({ "id": "div", "tabIndex": 1 }, { "id": true });

        it("Error: <div style=override></div>", () => {
            expect(() => { $e(DivStyle).style({ "top": "20px" }); }).to.throw(Error);
        });

        it("Ok: <div style=override></div>", () => {
            expect(() => { $e(DivStyle).style({ "left": "20px" }); }).not.to.throw();
        });

        it("Error: <div props=override></div>", () => {
            expect(() => { $e(DivProps).props({ "id": "override" }); }).to.throw(Error);
        });

        it("Ok: <div props=override></div>", () => {
            expect(() => { $e(DivProps).props({ "tabIndex": 2 }); }).not.to.throw();
        });
    });
});
