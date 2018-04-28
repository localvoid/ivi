import { VNode } from "../src/vdom/vnode";
import { keepAlive } from "../src/vdom/vnode_factories";
import { startRender, checkLifecycle, $lc } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

function pooledKeepAlive(maxItems = 1) {
  const pool = [] as VNode[];
  function handler(disposed: VNode | null) {
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
  return function $ka(child: VNode) {
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

          expect(c("1", "constructor")).toBe(0);
          expect(c("1", "render")).toBe(1);
          expect(c("1", "attached")).toBe(2);

          expect(c("1", "newPropsReceived")).toBe(-1);
          expect(c("1", "shouldUpdate")).toBe(-1);
          expect(c("1", "detached")).toBe(-1);
          expect(c("1", "updated")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);
        });
      });
    });

    it("remove", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka = pooledKeepAlive();
          render($ka($lc("1", h.div())));
          render(h.div());

          expect(c("1", "constructor")).toBe(0);
          expect(c("1", "render")).toBe(1);
          expect(c("1", "attached")).toBe(2);
          expect(c("1", "detached")).toBe(3);

          expect(c("1", "newPropsReceived")).toBe(-1);
          expect(c("1", "shouldUpdate")).toBe(-1);
          expect(c("1", "updated")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);
        });
      });
    });

    it("create nested", () => {
      startRender((render) => {
        checkLifecycle((c) => {
          const $ka1 = pooledKeepAlive();
          const $ka2 = pooledKeepAlive();
          render($ka1($lc("1", $ka2($lc("2", h.div())))));

          expect(c("1", "constructor")).toBe(0);
          expect(c("1", "render")).toBe(1);
          expect(c("2", "constructor")).toBe(2);
          expect(c("2", "render")).toBe(3);
          expect(c("1", "attached")).toBe(4);
          expect(c("2", "attached")).toBe(5);

          expect(c("1", "newPropsReceived")).toBe(-1);
          expect(c("1", "shouldUpdate")).toBe(-1);
          expect(c("1", "detached")).toBe(-1);
          expect(c("1", "updated")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);

          expect(c("2", "newPropsReceived")).toBe(-1);
          expect(c("2", "shouldUpdate")).toBe(-1);
          expect(c("2", "detached")).toBe(-1);
          expect(c("2", "updated")).toBe(-1);
          expect(c("2", "invalidated")).toBe(-1);
          expect(c("2", "shouldAugment")).toBe(-1);
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

          expect(c("1", "constructor")).toBe(0);
          expect(c("1", "render")).toBe(1);
          expect(c("2", "constructor")).toBe(2);
          expect(c("2", "render")).toBe(3);
          expect(c("1", "attached")).toBe(4);
          expect(c("2", "attached")).toBe(5);
          expect(c("2", "detached")).toBe(6);
          expect(c("1", "detached")).toBe(7);

          expect(c("1", "newPropsReceived")).toBe(-1);
          expect(c("1", "shouldUpdate")).toBe(-1);
          expect(c("1", "updated")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);

          expect(c("2", "newPropsReceived")).toBe(-1);
          expect(c("2", "shouldUpdate")).toBe(-1);
          expect(c("2", "updated")).toBe(-1);
          expect(c("2", "invalidated")).toBe(-1);
          expect(c("2", "shouldAugment")).toBe(-1);
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

          expect(c("1", "constructor")).toBe(0);
          expect(c("2", "constructor")).toBe(2);
          expect(c("2", "detached")).toBe(6);
          expect(c("1", "detached")).toBe(7);
          expect(c("1", "newPropsReceived")).toBe(8);
          expect(c("1", "shouldUpdate")).toBe(9);
          expect(c("1", "render")).toBe(10);
          expect(c("2", "newPropsReceived")).toBe(11);
          expect(c("2", "shouldUpdate")).toBe(12);
          expect(c("2", "render")).toBe(13);
          expect(c("2", "updated")).toBe(14);
          expect(c("1", "updated")).toBe(15);
          expect(c("1", "attached")).toBe(16);
          expect(c("2", "attached")).toBe(17);

          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);

          expect(c("2", "invalidated")).toBe(-1);
          expect(c("2", "shouldAugment")).toBe(-1);
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

          expect(c("1", "constructor")).toBe(0);
          expect(c("2", "constructor")).toBe(2);
          expect(c("1", "attached")).toBe(4);
          expect(c("2", "detached")).toBe(9);
          expect(c("1", "newPropsReceived")).toBe(11);
          expect(c("1", "shouldUpdate")).toBe(12);
          expect(c("1", "render")).toBe(13);
          expect(c("2", "newPropsReceived")).toBe(14);
          expect(c("2", "shouldUpdate")).toBe(15);
          expect(c("2", "render")).toBe(16);
          expect(c("2", "updated")).toBe(17);
          expect(c("2", "attached")).toBe(18);
          expect(c("1", "updated")).toBe(19);

          expect(c("1", "detached")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);

          expect(c("2", "invalidated")).toBe(-1);
          expect(c("2", "shouldAugment")).toBe(-1);
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

          expect(c("1", "constructor")).toBe(0);
          expect(c("1", "render")).toBe(1);
          expect(c("1", "attached")).toBe(4);
          expect(c("2", "detached")).toBe(6);
          expect(c("1", "detached")).toBe(7);
          expect(c("2", "constructor")).toBe(8);
          expect(c("2", "render")).toBe(9);
          expect(c("2", "attached")).toBe(10);

          expect(c("1", "newPropsReceived")).toBe(-1);
          expect(c("1", "shouldUpdate")).toBe(-1);
          expect(c("1", "updated")).toBe(-1);
          expect(c("1", "invalidated")).toBe(-1);
          expect(c("1", "shouldAugment")).toBe(-1);

          expect(c("2", "newPropsReceived")).toBe(-1);
          expect(c("2", "shouldUpdate")).toBe(-1);
          expect(c("2", "updated")).toBe(-1);
          expect(c("2", "invalidated")).toBe(-1);
          expect(c("2", "shouldAugment")).toBe(-1);
        });
      });
    });

  });
});
