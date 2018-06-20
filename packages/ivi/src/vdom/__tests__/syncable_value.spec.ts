import {
  PROPERTY, EVENT, SYNCABLE_VALUE_SKIP_UNDEFINED, SYNCABLE_VALUE_REMOVE_EVENT_UNDEFINED, UNSAFE_HTML,
} from "ivi";

describe(`Syncable Value`, () => {
  describe(`PROPERTY()`, () => {
    test(`undefined should return SYNCABLE_VALUE_SKIP_UNDEFINED`, () => {
      expect(PROPERTY(undefined)).toBe(SYNCABLE_VALUE_SKIP_UNDEFINED);
    });

    test(`value`, () => {
      expect(PROPERTY(1).v).toBe(1);
    });

    test(`assign custom property`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.s(e, "_custom", void 0, 1);

      expect((e as any)._custom).toBe(1);
    });

    test(`sync custom property`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.s(e, "_custom", void 0, 1);
      p.s(e, "_custom", 1, 2);

      expect((e as any)._custom).toBe(2);
    });

    test(`sync custom property with the same value`, () => {
      const e = document.createElement("div");
      const p = PROPERTY(1);
      p.s(e, "_custom", void 0, 1);
      p.s(e, "_custom", 1, 1);

      expect((e as any)._custom).toBe(1);
    });
  });

  describe(`UNSAFE_HTML()`, () => {
    test(`undefined should return SYNCABLE_VALUE_SKIP_UNDEFINED`, () => {
      expect(UNSAFE_HTML(undefined)).toBe(SYNCABLE_VALUE_SKIP_UNDEFINED);
    });

    test(`value`, () => {
      expect(UNSAFE_HTML("abc").v).toBe("abc");
    });

    test(`assign unsafeHTML`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.s(e, "unsafeHTML", void 0, p.v);

      expect(e.innerHTML).toBe("<span>1</span>");
    });

    test(`sync unsafeHTML`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.s(e, "unsafeHTML", void 0, "<span>1</span>");
      p.s(e, "unsafeHTML", "<span>1</span>", "<span>2</span>");

      expect(e.innerHTML).toBe("<span>2</span>");
    });

    test(`sync unsafeHTML with the same value`, () => {
      const e = document.createElement("div");
      const p = UNSAFE_HTML("<span>1</span>");
      p.s(e, "unsafeHTML", void 0, "<span>1</span>");
      p.s(e, "unsafeHTML", "<span>1</span>", "<span>1</span>");

      expect(e.innerHTML).toBe("<span>1</span>");
    });

    test(`sync unsafeHTML with empty string should not assign property`, () => {
      const e = document.createElement("div");
      const set = jest.fn();
      Object.defineProperty(e, "innerHTML", { set: set });
      const p = UNSAFE_HTML("");
      p.s(e, "unsafeHTML", void 0, "");

      expect(set.mock.calls.length).toBe(0);
    });
  });

  describe(`EVENT()`, () => {
    test(`undefined should return SYNCABLE_VALUE_REMOVE_EVENT_UNDEFINED`, () => {
      expect(EVENT(undefined)).toBe(SYNCABLE_VALUE_REMOVE_EVENT_UNDEFINED);
    });

    test(`value`, () => {
      const h = () => { /**/ };

      expect(EVENT(h).v).toBe(h);
    });

    test(`attach native event`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p = EVENT(h);
      p.s(e, "click", void 0, h);
      e.click();

      expect(h.mock.calls.length).toBe(1);
    });

    test(`sync native event`, () => {
      const e = document.createElement("div");
      const h1 = jest.fn();
      const h2 = jest.fn();
      const p = EVENT(h1);
      p.s(e, "click", void 0, h1);
      p.s(e, "click", h1, h2);
      e.click();

      expect(h1.mock.calls.length).toBe(0);
      expect(h2.mock.calls.length).toBe(1);
    });

    test(`sync native event with the same handler`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p = EVENT(h);
      p.s(e, "click", void 0, h);
      p.s(e, "click", h, h);
      e.click();

      expect(h.mock.calls.length).toBe(1);
    });

    test(`sync native event with undefined values`, () => {
      const e = document.createElement("div");
      const rm = jest.fn();
      const add = jest.fn();
      e.removeEventListener = rm;
      e.addEventListener = add;

      const p = EVENT(undefined);
      p.s(e, "click", void 0, void 0);

      expect(rm.mock.calls.length).toBe(0);
      expect(add.mock.calls.length).toBe(0);
    });

    test(`remove native event`, () => {
      const e = document.createElement("div");
      const h = jest.fn();
      const p1 = EVENT(h);
      const p2 = EVENT(undefined);
      p1.s(e, "click", void 0, p1.v);
      p2.s(e, "click", p1.v, p2.v);
      e.click();

      expect(h.mock.calls.length).toBe(0);
    });
  });
});
