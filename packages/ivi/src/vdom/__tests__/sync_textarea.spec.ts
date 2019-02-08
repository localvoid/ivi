import * as h from "ivi-html";
import { testRenderDOM } from "ivi-test";
import { checkDOMOps } from "./utils";

test(`<textarea></textarea> => <textarea>cde</textarea>`, () => {
  testRenderDOM<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea());
      const b = r(h.textarea("", { content: h.CONTENT("cde") }))!;

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
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

test(`<textarea>abc</textarea> => <textarea>cde</textarea>`, () => {
  testRenderDOM<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea("", { content: h.CONTENT("abc") }));
      const b = r(h.textarea("", { value: h.CONTENT("cde") }))!;

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
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

test(`<textarea>abc</textarea> => <textarea></textarea>`, () => {
  testRenderDOM<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea("", { content: h.CONTENT("abc") }));
      const b = r(h.textarea())!;

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("abc");
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
