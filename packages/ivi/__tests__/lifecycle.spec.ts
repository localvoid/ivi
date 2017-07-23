import { startRender, augment, checkLifecycle, $lc, staticComponent } from "./utils";
import * as h from "./utils/html";
import { expect } from "iko";

describe("lifecycle", () => {
  it("<C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));

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

  it("<C><div></C> => <div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
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

  it("<div> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render($lc("1", h.div()));

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

  it("<div></div> => <div><C><div></C></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render(h.div().children($lc("1", h.div())));

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

  it("<div><C><div></C></div> => <div></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div().children($lc("1", h.div())));
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

  it("<C><C><div></C></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", $lc("2", h.div())));

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

  it("<C><C><div></C></C> => <div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", $lc("2", h.div())));
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

  it("<C><div></C> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
        render($lc("1", h.div()));

        expect(c("1", "constructor")).toBeEqual(0);
        expect(c("1", "attached")).toBeEqual(2);
        expect(c("1", "isPropsChanged")).toBeEqual(3);
        expect(c("1", "newPropsReceived")).toBeEqual(4);
        expect(c("1", "beforeUpdate")).toBeEqual(5);
        expect(c("1", "render")).toBeEqual(6); // 1
        expect(c("1", "updated")).toBeEqual(7);

        expect(c("1", "render", false)).toBeEqual(1);

        expect(c("1", "detached")).toBeEqual(-1);
        expect(c("1", "invalidated")).toBeEqual(-1);
        expect(c("1", "shouldAugment")).toBeEqual(-1);
      });
    });
  });

  it("<S><C><div></C></S> => <S><C><div></C></S>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(staticComponent($lc("1", h.div())));
        render(staticComponent($lc("1", h.div())));

        expect(c("1", "constructor")).toBeEqual(0);
        expect(c("1", "render")).toBeEqual(1);
        expect(c("1", "attached")).toBeEqual(2);

        expect(c("1", "beforeUpdate")).toBeEqual(-1);
        expect(c("1", "updated")).toBeEqual(-1);

        expect(c("1", "isPropsChanged")).toBeEqual(-1);
        expect(c("1", "newPropsReceived")).toBeEqual(-1);

        expect(c("1", "detached")).toBeEqual(-1);
        expect(c("1", "invalidated")).toBeEqual(-1);
        expect(c("1", "shouldAugment")).toBeEqual(-1);
      });
    });
  });

  describe("augment", () => {
    it("<C><div></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", h.div()), `<div></div>`);

        expect(c("1", "constructor")).toBeEqual(0);
        expect(c("1", "render")).toBeEqual(1);
        expect(c("1", "shouldAugment")).toBeEqual(2);
        expect(c("1", "attached")).toBeEqual(3);

        expect(c("1", "isPropsChanged")).toBeEqual(-1);
        expect(c("1", "newPropsReceived")).toBeEqual(-1);
        expect(c("1", "detached")).toBeEqual(-1);
        expect(c("1", "beforeUpdate")).toBeEqual(-1);
        expect(c("1", "updated")).toBeEqual(-1);
        expect(c("1", "invalidated")).toBeEqual(-1);
      });
    });

    it("<C shouldAugment=false><div></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", { shouldAugment: () => false }, h.div()), `<div></div>`);

        expect(c("1", "constructor")).toBeEqual(0);
        expect(c("1", "render")).toBeEqual(1);
        expect(c("1", "shouldAugment")).toBeEqual(2);
        expect(c("1", "attached")).toBeEqual(3);

        expect(c("1", "isPropsChanged")).toBeEqual(-1);
        expect(c("1", "newPropsReceived")).toBeEqual(-1);
        expect(c("1", "detached")).toBeEqual(-1);
        expect(c("1", "beforeUpdate")).toBeEqual(-1);
        expect(c("1", "updated")).toBeEqual(-1);
        expect(c("1", "invalidated")).toBeEqual(-1);
      });
    });

    it("<C shouldAugment=false><C><div></C></C>", () => {
      checkLifecycle((c) => {
        augment($lc("1", { shouldAugment: () => false }, $lc("2", h.div())), `<div></div>`);

        expect(c("1", "constructor")).toBeEqual(0);
        expect(c("1", "render")).toBeEqual(1);
        expect(c("1", "shouldAugment")).toBeEqual(2);
        expect(c("2", "constructor")).toBeEqual(3);
        expect(c("2", "render")).toBeEqual(4);
        expect(c("1", "attached")).toBeEqual(5);
        expect(c("2", "attached")).toBeEqual(6);

        expect(c("1", "isPropsChanged")).toBeEqual(-1);
        expect(c("1", "newPropsReceived")).toBeEqual(-1);
        expect(c("1", "detached")).toBeEqual(-1);
        expect(c("1", "beforeUpdate")).toBeEqual(-1);
        expect(c("1", "updated")).toBeEqual(-1);
        expect(c("1", "invalidated")).toBeEqual(-1);

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
});
