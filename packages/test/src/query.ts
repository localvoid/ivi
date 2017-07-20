import { VNodeFlags } from "ivi";
import { VNodeWrapper, visitWrapped } from "./vdom";
import { containsClassName } from "./utils";

export type Predicate<T> = (value: T) => boolean;

function and<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return function (value: T): boolean {
    return a(value) === true && b(value) === true;
  };
}

export class Matcher<T> {
  private _match: Predicate<T>;

  constructor(match: Predicate<T>) {
    this._match = match;
  }

  match = (value: T): boolean => {
    return this._match(value);
  }

  addPredicate(predicate: Predicate<T>): void {
    this._match = and(this._match, predicate);
  }
}

export class VNodeMatcher extends Matcher<VNodeWrapper> {
  hasParent(matcher: VNodeMatcher): VNodeMatcher {
    this.addPredicate(hasParent(matcher.match));
    return this;
  }

  hasDirectParent(matcher: VNodeMatcher): VNodeMatcher {
    this.addPredicate(hasDirectParent(matcher.match));
    return this;
  }

  hasChild(matcher: VNodeMatcher): VNodeMatcher {
    this.addPredicate(hasChild(matcher.match));
    return this;
  }
}

export class VNodeElementMatcher extends Matcher<VNodeWrapper> {
  hasClassName(className: string): VNodeElementMatcher {
    this.addPredicate(hasClassName(className));
    return this;
  }
}

function createVNodeElementMatcherFactory(tagName: string): () => VNodeElementMatcher {
  return function (): VNodeElementMatcher {
    return new VNodeElementMatcher(isElement(tagName));
  };
}

function createVNodeInputElementMatcherFactory(type: string): () => VNodeElementMatcher {
  return function (): VNodeElementMatcher {
    return new VNodeElementMatcher(isInputElement(type));
  };
}

function isElement(tagName: string): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return ((vnode._flags & VNodeFlags.Element) !== 0 && vnode._tag === tagName);
  };
}

function isInputElement(type: string): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return ((vnode._flags & VNodeFlags.InputElement) !== 0 && vnode._tag === type);
  };
}

function hasClassName(className: string): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._className !== null && containsClassName(vnode._className, className) === true);
  };
}

function hasParent(predicate: Predicate<VNodeWrapper>): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    let parent = wrapper.parent;
    while (parent !== null) {
      if (predicate(parent) === true) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };
}

function hasDirectParent(predicate: Predicate<VNodeWrapper>): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const parent = wrapper.parent;
    return (parent !== null && predicate(parent) === true);
  };
}

function hasChild(predicate: Predicate<VNodeWrapper>): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    return visitWrapped(wrapper, function (n) {
      return (wrapper !== n && predicate(n) === true);
    });
  };
}

export function query(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): VNodeWrapper | null {
  let result: VNodeWrapper | null = null;
  visitWrapped(wrapper, function (n) {
    if (wrapper !== n && predicate(n) === true) {
      result = n;
      return true;
    }
    return false;
  });
  return result;
}

export function queryAll(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): VNodeWrapper[] {
  const result: VNodeWrapper[] = [];
  visitWrapped(wrapper, function (n) {
    if (wrapper !== n && predicate(n) === true) {
      result.push(n);
    }
    return false;
  });
  return result;
}

