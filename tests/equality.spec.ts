import { isPropsNotIdentical, isPropsNotShallowEqual } from "../src/common/equality";
import { expect } from "chai";

describe("equality", () => {
    describe("isPropsNotIdentical", () => {
        it("1 === 1", () => {
            expect(isPropsNotIdentical(1, 1)).to.false;
        });

        it("1 !== 2", () => {
            expect(isPropsNotIdentical(1, 2)).to.true;
        });

        it("{a} === {a} (same instance)", () => {
            const a = { a: 1 };
            expect(isPropsNotIdentical(a, a)).to.false;
        });

        it("{a} !== {a} (different instances)", () => {
            expect(isPropsNotIdentical({ a: 1 }, { a: 1 })).to.true;
        });
    });

    describe("isPropsNotShallowEqual", () => {
        it("{a} === {a} (same instance)", () => {
            const a = { a: 1 };
            expect(isPropsNotShallowEqual(a, a)).to.false;
        });

        it("{a} === {a} (different instances)", () => {
            expect(isPropsNotShallowEqual({ a: 1 }, { a: 1 })).to.false;
        });

        it("{a:1} !== {a:2}", () => {
            expect(isPropsNotShallowEqual({ a: 1 }, { a: 2 })).to.true;
        });

        it("{a, b} !== {a}", () => {
            expect(isPropsNotShallowEqual<{ a: number, b?: number }>({ a: 1, b: 2 }, { a: 1 })).to.true;
        });
    });
});
