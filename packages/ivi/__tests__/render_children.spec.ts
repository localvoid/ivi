import { render, checkDOMOps, domOps } from "./utils";
import * as h from "./utils/html";

test(`<div>{ null }</div>`, () => {
  checkDOMOps((c) => {
    const n = render(h.div().c(null));

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
  });
});

test(`<div>"abc"</div>`, () => {
  checkDOMOps((c) => {
    const v = h.div().c("abc");
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
  });
});

test(`<div>10</div>`, () => {
  checkDOMOps((c) => {
    const v = h.div().c(10);
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(1, 0, 1, 0, 2, 0, 0));
  });
});

test(`<div><span></span></div>`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.span(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(2, 0, 0, 0, 2, 0, 0));
  });
});

test(`<div><span></span><strong></strong></div>`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.span(),
        h.strong(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
  });
});

test(`<div><div></div>{ null }<span></span></div>`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.div(),
        null,
        h.span(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(3, 0, 0, 0, 3, 0, 0));
  });
});

test(`<div><div></div>"abc"<span></span></div>`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.div(),
        "abc",
        h.span(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(3, 0, 1, 0, 4, 0, 0));
  });
});

test(`<div><div></div>123<span></span></div>`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.div(),
        123,
        h.span(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(3, 0, 1, 0, 4, 0, 0));
  });
});

test(`complex tree #1`, () => {
  checkDOMOps((c) => {
    const v = (
      h.div().c(
        h.div().c("hello"),
        h.div().c(
          h.span().c("world"),
          h.div().c(
            h.span(),
          ),
        ),
        h.div().c(h.div()),
        h.div(),
      )
    );
    const n = render(v);

    expect(n).toMatchSnapshot();
    expect(c).toEqual(domOps(9, 0, 2, 0, 11, 0, 0));
  });
});
