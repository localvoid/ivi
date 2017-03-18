import { VNodeFlags } from "../src/vdom/flags";
import { VNode, $t, normalizeVNodes } from "../src/vdom/vnode";
import { expect } from "chai";

describe("normalization", () => {
    it("[]", () => {
        expect(normalizeVNodes([])).to.be.null;
    });

    it("[null]", () => {
        expect(normalizeVNodes([null])).to.be.null;
    });

    it("[null, null]", () => {
        expect(normalizeVNodes([null, null])).to.be.null;
    });

    it("[[]]", () => {
        expect(normalizeVNodes([[]])).to.be.null;
    });

    it("[[null]]", () => {
        expect(normalizeVNodes([[null]])).to.be.null;
    });

    it("[$t]", () => {
        const n = normalizeVNodes([$t("")]);
        expect(n._next).to.null;
        expect(n._prev).to.equal(n);
        expect(n._key).to.equal(0);
    });

    it("[$t, $t]", () => {
        const n = normalizeVNodes([$t(""), $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(1);
    });

    it("[1]", () => {
        const n = normalizeVNodes([1]);
        expect(n._next).to.null;
        expect(n._prev).to.equal(n);
        expect(n._key).to.equal(0);
        expect(!!(n._flags & VNodeFlags.Text)).to.true;
        expect(n._children).to.equal(1);
    });

    it("['a']", () => {
        const n = normalizeVNodes(["a"]);
        expect(n._next).to.null;
        expect(n._prev).to.equal(n);
        expect(n._key).to.equal(0);
        expect(!!(n._flags & VNodeFlags.Text)).to.true;
        expect(n._children).to.equal("a");
    });

    it("[[], $t, $t]", () => {
        const n = normalizeVNodes([[], $t(""), $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(1);
        expect(n._next._key).to.equal(2);
    });

    it("[$t, [], $t]", () => {
        const n = normalizeVNodes([$t(""), [], $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(2);
    });

    it("[$t, $t, []]", () => {
        const n = normalizeVNodes([$t(""), $t(""), []]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(1);
    });

    it("[$t, [], [], $t]", () => {
        const n = normalizeVNodes([$t(""), [], [], $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(3);
    });

    it("[null, $t, $t]", () => {
        const n = normalizeVNodes([null, $t(""), $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(1);
        expect(n._next._key).to.equal(2);
    });

    it("[$t, null, $t]", () => {
        const n = normalizeVNodes([$t(""), null, $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(2);
    });

    it("[$t, $t, null]", () => {
        const n = normalizeVNodes([$t(""), $t(""), null]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(1);
    });

    it("[$t, null, null, $t]", () => {
        const n = normalizeVNodes([$t(""), null, null, $t("")]);
        expect(n._next._next).to.null;
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal(3);
    });

    it("[$t, $t.key, $t]", () => {
        const n = normalizeVNodes([$t(""), $t("").key("a"), $t("")]);
        expect(n._next._next._next).to.null;
        expect(n._next._next._prev).to.equal(n._next);
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal("a");
        expect(n._next._next._key).to.equal(2);
    });

    it("[$t, [$t], $t]", () => {
        const n = normalizeVNodes([$t(""), [$t("").key("a")], $t("")]);
        expect(n._next._next._next).to.null;
        expect(n._next._next._prev).to.equal(n._next);
        expect(n._next._prev).to.equal(n);
        expect(n._prev).to.equal(n._next._next);
        expect(n._key).to.equal(0);
        expect(n._next._key).to.equal("a");
        expect(n._next._next._key).to.equal(2);
    });
});
