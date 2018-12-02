import { checkElement } from "../element";

beforeEach(() => {
  console.warn = jest.fn();
});

describe(`HTML Attributes`, () => {
  describe(`input element`, () => {
    test(`assigning step attribute after value should print a warning`, () => {
      checkElement("input", { value: "1", step: "10" }, false);
      expect(console.warn).toHaveBeenCalled();
    });

    test(`assigning min attribute after value should print a warning`, () => {
      checkElement("input", { value: "1", min: "10" }, false);
      expect(console.warn).toHaveBeenCalled();
    });

    test(`assigning max attribute after value should print a warning`, () => {
      checkElement("input", { value: "1", max: "10" }, false);
      expect(console.warn).toHaveBeenCalled();
    });
  });

});

describe(`SVG Attributes`, () => {
  describe(`deprecated attributes`, () => {
    test(`svg viewport`, () => {
      checkElement("svg", { viewport: "1" }, true);
      expect(console.warn).toHaveBeenCalled();
    });

    test(`view viewTarget`, () => {
      checkElement("view", { viewTarget: "1" }, true);
      expect(console.warn).toHaveBeenCalled();
    });
  });
});

describe(`style`, () => {
  test(`newline characters in styles`, () => {
    checkElement("div", { style: { background: "#333\n" } }, false);
    expect(console.warn).toHaveBeenCalled();
  });

  test(`semicolon characters in styles`, () => {
    checkElement("div", { style: { background: "#333;" } }, false);
    expect(console.warn).toHaveBeenCalled();
  });

  test(`NaN values in styles`, () => {
    checkElement("div", { style: { background: NaN } }, false);
    expect(console.warn).toHaveBeenCalled();
  });
});
