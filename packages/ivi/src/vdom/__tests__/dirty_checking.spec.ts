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

  test(`identical vnodes should start dirty checking`, () => {
    utils.startRender(r => {
      let triggered = 0;
      const c = ivi.component((h) => {
        const s = ivi.useSelect(h, () => (triggered++));
        return () => (s(), html.div());
      });

      const v = utils.Static(c());

      r(v);
      r(v);

      expect(triggered).toBe(2);
    });
  });

  test(`update ivi.context during dirty checking`, () => {
    utils.startRender(r => {
      let innerTest = -1;
      let outerTest = -1;
      const c = ivi.component((h) => {
        const s = ivi.useSelect<number, undefined, { outer: number, inner: number }>(h,
          (_, { outer, inner }) => (innerTest = inner, outerTest = outer),
        );
        return () => (s(), html.div());
      });

      r(
        ivi.Context({ outer: 0, inner: 0 },
          utils.Static(
            ivi.Context({ inner: 10 },
              c(),
            ),
          ),
        ),
      );

      expect(outerTest).toBe(0);
      expect(innerTest).toBe(10);

      r(
        ivi.Context({ outer: 1, inner: 1 },
          utils.Static(
            ivi.Context({ inner: 10 },
              c(),
            ),
          ),
        ),
      );

      expect(outerTest).toBe(1);
      expect(innerTest).toBe(10);
    });
  });

  test(`update inner ivi.context during dirty checking`, () => {
    utils.startRender(r => {
      let i = 0;
      let innerTest = -1;
      const C = ivi.component((h) => {
        const s = ivi.useSelect<number, undefined, { inner: number }>(h,
          (_, { inner }) => (innerTest = inner),
        );
        return () => (s(), html.div());
      });

      const Context = ivi.component((h) => {
        const p = ivi.useSelect<number>(h, () => i++);
        return () => ivi.Context({ inner: p() }, C());
      });

      const v = () => utils.Static(Context());

      r(v());

      expect(innerTest).toBe(0);

      r(v());

      expect(innerTest).toBe(1);
    });
  });
});
