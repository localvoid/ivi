import { startRender, checkLifecycle, $lc, staticComponent } from "./utils";
import * as h from "./utils/html";

describe("lifecycle", () => {
  test("<C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));

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

  test("<C><div></C> => <div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
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

  test("<div> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render($lc("1", h.div()));

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

  test("<div></div> => <div><C><div></C></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div());
        render(h.div().c($lc("1", h.div())));

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

  test("<div><C><div></C></div> => <div></div>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(h.div().c($lc("1", h.div())));
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

  test("<C><C><div></C></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", $lc("2", h.div())));

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

        expect(c("2", "shouldUpdate")).toBe(-1);
        expect(c("2", "newPropsReceived")).toBe(-1);
        expect(c("2", "detached")).toBe(-1);
        expect(c("2", "updated")).toBe(-1);
        expect(c("2", "invalidated")).toBe(-1);
        expect(c("2", "shouldAugment")).toBe(-1);
      });
    });
  });

  test("<C><C><div></C></C> => <div>", () => {
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

  test("<C><div></C> => <C><div></C>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render($lc("1", h.div()));
        render($lc("1", h.div()));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "attached")).toBe(2);
        expect(c("1", "newPropsReceived")).toBe(3);
        expect(c("1", "shouldUpdate")).toBe(4);
        expect(c("1", "render")).toBe(5); // 1
        expect(c("1", "updated")).toBe(6);

        expect(c("1", "render", false)).toBe(1);

        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });

  test("<S><C><div></C></S> => <S><C><div></C></S>", () => {
    startRender((render) => {
      checkLifecycle((c) => {
        render(staticComponent($lc("1", h.div())));
        render(staticComponent($lc("1", h.div())));

        expect(c("1", "constructor")).toBe(0);
        expect(c("1", "render")).toBe(1);
        expect(c("1", "attached")).toBe(2);

        expect(c("1", "updated")).toBe(-1);

        expect(c("1", "newPropsReceived")).toBe(-1);
        expect(c("1", "shouldUpdate")).toBe(-1);

        expect(c("1", "detached")).toBe(-1);
        expect(c("1", "invalidated")).toBe(-1);
        expect(c("1", "shouldAugment")).toBe(-1);
      });
    });
  });
});
