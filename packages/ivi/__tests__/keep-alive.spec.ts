import { VNode } from "../src/vdom/vnode";
import { keepAlive } from "../src/vdom/vnode_factories";
import { startRender, checkLifecycle, $lc } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

function pooledKeepAlive(maxItems = 1) {
  const pool = [] as VNode<any>[];
  function handler(disposed: VNode<any>) {
    if (disposed) {
      if (pool.length >= maxItems) {
        return null;
      }
      pool.push(disposed);
      return disposed;
    }
    if (pool.length > 0) {
      return pool.pop()!;
    }
    return null;
  }
  return function $ka(child: VNode<any>) {
    return keepAlive(handler, child);
  };
}

describe("Keep Alive", function () {
  describe("lifecycle", function () {
    it("create", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka = pooledKeepAlive();
          render($ka($lc("1", h.div())));

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("1", "render")).toBeEqual(1);
          expect(c("1", "attached")).toBeEqual(2);

          expect(c("1", "isPropsChanged")).toBeEqual(-1);
          expect(c("1", "newPropsReceived")).toBeEqual(-1);
          expect(c("1", "detached")).toBeEqual(-1);
          expect(c("1", "beforeUpdate")).toBeEqual(-1);
          expect(c("1", "updated")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("remove", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka = pooledKeepAlive();
          render($ka($lc("1", h.div())));
          render(h.div());

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("1", "render")).toBeEqual(1);
          expect(c("1", "attached")).toBeEqual(2);
          expect(c("1", "detached")).toBeEqual(3);

          expect(c("1", "isPropsChanged")).toBeEqual(-1);
          expect(c("1", "newPropsReceived")).toBeEqual(-1);
          expect(c("1", "beforeUpdate")).toBeEqual(-1);
          expect(c("1", "updated")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("create nested", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("1", "render")).toBeEqual(1);
          expect(c("2", "constructor")).toBeEqual(2);
          expect(c("2", "render")).toBeEqual(3);
          expect(c("1", "attached")).toBeEqual(4);
          expect(c("2", "attached")).toBeEqual(5);

          expect(c("1", "isPropsChanged")).toBeEqual(-1);
          expect(c("1", "newPropsReceived")).toBeEqual(-1);
          expect(c("1", "detached")).toBeEqual(-1);
          expect(c("1", "beforeUpdate")).toBeEqual(-1);
          expect(c("1", "updated")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);

          expect(c("2", "isPropsChanged")).toBeEqual(-1);
          expect(c("2", "newPropsReceived")).toBeEqual(-1);
          expect(c("2", "detached")).toBeEqual(-1);
          expect(c("2", "beforeUpdate")).toBeEqual(-1);
          expect(c("2", "updated")).toBeEqual(-1);
          expect(c("2", "invalidated")).toBeEqual(-1);
          expect(c("2", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("remove nested", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));
          render(h.div());

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("1", "render")).toBeEqual(1);
          expect(c("2", "constructor")).toBeEqual(2);
          expect(c("2", "render")).toBeEqual(3);
          expect(c("1", "attached")).toBeEqual(4);
          expect(c("2", "attached")).toBeEqual(5);
          expect(c("2", "detached")).toBeEqual(6);
          expect(c("1", "detached")).toBeEqual(7);

          expect(c("1", "isPropsChanged")).toBeEqual(-1);
          expect(c("1", "newPropsReceived")).toBeEqual(-1);
          expect(c("1", "beforeUpdate")).toBeEqual(-1);
          expect(c("1", "updated")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);

          expect(c("2", "isPropsChanged")).toBeEqual(-1);
          expect(c("2", "newPropsReceived")).toBeEqual(-1);
          expect(c("2", "beforeUpdate")).toBeEqual(-1);
          expect(c("2", "updated")).toBeEqual(-1);
          expect(c("2", "invalidated")).toBeEqual(-1);
          expect(c("2", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("recycle", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));
          render(h.div());
          render($ka1($lc("1", $ka2($lc("2", h.div())))));

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("2", "constructor")).toBeEqual(2);
          expect(c("2", "detached")).toBeEqual(6);
          expect(c("1", "detached")).toBeEqual(7);
          expect(c("1", "isPropsChanged")).toBeEqual(8);
          expect(c("1", "newPropsReceived")).toBeEqual(9);
          expect(c("1", "beforeUpdate")).toBeEqual(10);
          expect(c("1", "render")).toBeEqual(11);
          expect(c("2", "isPropsChanged")).toBeEqual(12);
          expect(c("2", "newPropsReceived")).toBeEqual(13);
          expect(c("2", "beforeUpdate")).toBeEqual(14);
          expect(c("2", "render")).toBeEqual(15);
          expect(c("2", "updated")).toBeEqual(16);
          expect(c("1", "updated")).toBeEqual(17);
          expect(c("1", "attached")).toBeEqual(18);
          expect(c("2", "attached")).toBeEqual(19);

          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);

          expect(c("2", "invalidated")).toBeEqual(-1);
          expect(c("2", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("recycle nested", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));
          render($ka1($lc("1", h.div())));
          render($ka1($lc("1", $ka2($lc("2", h.div())))));

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("2", "constructor")).toBeEqual(2);
          expect(c("1", "attached")).toBeEqual(4);
          expect(c("2", "detached")).toBeEqual(10);
          expect(c("1", "isPropsChanged")).toBeEqual(12);
          expect(c("1", "newPropsReceived")).toBeEqual(13);
          expect(c("1", "beforeUpdate")).toBeEqual(14);
          expect(c("1", "render")).toBeEqual(15);
          expect(c("2", "isPropsChanged")).toBeEqual(16);
          expect(c("2", "newPropsReceived")).toBeEqual(17);
          expect(c("2", "beforeUpdate")).toBeEqual(18);
          expect(c("2", "render")).toBeEqual(19);
          expect(c("2", "updated")).toBeEqual(20);
          expect(c("2", "attached")).toBeEqual(21);
          expect(c("1", "updated")).toBeEqual(22);

          expect(c("1", "detached")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);

          expect(c("2", "invalidated")).toBeEqual(-1);
          expect(c("2", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

    it("recycle nested2", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));
          render(h.div());
          render($ka2($lc("2", h.div())));

          expect(c("1", "constructor")).toBeEqual(0);
          expect(c("1", "render")).toBeEqual(1);
          expect(c("1", "attached")).toBeEqual(4);
          expect(c("2", "detached")).toBeEqual(6);
          expect(c("1", "detached")).toBeEqual(7);
          expect(c("2", "constructor")).toBeEqual(8);
          expect(c("2", "render")).toBeEqual(9);
          expect(c("2", "attached")).toBeEqual(10);

          expect(c("1", "isPropsChanged")).toBeEqual(-1);
          expect(c("1", "newPropsReceived")).toBeEqual(-1);
          expect(c("1", "beforeUpdate")).toBeEqual(-1);
          expect(c("1", "updated")).toBeEqual(-1);
          expect(c("1", "invalidated")).toBeEqual(-1);
          expect(c("1", "shouldAugment")).toBeEqual(-1);

          expect(c("2", "isPropsChanged")).toBeEqual(-1);
          expect(c("2", "newPropsReceived")).toBeEqual(-1);
          expect(c("2", "beforeUpdate")).toBeEqual(-1);
          expect(c("2", "updated")).toBeEqual(-1);
          expect(c("2", "invalidated")).toBeEqual(-1);
          expect(c("2", "shouldAugment")).toBeEqual(-1);
        });
      });
    });

  });
});
