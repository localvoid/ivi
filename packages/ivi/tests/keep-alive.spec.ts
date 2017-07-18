import { VNode } from "../src/vdom/vnode";
import { keepAlive } from "../src/vdom/vnode_factories";
import { startRender, checkLifecycle, $lc } from "./utils";
import * as h from "./utils/html";
import { expect } from "chai";

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

          expect(c("1", "constructor")).to.equal(0);
          expect(c("1", "render")).to.equal(1);
          expect(c("1", "attached")).to.equal(2);

          expect(c("1", "isPropsChanged")).to.equal(-1);
          expect(c("1", "newPropsReceived")).to.equal(-1);
          expect(c("1", "detached")).to.equal(-1);
          expect(c("1", "beforeUpdate")).to.equal(-1);
          expect(c("1", "updated")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);
        });
      });
    });

    it("remove", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka = pooledKeepAlive();
          render($ka($lc("1", h.div())));
          render(h.div());

          expect(c("1", "constructor")).to.equal(0);
          expect(c("1", "render")).to.equal(1);
          expect(c("1", "attached")).to.equal(2);
          expect(c("1", "detached")).to.equal(3);

          expect(c("1", "isPropsChanged")).to.equal(-1);
          expect(c("1", "newPropsReceived")).to.equal(-1);
          expect(c("1", "beforeUpdate")).to.equal(-1);
          expect(c("1", "updated")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);
        });
      });
    });

    it("create nested", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));

          expect(c("1", "constructor")).to.equal(0);
          expect(c("1", "render")).to.equal(1);
          expect(c("2", "constructor")).to.equal(2);
          expect(c("2", "render")).to.equal(3);
          expect(c("1", "attached")).to.equal(4);
          expect(c("2", "attached")).to.equal(5);

          expect(c("1", "isPropsChanged")).to.equal(-1);
          expect(c("1", "newPropsReceived")).to.equal(-1);
          expect(c("1", "detached")).to.equal(-1);
          expect(c("1", "beforeUpdate")).to.equal(-1);
          expect(c("1", "updated")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);

          expect(c("2", "isPropsChanged")).to.equal(-1);
          expect(c("2", "newPropsReceived")).to.equal(-1);
          expect(c("2", "detached")).to.equal(-1);
          expect(c("2", "beforeUpdate")).to.equal(-1);
          expect(c("2", "updated")).to.equal(-1);
          expect(c("2", "invalidated")).to.equal(-1);
          expect(c("2", "shouldAugment")).to.equal(-1);
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

          expect(c("1", "constructor")).to.equal(0);
          expect(c("1", "render")).to.equal(1);
          expect(c("2", "constructor")).to.equal(2);
          expect(c("2", "render")).to.equal(3);
          expect(c("1", "attached")).to.equal(4);
          expect(c("2", "attached")).to.equal(5);
          expect(c("2", "detached")).to.equal(6);
          expect(c("1", "detached")).to.equal(7);

          expect(c("1", "isPropsChanged")).to.equal(-1);
          expect(c("1", "newPropsReceived")).to.equal(-1);
          expect(c("1", "beforeUpdate")).to.equal(-1);
          expect(c("1", "updated")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);

          expect(c("2", "isPropsChanged")).to.equal(-1);
          expect(c("2", "newPropsReceived")).to.equal(-1);
          expect(c("2", "beforeUpdate")).to.equal(-1);
          expect(c("2", "updated")).to.equal(-1);
          expect(c("2", "invalidated")).to.equal(-1);
          expect(c("2", "shouldAugment")).to.equal(-1);
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

          expect(c("1", "constructor")).to.equal(0);
          expect(c("2", "constructor")).to.equal(2);
          expect(c("2", "detached")).to.equal(6);
          expect(c("1", "detached")).to.equal(7);
          expect(c("1", "isPropsChanged")).to.equal(8);
          expect(c("1", "newPropsReceived")).to.equal(9);
          expect(c("1", "beforeUpdate")).to.equal(10);
          expect(c("1", "render")).to.equal(11);
          expect(c("2", "isPropsChanged")).to.equal(12);
          expect(c("2", "newPropsReceived")).to.equal(13);
          expect(c("2", "beforeUpdate")).to.equal(14);
          expect(c("2", "render")).to.equal(15);
          expect(c("2", "updated")).to.equal(16);
          expect(c("1", "updated")).to.equal(17);
          expect(c("1", "attached")).to.equal(18);
          expect(c("2", "attached")).to.equal(19);

          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);

          expect(c("2", "invalidated")).to.equal(-1);
          expect(c("2", "shouldAugment")).to.equal(-1);
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

          expect(c("1", "constructor")).to.equal(0);
          expect(c("2", "constructor")).to.equal(2);
          expect(c("1", "attached")).to.equal(4);
          expect(c("2", "detached")).to.equal(10);
          expect(c("1", "isPropsChanged")).to.equal(12);
          expect(c("1", "newPropsReceived")).to.equal(13);
          expect(c("1", "beforeUpdate")).to.equal(14);
          expect(c("1", "render")).to.equal(15);
          expect(c("2", "isPropsChanged")).to.equal(16);
          expect(c("2", "newPropsReceived")).to.equal(17);
          expect(c("2", "beforeUpdate")).to.equal(18);
          expect(c("2", "render")).to.equal(19);
          expect(c("2", "updated")).to.equal(20);
          expect(c("2", "attached")).to.equal(21);
          expect(c("1", "updated")).to.equal(22);

          expect(c("1", "detached")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);

          expect(c("2", "invalidated")).to.equal(-1);
          expect(c("2", "shouldAugment")).to.equal(-1);
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

          expect(c("1", "constructor")).to.equal(0);
          expect(c("1", "render")).to.equal(1);
          expect(c("1", "attached")).to.equal(4);
          expect(c("2", "detached")).to.equal(6);
          expect(c("1", "detached")).to.equal(7);
          expect(c("2", "constructor")).to.equal(8);
          expect(c("2", "render")).to.equal(9);
          expect(c("2", "attached")).to.equal(10);

          expect(c("1", "isPropsChanged")).to.equal(-1);
          expect(c("1", "newPropsReceived")).to.equal(-1);
          expect(c("1", "beforeUpdate")).to.equal(-1);
          expect(c("1", "updated")).to.equal(-1);
          expect(c("1", "invalidated")).to.equal(-1);
          expect(c("1", "shouldAugment")).to.equal(-1);

          expect(c("2", "isPropsChanged")).to.equal(-1);
          expect(c("2", "newPropsReceived")).to.equal(-1);
          expect(c("2", "beforeUpdate")).to.equal(-1);
          expect(c("2", "updated")).to.equal(-1);
          expect(c("2", "invalidated")).to.equal(-1);
          expect(c("2", "shouldAugment")).to.equal(-1);
        });
      });
    });

  });
});
