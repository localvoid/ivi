import { statelessComponent } from "ivi";
import * as h from "ivi-html";

const Empty = statelessComponent(() => h.t(""));

test(`assigning children should raise an exception`, () => {
  expect(() => Empty().c("123")).toThrow(Error);
});
