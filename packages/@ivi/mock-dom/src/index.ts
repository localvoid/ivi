export const enum NodeType {
  Element = 1,
  Attribute = 2,
  Text = 3,
  CData = 4,
  EntityReference = 5,
  Comment = 6,
  ProcessingInstruction = 7,
  Document = 8,
  DocumentFragment = 11,
}

export class DOMException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export abstract class Node {
  readonly uid: number;
  _nodeType: NodeType;
  _nodeName: string;
  _nodeValue: any;
  _parentNode: Node | null;
  _previousSibling: Node | null;
  _nextSibling: Node | null;
  _firstChild: Node | null;
  _lastChild: Node | null;

  constructor(uid: number, nodeType: NodeType, nodeName: string) {
    this.uid = uid;
    this._nodeType = nodeType;
    this._nodeName = nodeName;
    this._nodeValue = null;
    this._parentNode = null;
    this._previousSibling = null;
    this._nextSibling = null;
    this._firstChild = null;
    this._lastChild = null;
  }

  get nodeType(): number {
    return this._nodeType;
  }

  get nodeName(): string {
    return this._nodeName;
  }

  get nodeValue(): any {
    return this._nodeValue;
  }

  get parentNode(): Node | null {
    return this._parentNode;
  }

  get previousSibling(): Node | null {
    return this._previousSibling;
  }

  get nextSibling(): Node | null {
    return this._nextSibling;
  }

  get firstChild(): Node | null {
    return this._firstChild;
  }

  get lastChild(): Node | null {
    return this._lastChild;
  }

  set textContent(s: string) {
    let node = this._firstChild;
    while (node !== null) {
      const next = node._nextSibling;
      this.removeChild(node);
      node = next;
    }
    if (s !== "") {
      this.appendChild(document.createTextNode(s));
    }
  }

  appendChild(child: Node) {
    this.insertBefore(child, null);
    return child;
  }

  insertBefore(child: Node, ref: Node | null = null) {
    child.remove();
    child._parentNode = this;
    if (ref === null) {
      const last = this._lastChild;
      this._lastChild = child;
      child._previousSibling = last;
      if (last !== null) {
        last._nextSibling = child;
      } else {
        this._firstChild = child;
      }
    } else {
      const prev = ref._previousSibling;
      if (prev !== null) {
        prev._nextSibling = child;
        child._previousSibling = prev;
      } else {
        this._firstChild = child;
      }
      ref._previousSibling = child;
      child._nextSibling = ref;
    }
    return child;
  }

  removeChild(child: Node) {
    if (child._parentNode?.uid !== this.uid) {
      throw new Error("Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.");
    }
    const prev = child._previousSibling;
    const next = child._nextSibling;
    if (prev !== null) {
      prev._nextSibling = next;
    } else {
      this._firstChild = next;
    }
    if (next !== null) {
      next._previousSibling = prev;
    } else {
      this._lastChild = prev;
    }
    child._parentNode = null;
    child._previousSibling = null;
    child._nextSibling = null;
    return child;
  }

  remove() {
    if (this._parentNode !== null) {
      this._parentNode.removeChild(this);
    }
  }

  toSnapshot(depth: number) {
    let s = indent(depth, `<${this.nodeName}#${this.uid}>\n`);
    let child = this._firstChild;
    while (child !== null) {
      s += child.toSnapshot(depth + 2);
      child = child._nextSibling;
    }
    return s + indent(depth, `</${this.nodeName}#${this.uid}>\n`);
  }
}

export class Text extends Node {
  constructor(uid: number, text: string = "") {
    super(uid, NodeType.Text, "");
    this._nodeValue = text;
  }

  get nodeValue(): string {
    return this._nodeValue;
  }

  set nodeValue(s: any) {
    this._nodeValue = s.toString();
  }

  toSnapshot(depth: number) {
    let s = indent(depth, `<TEXT#${this.uid}>\n`);
    const childDepth = depth + 2;
    s += (this._nodeValue as string)
      .split("\n")
      .map((s) => indent(childDepth, `${s}\n`))
      .join("");
    return s + indent(depth, `</TEXT#${this.uid}>\n`);
  }
}

export class Comment extends Node {
  constructor(uid: number) {
    super(uid, NodeType.Comment, "");
  }
}

export class Element extends Node {
  _namespaceURI: string;
  _attributes: Map<string, string>;
  _properties: Map<string | symbol, any>;
  _styles: Map<string, string>;
  _eventHandlers: Map<string, EventHandler[]>;

  constructor(
    uid: number,
    nodeType: number,
    tagName: string,
    namespaceURI: string = "http://www.w3.org/1999/xhtml"
  ) {
    super(uid, nodeType, tagName);
    this._namespaceURI = namespaceURI;
    this._attributes = new Map();
    this._properties = new Map();
    this._styles = new Map();
    this._eventHandlers = new Map();
  }

