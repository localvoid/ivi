/* tslint:disable:no-unused-expression */
import { SelectorData, selectorData, memoizeSelector } from "../src/index";
import { expect } from "chai";

describe("selector", function () {
    describe("data", function () {
        it("should assign input data as a first param", function () {
            const d = selectorData(1);
            expect(d.in).to.equal(1);
        });

        it("should assign output data as a second param", function () {
            const d = selectorData(1, 2);
            expect(d.in).to.equal(1);
            expect(d.out).to.equal(2);
        });

        it("should use first param as output when second param is omitted", function () {
            const d = selectorData(1);
            expect(d.out).to.equal(1);
        });
    });
    describe("memoize", function () {
        describe("normal", function () {
            it("should initially pass a null value as a prev state", function () {
                let p: SelectorData | undefined;
                let r: SelectorData<number, number> | null = null;
                const sel = memoizeSelector(
                    function (prev: any, props: any) {
                        p = prev;
                        return selectorData(props);
                    },
                    function (ref) {
                        return ref ? r = ref : r;
                    },
                );
                sel(null, 2);
                expect(p).to.be.null;
            });

            it("should pass memoized value as a prev state", function () {
                let p: SelectorData | undefined;
                let r: SelectorData<number, number> | null = null;
                const sel = memoizeSelector(
                    function (prev: any, props: any) {
                        p = prev;
                        return selectorData(props);
                    },
                    function (ref) {
                        return ref ? r = ref : r;
                    },
                );
                sel(null, 2);
                sel(null, 3);
                expect(p).to.be.not.null;
                expect(p!.in).to.be.equal(2);
                expect(p!.out).to.be.equal(2);
            });
        });
    });

});
