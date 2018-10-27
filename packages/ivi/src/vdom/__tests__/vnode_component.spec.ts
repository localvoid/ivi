import { component, t } from "ivi";

const Empty = component(() => t(""));

test(`assigning children should raise an exception`, () => {
  expect(() => Empty().c("123")).toThrow(Error);
});
