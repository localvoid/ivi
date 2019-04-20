import { useIVI } from "ivi-jest";

const ivi = useIVI();

describe("Box", () => {
  test("should contain value", () => {
    expect(ivi.box(10)).toEqual({ v: 10 });
  });
});
