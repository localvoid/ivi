describe(`render components`, () => {
  /* tslint:disable:whitespace */
  let html: typeof import("ivi-html");
  let utils: typeof import("./utils");
  /* tslint:enable:whitespace */

  beforeEach(async () => {
    jest.resetModules();
    html = await import("ivi-html");
    utils = await import("./utils");
  });

  test(`<Stateful><div></div></Stateful>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(
        html.div(),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<Stateful><Stateful><div></div></Stateful></Stateful>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(
        utils.Stateful(
          html.div(),
        ),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`null root in a stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(
        null,
      );
      const n = r(v);

      expect(n).toBeNull();
    });
  });

  test(`null root in a stateless component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateless(
        null,
      );
      const n = r(v);

      expect(n).toBeNull();
    });
  });
});