  get namespaceURI() {
    return this._namespaceURI;
  }

  get style() {
    return new CSSStyleDeclaration(this._styles);
  }

  get className(): string {
    return this.getAttribute("class") ?? "";
  }

  set className(v: string) {
    this.setAttribute("class", v);
  }

  setAttribute(key: string, value: string) {
    this._attributes.set(key, value);
  }

  getAttribute(key: string): string | null {
    return this._attributes.get(key) ?? null;
  }

  setProperty(key: string | symbol, value: any) {
    this._properties.set(key, value);
  }

  getProperty(key: string | symbol): any {
    return this._properties.get(key) ?? null;
  }

  removeAttribute(key: string) {
    this._attributes.delete(key);
  }

  addEventListener(type: string, handler: EventHandler) {
    let handlers = this._eventHandlers.get(type);
    if (handlers === void 0) {
      this._eventHandlers.set(type, [handler]);
    } else {
      handlers.push(handler);
    }
  }

  removeEventListener(type: string, handler: EventHandler) {
    const handlers = this._eventHandlers.get(type);
    if (handlers !== void 0) {
      const idx = handlers.findIndex((h) => h === handler);
      if (idx !== -1) {
        handlers.splice(idx, 1);
      }
    }
  }

  dispatchEvent(type: string) {
    let target: Element | null = this;
    do {
      const handlers = target._eventHandlers.get(type);
      if (handlers !== void 0) {
        for (const h of handlers) {
          h();
        }
      }
    } while (target = (target.parentNode as Element | null));
  }

  set innerHTML(html: string) {
    const fragment = parseHTML(html, this.namespaceURI);
    this._firstChild = null;
    this._lastChild = null;
    let node = fragment.firstChild;
    while (node !== null) {
      this.appendChild(node);
      node = node._nextSibling;
    }
  }

  toSnapshot(depth: number) {
    let s = indent(depth, `<${this.nodeName}#${this.uid}`);
    let propsString = "";
    const innerDepth = depth + 2;
    this._attributes.forEach((v, k) => {
      propsString += indent(innerDepth, `${k}="${v}"\n`);
    });
    this._properties.forEach((v, k) => {
      propsString += indent(innerDepth, `.${k.toString()}={ ${v.toString()} }\n`);
    });
    this._styles.forEach((v, k) => {
      propsString += indent(innerDepth, `~${k}="${v}"\n`);
    });
    this._eventHandlers.forEach((v, k) => {
      propsString += indent(innerDepth, `@${k}=${v.length}\n`);
    });
    let child = this._firstChild;
    let childrenString = "";
    while (child !== null) {
      childrenString += child.toSnapshot(depth + 2);
      child = child._nextSibling;
    }

    if (propsString === "") {
      if (childrenString === "") {
        s += "/>\n";
      } else {
        s += ">\n";
        s += childrenString;
        s += indent(depth, `</${this.nodeName}#${this.uid}>\n`);
      }
    } else {
      s += "\n";
      s += propsString;
      if (childrenString === "") {
        s += indent(depth, "/>\n");
      } else {
        s += indent(depth, ">\n");
        s += childrenString;
        s += indent(depth, `</${this.nodeName}#${this.uid}>\n`);
      }
    }
    return s;
  }
}

const ELEMENT_PROXY_HANDLER: ProxyHandler<Element> = {
  get(target, p) {
    if (p in target) {
      return (target as any)[p];
    }
    return target.getProperty(p) ?? void 0;
  },
  set(target, p, newValue) {
    if (p in target) {
      (target as any)[p] = newValue;
    } else {
      target.setProperty(p, newValue);
    }
    return true;
  },
};

export class HTMLElement extends Element {
  constructor(uid: number, tagName: string) {
    super(uid, NodeType.Element, tagName);
  }

  get style() {
    return new CSSStyleDeclaration(this._styles);
  }

}
export class SVGElement extends Element {
  constructor(uid: number, tagName: string) {
    super(uid, NodeType.Element, tagName, "http://www.w3.org/2000/svg");
  }

  get style() {
    return new CSSStyleDeclaration(this._styles);
  }
}

export class DocumentFragment extends Node {
  constructor(uid: number) {
    super(uid, NodeType.DocumentFragment, "");
  }
}

export class Template extends Element {
  _content: DocumentFragment;

  constructor(uid: number) {
    super(uid, NodeType.Element, "TEMPLATE");
    this._content = document.createDocumentFragment();
  }

  get content() {
    return this._content;
  }

