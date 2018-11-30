import { isValidTag } from "../dom";

test(`should return true for valid tag "div"`, () => {
  expect(isValidTag("div")).toBe(true);
});

test(`should return false for invalid tag "-div"`, () => {
  expect(isValidTag("-div")).toBe(false);
});
