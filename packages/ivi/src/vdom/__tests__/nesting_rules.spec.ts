describe(`Nesting rules`, () => {
  const _ = void 0;
  let h: typeof import("ivi-html");
  let iviTest: typeof import("ivi-test");

  beforeEach(async () => {
    jest.resetModules();
    h = await import("ivi-html");
    iviTest = await import("ivi-test");
  });

  test(`table without tbody should raise an error`, () => {
    expect(() => {
      iviTest.testRenderDOM((r) => {
        r(h.table(_, _, h.tr()));
      });
    }).toThrowError("nesting rule");
  });

  test(`<ul> in <p> should raise an error`, () => {
    expect(() => {
      iviTest.testRenderDOM((r) => {
        r(h.p(_, _, h.ul()));
      });
    }).toThrowError("nesting rule");
  });
});
