describe(`sync components`, () => {
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

  test(`#1`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = html.span();
        const v2 = utils.Stateful(html.div());

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#2`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = utils.Stateful(html.div());
        const v2 = html.div();

        const a = r(v1);
        const b = r(v2);

        expect(a).not.toBe(b);
        expect(b).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#3`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = html.div();
        const v2 = utils.Stateful(html.div());

        const a = r(v1);
        const b = r(v2);

        expect(a).not.toBe(b);
        expect(b).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#4`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = utils.Stateful(html.div());
        const v2 = html.span();

        r(v1);
        const n = r(v2);

        expect(n).toMatchInlineSnapshot(`<span />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#5`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = utils.Stateful(html.div());
        const v2 = utils.Stateful(html.div());

        const a = r(v1);
        const b = r(v2);

        expect(a).toBe(b);
        expect(b).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#6`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = utils.Stateful(utils.Stateful(html.div()));
        const v2 = html.span();

        r(v1);
        const b = r(v2);

        expect(b).toMatchInlineSnapshot(`<span />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#7`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = html.span();
        const v2 = utils.Stateful(utils.Stateful(html.div()));

        r(v1);
        const b = r(v2);

        expect(b).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 2,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 2,
  "removeChild": 1,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`#8`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = utils.Stateful(utils.Stateful(html.div()));
        const v2 = utils.Stateful(utils.Stateful(html.div()));

        const a = r(v1);
        const b = r(v2);

        expect(a).toBe(b);
        expect(b).toMatchInlineSnapshot(`<div />`);
        expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
      });
    });
  });

  test(`null root to a div in a stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v1 = utils.Stateful(null);
      r(v1);
      const v2 = utils.Stateful(html.div());
      const n = r(v2);
      expect(n).toMatchInlineSnapshot(`<div />`);
    });
  });

  test(`div to a null root in a stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v1 = utils.Stateful(html.div());
      r(v1);
      const v2 = utils.Stateful(null);
      const n = r(v2);

      expect(n).toBeNull();
    });
  });

  test(`should throw an error when TrackByKey is a root node of stateful component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v1 = utils.Stateful(null);
      r(v1);
      const v2 = utils.Stateful(ivi.TrackByKey([]));
      expect(() => r(v2)).toThrowError("TrackByKey");
    });
  });

  test(`should throw an error when TrackByKey is a root node of stateless component`, () => {
    utils.startRender<HTMLElement>(r => {
      const v1 = utils.Stateless(null);
      r(v1);
      const v2 = utils.Stateless(ivi.TrackByKey([]));
      expect(() => r(v2)).toThrowError("TrackByKey");
    });
  });
});
