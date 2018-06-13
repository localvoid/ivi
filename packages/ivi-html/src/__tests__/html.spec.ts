import { VNode, VNodeFlags } from "ivi";
import * as h from "ivi-html";

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
  "div": h.div,
  "dl": h.dl,
  "dt": h.dt,
  "em": h.em,
  "embed": h.embed,
  "fieldset": h.fieldset,
  "figcaption": h.figcaption,
  "figure": h.figure,
  "footer": h.footer,
  "form": h.form,
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
  "input": h.input,
  "kbd": h.kbd,
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
  "xmp": h.xmp,
  // Media Elements
  "audio": h.audio,
  "video": h.video,
};

describe("src/index.ts", () => {
  test("text", () => {
    const text = h.t("abc");
    expect((text._f & VNodeFlags.Text) !== 0).toBe(true);
    expect(text._p).toBe("abc");
  });

  describe("elements", () => {
    describe("tag name", () => {
      for (const name of Object.keys(Elements)) {
        const factory = Elements[name];
        test(`${name}`, () => {
          const n = factory();
          expect(n._t).toBe(name);
        });
      }
    });

    describe("class name", () => {
      for (const name of Object.keys(Elements)) {
        const factory = Elements[name];
        test(`${name}`, () => {
          const n = factory("abc");
          expect(n._cs).toBe("abc");
        });
      }
    });
  });
});
