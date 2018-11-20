import { startRender, checkDOMOps } from "./utils";
import { _ } from "ivi";
import * as h from "ivi-html";

test(`<div>{ null }</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const n = r(h.div(_, _, null));

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>"abc"</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div(_, _, "abc");
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div>10</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div(_, _, 10);
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><span></span></div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _,
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
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _, [
          h.span(),
          h.strong(),
        ])
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>{ null }<span></span></div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _, [
          h.div(),
          null,
          h.span(),
        ])
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>"abc"<span></span></div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _, [
          h.div(),
          "abc",
          h.span(),
        ])
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`<div><div></div>123<span></span></div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _, [
          h.div(),
          123,
          h.span(),
        ])
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});

test(`complex tree #1`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = (
        h.div(_, _, [
          h.div(_, _, "hello"),
          h.div(_, _, [
            h.span(_, _, "world"),
            h.div(_, _, h.span()),
          ]),
          h.div(_, _, h.div()),
          h.div(),
        ])
      );
      const n = r(v);

      expect(n).toMatchSnapshot();
      expect(c).toMatchSnapshot();
    });
  });
});
