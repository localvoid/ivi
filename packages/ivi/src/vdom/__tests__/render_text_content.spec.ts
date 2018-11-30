import { startRender, checkDOMOps } from "./utils";
import { _ } from "ivi";
import * as h from "ivi-html";

test(`<div>""</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div(_, _, "");
      const n = r(v);

      expect(n).toMatchInlineSnapshot(`
<div>
  
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 1,
  "createElement": 2,
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

test(`<div>"abc"</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div(_, _, "abc");
      const n = r(v);

      expect(n).toMatchInlineSnapshot(`
<div>
  abc
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 1,
  "createElement": 2,
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

test(`<div>10</div>`, () => {
  checkDOMOps(c => {
    startRender(r => {
      const v = h.div(_, _, 10);
      const n = r(v);

      expect(n).toMatchInlineSnapshot(`
<div>
  10
</div>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 1,
  "createElement": 2,
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
