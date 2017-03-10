import { Context } from "../src/common/types";
import { $h, $ctx } from "../src/vdom/vnode";
import { Component } from "../src/vdom/component";
import { startRender, $lc, $tfc, TestLifecycleComponentProps, TestFunctionalComponentProps } from "./utils";
import { expect } from "chai";

describe("component state", () => {
    describe("stateless", () => {
        it("render", () => {
            startRender((r) => {
                r($tfc("1", {
                    render: (
                        props: TestFunctionalComponentProps,
                    ) => {
                        expect(props.id).to.be.equal("1");
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
    });

    describe("stateful", () => {
        it("construct", () => {
            startRender((r) => {
                r($lc("1", {
                    construct: (
                        props: TestLifecycleComponentProps,
                    ) => {
                        expect(props.id).to.be.equal("1");
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
    });
});
