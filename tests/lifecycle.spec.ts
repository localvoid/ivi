import { $h } from "../src/vdom/vnode";
import { startRender, augment, checkLifecycle, $lc, $sc } from "./utils";

const expect = chai.expect;

describe("lifecycle", () => {
    it("<C><div></C>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($lc("1", $h("div")));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<C><div></C> => <div>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($lc("1", $h("div")));
                render($h("div"));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);
                expect(c("1", "detached")).to.equal(4);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<div> => <C><div></C>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($h("div"));
                render($lc("1", $h("div")));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<div></div> => <div><C><div></C></div>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($h("div"));
                render($h("div").children($lc("1", $h("div"))));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<div><C><div></C></div> => <div></div>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($h("div").children($lc("1", $h("div"))));
                render($h("div"));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);
                expect(c("1", "detached")).to.equal(4);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<C><C><div></C></C>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($lc("1", $lc("2", $h("div"))));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("2", "constructor")).to.equal(3);
                expect(c("2", "updateContext")).to.equal(4);
                expect(c("2", "render")).to.equal(5);
                expect(c("1", "attached")).to.equal(6);
                expect(c("2", "attached")).to.equal(7);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);

                expect(c("2", "isPropsChanged")).to.equal(-1);
                expect(c("2", "newPropsReceived")).to.equal(-1);
                expect(c("2", "newContextReceived")).to.equal(-1);
                expect(c("2", "detached")).to.equal(-1);
                expect(c("2", "beforeUpdate")).to.equal(-1);
                expect(c("2", "updated")).to.equal(-1);
                expect(c("2", "invalidated")).to.equal(-1);
                expect(c("2", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<C><C><div></C></C> => <div>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($lc("1", $lc("2", $h("div"))));
                render($h("div"));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("2", "constructor")).to.equal(3);
                expect(c("2", "updateContext")).to.equal(4);
                expect(c("2", "render")).to.equal(5);
                expect(c("1", "attached")).to.equal(6);
                expect(c("2", "attached")).to.equal(7);
                expect(c("2", "detached")).to.equal(8);
                expect(c("1", "detached")).to.equal(9);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);

                expect(c("2", "isPropsChanged")).to.equal(-1);
                expect(c("2", "newPropsReceived")).to.equal(-1);
                expect(c("2", "newContextReceived")).to.equal(-1);
                expect(c("2", "beforeUpdate")).to.equal(-1);
                expect(c("2", "updated")).to.equal(-1);
                expect(c("2", "invalidated")).to.equal(-1);
                expect(c("2", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<C><div></C> => <C><div></C>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($lc("1", $h("div")));
                render($lc("1", $h("div")));

                expect(c("1", "constructor")).to.equal(0);
                // updateContext is executed twice because LifecycleTestComponent is accessing `props` in updateContext.
                expect(c("1", "attached")).to.equal(3);
                expect(c("1", "isPropsChanged")).to.equal(4);
                expect(c("1", "newPropsReceived")).to.equal(5);
                expect(c("1", "beforeUpdate")).to.equal(6);
                expect(c("1", "updateContext")).to.equal(7); // 1
                expect(c("1", "render")).to.equal(8); // 2
                expect(c("1", "updated")).to.equal(9);

                expect(c("1", "updateContext", false)).to.equal(1);
                expect(c("1", "render", false)).to.equal(1);

                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    it("<S><C><div></C></S> => <S><C><div></C></S>", () => {
        startRender((render) => {
            checkLifecycle((c) => {
                render($sc($lc("1", $h("div"))));
                render($sc($lc("1", $h("div"))));

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "attached")).to.equal(3);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);

                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
                expect(c("1", "shouldAugment")).to.equal(-1);
            });
        });
    });

    describe("augment", () => {
        it("<C><div></C>", () => {
            checkLifecycle((c) => {
                augment($lc("1", $h("div")), `<div></div>`);

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "shouldAugment")).to.equal(3);
                expect(c("1", "attached")).to.equal(4);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
            });
        });

        it("<C shouldAugment=false><div></C>", () => {
            checkLifecycle((c) => {
                augment($lc("1", { shouldAugment: () => false }, $h("div")), `<div></div>`);

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "shouldAugment")).to.equal(3);
                expect(c("1", "attached")).to.equal(4);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);
            });
        });

        it("<C shouldAugment=false><C><div></C></C>", () => {
            checkLifecycle((c) => {
                augment($lc("1", { shouldAugment: () => false }, $lc("2", $h("div"))), `<div></div>`);

                expect(c("1", "constructor")).to.equal(0);
                expect(c("1", "updateContext")).to.equal(1);
                expect(c("1", "render")).to.equal(2);
                expect(c("1", "shouldAugment")).to.equal(3);
                expect(c("2", "constructor")).to.equal(4);
                expect(c("2", "updateContext")).to.equal(5);
                expect(c("2", "render")).to.equal(6);
                expect(c("1", "attached")).to.equal(7);
                expect(c("2", "attached")).to.equal(8);

                expect(c("1", "isPropsChanged")).to.equal(-1);
                expect(c("1", "newPropsReceived")).to.equal(-1);
                expect(c("1", "newContextReceived")).to.equal(-1);
                expect(c("1", "detached")).to.equal(-1);
                expect(c("1", "beforeUpdate")).to.equal(-1);
                expect(c("1", "updated")).to.equal(-1);
                expect(c("1", "invalidated")).to.equal(-1);

                expect(c("2", "isPropsChanged")).to.equal(-1);
                expect(c("2", "newPropsReceived")).to.equal(-1);
                expect(c("2", "newContextReceived")).to.equal(-1);
                expect(c("2", "detached")).to.equal(-1);
                expect(c("2", "beforeUpdate")).to.equal(-1);
                expect(c("2", "updated")).to.equal(-1);
                expect(c("2", "invalidated")).to.equal(-1);
                expect(c("2", "shouldAugment")).to.equal(-1);
            });
        });
    });
});
