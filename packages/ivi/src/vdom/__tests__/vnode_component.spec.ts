import { statelessComponent, t } from "ivi";

const Empty = statelessComponent(() => t(""));

test(`assigning children should raise an exception`, () => {
  expect(() => Empty().c("123")).toThrow(Error);
});
