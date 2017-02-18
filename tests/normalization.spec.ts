import { VNodeFlags } from "../src/vdom/flags";
import { VNode, $t, normalizeVNodes } from "../src/vdom/vnode";
import { $invalid } from "./utils";

const expect = chai.expect;

describe("normalization", () => {
    it("[] => []", () => {
        expect(normalizeVNodes([])).to.be.eql([]);
    });

    it("[[]] => []", () => {
        expect(normalizeVNodes([[]])).to.be.eql([]);
    });

    it("[$t] => [$t]", () => {
        const n = normalizeVNodes([$t("")]);
        expect(n.length).to.equal(1);
        expect(n[0]._key).to.equal(0);
    });

    it("[$t, $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(1);
    });

    it("[1, $t, $t] => [$t(1), $t, $t]", () => {
        const n = normalizeVNodes([1, $t(""), $t("")]);
        expect(n.length).to.equal(3);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(1);
        expect(n[2]._key).to.equal(2);
    });

    it("[1, $t, 'a', $t] => [$t(1), $t, $t('a'), $t]", () => {
        const n = normalizeVNodes([1, $t(""), "a", $t("")]);
        expect(n.length).to.equal(4);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(1);
        expect(n[2]._key).to.equal(2);
        expect(n[3]._key).to.equal(3);
    });

    it("[$t, [], $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), [], $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(2);
    });

    it("[$t, [], [], $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), [], [], $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(3);
    });

    it("[$t, null, $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), null, $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(2);
    });

    it("[$t, null, null, $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), null, null, $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(3);
    });

    it("[$t, [$t], [$t], $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), [$t("").key("a")], [$t("").key("b")], $t("")]);
        expect(n.length).to.equal(4);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal("a");
        expect(n[2]._key).to.equal("b");
        expect(n[3]._key).to.equal(3);
    });

    it("[$t, false, $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), false, $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(2);
    });

    it("[$t, false, false, $t] => [$t, $t]", () => {
        const n = normalizeVNodes([$t(""), false, false, $t("")]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal(3);
    });

    it("[null, 'abc', 123,] => [$t, $t]", () => {
        const n = normalizeVNodes([null, "abc", 123]);
        expect(n.length).to.equal(2);
        expect(n[0]._key).to.equal(1);
        expect(n[1]._key).to.equal(2);
    });

    it("[$t, $t.key, $t] => [$t, $t.key, $t]", () => {
        const n = normalizeVNodes([$t(""), $t("").key("a"), $t("")]);
        expect(n.length).to.equal(3);
        expect(n[0]._key).to.equal(0);
        expect(n[1]._key).to.equal("a");
        expect(n[2]._key).to.equal(2);
    });

    it("invalid nested array", () => {
        expect(() => { normalizeVNodes([[$t("")]]); }).to.throw(Error);
        expect(() => { normalizeVNodes([[$t("").key("a"), $t("")]]); }).to.throw(Error);
    });

    describe("xss protection", () => {
        it("[$i] => [$t]", () => {
            const n = normalizeVNodes([$invalid("a")]);
            expect(n.length).to.equal(1);
            expect(n[0]).instanceOf(VNode);
            expect(n[0]._flags & VNodeFlags.Text).to.equal(VNodeFlags.Text);
            expect(n[0]._key).to.equal(0);
        });

        it("[$t, $i] => [$t, $t]", () => {
            const n = normalizeVNodes([$t(""), $invalid("a")]);
            expect(n.length).to.equal(2);
            expect(n[1]).instanceOf(VNode);
            expect(n[1]._flags & VNodeFlags.Text).to.equal(VNodeFlags.Text);
            expect(n[1]._key).to.equal(1);
        });

        it("[null, $i] => [$t]", () => {
            const n = normalizeVNodes([null, $invalid("a")]);
            expect(n.length).to.equal(1);
            expect(n[0]).instanceOf(VNode);
            expect(n[0]._flags & VNodeFlags.Text).to.equal(VNodeFlags.Text);
            expect(n[0]._key).to.equal(1);
        });
    });
});
