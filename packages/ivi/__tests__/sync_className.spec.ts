import { startRender } from "./utils";
import * as h from "./utils/html";

describe(`sync element className`, () => {
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
