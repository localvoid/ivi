import { startRender, $lc, $tfc, TestLifecycleComponentProps, TestFunctionalComponentProps, html } from "./utils";
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
            return html("div");
          },
        }));
      });
    });

    it("isPropsChanged", () => {
      startRender((r) => {
        r($tfc("1", html("div")));
        r($tfc("2", {
          isPropsChanged: (
            oldProps: TestFunctionalComponentProps,
            newProps: TestFunctionalComponentProps,
          ) => {
            expect(oldProps.id).to.be.equal("1");
            expect(newProps.id).to.be.equal("2");
            return true;
          },
        }, html("div")));
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
        }, html("div")));
      });
    });

    it("isPropsChanged", () => {
      startRender((r) => {
        r($lc("1", html("div")));
        r($lc("2", {
          isPropsChanged: (
            oldProps: TestLifecycleComponentProps,
            newProps: TestLifecycleComponentProps,
          ) => {
            expect(oldProps.id).to.be.equal("1");
            expect(newProps.id).to.be.equal("2");
            return true;
          },
        }, html("div")));
      });
    });

    it("newPropsReceived", () => {
      startRender((r) => {
        r($lc("1", html("div")));
        r($lc("2", {
          newPropsReceived: (
            oldProps: TestLifecycleComponentProps,
            newProps: TestLifecycleComponentProps,
          ) => {
            expect(oldProps.id).to.be.equal("1");
            expect(newProps.id).to.be.equal("2");
          },
        }, html("div")));
      });
    });

    it("attached", () => {
      startRender((r) => {
        r($lc("1", {
          attached: function () {
            expect(this.props.id).to.be.equal("1");
          },
        }, html("div")));
      });
    });

    it("detached", () => {
      startRender((r) => {
        r($lc("1", {
          detached: function () {
            expect(this.props.id).to.be.equal("1");
          },
        }, html("div")));
      });
    });

    it("beforeUpdate", () => {
      startRender((r) => {
        r($lc("1", {
          beforeUpdate: function () {
            expect(this.props.id).to.be.equal("1");
          },
        }, html("div")));
      });
    });

    it("updated", () => {
      startRender((r) => {
        r($lc("1", {
          updated: function () {
            expect(this.props.id).to.be.equal("1");
          },
        }, html("div")));
      });
    });
  });
});
