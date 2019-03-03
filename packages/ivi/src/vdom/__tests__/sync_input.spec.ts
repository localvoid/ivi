import * as h from "ivi-html";
import { _ } from "ivi";
import { testRenderDOM } from "ivi-test";
import { checkDOMOps } from "./utils";

test(`<input> => <input type="checkbox">`, () => {
  testRenderDOM(r => {
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
  testRenderDOM(r => {
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
  testRenderDOM(r => {
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
  testRenderDOM(r => {
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

test(`input value should always check internal state`, () => {
  testRenderDOM<HTMLInputElement>(r => {
    let n = r(h.input(_, { value: h.VALUE("") }));
    n!.value = "abc";
    n = r(h.input(_, { value: h.VALUE("") }));

    expect(n!.value).toBe("");
  });
});

test(`<input type="checkbox"> => <input type="checkbox" checked=true>`, () => {
  testRenderDOM(r => {
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
  testRenderDOM(r => {
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
  testRenderDOM(r => {
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
