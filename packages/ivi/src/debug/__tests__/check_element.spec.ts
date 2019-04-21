import { useHTML, useSVG } from "ivi-jest";

const h = useHTML();
const s = useSVG();
const _ = void 0;

beforeEach(() => {
  console.warn = jest.fn();
});

describe("HTML Attributes", () => {
  describe("input element", () => {
    test("assigning step attribute after value should print a warning", () => {
      h.input(_, { value: h.VALUE("1"), step: "10" });
      expect(console.warn).toHaveBeenCalled();
    });

    test("assigning min attribute after value should print a warning", () => {
      h.input(_, { value: h.VALUE("1"), min: "10" });
      expect(console.warn).toHaveBeenCalled();
    });

    test("assigning max attribute after value should print a warning", () => {
      h.input(_, { value: h.VALUE("1"), max: "10" });
      expect(console.warn).toHaveBeenCalled();
    });
  });
});

describe("SVG Attributes", () => {
  describe("deprecated attributes", () => {
    test("svg viewport", () => {
      s.svg(_, { viewport: "1" });
      expect(console.warn).toHaveBeenCalled();
    });

    test("view viewTarget", () => {
      s.view(_, { viewTarget: "1" });
      expect(console.warn).toHaveBeenCalled();
    });
  });
});

describe("style", () => {
  test("newline characters in styles", () => {
    h.div(_, { style: { background: "#333\n" } });
    expect(console.warn).toHaveBeenCalled();
  });

  test("semicolon characters in styles", () => {
    h.div(_, { style: { background: "#333;" } });
    expect(console.warn).toHaveBeenCalled();
  });

  test("NaN values in styles", () => {
    h.div(_, { style: { background: NaN as any } });
    expect(console.warn).toHaveBeenCalled();
  });
});
