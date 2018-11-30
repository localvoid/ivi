import { _ } from "ivi";
import { table, tr, p, ul } from "ivi-html";
import { testRenderDOM } from "ivi-test";

test(`table without tbody should raise an error`, () => {
  expect(() => {
    testRenderDOM((r) => {
      r(table(_, _, tr()));
    });
  }).toThrowError("nesting rule");
});

test(`<ul> in <p> should raise an error`, () => {
  expect(() => {
    testRenderDOM((r) => {
      r(p(_, _, ul()));
    });
  }).toThrowError("nesting rule");
});
