import { expect } from "chai";
import { mut } from "../src/state/mutable";
import { createStore } from "../src/state/store";
import { selectorData, memoizeSelector } from "../src/state/selector";

describe("state", function () {
    describe("mutable data", function () {
        it("init", function () {
            const m = { a: 1 };
            const a = mut(m);
            expect(a.ref).to.equal(m);
        });

        it("mutate", function () {
            const m = { a: 1 };
            const a = mut(m);
            const b = mut(a.ref);
            expect(b.ref).to.equal(m);
            expect(a).to.not.equal(b);
        });
    });

    describe("store", function () {
        it("init", function () {
            const store = createStore(
                { a: 1 },
                function (state: any) { return state; },
                function () { return; },
            );
            expect(store.getState().a).to.equal(1);
        });

        it("should not trigger onUpdate when state isn't changed", function () {
            let updated = false;
            const store = createStore(
                { a: 1 },
                function (state: any) { return state; },
                function () { updated = true; },
            );
            store.dispatch(0);
            expect(updated).to.equal(false);
        });

        it("should trigger onUpdate when state is changed", function () {
            let updated = false;
            const store = createStore(
                { a: 1 },
                function (state: any) { return Object.assign({}, state); },
                function () { updated = true; },
            );
            store.dispatch(0);
            expect(updated).to.equal(true);
        });

        it("should update state after dispatch", function () {
            const store = createStore(
                { a: 1, b: 2 },
                function (state: any) { return Object.assign({}, state, { b: 3 }); },
                function () { return; },
            );
            store.dispatch(0);
            expect(store.getState().a).to.equal(1);
            expect(store.getState().b).to.equal(3);
        });

        it("should pass action to reducer", function () {
            const store = createStore(
                { a: 0 },
                function (state: any, action: any) { return Object.assign({}, state, { a: action }); },
                function () { return; },
            );
            store.dispatch(1);
            expect(store.getState().a).to.equal(1);
        });
    });

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
                    let p;
                    let r = null;
                    const sel = memoizeSelector(
                        function (prev: any, props: any) {
                            p = prev;
                            return selectorData(props);
                        },
                        function (ref) {
                            return ref ? r = ref : r;
                        },
                    );
                    sel(1, 2);
                    expect(p).to.be.null;
                });

                it("should pass memoized value as a prev state", function () {
                    let p;
                    let r = null;
                    const sel = memoizeSelector(
                        function (prev: any, props: any) {
                            p = prev;
                            return selectorData(props);
                        },
                        function (ref) {
                            return ref ? r = ref : r;
                        },
                    );
                    sel(1, 2);
                    sel(1, 3);
                    expect(p).to.be.not.null;
                    expect(p.in).to.be.equal(2);
                    expect(p.out).to.be.equal(2);
                });
            });
        });

    });
});
