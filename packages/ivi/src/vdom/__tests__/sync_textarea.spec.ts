import * as h from "ivi-html";
import { startRender, checkDOMOps, domOps } from "./utils";

test(`<textarea></textarea> => <textarea>cde</textarea>`, () => {
  startRender<HTMLTextAreaElement>((r) => {
    checkDOMOps((c) => {
      r(h.textarea());
      const b = r(h.textarea("", { value: h.VALUE("cde") }));

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});

test(`<textarea>abc</textarea> => <textarea>cde</textarea>`, () => {
  startRender<HTMLTextAreaElement>((r) => {
    checkDOMOps((c) => {
      r(h.textarea("", { value: h.VALUE("abc") }));
      const b = r(h.textarea("", { value: h.VALUE("cde") }));

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("cde");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});

test(`<textarea>abc</textarea> => <textarea></textarea>`, () => {
  startRender<HTMLTextAreaElement>((r) => {
    checkDOMOps((c) => {
      r(h.textarea("", { value: h.VALUE("abc") }));
      const b = r(h.textarea());

      expect(b.tagName.toLowerCase()).toBe("textarea");
      expect(b.value).toBe("abc");
      expect(c).toEqual(domOps(1, 0, 0, 0, 1, 0, 0));
    });
  });
});
