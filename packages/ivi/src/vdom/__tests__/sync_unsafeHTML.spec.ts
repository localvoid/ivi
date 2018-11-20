import { UNSAFE_HTML, _ } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`<div> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, { unsafeHTML: UNSAFE_HTML("<span>abc</span>") }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div unsafeHTML="<div>abc</div>"> => <div></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, { unsafeHTML: UNSAFE_HTML("<div>abc</div>") }));
      const n = r(h.div());

      expect(n).toMatchSnapshot();
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div unsafeHTML=""> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, { unsafeHTML: UNSAFE_HTML("") }));
      const n = r(h.div(_, { unsafeHTML: UNSAFE_HTML("<span>abc</span>") }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});

test(`<div unsafeHTML="<div>abc</div>"> => <div unsafeHTML="<span>abc</span>"></div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, { unsafeHTML: UNSAFE_HTML("<div>abc</div>") }));
      const n = r(h.div(_, { unsafeHTML: UNSAFE_HTML("<span>abc</span>") }));

      expect(n).toMatchSnapshot();
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "removeChild": 0,
  "replaceChild": 0,
}
`);
    });
  });
});
