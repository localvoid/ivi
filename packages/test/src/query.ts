import { CSSStyleProps, shallowEqual } from "ivi-core";
import { VNode, VNodeFlags } from "ivi";
import { EventSource } from "ivi-events";
import { VNodeWrapper, visitWrapped } from "./vdom";
import { containsClassName, matchProps, matchKeys, containsEventHandler } from "./utils";

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

  hasSibling(matcher: VNodeMatcher): VNodeMatcher {
    this.addPredicate(hasSibling(matcher.match));
    return this;
  }

  hasPrevSibling(matcher: VNodeMatcher): VNodeMatcher {
    this.addPredicate(hasPrevSibling(matcher.match));
    return this;
  }
}

export class VNodeElementMatcher extends Matcher<VNodeWrapper> {
  hasClassName(className: string): VNodeElementMatcher {
    this.addPredicate(hasClassName(className));
    return this;
  }

  hasKey(key: any): VNodeElementMatcher {
    this.addPredicate(hasKey(key));
    return this;
  }

  hasProps(props: { [key: string]: any }): VNodeElementMatcher {
    this.addPredicate(hasProps(props));
    return this;
  }

  hasExactProps(props: { [key: string]: any }): VNodeElementMatcher {
    this.addPredicate(hasExactProps(props));
    return this;
  }

  hasAssignedProps(props: { [key: string]: boolean }): VNodeElementMatcher {
    this.addPredicate(hasAssignedProps(props));
    return this;
  }

  hasStyle(style: CSSStyleProps): VNodeElementMatcher {
    this.addPredicate(hasStyle(style));
    return this;
  }

  hasExactStyle(style: CSSStyleProps): VNodeElementMatcher {
    this.addPredicate(hasExactStyle(style));
    return this;
  }

  hasAssignedStyle(style: { [key: string]: boolean }): VNodeElementMatcher {
    this.addPredicate(hasAssignedStyle(style));
    return this;
  }

  hasEventHandler(eventSource: EventSource): VNodeElementMatcher {
    this.addPredicate(hasEventHandler(eventSource));
    return this;
  }

  containsText(text: string): VNodeElementMatcher {
    return this;
  }

  hasUnsafeHTML(html?: string): VNodeElementMatcher {
    this.addPredicate(hasUnsafeHTML(html));
    return this;
  }

  isAutofocused(): VNodeElementMatcher {
    this.addPredicate(isAutofocused);
    return this;
  }
}

export class VNodeInputElementMatcher extends VNodeElementMatcher {
  hasValue(value?: string): VNodeInputElementMatcher {
    return this;
  }

  isChecked(value?: boolean): VNodeInputElementMatcher {
    return this;
  }
}

function createVNodeElementMatcherFactory(tagName: string): () => VNodeElementMatcher {
  return function (): VNodeElementMatcher {
    return new VNodeElementMatcher(isElement(tagName));
  };
}

function createVNodeInputElementMatcherFactory(type: string): () => VNodeInputElementMatcher {
  return function (): VNodeInputElementMatcher {
    return new VNodeInputElementMatcher(isInputElement(type));
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

function hasKey(key: any): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return ((vnode._flags & VNodeFlags.Key) !== 0 && vnode._key === key);
  };
}

function hasClassName(className: string): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._className !== null && containsClassName(vnode._className, className) === true);
  };
}

function hasProps(props: any): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && matchProps(vnode._props.props, props) === true);
  };
}

function hasExactProps(props: any): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && shallowEqual(vnode._props.props, props) === true);
  };
}

function hasAssignedProps(props: { [key: string]: boolean }): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && matchKeys(vnode._props.props, props));
  };
}

function hasStyle(style: CSSStyleProps): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && matchProps(vnode._props.style, style) === true);
  };
}

function hasExactStyle(style: CSSStyleProps): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && shallowEqual(vnode._props.style, style) === true);
  };
}

function hasAssignedStyle(style: { [key: string]: boolean }): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && matchKeys(vnode._props.style, style));
  };
}

function hasEventHandler(eventSource: EventSource): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return (vnode._props !== null && containsEventHandler(vnode._props.events, eventSource) === true);
  };
}

function hasUnsafeHTML(html?: string): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const vnode = wrapper.vnode;
    return ((vnode._flags & VNodeFlags.UnsafeHTML) !== 0 && (html === undefined || vnode._children === html));
  };
}

function isAutofocused(wrapper: VNodeWrapper): boolean {
  return ((wrapper.vnode._flags & VNodeFlags.Autofocus) !== 0);
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

function hasSibling(predicate: Predicate<VNodeWrapper>): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const parent = wrapper.parent;
    if (parent !== null && (parent.vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
      const children = parent.vnode._children as VNode[];
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (wrapper.vnode !== c) {
          if (predicate(new VNodeWrapper(c, parent, wrapper.context)) === true) {
            return true;
          }
        }
      }
    }
    return false;
  };
}

function hasPrevSibling(predicate: Predicate<VNodeWrapper>): Predicate<VNodeWrapper> {
  return function (wrapper: VNodeWrapper): boolean {
    const parent = wrapper.parent;
    if (parent !== null && (parent.vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
      const children = parent.vnode._children as VNode<any>[];
      let prev: VNode<any> | null = null;
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        if (wrapper.vnode === c) {
          return (prev !== null && predicate(new VNodeWrapper(prev, parent, wrapper.context)) === true);
        }
        prev = c;
      }
    }
    return false;
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
