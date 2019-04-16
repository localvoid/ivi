import { useResetJSDOM, useResetModules, useSpyOn, useDOMElement, useIVI, useHTML, useTest } from "ivi-jest";

useResetJSDOM();
useResetModules();
const innerHTML = useSpyOn(() => Element.prototype, "innerHTML", "set");
const c = useDOMElement();
const ivi = useIVI();
const h = useHTML();
const t = useTest();
const _ = void 0;
const r = (html?: string) => (
  t.render(
    h.div(_, html === void 0 ? void 0 : { unsafeHTML: ivi.UNSAFE_HTML(html) }),
    c(),
  ).domNode!
);

describe("attribute directive unsafeHTML", () => {
  describe("mount", () => {
    test("empty string", () => {
      const n = r("");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(0);
    });

    test("html", () => {
      const n = r("<span>1</span>");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(1);
    });
  });

  describe("update", () => {
    test("undefined to html", () => {
      r();
      const n = r("<span>1</span>");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(1);
    });

    test("html to undefined", () => {
      r("<span>1</span>");
      const n = r();
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(2);
    });

    test("html to same html", () => {
      r("<span>1</span>");
      const n = r("<span>1</span>");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(1);
    });

    test("html to different html", () => {
      r("<span>1</span>");
      const n = r("<span>2</span>");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(2);
    });

    test("empty string to empty string", () => {
      r("");
      const n = r("");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(0);
    });

    test("empty string to html", () => {
      r("");
      const n = r("<span>1</span>");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(1);
    });

    test("html to empty string", () => {
      r("<span>1</span>");
      const n = r("");
      expect(n).toMatchSnapshot();
      expect(innerHTML().mock.calls.length).toBe(2);
    });
  });
});
