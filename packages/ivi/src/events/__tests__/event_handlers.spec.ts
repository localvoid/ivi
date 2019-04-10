describe(`Event Handler`, () => {
  let ivi: typeof import("ivi");

  beforeEach(async () => {
    jest.resetModules();
    ivi = await import("ivi");
  });

  function handler(ev: any): void {
    // Event handler...
  }

  test(`event dispatcher should be assigned`, () => {
    const h = ivi.onClick(handler);
    expect(h.d.s).toBe(ivi.CLICK_EVENT);
  });

  test(`event handler should be assigned`, () => {
    const h = ivi.onClick(handler);
    expect(h.h).toBe(handler);
  });

  test(`event handler shouldn't have capture flag when capture arg is undefined`, () => {
    const h = ivi.onClick(handler);
    expect(h.d.f & ivi.EventHandlerFlags.Capture).toBeFalsy();
  });

  test(`event handler shouldn't have capture flag when capture arg is false`, () => {
    const h = ivi.onClick(handler, false);
    expect(h.d.f & ivi.EventHandlerFlags.Capture).toBeFalsy();
  });

  test(`event handler should have capture flag`, () => {
    const h = ivi.onClick(handler, true);
    expect(h.d.f & ivi.EventHandlerFlags.Capture).toBeTruthy();
  });
});
