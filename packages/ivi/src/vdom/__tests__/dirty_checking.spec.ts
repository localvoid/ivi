describe(`dirty checking`, () => {
  /* tslint:disable:whitespace */
  let ivi: typeof import("ivi");
  let html: typeof import("ivi-html");
  let utils: typeof import("./utils");
  /* tslint:enable:whitespace */

  beforeEach(async () => {
    jest.resetModules();
    ivi = await import("ivi");
    html = await import("ivi-html");
    utils = await import("./utils");
  });

  test(`identical node should trigger dirty checking`, () => {
    utils.startRender((r) => {
      let triggered = 0;
      const c = ivi.connect(
        () => (triggered++),
        () => html.div(),
      );

      const v = (
        html.div().c(
          c(),
        )
      );

      r(v);
      r(v);

      expect(triggered).toBe(2);
    });
  });

  test(`ivi.stopDirtyChecking should stop dirty checking`, () => {
    utils.startRender((r) => {
      let triggered = 0;
      const c = ivi.connect(
        () => (triggered++),
        () => html.div(),
      );

      const v = (
        html.div().c(
          ivi.stopDirtyChecking(
            c(),
          ),
        )
      );

      r(v);
      r(v);

      expect(triggered).toBe(1);
    });
  });

  test(`update ivi.context during dirty checking`, () => {
    utils.startRender((r) => {
      let innerTest = -1;
      let outerTest = -1;
      const c = ivi.connect<number, undefined, { outer: number, inner: number }>(
        (prev, _, { outer, inner }) => (innerTest = inner, outerTest = outer),
        () => html.div(),
      );

      const v = (
        html.div().c(
          ivi.context({ inner: 10 },
            c(),
          ),
        )
      );

      r(ivi.context({ outer: 0, inner: 0 }, v));

      expect(outerTest).toBe(0);
      expect(innerTest).toBe(10);

      r(ivi.context({ outer: 1, inner: 1 }, v));

      expect(outerTest).toBe(1);
      expect(innerTest).toBe(10);
    });
  });

  test(`update inner ivi.context during dirty checking`, () => {
    utils.startRender((r) => {
      let i = 0;
      let innerTest = -1;
      const C = ivi.connect<number, undefined, { inner: number }>(
        (prev, _, { inner }) => (innerTest = inner),
        () => html.div(),
      );
      const Context = ivi.connect(
        () => i++,
        (p) => ivi.context({ inner: p }, C()),
      );

      const v = (
        html.div().c(
          Context(),
        )
      );

      r(v);

      expect(innerTest).toBe(0);

      r(v);

      expect(innerTest).toBe(1);
    });
  });

  test(`triggering dirty checking during render should rerun dirty checking`, () => {
    utils.startRender((r) => {
      let i = 0;
      const c = ivi.connect<null>(
        () => {
          if (i++ === 0) {
            ivi.invalidate();
          }
          return null;
        },
        () => html.div(),
      );

      r(c());

      expect(i).toBe(2);
    });
  });
});
