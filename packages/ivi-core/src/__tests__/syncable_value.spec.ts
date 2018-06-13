import { PROPERTY, SYNCABLE_VALUE_SKIP_UNDEFINED } from "../syncable_value";

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

  test(`update custom property`, () => {
    const e = document.createElement("div");
    const p = PROPERTY(1);
    p.s(e, "_custom", void 0, 1);
    p.s(e, "_custom", void 0, 2);
    expect((e as any)._custom).toBe(2);
  });

  test(`update custom property with the same value`, () => {
    const e = document.createElement("div");
    const p = PROPERTY(1);
    p.s(e, "_custom", void 0, 1);
    p.s(e, "_custom", void 0, 1);
    expect((e as any)._custom).toBe(1);
  });
});
