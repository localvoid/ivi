import { nodeDepth } from "../src/common/dom";

const expect = chai.expect;

describe("DOM", () => {
    describe("nodeDepth", () => {
        const a = document.createElement("div");
        const b = document.createElement("div");
        a.appendChild(b);

        it("a: 1", () => {
            expect(nodeDepth(a)).to.equal(1);
        });

        it("b: 2", () => {
            expect(nodeDepth(b)).to.equal(2);
        });
    });
});
