const _ = void 0;

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
      const v = utils.Stateful(html.div());
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`<Stateful><Stateful><div></div></Stateful></Stateful>`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(utils.Stateful(html.div()));
      const n = r(v);

      expect(n.tagName.toLowerCase()).toBe("div");
    });
  });

  test(`null root in a stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = utils.Stateful(null);
      const n = r(v);

      expect(n).toBeNull();
    });
  });

  test(`fragment root in a stateless component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = html.div(_, _, utils.Stateless([1, 2]));
      const n = r(v);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
    });
  });

  test(`fragment root in a stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v = html.div(_, _, utils.Stateful([1, 2]));
      const n = r(v);

      expect(n).toMatchInlineSnapshot(`
<div>
  1
  2
</div>
`);
    });
  });
});