  set innerHTML(html: string) {
    const frag = parseHTML(html, this.namespaceURI);
    let n = this._content._firstChild;
    while (n !== null) {
      n.remove();
      n = n._nextSibling;
    }

    n = frag._firstChild;
    while (n !== null) {
      this._content.appendChild(n);
      n = n._nextSibling;
    }
  }
}

export class Document extends Element {
  _nextUid: number;
  _body: HTMLElement;

  constructor() {
    super(0, NodeType.Document, "#document");
    this._nextUid = 1;
    this._body = this.createElement("body");
  }

  get body() {
    return this._body;
  }

  createElement(tagName: string) {
    if (tagName === "template") {
      return new Template(this._nextUid++);
    }
    return new Proxy(
      new HTMLElement(this._nextUid++, tagName.toUpperCase()),
      ELEMENT_PROXY_HANDLER,
    );
  }

  createElementNS(namespace: string, tagName: string) {
    if (namespace === "http://www.w3.org/2000/svg") {
      return new Proxy(
        new SVGElement(this._nextUid++, tagName.toUpperCase()),
        ELEMENT_PROXY_HANDLER,
      );
    }
    return new Proxy(
      new Element(
        this._nextUid++,
        NodeType.Element,
        tagName.toUpperCase(),
        namespace,
      ),
      ELEMENT_PROXY_HANDLER,
    );
  }

  createTextNode(text: string) {
    return new Text(this._nextUid++, text);
  }

  createDocumentFragment() {
    return new DocumentFragment(this._nextUid++);
  }

  createComment() {
    return new Comment(this._nextUid++);
  }

  reset() {
    this._nextUid = 1;
    this._body.textContent = "";
  }
}

export type EventHandler = () => void;

export class CSSStyleDeclaration {
  _styles: Map<string, string>;

  constructor(styles: Map<string, string>) {
    this._styles = styles;
  }

  setProperty(key: string, value: string) {
    this._styles.set(key, value);
  }

  removeProperty(key: string) {
    this._styles.delete(key);
  }

  getPropertyValue(key: string): string {
    return this._styles.get(key) ?? "";
  }
}

export const reset = () => {
  document.reset();
};

export const emit = (node: any, type: string) => {
  (node as Element).dispatchEvent(type);
};

export const toSnapshot = (node: any): string => (
  (node as Node).toSnapshot(0).trimEnd()
);

interface HTMLParserContext {
  s: string;
  i: number;
}

// It is not a valid HTML parser, and it was designed this way intentionally,
// so that we could catch extra whitespaces, etc.
function parseHTML(html: string, namespaceURI: string): DocumentFragment {
  const ctx: HTMLParserContext = {
    s: html,
    i: 0,
  };
  const fragment = document.createDocumentFragment();
  parseChildren(ctx, fragment, namespaceURI);
  return fragment;
}

function parseChildren(
  ctx: HTMLParserContext,
  parent: Node,
  namespaceURI: string,
) {
  const s = ctx.s;
  while (ctx.i < s.length) {
    const c = s.charCodeAt(ctx.i);
    if (c === CharCode.LessThan) {
      const i2 = ctx.i + 1;
      if (i2 < s.length) {
        const c2 = s.charCodeAt(i2);
        if (c2 === CharCode.Slash) {
          break;
        } else if (c2 === CharCode.ExclamationMark) {
          parent.appendChild(parseComment(ctx));
          continue;
        }
      }
      parent.appendChild(parseElement(ctx, namespaceURI));
    } else {
      parent.appendChild(parseText(ctx));
    }
  }
}

const IDENTIFIER = /[a-zA-Z_][\w-]*/y;

