describe(`render components`, () => {
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

  test(`<Stateless><div></div></Stateless>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateless(
        html.div(),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<Stateless><Stateless><div></div></Stateless></Stateless>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateless(
        utils.Stateless(
          html.div(),
        ),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
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

  test(`<Stateless><Stateful><div></div></Stateful></Stateless>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateless(
        utils.Stateful(
          html.div(),
        ),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<Stateful><Stateless><div></div></Stateless></Stateful>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(
        utils.Stateless(
          html.div(),
        ),
      );
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`stateless component should raise an exception when render function returns children collection`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateless(
        ivi.fragment(
          html.div(),
          html.div(),
        )!,
      );
      expect(() => { r(v); }).toThrowError("singular");
    });
  });

  test(`stateful component should raise an exception when render function returns children collection`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(
        ivi.fragment(
          html.div(),
          html.div(),
        )!,
      );
      expect(() => { r(v); }).toThrowError("singular");
    });
  });
});
