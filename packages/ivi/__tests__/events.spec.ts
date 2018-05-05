import * as Events from "ivi-events";
import { render as rootRender } from "../src/vdom/root";
import { VNode } from "../src/vdom/vnode";
import * as h from "./utils/html";

function render<T extends Element>(node: VNode | null, container: Element): T {
  rootRender(node, container);
  return container.firstChild as T;
}

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
  event: Events.EventHandler<any>;
}

export function eventCounter(handlerFactory: (
  handler: (ev: Events.SyntheticEvent) => void,
  capture?: boolean) => Events.EventHandler<any>,
): EventCounter {
  const c = {
    value: 0,
    event: null as Events.EventHandler<any> | null,
  };
  c.event = handlerFactory(() => {
    c.value++;
  }, false);

  return c as EventCounter;
}

describe("events", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  afterEach(() => {
    render(null, container);
  });

  test("<div onclick=FN>", () => {
    const click = eventCounter(Events.onClick);
    const n = render<HTMLElement>(h.div().e([click.event]), container);
    n.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
  });

  test("<div onclick=FN onclick=FN>", () => {
    const aClick = eventCounter(Events.onClick);
    const bClick = eventCounter(Events.onClick);
    const n = render<HTMLElement>(h.div().e([aClick.event, bClick.event]), container);
    n.dispatchEvent(createMouseEvent("click"));
    expect(aClick.value).toBe(1);
    expect(bClick.value).toBe(1);
  });

  test("<div onclick=FN onmousedown=FN>", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    const n = render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    n.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
    expect(mousedown.value).toBe(0);
    n.dispatchEvent(createMouseEvent("mousedown"));
    expect(click.value).toBe(1);
    expect(mousedown.value).toBe(1);
  });

  test("null => []", () => {
    render<HTMLElement>(h.div(), container);
    render<HTMLElement>(h.div().e([]), container);
  });

  test("[] => []", () => {
    render<HTMLElement>(h.div().e([]), container);
    render<HTMLElement>(h.div().e([]), container);
  });

  test("null => {onclick}", () => {
    const click = eventCounter(Events.onClick);
    render<HTMLElement>(h.div(), container);
    const b = render<HTMLElement>(h.div().e([click.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
  });

  test("{} => [onclick]", () => {
    const click = eventCounter(Events.onClick);
    render<HTMLElement>(h.div().e([]), container);
    const b = render<HTMLElement>(h.div().e([click.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
  });

  test("null => [onclick, onmousedown]", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    render<HTMLElement>(h.div(), container);
    const b = render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(1);
  });

  test("{} => [onclick, onmousedown]", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    render<HTMLElement>(h.div().e([]), container);
    const b = render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    b!.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(1);
  });

  test("null => [onclick, onclick]", () => {
    const aClick = eventCounter(Events.onClick);
    const bClick = eventCounter(Events.onClick);
    render<HTMLElement>(h.div(), container);
    const b = render<HTMLElement>(h.div().e([aClick.event, bClick.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(aClick.value).toBe(1);
    expect(bClick.value).toBe(1);
  });

  test("[onclick] => [onclick]", () => {
    const click = eventCounter(Events.onClick);
    render<HTMLElement>(h.div().e([click.event]), container);
    const b = render<HTMLElement>(h.div().e([click.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
  });

  test("[onclick] => []", () => {
    const click = eventCounter(Events.onClick);
    render<HTMLElement>(h.div().e([click.event]), container);
    const b = render<HTMLElement>(h.div().e([]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(0);
  });

  test("[onclick] => null", () => {
    const click = eventCounter(Events.onClick);
    render<HTMLElement>(h.div().e([click.event]), container);
    const b = render<HTMLElement>(h.div().e([]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(0);
  });

  test("[onclick, null] => [null, onclick]", () => {
    const aClick = eventCounter(Events.onClick);
    const bClick = eventCounter(Events.onClick);
    render<HTMLElement>(h.div().e([aClick.event, null]), container);
    const b = render<HTMLElement>(h.div().e([null, bClick.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(aClick.value).toBe(0);
    expect(bClick.value).toBe(1);
  });

  test("[onclick, onmousedown] => []", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    const b = render<HTMLElement>(h.div().e([]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(0);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(0);
  });

  test("[onclick, onmousedown] => null", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    const b = render<HTMLElement>(h.div(), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(0);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(0);
  });

  test("[onclick, onmousedown] => [onclick]", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    const b = render<HTMLElement>(h.div().e([click.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(0);
  });

  test("[onclick, onmousedown] => [onclick, onmouseup]", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    const mouseup = eventCounter(Events.onMouseUp);
    render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    const b = render<HTMLElement>(h.div().e([click.event, mouseup.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(1);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(0);
    b.dispatchEvent(createMouseEvent("mouseup"));
    expect(mouseup.value).toBe(1);
  });

  test("[onclick, onmousedown] => [onmouseup]", () => {
    const click = eventCounter(Events.onClick);
    const mousedown = eventCounter(Events.onMouseDown);
    const mouseup = eventCounter(Events.onMouseUp);
    render<HTMLElement>(h.div().e([click.event, mousedown.event]), container);
    const b = render<HTMLElement>(h.div().e([mouseup.event]), container);
    b.dispatchEvent(createMouseEvent("click"));
    expect(click.value).toBe(0);
    b.dispatchEvent(createMouseEvent("mousedown"));
    expect(mousedown.value).toBe(0);
    b.dispatchEvent(createMouseEvent("mouseup"));
    expect(mouseup.value).toBe(1);
  });
});
