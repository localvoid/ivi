import { render } from "ivi";
import * as h from "ivi-html";

test(`render into document body should raise an exception`, () => {
  expect(() => render(h.div(), document.body)).toThrowError();
});

test(`render into unmounted element should raise an exception`, () => {
  expect(() => render(h.div(), document.createElement("div"))).toThrowError();
});
