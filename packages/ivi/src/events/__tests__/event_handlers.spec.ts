import { EventHandlerFlags, EVENT_DISPATCHER_CLICK, onClick } from "ivi";

function handler(ev: any): void {
  // Event handler...
}

describe(`Event Handler`, () => {
  test(`event dispatcher should be assigned`, () => {
    const h = onClick(handler);
    expect(h.d.src).toBe(EVENT_DISPATCHER_CLICK);
  });

  test(`event handler should be assigned`, () => {
    const h = onClick(handler);
    expect(h.h).toBe(handler);
  });

  test(`event handler should have bubble flag when capture arg is undefined`, () => {
    const h = onClick(handler);
    expect(h.d.flags & EventHandlerFlags.Bubble).toBeTruthy();
  });

  test(`event handler should have bubble flag when capture arg is false`, () => {
    const h = onClick(handler, false);
    expect(h.d.flags & EventHandlerFlags.Bubble).toBeTruthy();
  });

  test(`event handler should have capture flag`, () => {
    const h = onClick(handler, true);
    expect(h.d.flags & EventHandlerFlags.Capture).toBeTruthy();
  });
});
