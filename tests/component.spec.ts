import { $h } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { startRender, $lc, $ctx, $tfc, TestLifecycleComponentProps, TestFunctionalComponentProps } from "./utils";
import { expect } from "chai";

describe("component state", () => {
    describe("stateless", () => {
        it("render", () => {
            startRender((r) => {
                r($tfc("1", {
                    render: (
                        props: TestFunctionalComponentProps,
                        context: { [key: string]: any },
                    ) => {
                        expect(props.id).to.be.equal("1");
                        expect(Object.keys(context).length).to.be.equal(0);
                        return $h("div");
                    },
                }));
            });
        });

        it("isPropsChanged", () => {
            startRender((r) => {
                r($tfc("1", $h("div")));
                r($tfc("2", {
                    isPropsChanged: (
                        oldProps: TestFunctionalComponentProps,
                        newProps: TestFunctionalComponentProps,
                    ) => {
                        expect(oldProps.id).to.be.equal("1");
                        expect(newProps.id).to.be.equal("2");
                        return true;
                    },
                }, $h("div")));
            });
        });

        describe("context", () => {
            it("render", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $tfc("1", {
                        render: (
                            props: TestFunctionalComponentProps,
                            context: { [key: string]: any },
                        ) => {
                            expect(context.ctx).to.be.equal(123);
                            return $h("div");
                        },
                    })));
                });
            });
        });
    });

    describe("stateful", () => {
        it("construct", () => {
            startRender((r) => {
                r($lc("1", {
                    construct: (
                        props: TestLifecycleComponentProps,
                        context: { [key: string]: any },
                        owner: Component<any> | undefined,
                    ) => {
                        expect(props.id).to.be.equal("1");
                        expect(Object.keys(context).length).to.be.equal(0);
                        expect(owner).to.be.undefined;
                    },
                }, $h("div")));
            });
        });

        it("isPropsChanged", () => {
            startRender((r) => {
                r($lc("1", $h("div")));
                r($lc("2", {
                    isPropsChanged: (
                        oldProps: TestLifecycleComponentProps,
                        newProps: TestLifecycleComponentProps,
                    ) => {
                        expect(oldProps.id).to.be.equal("1");
                        expect(newProps.id).to.be.equal("2");
                        return true;
                    },
                }, $h("div")));
            });
        });

        it("newPropsReceived", () => {
            startRender((r) => {
                r($lc("1", $h("div")));
                r($lc("2", {
                    newPropsReceived: (
                        oldProps: TestLifecycleComponentProps,
                        newProps: TestLifecycleComponentProps,
                    ) => {
                        expect(oldProps.id).to.be.equal("1");
                        expect(newProps.id).to.be.equal("2");
                    },
                }, $h("div")));
            });
        });

        it("updateContext", () => {
            startRender((r) => {
                r($lc("1", {
                    updateContext: function () {
                        expect(this.props.id).to.be.equal("1");
                        return undefined;
                    },
                }, $h("div")));
            });
        });

        it("attached", () => {
            startRender((r) => {
                r($lc("1", {
                    attached: function () {
                        expect(this.props.id).to.be.equal("1");
                    },
                }, $h("div")));
            });
        });

        it("detached", () => {
            startRender((r) => {
                r($lc("1", {
                    detached: function () {
                        expect(this.props.id).to.be.equal("1");
                    },
                }, $h("div")));
            });
        });

        it("beforeUpdate", () => {
            startRender((r) => {
                r($lc("1", {
                    beforeUpdate: function () {
                        expect(this.props.id).to.be.equal("1");
                    },
                }, $h("div")));
            });
        });

        it("updated", () => {
            startRender((r) => {
                r($lc("1", {
                    updated: function () {
                        expect(this.props.id).to.be.equal("1");
                    },
                }, $h("div")));
            });
        });

        describe("context", () => {
            it("construct", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        construct: (
                            props: TestLifecycleComponentProps,
                            context: { [key: string]: any },
                            owner: Component<any> | undefined,
                        ) => {
                            expect(context.ctx).to.be.equal(123);
                        },
                    }, $h("div"))));
                });
            });

            it("newContextReceived", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", $h("div"))));
                    r($ctx(() => ({ ctx: 456 }), $lc("2", {
                        newContextReceived: (
                            oldContext: { [key: string]: any },
                            newContext: { [key: string]: any },
                        ) => {
                            expect(oldContext.ctx).to.be.equal(123);
                            expect(newContext.ctx).to.be.equal(456);
                        },
                    }, $h("div"))));
                });
            });

            it("updateContext", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        updateContext: function () {
                            expect(this.context.ctx).to.be.equal(123);
                            return undefined;
                        },
                    }, $h("div"))));
                });
            });

            it("attached", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        attached: function () {
                            expect(this.context.ctx).to.be.equal(123);
                        },
                    }, $h("div"))));
                });
            });

            it("detached", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        detached: function () {
                            expect(this.context.ctx).to.be.equal(123);
                        },
                    }, $h("div"))));
                });
            });

            it("beforeUpdate", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        beforeUpdate: function () {
                            expect(this.context.ctx).to.be.equal(123);
                        },
                    }, $h("div"))));
                });
            });

            it("updated", () => {
                startRender((r) => {
                    r($ctx(() => ({ ctx: 123 }), $lc("1", {
                        updated: function () {
                            expect(this.context.ctx).to.be.equal(123);
                        },
                    }, $h("div"))));
                });
            });

        });
    });
});
