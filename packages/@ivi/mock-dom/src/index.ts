const enum NodeType {
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

export class Node {
  _nodeType: NodeType;
  _nodeName: string;
  _nodeValue: any;
  _parentNode: Node | null;
  _previousSibling: Node | null;
  _nextSibling: Node | null;
  _firstChild: Node | null;
  _lastChild: Node | null;

  constructor(nodeType: NodeType, nodeName: string) {
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
    if (child._parentNode !== this) {
      throw new Error("Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.");
    }
    const prev = this._previousSibling;
    const next = this._nextSibling;
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
    this._parentNode = null;
    return child;
  }

  remove() {
    if (this._parentNode !== null) {
      this._parentNode.removeChild(this);
    }
  }
}

export class Text extends Node {
  constructor(text: string = "") {
    super(NodeType.Text, "");
    this._nodeValue = text;
  }

  get nodeValue(): string {
    return this._nodeValue;
  }
}

export class Element extends Node {
  _namespaceURI: string;
  _attributes: Map<string, string>;
  _styles: Map<string, string>;
  _eventHandlers: Map<string, EventHandler[]>;

  constructor(
    nodeType: number,
    tagName: string,
    namespaceURI: string = "http://www.w3.org/1999/xhtml"
  ) {
    super(nodeType, tagName);
    this._namespaceURI = namespaceURI;
    this._attributes = new Map();
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

  dispatchEvent(event: Event) {
    const type = event.type;
    let target: Element | null = this;
    event.target = target;
    do {
      event.currentTarget = target;
      const handlers = target._eventHandlers.get(type);
      if (handlers !== void 0) {
        for (const h of handlers) {
          h(event);
        }
      }
    } while (target = (target.parentNode as Element | null));
  }

  set textContent(s: string) {
    let node = this._firstChild;
    while (node !== null) {
      this.removeChild(node);
      node = node._nextSibling;
    }
    if (s !== "") {
      this.appendChild(new Text(s));
    }
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
}

export class HTMLElement extends Element {
  constructor(tagName: string) {
    super(NodeType.Element, tagName);
  }
}
export class SVGElement extends Element {
  constructor(tagName: string) {
    super(NodeType.Element, tagName, "http://www.w3.org/2000/svg");
  }
}

export class DocumentFragment extends Node {
  constructor() {
    super(NodeType.DocumentFragment, "");
  }
}

export class Template extends Element {
  _content: DocumentFragment;

  constructor() {
    super(NodeType.Element, "template");
    this._content = new DocumentFragment();
  }

  get content() {
    return this._content;
  }

  set innerHTML(html: string) {
    this._content = parseHTML(html, this.namespaceURI);
  }
}

export class Document extends Element {
  constructor() {
    super(NodeType.Document, "#document");
  }

  createElement(tagName: string) {
    return new Element(NodeType.Element, tagName.toUpperCase());
  }

  createElementNS(namespace: string, tagName: string) {
    return new Element(NodeType.Element, tagName.toUpperCase(), namespace);
  }

  createTextNode(text: string) {
    return new Text(text);
  }

  reset() { }
}

export type EventHandler = (ev: Event) => void;

export class Event {
  _type: string;
  currentTarget: Element | null;
  target: Element | null;

  constructor(type: string) {
    this._type = type;
    this.currentTarget = null;
    this.target = null;
  }

  get type() {
    return this._type;
  }
}

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

  getPropertyValue(key: string) {
    this._styles.get(key);
  }
}

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
  const fragment = new DocumentFragment();
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
      if (ctx.i + 1 < s.length && s.charCodeAt(ctx.i + 1) === CharCode.Slash) {
        break;
      } else {
        parent.appendChild(parseElement(ctx, namespaceURI));
      }
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
  const element = new Element(NodeType.Element, tagName.toUpperCase(), namespaceURI);
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
  return new Text(s.substring(start, ctx.i));
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

const enum CharCode {
  /** "\\t" */Tab = 9,
  /** "\\n" */Newline = 10,
  /** "\\v" */VerticalTab = 11,
  /** "\\r" */CarriageReturn = 13,
  /** [space] */Space = 32,
  /** "\\"" */DoubleQuote = 34,
  /** "&" */Ampersand = 38,
  /** "/" */Slash = 47,
  /** "<" */LessThan = 60,
  /** "=" */EqualsTo = 61,
  /** ">" */MoreThan = 62,
}
