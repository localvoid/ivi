import { VNode, component } from "ivi";
import * as h from "ivi-html";
import { startRender, Static, checkLifecycle, lifecycleTouch } from "./utils";
import { effect } from "../scheduler";
import { withShouldUpdate } from "../factories";
import { useDetached } from "../hooks";

function createLifecycleTester(id: string) {
  return component<VNode>(
    (hnd) => {
      lifecycleTouch(id, "constructor");

      effect(() => {
        lifecycleTouch(id, "effect");
      });

      useDetached(hnd, () => {
        lifecycleTouch(id, "detached");
      });

      return (child) => {
        lifecycleTouch(id, "render");
        return child;
      };
    },
    withShouldUpdate((prev, next) => {
      lifecycleTouch(id, "shouldUpdate");
      return true;
    }),
  );
}

test(`<C><div></C>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(createLifecycleTester("1")(h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);

      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
    });
  });
});

test(`<C><div></C> => <div>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(createLifecycleTester("1")(h.div()));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);
      expect(c("1", "detached")).toBe(3);

      expect(c("1", "shouldUpdate")).toBe(-1);
    });
  });
});

test(`<div> => <C><div></C>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(h.div());
      render(createLifecycleTester("1")(h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);

      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
    });
  });
});

test(`<div></div> => <div><C><div></C></div>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(h.div());
      render(h.div().c(createLifecycleTester("1")(h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);

      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);
    });
  });
});

test(`<div><C><div></C></div> => <div></div>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(h.div().c(createLifecycleTester("1")(h.div())));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);
      expect(c("1", "detached")).toBe(3);

      expect(c("1", "shouldUpdate")).toBe(-1);
    });
  });
});

test(`<C><C><div></C></C>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(createLifecycleTester("1")(createLifecycleTester("2")(h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("2", "constructor")).toBe(2);
      expect(c("2", "render")).toBe(3);
      expect(c("1", "effect")).toBe(4);
      expect(c("2", "effect")).toBe(5);

      expect(c("1", "shouldUpdate")).toBe(-1);
      expect(c("1", "detached")).toBe(-1);

      expect(c("2", "shouldUpdate")).toBe(-1);
      expect(c("2", "detached")).toBe(-1);
    });
  });
});

test(`<C><C><div></C></C> => <div>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      render(createLifecycleTester("1")(createLifecycleTester("2")(h.div())));
      render(h.div());

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("2", "constructor")).toBe(2);
      expect(c("2", "render")).toBe(3);
      expect(c("1", "effect")).toBe(4);
      expect(c("2", "effect")).toBe(5);
      expect(c("2", "detached")).toBe(6);
      expect(c("1", "detached")).toBe(7);

      expect(c("1", "shouldUpdate")).toBe(-1);

      expect(c("2", "shouldUpdate")).toBe(-1);
    });
  });
});

test(`<C><div></C> => <C><div></C>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      const lc = createLifecycleTester("1");
      render(lc(h.div()));
      render(lc(h.div()));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "effect")).toBe(2);
      expect(c("1", "shouldUpdate")).toBe(3);
      expect(c("1", "render")).toBe(4); // 1

      expect(c("1", "render", false)).toBe(1);

      expect(c("1", "detached")).toBe(-1);
    });
  });
});

test(`<S><C><div></C></S> => <S><C><div></C></S>`, () => {
  startRender(render => {
    checkLifecycle(c => {
      const lc = createLifecycleTester("1");
      render(Static(lc(h.div())));
      render(Static(lc(h.div())));

      expect(c("1", "constructor")).toBe(0);
      expect(c("1", "render")).toBe(1);
      expect(c("1", "effect")).toBe(2);

      expect(c("1", "shouldUpdate")).toBe(-1);

      expect(c("1", "detached")).toBe(-1);
    });
  });
});
