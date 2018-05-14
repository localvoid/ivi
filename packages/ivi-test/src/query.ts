import { Predicate, CSSStyleProps } from "ivi-core";
import { EventSource } from "ivi-events";
import { StatefulComponent } from "ivi";
import {
  VNodeWrapper, visitWrapped,

  isElement, isElementWithClassName,
  hasParent, hasDirectParent, hasChild, hasSibling, hasPrevSibling, hasNextSibling, hasFactory, hasClassName, hasKey,
  hasProps, hasExactProps, hasAssignedProps, hasStyle, hasExactStyle, hasAssignedStyle, hasEventHandler, hasUnsafeHTML,
  hasAutofocus, hasInputValue,
  innerText,
} from "./vdom";

function and<T>(a: Predicate<T>, b: Predicate<T>): Predicate<T> {
  return (value: T) => (
    a(value) === true &&
    b(value) === true
  );
}

export class Matcher<T> {
  constructor(private predicate: Predicate<T>) { }

  match = (value: T): boolean => {
    return this.predicate(value);
  }

  addPredicate(predicate: Predicate<T>): void {
    this.predicate = and(this.predicate, predicate);
  }
}

export class VNodeMatcher extends Matcher<VNodeWrapper> {
  hasParent(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasParent(n, matcher.match));
    return this;
  }

  hasDirectParent(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasDirectParent(n, matcher.match));
    return this;
  }

  hasChild(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasChild(n, matcher.match));
    return this;
  }

  hasSibling(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasSibling(n, matcher.match));
    return this;
  }

  hasPrevSibling(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasPrevSibling(n, matcher.match));
    return this;
  }

  hasNextSibling(matcher: VNodeMatcher): this {
    this.addPredicate((n: VNodeWrapper) => hasNextSibling(n, matcher.match));
    return this;
  }
}

export class VNodeElementMatcher extends Matcher<VNodeWrapper> {
  hasFactory(factory: Function): this {
    this.addPredicate((n: VNodeWrapper) => hasFactory(n, factory));
    return this;
  }

  hasClassName(className: string): this {
    this.addPredicate((n: VNodeWrapper) => hasClassName(n, className));
    return this;
  }

  hasKey(key: any): this {
    this.addPredicate((n: VNodeWrapper) => hasKey(n, key));
    return this;
  }

  hasProps(props: { [key: string]: any }): this {
    this.addPredicate((n: VNodeWrapper) => hasProps(n, props));
    return this;
  }

  hasExactProps(props: { [key: string]: any }): this {
    this.addPredicate((n: VNodeWrapper) => hasExactProps(n, props));
    return this;
  }

  hasAssignedProps(props: { [key: string]: boolean }): this {
    this.addPredicate((n: VNodeWrapper) => hasAssignedProps(n, props));
    return this;
  }

  hasStyle(style: CSSStyleProps): this {
    this.addPredicate((n: VNodeWrapper) => hasStyle(n, style));
    return this;
  }

  hasExactStyle(style: CSSStyleProps): this {
    this.addPredicate((n: VNodeWrapper) => hasExactStyle(n, style));
    return this;
  }

  hasAssignedStyle(style: { [key: string]: boolean }): this {
    this.addPredicate((n: VNodeWrapper) => hasAssignedStyle(n, style));
    return this;
  }

  hasEventHandler(eventSource: EventSource): this {
    this.addPredicate((n: VNodeWrapper) => hasEventHandler(n, eventSource));
    return this;
  }

  hasUnsafeHTML(html?: string): this {
    this.addPredicate((n: VNodeWrapper) => hasUnsafeHTML(n, html));
    return this;
  }

  containsText(text: string): this {
    this.addPredicate((n: VNodeWrapper) => (innerText(n).indexOf(text) > -1));
    return this;
  }

  hasAutofocus(): this {
    this.addPredicate(hasAutofocus);
    return this;
  }

  hasValue(value?: string | boolean): this {
    this.addPredicate((n: VNodeWrapper) => hasInputValue(n, value));
    return this;
  }
}

export class VNodeComponentMatcher extends VNodeMatcher {
}

function createVNodeElementMatcherFactory(tagName: string, className?: string): () => VNodeElementMatcher {
  if (className !== undefined) {
    return () => new VNodeElementMatcher((n: VNodeWrapper) => isElementWithClassName(n, tagName, className));
  }
  return () => new VNodeElementMatcher((n: VNodeWrapper) => isElement(n, tagName));
}

function componentMatcherFactory(component: StatefulComponent<any>): VNodeComponentMatcher {
  return new VNodeComponentMatcher((n: VNodeWrapper) => (n.vnode.tag === component));
}

export function query(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): VNodeWrapper | null {
  let result: VNodeWrapper | null = null;
  visitWrapped(wrapper, (n) => {
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
  visitWrapped(wrapper, (n) => {
    if (wrapper !== n && predicate(n) === true) {
      result.push(n);
    }
    return false;
  });
  return result;
}

export function closest(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): VNodeWrapper | null {
  let parent = wrapper.parent;
  while (parent !== null) {
    if (predicate(parent) === true) {
      return parent;
    }
    parent = parent.parent;
  }
  return null;
}

export const q = {
  a: createVNodeElementMatcherFactory("a"),
  abbr: createVNodeElementMatcherFactory("abbr"),
  acronym: createVNodeElementMatcherFactory("acronym"),
  address: createVNodeElementMatcherFactory("address"),
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
  input: createVNodeElementMatcherFactory("input"),
  kbd: createVNodeElementMatcherFactory("kbd"),
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
  xmp: createVNodeElementMatcherFactory("xmp"),
  audio: createVNodeElementMatcherFactory("audio"),
  video: createVNodeElementMatcherFactory("video"),

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

  // Components:
  component: componentMatcherFactory,
};