export const q = {
  a: createVNodeElementMatcherFactory("a"),
  abbr: createVNodeElementMatcherFactory("abbr"),
  acronym: createVNodeElementMatcherFactory("acronym"),
  address: createVNodeElementMatcherFactory("address"),
  applet: createVNodeElementMatcherFactory("applet"),
  area: createVNodeElementMatcherFactory("area"),
  article: createVNodeElementMatcherFactory("article"),
  aside: createVNodeElementMatcherFactory("aside"),
  b: createVNodeElementMatcherFactory("b"),
  base: createVNodeElementMatcherFactory("base"),
  basefont: createVNodeElementMatcherFactory("basefont"),
  bdo: createVNodeElementMatcherFactory("bdo"),
  big: createVNodeElementMatcherFactory("big"),
  blockquote: createVNodeElementMatcherFactory("blockquote"),
  body: createVNodeElementMatcherFactory("body"),
  br: createVNodeElementMatcherFactory("br"),
  button: createVNodeElementMatcherFactory("button"),
  canvas: createVNodeElementMatcherFactory("canvas"),
  caption: createVNodeElementMatcherFactory("caption"),
  center: createVNodeElementMatcherFactory("center"),
  cite: createVNodeElementMatcherFactory("cite"),
  code: createVNodeElementMatcherFactory("code"),
  col: createVNodeElementMatcherFactory("col"),
  colgroup: createVNodeElementMatcherFactory("colgroup"),
  datalist: createVNodeElementMatcherFactory("datalist"),
  dd: createVNodeElementMatcherFactory("dd"),
  del: createVNodeElementMatcherFactory("del"),
  dfn: createVNodeElementMatcherFactory("dfn"),
  dir: createVNodeElementMatcherFactory("dir"),
  div: createVNodeElementMatcherFactory("div"),
  dl: createVNodeElementMatcherFactory("dl"),
  dt: createVNodeElementMatcherFactory("dt"),
  em: createVNodeElementMatcherFactory("em"),
  embed: createVNodeElementMatcherFactory("embed"),
  fieldset: createVNodeElementMatcherFactory("fieldset"),
  figcaption: createVNodeElementMatcherFactory("figcaption"),
  figure: createVNodeElementMatcherFactory("figure"),
  font: createVNodeElementMatcherFactory("font"),
  footer: createVNodeElementMatcherFactory("footer"),
  form: createVNodeElementMatcherFactory("form"),
  frame: createVNodeElementMatcherFactory("frame"),
  frameset: createVNodeElementMatcherFactory("frameset"),
  h1: createVNodeElementMatcherFactory("h1"),
  h2: createVNodeElementMatcherFactory("h2"),
  h3: createVNodeElementMatcherFactory("h3"),
  h4: createVNodeElementMatcherFactory("h4"),
  h5: createVNodeElementMatcherFactory("h5"),
  h6: createVNodeElementMatcherFactory("h6"),
  head: createVNodeElementMatcherFactory("head"),
  header: createVNodeElementMatcherFactory("header"),
  hgroup: createVNodeElementMatcherFactory("hgroup"),
  hr: createVNodeElementMatcherFactory("hr"),
  html: createVNodeElementMatcherFactory("html"),
  i: createVNodeElementMatcherFactory("i"),
  iframe: createVNodeElementMatcherFactory("iframe"),
  img: createVNodeElementMatcherFactory("img"),
  ins: createVNodeElementMatcherFactory("ins"),
  isindex: createVNodeElementMatcherFactory("isindex"),
  kbd: createVNodeElementMatcherFactory("kbd"),
  keygen: createVNodeElementMatcherFactory("keygen"),
  label: createVNodeElementMatcherFactory("label"),
  legend: createVNodeElementMatcherFactory("legend"),
  li: createVNodeElementMatcherFactory("li"),
  link: createVNodeElementMatcherFactory("link"),
  listing: createVNodeElementMatcherFactory("listing"),
  main: createVNodeElementMatcherFactory("main"),
  map: createVNodeElementMatcherFactory("map"),
  mark: createVNodeElementMatcherFactory("mark"),
  menu: createVNodeElementMatcherFactory("menu"),
  meta: createVNodeElementMatcherFactory("meta"),
  meter: createVNodeElementMatcherFactory("meter"),
  nav: createVNodeElementMatcherFactory("nav"),
  nextid: createVNodeElementMatcherFactory("nextid"),
  nobr: createVNodeElementMatcherFactory("nobr"),
  noframes: createVNodeElementMatcherFactory("noframes"),
  noscript: createVNodeElementMatcherFactory("noscript"),
  object: createVNodeElementMatcherFactory("object"),
  ol: createVNodeElementMatcherFactory("ol"),
  optgroup: createVNodeElementMatcherFactory("optgroup"),
  option: createVNodeElementMatcherFactory("option"),
  p: createVNodeElementMatcherFactory("p"),
  param: createVNodeElementMatcherFactory("param"),
  picture: createVNodeElementMatcherFactory("picture"),
  plaintext: createVNodeElementMatcherFactory("plaintext"),
  pre: createVNodeElementMatcherFactory("pre"),
  progress: createVNodeElementMatcherFactory("progress"),
  q: createVNodeElementMatcherFactory("q"),
  rt: createVNodeElementMatcherFactory("rt"),
  ruby: createVNodeElementMatcherFactory("ruby"),
  s: createVNodeElementMatcherFactory("s"),
  samp: createVNodeElementMatcherFactory("samp"),
  script: createVNodeElementMatcherFactory("script"),
  section: createVNodeElementMatcherFactory("section"),
  select: createVNodeElementMatcherFactory("select"),
  small: createVNodeElementMatcherFactory("small"),
  source: createVNodeElementMatcherFactory("source"),
  span: createVNodeElementMatcherFactory("span"),
  strike: createVNodeElementMatcherFactory("strike"),
  strong: createVNodeElementMatcherFactory("strong"),
  style: createVNodeElementMatcherFactory("style"),
  sub: createVNodeElementMatcherFactory("sub"),
  sup: createVNodeElementMatcherFactory("sup"),
  table: createVNodeElementMatcherFactory("table"),
  tbody: createVNodeElementMatcherFactory("tbody"),
  td: createVNodeElementMatcherFactory("td"),
  template: createVNodeElementMatcherFactory("template"),
  textarea: createVNodeElementMatcherFactory("textarea"),
  tfoot: createVNodeElementMatcherFactory("tfoot"),
  th: createVNodeElementMatcherFactory("th"),
  thead: createVNodeElementMatcherFactory("thead"),
  title: createVNodeElementMatcherFactory("title"),
  tr: createVNodeElementMatcherFactory("tr"),
  track: createVNodeElementMatcherFactory("track"),
  tt: createVNodeElementMatcherFactory("tt"),
  u: createVNodeElementMatcherFactory("u"),
  ul: createVNodeElementMatcherFactory("ul"),
  wbr: createVNodeElementMatcherFactory("wbr"),
  x_ms_webview: createVNodeElementMatcherFactory("x_ms_webview"),
  xmp: createVNodeElementMatcherFactory("xmp"),

  // SVG Elements:
  circle: createVNodeElementMatcherFactory("circle"),
  clippath: createVNodeElementMatcherFactory("clippath"),
  defs: createVNodeElementMatcherFactory("defs"),
  desc: createVNodeElementMatcherFactory("desc"),
  ellipse: createVNodeElementMatcherFactory("ellipse"),
  feblend: createVNodeElementMatcherFactory("feblend"),
  fecolormatrix: createVNodeElementMatcherFactory("fecolormatrix"),
  fecomponenttransfer: createVNodeElementMatcherFactory("fecomponenttransfer"),
  fecomposite: createVNodeElementMatcherFactory("fecomposite"),
  feconvolvematrix: createVNodeElementMatcherFactory("feconvolvematrix"),
  fediffuselighting: createVNodeElementMatcherFactory("fediffuselighting"),
  fedisplacementmap: createVNodeElementMatcherFactory("fedisplacementmap"),
  fedistantlight: createVNodeElementMatcherFactory("fedistantlight"),
  feflood: createVNodeElementMatcherFactory("feflood"),
  fefunca: createVNodeElementMatcherFactory("fefunca"),
  fefuncb: createVNodeElementMatcherFactory("fefuncb"),
  fefuncg: createVNodeElementMatcherFactory("fefuncg"),
  fefuncr: createVNodeElementMatcherFactory("fefuncr"),
  fegaussianblur: createVNodeElementMatcherFactory("fegaussianblur"),
  feimage: createVNodeElementMatcherFactory("feimage"),
  femerge: createVNodeElementMatcherFactory("femerge"),
  femergenode: createVNodeElementMatcherFactory("femergenode"),
  femorphology: createVNodeElementMatcherFactory("femorphology"),
  feoffset: createVNodeElementMatcherFactory("feoffset"),
  fepointlight: createVNodeElementMatcherFactory("fepointlight"),
  fespecularlighting: createVNodeElementMatcherFactory("fespecularlighting"),
  fespotlight: createVNodeElementMatcherFactory("fespotlight"),
  fetile: createVNodeElementMatcherFactory("fetile"),
  feturbulence: createVNodeElementMatcherFactory("feturbulence"),
  filter: createVNodeElementMatcherFactory("filter"),
  foreignobject: createVNodeElementMatcherFactory("foreignobject"),
  g: createVNodeElementMatcherFactory("g"),
  image: createVNodeElementMatcherFactory("image"),
  line: createVNodeElementMatcherFactory("line"),
  lineargradient: createVNodeElementMatcherFactory("lineargradient"),
  marker: createVNodeElementMatcherFactory("marker"),
  mask: createVNodeElementMatcherFactory("mask"),
  metadata: createVNodeElementMatcherFactory("metadata"),
  path: createVNodeElementMatcherFactory("path"),
  pattern: createVNodeElementMatcherFactory("pattern"),
  polygon: createVNodeElementMatcherFactory("polygon"),
  polyline: createVNodeElementMatcherFactory("polyline"),
  radialgradient: createVNodeElementMatcherFactory("radialgradient"),
  rect: createVNodeElementMatcherFactory("rect"),
  stop: createVNodeElementMatcherFactory("stop"),
  svg: createVNodeElementMatcherFactory("svg"),
  symbol: createVNodeElementMatcherFactory("symbol"),
  text: createVNodeElementMatcherFactory("text"),
  textpath: createVNodeElementMatcherFactory("textpath"),
  tspan: createVNodeElementMatcherFactory("tspan"),
  use: createVNodeElementMatcherFactory("use"),
  view: createVNodeElementMatcherFactory("view"),

  // Input Elements:
  inputButton: createVNodeInputElementMatcherFactory("button"),
  inputCheckbox: createVNodeInputElementMatcherFactory("checkbox"),
  inputColor: createVNodeInputElementMatcherFactory("color"),
  inputDate: createVNodeInputElementMatcherFactory("date"),
  inputDatetime: createVNodeInputElementMatcherFactory("datetime"),
  inputDatetimeLocal: createVNodeInputElementMatcherFactory("datetime-local"),
  inputEmail: createVNodeInputElementMatcherFactory("email"),
  inputFile: createVNodeInputElementMatcherFactory("file"),
  inputHidden: createVNodeInputElementMatcherFactory("hidden"),
  inputImage: createVNodeInputElementMatcherFactory("image"),
  inputMonth: createVNodeInputElementMatcherFactory("month"),
  inputNumber: createVNodeInputElementMatcherFactory("number"),
  inputPassword: createVNodeInputElementMatcherFactory("password"),
  inputRadio: createVNodeInputElementMatcherFactory("radio"),
  inputRange: createVNodeInputElementMatcherFactory("range"),
  inputReset: createVNodeInputElementMatcherFactory("reset"),
  inputSearch: createVNodeInputElementMatcherFactory("search"),
  inputSubmit: createVNodeInputElementMatcherFactory("submit"),
  inputTel: createVNodeInputElementMatcherFactory("tel"),
  inputText: createVNodeInputElementMatcherFactory("text"),
  inputTime: createVNodeInputElementMatcherFactory("time"),
  inputUrl: createVNodeInputElementMatcherFactory("url"),
  inputWeek: createVNodeInputElementMatcherFactory("week"),

  // Media Elements:
  audio: createVNodeElementMatcherFactory("audio"),
  video: createVNodeElementMatcherFactory("video"),
};
