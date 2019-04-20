import { useIVI } from "ivi-jest";

const ivi = useIVI();

test("empty object should be empty", () => {
  expect(ivi.EMPTY_OBJECT).toEqual({});
});