function parseElement(ctx: HTMLParserContext, namespaceURI: string): Element {
  if (!parseCharCode(ctx, CharCode.LessThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '<' character\n${ctx.s}`);
  }
  const tagName = parseRegExp(ctx, IDENTIFIER);
  if (tagName === void 0) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a valid tag name\n${ctx.s}`);
  }
  const element = new Proxy(
    document.createElementNS(namespaceURI, tagName),
    ELEMENT_PROXY_HANDLER,
  );
  parseSkipWhitespace(ctx);
  parseAttributes(ctx, element);
  if (!parseCharCode(ctx, CharCode.MoreThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '>' character\n${ctx.s}`);
  }
  if (!VOID_ELEMENTS.test(tagName)) {
    parseChildren(ctx, element, namespaceURI);
    if (!parseCharCode(ctx, CharCode.LessThan)) {
      throw new Error(`Invalid HTML [${ctx.i}]: expected a '<' character\n${ctx.s}`);
    }
    if (!parseCharCode(ctx, CharCode.Slash)) {
      throw new Error(`Invalid HTML [${ctx.i}]: expected a '/' character\n${ctx.s}`);
    }
    if (!ctx.s.substring(ctx.i).startsWith(tagName)) {
      throw new Error(`Invalid HTML [${ctx.i}]: expected a tag name '${tagName}' character\n${ctx.s}`);
    }
    ctx.i += tagName.length;
    if (!parseCharCode(ctx, CharCode.MoreThan)) {
      throw new Error(`Invalid HTML [${ctx.i}]: expected a '>' character\n${ctx.s}`);
    }
  }

  return element;
}

function parseAttributes(ctx: HTMLParserContext, element: Element) {
  const s = ctx.s;

  while (ctx.i < s.length) {
    const c = s.charCodeAt(ctx.i);
    if (c === CharCode.MoreThan) {
      return;
    }
    const key = parseRegExp(ctx, IDENTIFIER);
    if (key === void 0) {
      throw new Error(`Invalid HTML [${ctx.i}]: invalid attribute name\n${ctx.s}`);
    }
    if (parseCharCode(ctx, CharCode.EqualsTo)) {
      const value = parseAttributeString(ctx);
      element.setAttribute(key, value);
    } else {
      element.setAttribute(key, "");
    }
    parseSkipWhitespace(ctx);
  }
  throw new Error(`Invalid HTML [${ctx.i}]: unexpected end\n${ctx.s}`);
}

function parseAttributeString(ctx: HTMLParserContext): string {
  if (!parseCharCode(ctx, CharCode.DoubleQuote)) {
    throw new Error(`Invalid HTML [${ctx.i}]: invalid attribute value, expected a '"' character)\n${ctx.s}`);
  }
  const s = ctx.s;
  let start = ctx.i;
  while (ctx.i < s.length) {
    const c = s.charCodeAt(ctx.i);
    if (c === CharCode.DoubleQuote) {
      return s.substring(start, ctx.i++);
    }
    ctx.i++;
  }
  throw new Error(`Invalid HTML [${ctx.i}]: invalid attribute value, expected a '"' character\n${ctx.s}`);
}

// Supports only <!> syntax.
function parseComment(ctx: HTMLParserContext): Comment {
  if (!parseCharCode(ctx, CharCode.LessThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '<' character\n${ctx.s}`);
  }
  if (!parseCharCode(ctx, CharCode.ExclamationMark)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '!' character\n${ctx.s}`);
  }
  if (!parseCharCode(ctx, CharCode.MoreThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '>' character\n${ctx.s}`);
  }
  return document.createComment();
}

function parseText(ctx: HTMLParserContext): Text {
  const s = ctx.s;
  let start = ctx.i;
  while (ctx.i < s.length) {
    const c = s.charCodeAt(ctx.i);
    if (c === CharCode.LessThan) {
      break;
    }
    ctx.i++;
  }
  return document.createTextNode(s.substring(start, ctx.i));
}

function parseSkipWhitespace(ctx: HTMLParserContext): void {
  const s = ctx.s;
  let i = ctx.i;
  while (i < s.length) {
    const c = s.charCodeAt(i);
    if (
      c === CharCode.Space ||
      c === CharCode.Tab ||
      c === CharCode.Newline ||
      c === CharCode.CarriageReturn
    ) {
      i++;
    } else {
      break;
    }
  }
  ctx.i = i;
}

function parseCharCode(ctx: HTMLParserContext, charCode: number): boolean {
  if (ctx.i < ctx.s.length && ctx.s.charCodeAt(ctx.i) === charCode) {
    ctx.i++;
    return true;
  }
  return false;
}

function parseRegExp(ctx: HTMLParserContext, re: RegExp): string | undefined {
  re.lastIndex = ctx.i;
  const match = re.exec(ctx.s);
  if (match !== null) {
    const s = match[0];
    ctx.i += s.length;
    return s;
  }
  return void 0;
}

const VOID_ELEMENTS = (
  /^(audio|video|embed|input|param|source|textarea|track|area|base|link|meta|br|col|hr|img|wbr)$/
);

function indent(i: number, s: string) {
  let r = "";
  while (i-- > 0) {
    r += " ";

  }
  return r + s;
}

const enum CharCode {
  /** "\\t" */Tab = 9,
  /** "\\n" */Newline = 10,
  /** "\\v" */VerticalTab = 11,
  /** "\\r" */CarriageReturn = 13,
  /** [space] */Space = 32,
  /** "!" */ExclamationMark = 33,
  /** "\\"" */DoubleQuote = 34,
  /** "&" */Ampersand = 38,
  /** "/" */Slash = 47,
  /** "<" */LessThan = 60,
  /** "=" */EqualsTo = 61,
  /** ">" */MoreThan = 62,
}
