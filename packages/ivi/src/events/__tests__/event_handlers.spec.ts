import { EventHandlerFlags, CLICK_EVENT, onClick } from "ivi";

function handler(ev: any): void {
  // Event handler...
}

describe(`Event Handler`, () => {
  test(`event dispatcher should be assigned`, () => {
    const h = onClick(handler);
    expect(h.d.src).toBe(CLICK_EVENT);
  });

  test(`event handler should be assigned`, () => {
    const h = onClick(handler);
    expect(h.h).toBe(handler);
  });

  test(`event handler shouldn't have capture flag when capture arg is undefined`, () => {
    const h = onClick(handler);
    expect(h.d.flags & EventHandlerFlags.Capture).toBeFalsy();
  });

  test(`event handler shouldn't have capture flag when capture arg is false`, () => {
    const h = onClick(handler, false);
    expect(h.d.flags & EventHandlerFlags.Capture).toBeFalsy();
  });

  test(`event handler should have capture flag`, () => {
    const h = onClick(handler, true);
    expect(h.d.flags & EventHandlerFlags.Capture).toBeTruthy();
  });
});
