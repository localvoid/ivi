describe(`sync components`, () => {
  /* tslint:disable:whitespace */
  let html: typeof import("ivi-html");
  let iviTest: typeof import("ivi-test");
  let utils: typeof import("./utils");
  /* tslint:enable:whitespace */

  beforeEach(async () => {
    jest.resetModules();
    html = await import("ivi-html");
    iviTest = await import("ivi-test");
    utils = await import("./utils");
  });

  test(`#1`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#2`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#3`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#4`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#5`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#6`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#7`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`#8`, () => {
    iviTest.testRenderDOM(r => {
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
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
      });
    });
  });

  test(`null root to a div in a stateful component`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      const v1 = utils.Stateful(null);
      r(v1);
      const v2 = utils.Stateful(html.div());
      const n = r(v2);
      expect(n).toMatchInlineSnapshot(`<div />`);
    });
  });

  test(`div to a null root in a stateful component`, () => {
    iviTest.testRenderDOM<HTMLElement>(r => {
      const v1 = utils.Stateful(html.div());
      r(v1);
      const v2 = utils.Stateful(null);
      const n = r(v2);

      expect(n).toBeNull();
    });
  });
});
