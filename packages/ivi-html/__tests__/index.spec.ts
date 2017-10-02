import { VNode, VNodeFlags } from "ivi";
import * as h from "../src";
import { expect } from "iko";

const Elements: { [name: string]: (className?: string) => VNode<any> } = {
  "a": h.a,
  "abbr": h.abbr,
  "acronym": h.acronym,
  "address": h.address,
  "area": h.area,
  "article": h.article,
  "aside": h.aside,
  "b": h.b,
  "base": h.base,
  "basefont": h.basefont,
  "bdo": h.bdo,
  "big": h.big,
  "blockquote": h.blockquote,
  "body": h.body,
  "br": h.br,
  "button": h.button,
  "canvas": h.canvas,
  "caption": h.caption,
  "center": h.center,
  "cite": h.cite,
  "code": h.code,
  "col": h.col,
  "colgroup": h.colgroup,
  "data": h.data,
  "datalist": h.datalist,
  "dd": h.dd,
  "del": h.del,
  "dfn": h.dfn,
  "dir": h.dir,
  "div": h.div,
  "dl": h.dl,
  "dt": h.dt,
  "em": h.em,
  "embed": h.embed,
  "fieldset": h.fieldset,
  "figcaption": h.figcaption,
  "figure": h.figure,
  "font": h.font,
  "footer": h.footer,
  "form": h.form,
  "frame": h.frame,
  "frameset": h.frameset,
  "h1": h.h1,
  "h2": h.h2,
  "h3": h.h3,
  "h4": h.h4,
  "h5": h.h5,
  "h6": h.h6,
  "head": h.head,
  "header": h.header,
  "hgroup": h.hgroup,
  "hr": h.hr,
  "html": h.html,
  "i": h.i,
  "iframe": h.iframe,
  "img": h.img,
  "ins": h.ins,
  "kbd": h.kbd,
  "keygen": h.keygen,
  "label": h.label,
  "legend": h.legend,
  "li": h.li,
  "link": h.link,
  "listing": h.listing,
  "main": h.main,
  "map": h.map,
  "mark": h.mark,
  "menu": h.menu,
  "meta": h.meta,
  "meter": h.meter,
  "nav": h.nav,
  "nobr": h.nobr,
  "noframes": h.noframes,
  "noscript": h.noscript,
  "object": h.object,
  "ol": h.ol,
  "optgroup": h.optgroup,
  "option": h.option,
  "p": h.p,
  "param": h.param,
  "picture": h.picture,
  "plaintext": h.plaintext,
  "pre": h.pre,
  "progress": h.progress,
  "q": h.q,
  "rt": h.rt,
  "ruby": h.ruby,
  "s": h.s,
  "samp": h.samp,
  "script": h.script,
  "section": h.section,
  "select": h.select,
  "small": h.small,
  "source": h.source,
  "span": h.span,
  "strike": h.strike,
  "strong": h.strong,
  "style": h.style,
  "sub": h.sub,
  "sup": h.sup,
  "table": h.table,
  "tbody": h.tbody,
  "td": h.td,
  "template": h.template,
  "textarea": h.textarea,
  "tfoot": h.tfoot,
  "th": h.th,
  "thead": h.thead,
  "time": h.time,
  "title": h.title,
  "tr": h.tr,
  "track": h.track,
  "tt": h.tt,
  "u": h.u,
  "ul": h.ul,
  "wbr": h.wbr,
  "x-ms-webview": h.x_ms_webview,
  "xmp": h.xmp,
  // Input Elements
  "input:": h.inputText,
  "input:button": h.inputButton,
  "input:checkbox": h.inputCheckbox,
  "input:color": h.inputColor,
  "input:date": h.inputDate,
  "input:datetime": h.inputDatetime,
  "input:datetime-local": h.inputDatetimeLocal,
  "input:email": h.inputEmail,
  "input:file": h.inputFile,
  "input:hidden": h.inputHidden,
  "input:image": h.inputImage,
  "input:month": h.inputMonth,
  "input:number": h.inputNumber,
  "input:password": h.inputPassword,
  "input:radio": h.inputRadio,
  "input:range": h.inputRange,
  "input:reset": h.inputReset,
  "input:search": h.inputSearch,
  "input:submit": h.inputSubmit,
  "input:tel": h.inputTel,
  "input:time": h.inputTime,
  "input:url": h.inputUrl,
  "input:week": h.inputWeek,
  // Button Elements
  "button:": h.buttonSubmit,
  "button:button": h.button,
  "button:reset": h.buttonReset,
  // Media Elements
  "audio": h.audio,
  "video": h.video,
};

