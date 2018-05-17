import * as h from "ivi-html";
import * as s from "ivi-svg";
import { startRender } from "./utils";

describe("HTML", () => {
  describe(`sync className`, () => {
    test(`null => "a"`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div());
        const b = r(h.div("a"));

        expect(b.classList.length).toBe(1);
        expect(b.classList.contains("a")).toBe(true);
      });
    });

    test(`"a" => null`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div("a"));
        const b = r(h.div());

        expect(b.classList.length).toBe(0);
      });
    });

    test(`"a" => "a"`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div("a"));
        const b = r(h.div("a"));

        expect(b.classList.length).toBe(1);
        expect(b.classList.contains("a")).toBe(true);
      });
    });

    test(`"a b" => "a"`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div("a"));
        const b = r(h.div("a"));

        expect(b.classList.length).toBe(1);
        expect(b.classList.contains("a")).toBe(true);
      });
    });

    test(`"a" => "a b"`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div("a"));
        const b = r(h.div("a b"));

        expect(b.classList.length).toBe(2);
        expect(b.classList.contains("a")).toBe(true);
        expect(b.classList.contains("b")).toBe(true);
      });
    });

    test(`null => "a b"`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div());
        const b = r(h.div("a b"));

        expect(b.classList.length).toBe(2);
        expect(b.classList.contains("a")).toBe(true);
        expect(b.classList.contains("b")).toBe(true);
      });
    });

    test(`"a b" => null`, () => {
      startRender<HTMLElement>((r) => {
        r(h.div("a b"));
        const b = r(h.div());

        expect(b.classList.length).toBe(0);
      });
    });
  });
});

describe("SVG", () => {
  describe(`sync className`, () => {
    test(`null => "a"`, () => {
      startRender<SVGElement>((r) => {
        r(s.circle());
        const b = r(s.circle("a"));

        expect(b.getAttribute("class")).toBe("a");
      });
    });

    test(`"a" => null`, () => {
      startRender<SVGElement>((r) => {
        r(s.circle("a"));
        const b = r(s.circle());

        expect(b.getAttribute("class")).toBe("");
      });
    });

    test(`"a" => "a"`, () => {
      startRender<SVGElement>((r) => {
        r(s.circle("a"));
        const b = r(s.circle("a"));

        expect(b.getAttribute("class")).toBe("a");
      });
    });
  });
});
