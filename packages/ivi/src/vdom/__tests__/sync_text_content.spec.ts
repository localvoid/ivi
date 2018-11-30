import { _ } from "ivi";
import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`<div>""</div> => <div>"abc"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, ""));
      const n = r(h.div(_, _, "abc"));

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 1,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<div>"abc"</div> => <div>""</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div(_, _, ""));

      expect(n).toMatchInlineSnapshot(`
<div>
  
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 1,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<div></div> => <div>"abc"</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div());
      const n = r(h.div(_, _, "abc"));

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<div>"abc"</div> => <div>""</div>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.div(_, _, "abc"));
      const n = r(h.div());

      expect(n).toMatchInlineSnapshot(`<div />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 1,
  "insertBefore": 2,
  "nodeValue": 0,
  "removeChild": 1,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});
