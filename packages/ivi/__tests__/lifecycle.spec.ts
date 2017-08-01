import { startRender, augment, checkLifecycle, $lc, staticComponent } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

describe("lifecycle", () => {
  it("<C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<C><div></C> => <div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
        render(h.div());

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);
        expect(c("1", "detached")).toBe(3);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<div> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render($lc("1", h.div()));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<div></div> => <div><C><div></C></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render(h.div().children($lc("1", h.div())));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<div><C><div></C></div> => <div></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div().children($lc("1", h.div())));
        render(h.div());

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);
        expect(c("1", "detached")).toBe(3);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<C><C><div></C></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", $lc("2", h.div())));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("2", "constructor")).toBe(2);
        expect(c("2", "render")).toBe(3);
        expect(c("1", "attached")).toBe(4);
        expect(c("2", "attached")).toBe(5);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);

        expect(c("2", "isPropsChanged")).toBe(-1);
        expect(c("2", "newPropsReceived")).toBe(-1);
        expect(c("2", "detached")).toBe(-1);
        expect(c("2", "beforeUpdate")).toBe(-1);
        expect(c("2", "updated")).toBe(-1);
        expect(c("2", "invalidated")).toBe(-1);
        expect(c("2", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<C><C><div></C></C> => <div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", $lc("2", h.div())));
        render(h.div());

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("2", "constructor")).toBe(2);
        expect(c("2", "render")).toBe(3);
        expect(c("1", "attached")).toBe(4);
        expect(c("2", "attached")).toBe(5);
        expect(c("2", "detached")).toBe(6);
        expect(c("1", "detached")).toBe(7);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);

        expect(c("2", "isPropsChanged")).toBe(-1);
        expect(c("2", "newPropsReceived")).toBe(-1);
        expect(c("2", "beforeUpdate")).toBe(-1);
        expect(c("2", "updated")).toBe(-1);
        expect(c("2", "invalidated")).toBe(-1);
        expect(c("2", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<C><div></C> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
        render($lc("1", h.div()));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "attached")).toBe(2);
        expect(c("1", "isPropsChanged")).toBe(3);
        expect(c("1", "newPropsReceived")).toBe(4);
        expect(c("1", "beforeUpdate")).toBe(5);
        expect(c("1", "render")).toBe(6); // 1
        expect(c("1", "updated")).toBe(7);

        expect(c("1", "render", false)).toBe(1);

        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  it("<S><C><div></C></S> => <S><C><div></C></S>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(staticComponent($lc("1", h.div())));
        render(staticComponent($lc("1", h.div())));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);

        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);

        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  describe("augment", () => {
    it("<C><div></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", h.div()), `<div></div>`);

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "shouldAugment")).toBe(2);
        expect(c("1", "attached")).toBe(3);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
      });
    });

    it("<C shouldAugment=false><div></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", { shouldAugment: () => false }, h.div()), `<div></div>`);

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "shouldAugment")).toBe(2);
        expect(c("1", "attached")).toBe(3);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
      });
    });

    it("<C shouldAugment=false><C><div></C></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", { shouldAugment: () => false }, $lc("2", h.div())), `<div></div>`);

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "shouldAugment")).toBe(2);
        expect(c("2", "constructor")).toBe(3);
        expect(c("2", "render")).toBe(4);
        expect(c("1", "attached")).toBe(5);
        expect(c("2", "attached")).toBe(6);

        expect(c("1", "isPropsChanged")).toBe(-1);
        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "beforeUpdate")).toBe(-1);
        expect(c("1", "updated")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);

        expect(c("2", "isPropsChanged")).toBe(-1);
        expect(c("2", "newPropsReceived")).toBe(-1);
        expect(c("2", "detached")).toBe(-1);
        expect(c("2", "beforeUpdate")).toBe(-1);
        expect(c("2", "updated")).toBe(-1);
        expect(c("2", "invalidated")).toBe(-1);
        expect(c("2", "shouldAugment")).toBe(-1);
      });
    });
  });
});
