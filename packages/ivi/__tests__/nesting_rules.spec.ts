import { render } from "./utils";
import * as h from "./utils/html";

describe(`nesting rules violation`, () => {
  test(`<table><tr></tr></table>`, () => {
    const n = (
      h.table().c(
        h.tr(),
      )
    );

    expect(() => { render(n); }).toThrow(Error);
  });

  test(`<h1><h2></h2></h1>`, () => {
    const n = (
      h.h1().c(
        h.h2(),
      )
    );

    expect(() => { render(n); }).toThrow(Error);
  });

  test(`<h1><span><h2></h2></span></h1>`, () => {
    const n = (
      h.h1().c(
        h.span().c(
          h.h2(),
        ),
      )
    );

    expect(() => { render(n); }).toThrow(Error);
  });
});
