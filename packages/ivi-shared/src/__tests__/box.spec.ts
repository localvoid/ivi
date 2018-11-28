import { box } from "ivi";

describe("Box", () => {
  test("should contain value", () => {
    expect(box(10)).toEqual({ v: 10 });
  });
});
