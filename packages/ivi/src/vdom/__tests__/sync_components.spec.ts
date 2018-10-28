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
        const v1 = (
          html.span()
        );
        const v2 = (
          utils.Stateful(
            html.div(),
          )
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#2`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          utils.Stateful(
            html.div(),
          )
        );
        const v2 = (
          html.div()
        );

        const a = r(v1);
        const b = r(v2);

        expect(a).not.toBe(b);
        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#3`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          html.div()
        );
        const v2 = (
          utils.Stateful(
            html.div(),
          )
        );

        const a = r(v1);
        const b = r(v2);

        expect(a).not.toBe(b);
        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#4`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          utils.Stateful(
            html.div(),
          )
        );
        const v2 = (
          html.span()
        );

        r(v1);
        const n = r(v2);

        expect(n).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#5`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          utils.Stateful(
            html.div(),
          )
        );
        const v2 = (
          utils.Stateful(
            html.div(),
          )
        );

        const a = r(v1);
        const b = r(v2);

        expect(a).toBe(b);
        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#6`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          utils.Stateful(
            utils.Stateful(
              html.div(),
            ),
          )
        );
        const v2 = (
          html.span()
        );

        r(v1);
        const b = r(v2);

        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#7`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          html.span()
        );
        const v2 = (
          utils.Stateful(
            utils.Stateful(
              html.div(),
            ),
          )
        );

        r(v1);
        const b = r(v2);

        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`#8`, () => {
    utils.startRender(r => {
      utils.checkDOMOps(c => {
        const v1 = (
          utils.Stateful(
            utils.Stateful(
              html.div(),
            ),
          )
        );
        const v2 = (
          utils.Stateful(
            utils.Stateful(
              html.div(),
            ),
          )
        );

        const a = r(v1);
        const b = r(v2);

        expect(a).toBe(b);
        expect(b).toMatchSnapshot();
        expect(c).toMatchSnapshot();
      });
    });
  });

  test(`component should raise an exception when render function returns children collection`, () => {
    utils.startRender<HTMLElement>(r => {
      const v1 = (
        utils.Stateful(
          html.div(),
        )
      );
      const v2 = (
        utils.Stateful(
          ivi.fragment(
            html.div(),
            html.div(),
          )!,
        )
      );

      r(v1);
      expect(() => { r(v2); }).toThrowError("singular");
    });
  });
});
