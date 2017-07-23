import { startRender, $lc, $tfc, LifecycleTesterProps, TestStatelessComponentProps } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

describe("component state", () => {
  describe("stateless", () => {
    it("render", () => {
      startRender((r) => {
        r($tfc("1", {
          render: (
            props: TestStatelessComponentProps,
          ) => {
            expect(props.id).toBeEqual("1");
            return h.div();
          },
        }));
      });
    });

    it("isPropsChanged", () => {
      startRender((r) => {
        r($tfc("1", h.div()));
        r($tfc("2", {
          isPropsChanged: (
            oldProps: TestStatelessComponentProps,
            newProps: TestStatelessComponentProps,
          ) => {
            expect(oldProps.id).toBeEqual("1");
            expect(newProps.id).toBeEqual("2");
            return true;
          },
        }, h.div()));
      });
    });
  });

  describe("stateful", () => {
    it("construct", () => {
      startRender((r) => {
        r($lc("1", {
          construct: (
            props: LifecycleTesterProps,
          ) => {
            expect(props.id).toBeEqual("1");
          },
        }, h.div()));
      });
    });

    it("isPropsChanged", () => {
      startRender((r) => {
        r($lc("1", h.div()));
        r($lc("2", {
          isPropsChanged: (
            oldProps: LifecycleTesterProps,
            newProps: LifecycleTesterProps,
          ) => {
            expect(oldProps.id).toBeEqual("1");
            expect(newProps.id).toBeEqual("2");
            return true;
          },
        }, h.div()));
      });
    });

    it("newPropsReceived", () => {
      startRender((r) => {
        r($lc("1", h.div()));
        r($lc("2", {
          newPropsReceived: (
            oldProps: LifecycleTesterProps,
            newProps: LifecycleTesterProps,
          ) => {
            expect(oldProps.id).toBeEqual("1");
            expect(newProps.id).toBeEqual("2");
          },
        }, h.div()));
      });
    });

    it("attached", () => {
      startRender((r) => {
        r($lc("1", {
          attached: function () {
            expect(this.props.id).toBeEqual("1");
          },
        }, h.div()));
      });
    });

    it("detached", () => {
      startRender((r) => {
        r($lc("1", {
          detached: function () {
            expect(this.props.id).toBeEqual("1");
          },
        }, h.div()));
      });
    });

    it("beforeUpdate", () => {
      startRender((r) => {
        r($lc("1", {
          beforeUpdate: function () {
            expect(this.props.id).toBeEqual("1");
          },
        }, h.div()));
      });
    });

    it("updated", () => {
      startRender((r) => {
        r($lc("1", {
          updated: function () {
            expect(this.props.id).toBeEqual("1");
          },
        }, h.div()));
      });
    });
  });
});
