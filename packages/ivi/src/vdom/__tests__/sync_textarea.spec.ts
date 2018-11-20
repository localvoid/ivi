import * as h from "ivi-html";
import { startRender, checkDOMOps } from "./utils";

test(`<textarea></textarea> => <textarea>cde</textarea>`, () => {
  startRender<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea());
      const b = r(h.textarea("", { value: h.VALUE("cde") }));

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
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

test(`<textarea>abc</textarea> => <textarea>cde</textarea>`, () => {
  startRender<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea("", { value: h.VALUE("abc") }));
      const b = r(h.textarea("", { value: h.VALUE("cde") }));

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
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

test(`<textarea>abc</textarea> => <textarea></textarea>`, () => {
  startRender<HTMLTextAreaElement>(r => {
    checkDOMOps(c => {
      r(h.textarea("", { value: h.VALUE("abc") }));
      const b = r(h.textarea());

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("abc");
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
