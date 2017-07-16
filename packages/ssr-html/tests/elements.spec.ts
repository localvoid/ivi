import { VNode, VNodeFlags } from "ivi-ssr";
import * as h from "../src";
import { expect } from "chai";

const Elements: { [name: string]: (className?: string) => VNode<any> } = {
  "a": h.a,
  "abbr": h.abbr,
  "acronym": h.acronym,
  "address": h.address,
  "applet": h.applet,
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
  "isindex": h.isindex,
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
  "nextid": h.nextid,
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
  "title": h.title,
  "tr": h.tr,
  "track": h.track,
  "tt": h.tt,
  "u": h.u,
  "ul": h.ul,
  "wbr": h.wbr,
  "x-ms-webview": h.x_ms_webview,
  "xmp": h.xmp,
  // SVG Elements
  "circle": h.circle,
  "clippath": h.clippath,
  "defs": h.defs,
  "desc": h.desc,
  "ellipse": h.ellipse,
  "feblend": h.feblend,
  "fecolormatrix": h.fecolormatrix,
  "fecomponenttransfer": h.fecomponenttransfer,
  "fecomposite": h.fecomposite,
  "feconvolvematrix": h.feconvolvematrix,
  "fediffuselighting": h.fediffuselighting,
  "fedisplacementmap": h.fedisplacementmap,
  "fedistantlight": h.fedistantlight,
  "feflood": h.feflood,
  "fefunca": h.fefunca,
  "fefuncb": h.fefuncb,
  "fefuncg": h.fefuncg,
  "fefuncr": h.fefuncr,
  "fegaussianblur": h.fegaussianblur,
  "feimage": h.feimage,
  "femerge": h.femerge,
  "femergenode": h.femergenode,
  "femorphology": h.femorphology,
  "feoffset": h.feoffset,
  "fepointlight": h.fepointlight,
  "fespecularlighting": h.fespecularlighting,
  "fespotlight": h.fespotlight,
  "fetile": h.fetile,
  "feturbulence": h.feturbulence,
  "filter": h.filter,
  "foreignobject": h.foreignobject,
  "g": h.g,
  "image": h.image,
  "line": h.line,
  "lineargradient": h.lineargradient,
  "marker": h.marker,
  "mask": h.mask,
  "metadata": h.metadata,
  "path": h.path,
  "pattern": h.pattern,
  "polygon": h.polygon,
  "polyline": h.polyline,
  "radialgradient": h.radialgradient,
  "rect": h.rect,
  "stop": h.stop,
  "svg": h.svg,
  "symbol": h.symbol,
  "text": h.text,
  "textpath": h.textpath,
  "tspan": h.tspan,
  "use": h.use,
  "view": h.view,
  // Input Elements
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
  "input:text": h.inputText,
  "input:time": h.inputTime,
  "input:url": h.inputUrl,
  "input:week": h.inputWeek,
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
  "text",
  "time",
  "url",
  "week",
];

const MediaElements = [
  "audio",
  "video",
];

const SvgElements = [
  "circle",
  "clippath",
  "defs",
  "desc",
  "ellipse",
  "feblend",
  "fecolormatrix",
  "fecomponenttransfer",
  "fecomposite",
  "feconvolvematrix",
  "fediffuselighting",
  "fedisplacementmap",
  "fedistantlight",
  "feflood",
  "fefunca",
  "fefuncb",
  "fefuncg",
  "fefuncr",
  "fegaussianblur",
  "feimage",
  "femerge",
  "femergenode",
  "femorphology",
  "feoffset",
  "fepointlight",
  "fespecularlighting",
  "fespotlight",
  "fetile",
  "feturbulence",
  "filter",
  "foreignobject",
  "g",
  "image",
  "line",
  "lineargradient",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialgradient",
  "rect",
  "stop",
  "svg",
  "symbol",
  "text",
  "textpath",
  "tspan",
  "use",
  "view",
];

it("text", () => {
  const text = h.t("abc");
  expect((text._flags & VNodeFlags.Text) !== 0).to.equal(true);
  expect(text._children).to.equal("abc");
});

describe("elements", () => {
  describe("open element", () => {
    for (const name of Object.keys(Elements)) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory();
        if ((n._flags & VNodeFlags.InputElement) === 0) {
          expect(n._tag).to.equal(`<${name}`);
        }
      });
    }
  });

  describe("close element", () => {
    for (const name of Object.keys(Elements)) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory();
        if ((n._flags & VNodeFlags.VoidElement) !== 0) {
          expect(n._close).to.equal(null);
        } else {
          expect(n._close).to.equal(`</${name}>`);
        }
      });
    }
  });

  describe("class name", () => {
    for (const name of Object.keys(Elements)) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory("abc");
        expect(n._className).to.equal("abc");
      });
    }
  });

  describe("void elements", () => {
    for (const name of Object.keys(Elements)) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory();
        if ((n._flags & (VNodeFlags.InputElement | VNodeFlags.TextAreaElement)) === VNodeFlags.InputElement) {
          expect((n._flags & VNodeFlags.VoidElement) !== 0).to.equal(true);
        } else if (name in VoidElements) {
          expect((n._flags & VNodeFlags.VoidElement) !== 0).to.equal(true);
        } else {
          expect((n._flags & VNodeFlags.VoidElement) !== 0).to.equal(false);
        }
      });
    }
  });

  describe("svg elements", () => {
    for (const name of SvgElements) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory();
        expect((n._flags & VNodeFlags.SvgElement) !== 0).to.equal(true);
      });
    }
  });

  describe("media elements", () => {
    for (const name of MediaElements) {
      const factory = Elements[name];
      it(`${name}`, () => {
        const n = factory();
        expect((n._flags & VNodeFlags.MediaElement) !== 0).to.equal(true);
      });
    }
  });

  describe("input elements", () => {
    for (const type of InputTypes) {
      const factory = Elements[`input:${type}`];
      it(`input:${type}`, () => {
        const n = factory();
        expect((n._flags & VNodeFlags.InputElement) !== 0).to.equal(true);
        expect(n._tag).to.equal(`<input type="${type}"`);
        expect(n._close).to.equal(null);
      });
    }
  });

  it("textarea", () => {
    const n = h.textarea();
    expect((n._flags & VNodeFlags.TextAreaElement) !== 0).to.equal(true);
    expect(n._tag).to.equal("<textarea");
    expect(n._close).to.equal("</textarea>");
  });
});
