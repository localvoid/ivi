import {
  PROPERTY, EVENT, UNSAFE_HTML,
  AUTOFOCUS, withNextFrame,
} from "ivi";

describe(`Attribute Directive`, () => {
  describe(`PROPERTY()`, () => {
    test(`value`, () => {
      expect(PROPERTY(1).v).toBe(1);
    });

    test(`assign custom property`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.u!(e, "_custom", void 0, 1);

      expect((e as any)._custom).toBe(1);
    });

    test(`sync custom property`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.u!(e, "_custom", void 0, 1);
      p.u!(e, "_custom", 1, 2);

      expect((e as any)._custom).toBe(2);
    });

    test(`sync custom property with the same value`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.u!(e, "_custom", void 0, 1);
      p.u!(e, "_custom", 1, 1);

      expect((e as any)._custom).toBe(1);
    });
  });

  describe(`UNSAFE_HTML()`, () => {
    test(`value`, () => {
      expect(UNSAFE_HTML("abc").v).toBe("abc");
    });

    test(`assign unsafeHTML`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.u!(e, "unsafeHTML", void 0, p.v);

      expect(e.innerHTML).toBe("<span>1</span>");
    });

    test(`sync unsafeHTML`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.u!(e, "unsafeHTML", void 0, "<span>1</span>");
      p.u!(e, "unsafeHTML", "<span>1</span>", "<span>2</span>");

      expect(e.innerHTML).toBe("<span>2</span>");
    });

    test(`sync unsafeHTML with the same value`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.u!(e, "unsafeHTML", void 0, "<span>1</span>");
      p.u!(e, "unsafeHTML", "<span>1</span>", "<span>1</span>");

      expect(e.innerHTML).toBe("<span>1</span>");
    });

    test(`sync unsafeHTML with empty string should not assign property`, () => {
      const e = document.createElement("div");
      const set = jest.fn();
      Object.defineProperty(e, "innerHTML", { set: set });
      const p = UNSAFE_HTML("");
      p.u!(e, "unsafeHTML", void 0, "");

      expect(set.mock.calls.length).toBe(0);
    });
  });

  describe(`AUTOFOCUS()`, () => {
    test(`true value`, () => {
      expect(AUTOFOCUS(true).v).toBe(true);
    });

    test(`false value`, () => {
      expect(AUTOFOCUS(false).v).toBe(false);
    });

    test(`assign AUTOFOCUS`, () => {
      const a = document.createElement("input");
      const p = AUTOFOCUS(true);
      withNextFrame(() => {
        p.u!(a, "autofocus", void 0, p.v);
      })();

      expect(document.activeElement).toBe(a);
    });

    test(`update AUTOFOCUS`, () => {
      const a = document.createElement("input");
      const b = document.createElement("input");
      const p = AUTOFOCUS(true);
      withNextFrame(() => {
        p.u!(a, "autofocus", void 0, true);
      })();
      b.focus();
      withNextFrame(() => {
        p.u!(a, "autofocus", true, true);
      })();

      expect(document.activeElement).toBe(b);
    });
  });

  describe(`EVENT()`, () => {
    test(`value`, () => {
      const h = () => { /**/ };

      expect(EVENT(h).v).toBe(h);
    });

    test(`attach native event`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p = EVENT(h);
      p.u!(e, "click", void 0, h);
      e.click();

      expect(h.mock.calls.length).toBe(1);
    });

    test(`sync native event`, () => {
      const e = document.createElement("div");
      const h1 = jest.fn();
      const h2 = jest.fn();
      const p = EVENT(h1);
      p.u!(e, "click", void 0, h1);
      p.u!(e, "click", h1, h2);
      e.click();

      expect(h1.mock.calls.length).toBe(0);
      expect(h2.mock.calls.length).toBe(1);
    });

    test(`sync native event with the same handler`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p = EVENT(h);
      p.u!(e, "click", void 0, h);
      p.u!(e, "click", h, h);
      e.click();

      expect(h.mock.calls.length).toBe(1);
    });

    test(`remove native event`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p1 = EVENT(h);
      const p2 = EVENT(h);
      p1.u!(e, "click", void 0, p1.v);
      p2.u!(e, "click", p1.v, void 0);
      e.click();

      expect(h.mock.calls.length).toBe(0);
    });
  });
});
