import { startRender, checkDOMOps } from "./utils";
import * as h from "ivi-html";

test(`<div>{ null }</div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const n = r(h.div().c(null));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>"abc"</div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = h.div().c("abc");
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>10</div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = h.div().c(10);
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><span></span></div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = (
        h.div().c(
          h.span(),
        )
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><span></span><strong></strong></div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = (
        h.div().c(
          h.span(),
          h.strong(),
        )
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>{ null }<span></span></div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = (
        h.div().c(
          h.div(),
          null,
          h.span(),
        )
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>"abc"<span></span></div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = (
        h.div().c(
          h.div(),
          "abc",
          h.span(),
        )
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>123<span></span></div>`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
      const v = (
        h.div().c(
          h.div(),
          123,
          h.span(),
        )
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`complex tree #1`, () => {
  checkDOMOps((c) => {
    startRender((r) => {
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
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});
