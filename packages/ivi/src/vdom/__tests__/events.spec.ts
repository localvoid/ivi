import { EventFlags, EventHandler, SyntheticEvent } from "ivi";
import * as Events from "ivi";
import * as h from "ivi-html";
import { startRender } from "./utils";

function createMouseEvent(type: string): MouseEvent {
  if (document.createEvent) {
    const ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(type, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null!);
    return ev;
  }
  return new MouseEvent(type);
}

export interface EventCounter {
  value: number;
  event: EventHandler<any>;
}

export function eventCounter(handlerFactory: (
  handler: (ev: SyntheticEvent) => void,
  capture?: boolean) => EventHandler<any>,
): EventCounter {
  const c = {
    value: 0,
    event: null as EventHandler<any> | null,
  };
  c.event = handlerFactory(() => {
    c.value++;
  }, false);

  return c as EventCounter;
}

describe("events", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  test(`<div onclick=FN>`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const n = r(h.div().e([click.event]));
      n.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`<div onclick=FN onclick=FN>`, () => {
    startRender((r) => {
      const aClick = eventCounter(Events.onClick);
      const bClick = eventCounter(Events.onClick);
      const n = r(h.div().e([aClick.event, bClick.event]));
      n.dispatchEvent(createMouseEvent("click"));

      expect(aClick.value).toBe(1);
      expect(bClick.value).toBe(1);
    });
  });

  test(`<div onclick=FN onmousedown=FN>`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      const n = r(h.div().e([click.event, mousedown.event]));

      n.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
      expect(mousedown.value).toBe(0);

      n.dispatchEvent(createMouseEvent("mousedown"));

      expect(click.value).toBe(1);
      expect(mousedown.value).toBe(1);
    });
  });

  test(`unassigned => []`, () => {
    startRender((r) => {
      expect(() => {
        r(h.div());
        r(h.div().e([]));
      }).not.toThrow();
    });
  });

  test(`[] => unassigned`, () => {
    startRender((r) => {
      expect(() => {
        r(h.div().e([]));
        r(h.div());
      }).not.toThrow();
    });
  });

  test(`null => []`, () => {
    startRender((r) => {
      expect(() => {
        r(h.div().e(null));
        r(h.div().e([]));
      }).not.toThrow();
    });
  });

  test(`[] => null`, () => {
    startRender((r) => {
      expect(() => {
        r(h.div().e([]));
        r(h.div().e(null));
      }).not.toThrow();
    });
  });

  test(`[] => []`, () => {
    startRender((r) => {
      expect(() => {
        r(h.div().e([]));
        r(h.div().e([]));
      }).not.toThrow();
    });
  });

  test(`unassigned => onclick`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div());
      const b = r(h.div().e(
        click.event,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`onclick => unassigned`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e(
        click.event,
      ));
      const b = r(h.div());
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`null => onclick`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e(
        null,
      ));
      const b = r(h.div().e(
        click.event,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`onclick => null`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e(
        click.event,
      ));
      const b = r(h.div().e(
        null,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`unassigned => [onclick]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div());
      const b = r(h.div().e([
        click.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`[onclick] => unassigned`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div());
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`null => [onclick]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e(null));
      const b = r(h.div().e([
        click.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`[onclick] => null`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div().e(
        null,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`onclick => [onclick]`, () => {
    startRender((r) => {
      const click1 = eventCounter(Events.onClick);
      const click2 = eventCounter(Events.onClick);
      r(h.div().e(
        click1.event,
      ));
      const b = r(h.div().e([
        click2.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click1.value).toBe(0);
      expect(click2.value).toBe(1);
    });
  });

  test(`[onclick] => onclick`, () => {
    startRender((r) => {
      const click1 = eventCounter(Events.onClick);
      const click2 = eventCounter(Events.onClick);
      r(h.div().e([
        click1.event,
      ]));
      const b = r(h.div().e(
        click2.event,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click1.value).toBe(0);
      expect(click2.value).toBe(1);
    });
  });

  test(`[] => [onclick]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([]));
      const b = r(h.div().e([
        click.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`[onclick] => []`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div().e([]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`unassigned => [onclick, onmousedown]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div());
      const b = r(h.div().e([click.event, mousedown.event]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(1);
    });
  });

  test(`null => [onclick, onmousedown]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div().e(null));
      const b = r(h.div().e([
        click.event,
        mousedown.event,
      ]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(1);
    });
  });

  test(`[] => [onclick, onmousedown]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div().e([]));
      const b = r(h.div().e([
        click.event,
        mousedown.event,
      ]));

      b!.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(1);
    });
  });

  test(`null => [onclick, onclick]`, () => {
    startRender((r) => {
      const aClick = eventCounter(Events.onClick);
      const bClick = eventCounter(Events.onClick);
      r(h.div().e(null));
      const b = r(h.div().e([
        aClick.event,
        bClick.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(aClick.value).toBe(1);
      expect(bClick.value).toBe(1);
    });
  });

  test(`[onclick] => [onclick]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div().e([click.event]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);
    });
  });

  test(`[onclick] => unassigned`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div());
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`[onclick] => null`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div().e(
        null,
      ));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`[onclick] => []`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      r(h.div().e([
        click.event,
      ]));
      const b = r(h.div().e([]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);
    });
  });

  test(`[onclick, null] => [null, onclick]`, () => {
    startRender((r) => {
      const aClick = eventCounter(Events.onClick);
      const bClick = eventCounter(Events.onClick);
      r(h.div().e([
        aClick.event,
        null,
      ]));
      const b = r(h.div().e([
        null,
        bClick.event,
      ]));
      b.dispatchEvent(createMouseEvent("click"));

      expect(aClick.value).toBe(0);
      expect(bClick.value).toBe(1);
    });
  });

  test(`[onclick, onmousedown] => []`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div().e([
        click.event,
        mousedown.event,
      ]));
      const b = r(h.div().e([]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(0);
    });
  });

  test(`[onclick, onmousedown] => null`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div().e([
        click.event,
        mousedown.event,
      ]));
      const b = r(h.div().e(
        null,
      ));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(0);
    });
  });

  test(`[onclick, onmousedown] => [onclick]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      r(h.div().e([
        click.event,
        mousedown.event,
      ]));
      const b = r(h.div().e([
        click.event,
      ]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(0);
    });
  });

  test(`[onclick, onmousedown] => [onclick, onmouseup]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      const mouseup = eventCounter(Events.onMouseUp);
      r(h.div().e([
        click.event,
        mousedown.event,
      ]));
      const b = r(h.div().e([
        click.event,
        mouseup.event,
      ]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(1);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(0);

      b.dispatchEvent(createMouseEvent("mouseup"));

      expect(mouseup.value).toBe(1);
    });
  });

  test(`[onclick, onmousedown] => [onmouseup]`, () => {
    startRender((r) => {
      const click = eventCounter(Events.onClick);
      const mousedown = eventCounter(Events.onMouseDown);
      const mouseup = eventCounter(Events.onMouseUp);
      r(h.div().e([
        click.event,
        mousedown.event,
      ]));
      const b = r(h.div().e([
        mouseup.event,
      ]));

      b.dispatchEvent(createMouseEvent("click"));

      expect(click.value).toBe(0);

      b.dispatchEvent(createMouseEvent("mousedown"));

      expect(mousedown.value).toBe(0);

      b.dispatchEvent(createMouseEvent("mouseup"));

      expect(mouseup.value).toBe(1);
    });
  });

  test(`preventDefault method should trigger native prevent default behavior`, () => {
    startRender<HTMLInputElement>((r) => {
      const n = r(
        h.input("", { type: "checkbox" })
          .e(Events.onClick(() => EventFlags.PreventDefault)),
      );

      n.dispatchEvent(createMouseEvent("click"));
      expect(n.checked).toBeFalsy();
    });
  });

  test(`EventFlags.PreventDefault should trigger native prevent default behavior`, () => {
    startRender<HTMLInputElement>((r) => {
      const n = r(
        h.input("", { type: "checkbox" })
          .e(Events.onClick((e) => EventFlags.PreventDefault)),
      );

      n.dispatchEvent(createMouseEvent("click"));
      expect(n.checked).toBeFalsy();
    });
  });
});