const VoidElements = {
  "area": 1,
  "base": 1,
  "br": 1,
  "col": 1,
  "embed": 1,
  "hr": 1,
  "img": 1,
  "keygen": 1,
  "link": 1,
  "meta": 1,
  "param": 1,
  "source": 1,
  "track": 1,
  "wbr": 1,
};

const InputTypes = [
  "",
  "button",
  "checkbox",
  "color",
  "date",
  "datetime",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "time",
  "url",
  "week",
];

const ButtonTypes = [
  "",
  "button",
  "reset",
];

const MediaElements = [
  "audio",
  "video",
];

describe("src/index.ts", () => {
  it("text", () => {
    const text = h.t("abc");
    expect((text._flags & VNodeFlags.Text) !== 0).toBe(true);
    expect(text._children).toBe("abc");
  });

  describe("elements", () => {
    describe("tag name", () => {
      for (const name of Object.keys(Elements)) {
        const factory = Elements[name];
        it(`${name}`, () => {
          const n = factory();
          if ((n._flags & (VNodeFlags.InputElement | VNodeFlags.ButtonElement)) === 0) {
            expect(n._tag).toBe(name);
          }
        });
      }
    });

    describe("class name", () => {
      for (const name of Object.keys(Elements)) {
        const factory = Elements[name];
        it(`${name}`, () => {
          const n = factory("abc");
          expect(n._className).toBe("abc");
        });
      }
    });

    describe("void elements", () => {
      for (const name of Object.keys(Elements)) {
        const factory = Elements[name];
        it(`${name}`, () => {
          const n = factory();
          if ((n._flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) === VNodeFlags.InputElement) {
            expect((n._flags & VNodeFlags.VoidElement) !== 0).toBe(true);
          } else if (name in VoidElements) {
            expect((n._flags & VNodeFlags.VoidElement) !== 0).toBe(true);
          } else {
            expect((n._flags & VNodeFlags.VoidElement) !== 0).toBe(false);
          }
        });
      }
    });

    describe("media elements", () => {
      for (const name of MediaElements) {
        const factory = Elements[name];
        it(`${name}`, () => {
          const n = factory();
          expect((n._flags & VNodeFlags.MediaElement) !== 0).toBe(true);
        });
      }
    });

    describe("input elements", () => {
      for (const type of InputTypes) {
        const factory = Elements[`input:${type}`];
        it(`input:${type}`, () => {
          const n = factory();
          expect((n._flags & VNodeFlags.InputElement) !== 0).toBe(true);
          expect((n._flags & VNodeFlags.VoidElement) !== 0).toBe(true);
          expect(n._tag).toBe(type);
        });
      }
    });

    describe("button elements", () => {
      for (const type of ButtonTypes) {
        const factory = Elements[`button:${type}`];
        it(`button:${type}`, () => {
          const n = factory();
          expect((n._flags & VNodeFlags.ButtonElement) !== 0).toBe(true);
          expect(n._tag).toBe(type);
        });
      }
    });

    it("textarea", () => {
      const n = h.textarea();
      expect((n._flags & VNodeFlags.TextAreaElement) !== 0).toBe(true);
      expect(n._tag).toBe("textarea");
    });
  });
});
