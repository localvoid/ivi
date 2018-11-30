import * as h from "ivi-html";
import { _ } from "ivi";
import { startRender, checkDOMOps } from "./utils";

test(`<input> => <input type="checkbox">`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input());
      const n = r(h.input(_, { type: "checkbox" }));

      expect(n).toMatchInlineSnapshot(`
<input
  type="checkbox"
/>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input> => <input value="cde">`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input());
      const n = r(h.input(_, { value: h.VALUE("cde") }));

      expect(n).toMatchInlineSnapshot(`<input />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input value="abc"> => <input value="cde">`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input(_, { value: h.VALUE("abc") }));
      const n = r(h.input(_, { value: h.VALUE("cde") }));

      expect(n).toMatchInlineSnapshot(`<input />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input value="abc"> => <input>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input(_, { value: h.VALUE("abc") }));
      const n = r(h.input());

      expect(n).toMatchInlineSnapshot(`<input />`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input type="checkbox"> => <input type="checkbox" checked=true>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input(_, { type: "checkbox" }));
      const n = r(h.input(_, { type: "checkbox", checked: h.CHECKED(true) }));

      expect(n).toMatchInlineSnapshot(`
<input
  type="checkbox"
/>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input type="checkbox" checked=true> => <input type="checkbox" checked=false>`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input(_, { type: "checkbox", checked: h.CHECKED(true) }));
      const n = r(h.input(_, { type: "checkbox", checked: h.CHECKED(false) }));

      expect(n).toMatchInlineSnapshot(`
<input
  type="checkbox"
/>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});

test(`<input type="checkbox" checked=true> => <input type="checkbox">`, () => {
  startRender(r => {
    checkDOMOps(c => {
      r(h.input(_, { type: "checkbox", checked: h.CHECKED(true) }));
      const n = r(h.input(_, { type: "checkbox" }));

      expect(n).toMatchInlineSnapshot(`
<input
  type="checkbox"
/>
`);
      expect(c).toMatchInlineSnapshot(`
Object {
  "appendChild": 0,
  "createElement": 1,
  "createElementNS": 0,
  "createTextNode": 0,
  "insertBefore": 1,
  "nodeValue": 0,
  "removeChild": 0,
  "replaceChild": 0,
  "textContent": 0,
}
`);
    });
  });
});
