import { statelessComponent } from "ivi";
import * as h from "ivi-html";

const Empty = statelessComponent(() => h.t(""));

test(`assigning style should raise an exception`, () => {
  expect(() => Empty().s({})).toThrow(Error);
});

test(`assigning events should raise an exception`, () => {
  expect(() => Empty().e([])).toThrow(Error);
});

test(`assigning children should raise an exception`, () => {
  expect(() => Empty().c("123")).toThrow(Error);
});

test(`assigning unsafeHTML should raise an exception`, () => {
  expect(() => Empty().unsafeHTML("123")).toThrow(Error);
});

test(`assigning input value should raise an exception`, () => {
  expect(() => Empty().value("123")).toThrow(Error);
});

test(`assigning input checked value should raise an exception`, () => {
  expect(() => Empty().checked(true)).toThrow(Error);
});

test(`assigning autofocus should raise an exception`, () => {
  expect(() => Empty().autofocus(true)).toThrow(Error);
});
