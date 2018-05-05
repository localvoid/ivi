import { $lc, $tfc, LifecycleTesterProps, TestStatelessComponentProps, startRender } from "./utils";
import * as h from "./utils/html";

describe("component state", () => {
  describe("stateless", () => {
    test("render", () => {
      startRender((r) => {
        r($tfc("1", {
          render: (
            props: TestStatelessComponentProps,
          ) => {
            expect(props.id).toBe("1");
            return h.div();
          },
        }));
      });
    });

    test("isPropsChanged", () => {
      startRender((r) => {
        r($tfc("1", h.div()));
        r($tfc("2", {
          isPropsChanged: (
            oldProps: TestStatelessComponentProps,
            newProps: TestStatelessComponentProps,
          ) => {
            expect(oldProps.id).toBe("1");
            expect(newProps.id).toBe("2");
            return true;
          },
        }, h.div()));
      });
    });
  });

  describe("stateful", () => {
    test("construct", () => {
      startRender((r) => {
        r($lc("1", {
          construct: (
            props: LifecycleTesterProps,
          ) => {
            expect(props.id).toBe("1");
          },
        }, h.div()));
      });
    });

    test("isPropsChanged", () => {
      startRender((r) => {
        r($lc("1", h.div()));
        r($lc("2", {
          shouldUpdate: (
            oldProps: LifecycleTesterProps,
            newProps: LifecycleTesterProps,
          ) => {
            expect(oldProps.id).toBe("1");
            expect(newProps.id).toBe("2");
            return true;
          },
        }, h.div()));
      });
    });

    test("newPropsReceived", () => {
      startRender((r) => {
        r($lc("1", h.div()));
        r($lc("2", {
          newPropsReceived: (
            oldProps: LifecycleTesterProps,
            newProps: LifecycleTesterProps,
          ) => {
            expect(oldProps.id).toBe("1");
            expect(newProps.id).toBe("2");
          },
        }, h.div()));
      });
    });

    test("attached", () => {
      startRender((r) => {
        r($lc("1", {
          attached: function () {
            expect(this.props.id).toBe("1");
          },
        }, h.div()));
      });
    });

    test("detached", () => {
      startRender((r) => {
        r($lc("1", {
          detached: function () {
            expect(this.props.id).toBe("1");
          },
        }, h.div()));
      });
    });

    test("updated", () => {
      startRender((r) => {
        r($lc("1", {
          updated: function () {
            expect(this.props.id).toBe("1");
          },
        }, h.div()));
      });
    });
  });
});
