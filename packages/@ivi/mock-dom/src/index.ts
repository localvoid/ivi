export const enum NodeType {
  Element = 1,
  Attribute = 2,
  Text = 3,
  CData = 4,
  EntityReference = 5,
  ProcessingInstruction = 7,
  Comment = 8,
  Document = 9,
  DocumentFragment = 11,
}

export class DOMException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export abstract class Node {
  readonly uid: number;
  _document: Document;
  _nodeType: NodeType;
  _nodeName: string;
  _nodeValue: any;
  _parentNode: Node | null;
  _previousSibling: Node | null;
  _nextSibling: Node | null;
  _firstChild: Node | null;
  _lastChild: Node | null;
  _eventHandlers: Map<string, EventHandler[]> | null;

  constructor(
    doc: Document,
    uid: number,
    nodeType: NodeType,
    nodeName: string,
    eventHandlers: Map<string, EventHandler[]> | null = null,
  ) {
    this.uid = uid;
    this._document = doc;
    this._nodeType = nodeType;
    this._nodeName = nodeName;
    this._nodeValue = null;
    this._parentNode = null;
    this._previousSibling = null;
    this._nextSibling = null;
    this._firstChild = null;
    this._lastChild = null;
    this._eventHandlers = eventHandlers;
  }

  get nodeType(): number {
    this._trace(`Node.nodeType => ${this._nodeType}`);
    return this._nodeType;
  }

  get nodeName(): string {
    this._trace(`Node.nodeName => "${this._nodeName}"`);
    return this._nodeName;
  }

  get nodeValue(): any {
    this._trace(`Node.nodeValue => "${this._nodeValue}"`);
    return this._nodeValue;
  }

  set nodeValue(s: any) {
    this._trace(`Node.nodeValue = ${JSON.stringify(s)}`);
    this._nodeValue = s.toString();
  }

  get parentNode(): Node | null {
    this._trace(`Node.parentNode => ${this._parentNode === null ? "null" : this._parentNode.uid}`);
    return this._parentNode;
  }

  get previousSibling(): Node | null {
    this._trace(`Node.previousSibling => ${this._previousSibling === null ? "null" : this._previousSibling.uid}`);
    return this._previousSibling;
  }

  get nextSibling(): Node | null {
    this._trace(`Node.nextSibling => ${this._nextSibling === null ? "null" : this._nextSibling.uid}`);
    return this._nextSibling;
  }

  get firstChild(): Node | null {
    this._trace(`Node.firstChild => ${this._firstChild === null ? "null" : this._firstChild.uid}`);
    return this._firstChild;
  }

  get lastChild(): Node | null {
    this._trace(`Node.lastChild => ${this._lastChild === null ? "null" : this._lastChild.uid}`);
    return this._lastChild;
  }

  set textContent(s: string) {
    this._trace(`Node.textContent = ${JSON.stringify(s)}`);
    this._setTextContent(s);
  }

  _setTextContent(s: string) {
    let node = this._firstChild;
    while (node !== null) {
      const next = node._nextSibling;
      this._removeChild(node);
      node = next;
    }
    if (s !== "") {
      this._appendChild(document._createTextNode(s));
    }
  }

  appendChild(child: Node) {
    this._trace(`Node.appendChild(${child.uid})`);
    return this._appendChild(child);
  }

  _appendChild(child: Node) {
    this._insertBefore(child, null);
    return child;
  }

  insertBefore(child: Node, ref: Node | null) {
    this._trace(
      `Node.insertBefore(${child.uid}, ${ref === null ? "null" : ref.uid})`
    );
    this._insertBefore(child, ref);
  }

  _insertBefore(child: Node, ref: Node | null = null) {
    child._remove();
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
    this._trace(`Node.removeChild(${child.uid})`);
    return this._removeChild(child);
  }

  _removeChild(child: Node) {
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
    this._trace("Node.remove()");
    this._remove();
  }

  _remove() {
    if (this._parentNode !== null) {
      this._parentNode._removeChild(this);
    }
  }

  _trace(s: string) {
    this._document._trace(`[${this.uid}] ${s}`);
  }

  cloneNode(deep: boolean): Node {
    const n = this._cloneNode(deep);
    this._trace(`Node.cloneNode(${deep}) => ${n.uid}`);
    return n;
  }

  _cloneNode(deep: boolean): Node {
    return cloneNode(this, deep);
  }

  contains(node: Node | null): boolean {
    const r = this._contains(node);
    this._trace(`Node.contains(${node?.uid ?? "null"}) => ${r}`);
    return r;
  }

  _contains(node: Node | null): boolean {
    while (node !== null) {
      if (this.uid === node.uid) {
        return true;
      }
      node = node._parentNode;
    }
    return false;
  }
}

export class Text extends Node {
  constructor(document: Document, uid: number, text: string = "") {
    super(document, uid, NodeType.Text, "");
    this._nodeValue = text;
  }
}

export class Comment extends Node {
  constructor(document: Document, uid: number) {
    super(document, uid, NodeType.Comment, "");
  }
}

export class Element extends Node {
  _namespaceURI: string;
  _attributes: Map<string, string>;
  _properties: Map<string | symbol, any>;
  _styles: Map<string, string>;

  constructor(
    document: Document,
    uid: number,
    nodeType: number,
    tagName: string,
    namespaceURI: string = "http://www.w3.org/1999/xhtml",
    attributes: Map<string, string> = new Map(),
    properties: Map<string | symbol, any> = new Map(),
    styles: Map<string, string> = new Map(),
    eventHandlers: Map<string, EventHandler[]> | null = null,
  ) {
    super(document, uid, nodeType, tagName, eventHandlers);
    this._namespaceURI = namespaceURI;
    this._attributes = attributes;
    this._properties = properties;
    this._styles = styles;
    this._eventHandlers = eventHandlers;
  }

  get namespaceURI() {
    this._trace(`Element.namespaceURI => "${this._namespaceURI}"`);
    return this._namespaceURI;
  }

  get className(): string {
    const r = this._getAttribute("class") ?? "";
    this._trace(`Element.className => "${r}"`);
    return r;
  }

  set className(value: string) {
    this._trace(`Element.className = ${JSON.stringify(value)}`);
    this._setAttribute("class", value);
  }

  setAttribute(key: string, value: string) {
    this._trace(`Element.setAttribute("${key}", ${JSON.stringify(value)})`);
    this._setAttribute(key, "" + value);
  }

  _setAttribute(key: string, value: string) {
    this._attributes.set(key, value);
  }

  getAttribute(key: string): string | null {
    const v = this._getAttribute(key);
    this._trace(`Element.getAttribute("${key}") => ${JSON.stringify(v)}`);
    return v;
  }

  _getAttribute(key: string): string | null {
    return this._attributes.get(key) ?? null;
  }

  setProperty(key: string | symbol, value: any) {
    this._trace(`Element.setProperty("${key.toString()}", ${JSON.stringify(value)})`);
    this._setProperty(key, value);
  }

  _setProperty(key: string | symbol, value: any) {
    this._properties.set(key, value);
  }

  getProperty(key: string) {
    const v = this._getProperty(key);
    this._trace(`Element.getProperty("${key.toString()}") => ${JSON.stringify(v)}`);
    return v;
  }

  _getProperty(key: string): any {
    const prop = this._properties.get(key);
    if (prop !== void 0) {
      return prop;
    }
    return this._attributes.get(key);
  }

  removeAttribute(key: string) {
    this._trace(`Element.removeAttribute("${key}")`);
    this._removeAttribute(key);
  }

  _removeAttribute(key: string) {
    this._attributes.delete(key);
  }

  addEventListener(type: string, handler: EventHandler) {
    this._trace(`Element.addEventListener("${type}", ${handler.name})`);
    this._addEventListener(type, handler);
  }

  _addEventListener(type: string, handler: EventHandler) {
    if (this._eventHandlers === null) {
      this._eventHandlers = new Map();
      this._eventHandlers.set(type, [handler]);
    } else {
      let handlers = this._eventHandlers.get(type);
      if (handlers === void 0) {
        this._eventHandlers.set(type, [handler]);
      } else {
        handlers.push(handler);
      }
    }
  }

  removeEventListener(type: string, handler: EventHandler) {
    this._trace(`Element.removeEventListener("${type}", ${handler.name})`);
    this._removeEventListener(type, handler);
  }

  _removeEventListener(type: string, handler: EventHandler) {
    if (this._eventHandlers !== null) {
      const handlers = this._eventHandlers.get(type);
      if (handlers !== void 0) {
        const idx = handlers.findIndex((h) => h === handler);
        if (idx !== -1) {
          handlers.splice(idx, 1);
        }
      }
    }
  }

  set innerHTML(html: string) {
    this._trace(`Element.innerHTML = ${JSON.stringify(html)}`);
    this._setInnerHTML(html);
  }

  _setInnerHTML(html: string) {
    const fragment = parseHTML(this._document, html, this._namespaceURI);
    this._firstChild = null;
    this._lastChild = null;
    let node = fragment._firstChild;
    while (node !== null) {
      this._appendChild(node);
      node = node._nextSibling;
    }
  }
}

const ELEMENT_PROXY_HANDLER: ProxyHandler<Element> = {
  get(target, p) {
    if (p in target) {
      return (target as any)[p];
    }
    return target.getProperty(p as string) ?? void 0;
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
  constructor(
    document: Document,
    uid: number,
    tagName: string,
    attributes: Map<string, string> = new Map(),
    properties: Map<string | symbol, any> = new Map(),
    styles: Map<string, string> = new Map(),
    eventHandlers: Map<string, EventHandler[]> | null = null,
  ) {
    super(
      document,
      uid,
      NodeType.Element,
      tagName,
      "http://www.w3.org/1999/xhtml",
      attributes,
      properties,
      styles,
      eventHandlers,
    );
  }

  get style() {
    this._trace(`HTMLElement.style`);
    return this._getStyle();
  }

  _getStyle() {
    return new CSSStyleDeclaration(this, this._styles);
  }
}
export class SVGElement extends Element {
  constructor(
    document: Document,
    uid: number,
    tagName: string,
    attributes: Map<string, string> = new Map(),
    properties: Map<string | symbol, any> = new Map(),
    styles: Map<string, string> = new Map(),
    eventHandlers: Map<string, EventHandler[]> | null = null,
  ) {
    super(
      document,
      uid,
      NodeType.Element,
      tagName,
      "http://www.w3.org/2000/svg",
      attributes,
      properties,
      styles,
      eventHandlers,
    );
  }

  get style() {
    this._trace(`SVGElement.style`);
    return this._getStyle();
  }

  _getStyle() {
    return new CSSStyleDeclaration(this, this._styles);
  }
}

export class DocumentFragment extends Node {
  constructor(document: Document, uid: number) {
    super(document, uid, NodeType.DocumentFragment, "");
  }
}

export class Template extends Element {
  _content: DocumentFragment;

  constructor(document: Document, uid: number) {
    super(document, uid, NodeType.Element, "TEMPLATE");
    this._content = document._createDocumentFragment();
  }

  get content() {
    this._trace(`Template.content`);
    return this._content;
  }

  set innerHTML(html: string) {
    this._trace(`Template.innerHTML = "${html}"`);
    this._setInnerHTML(html);
  }

  _setInnerHTML(html: string) {
    const frag = parseHTML(this._document, html, this._namespaceURI);
    let n = this._content._firstChild;
    while (n !== null) {
      n._remove();
      n = n._nextSibling;
    }

    n = frag._firstChild;
    while (n !== null) {
      this._content._appendChild(n);
      n = n._nextSibling;
    }
  }
}

export class Document extends Element {
  _log: string[] | null;
  _nextUid: number;
  _body: Element;

  constructor() {
    super(null!, -9, NodeType.Document, "#document");
    this._log = null;
    this._nextUid = -8;
    this._body = this._createElement("body");
  }

  get body() {
    return this._body;
  }

  createElement(tagName: string) {
    const n = this._createElement(tagName);
    this._trace(`createElement("${tagName}") => ${n.uid}`);
    return n;
  }

  _createElement(tagName: string) {
    if (tagName === "template") {
      return new Template(this, this._nextUid++);
    }
    return new Proxy(
      new HTMLElement(this, this._nextUid++, tagName.toUpperCase()),
      ELEMENT_PROXY_HANDLER,
    );
  }

  createElementNS(namespace: string, tagName: string) {
    const n = this._createElementNS(namespace, tagName);
    this._trace(`createElementNS("${namespace}", "${tagName}") => ${n.uid}`);
    return n;
  }

  _createElementNS(namespace: string, tagName: string) {
    if (namespace === "http://www.w3.org/2000/svg") {
      return new Proxy(
        new SVGElement(this, this._nextUid++, tagName.toUpperCase()),
        ELEMENT_PROXY_HANDLER,
      );
    }
    return new Proxy(
      new Element(
        this,
        this._nextUid++,
        NodeType.Element,
        tagName.toUpperCase(),
        namespace,
      ),
      ELEMENT_PROXY_HANDLER,
    );
  }

  createTextNode(text: string) {
    const n = this._createTextNode(text);
    this._trace(`createTextNode(${JSON.stringify(text)}) => ${n.uid}`);
    return n;
  }

  _createTextNode(text: string) {
    return new Text(this, this._nextUid++, text);
  }

  createDocumentFragment() {
    const n = this._createDocumentFragment();
    this._trace(`createDocumentFragment() => ${n.uid}`);
    return n;
  }

  _createDocumentFragment() {
    return new DocumentFragment(this, this._nextUid++);
  }

  createComment() {
    const n = this._createComment();
    this._trace(`createComment() => ${n.uid}`);
    return n;
  }

  _createComment() {
    return new Comment(this, this._nextUid++);
  }

  _reset() {
    this._log = null;
    this._nextUid = 1;
    this._body = this._createElement("body");
  }

  _trace(s: string) {
    if (this._log !== null) {
      this._log.push(s);
    }
  }

  _startTracing() {
    this._log = [];
  }

  _stopTracing() {
    this._log = null;
  }
}

export type EventHandler = () => void;

export class CSSStyleDeclaration {
  _element: Element;
  _styles: Map<string, string>;

  constructor(element: Element, styles: Map<string, string>) {
    this._element = element;
    this._styles = styles;
  }

  setProperty(key: string, value: string) {
    this._element._trace(`style.setProperty("${key}", "${value}")`);
    this._setProperty(key, "" + value);
  }

  _setProperty(key: string, value: string) {
    this._styles.set(key, value);
  }

  removeProperty(key: string) {
    this._element._trace(`style.removeProperty("${key}")`);
    this._removeProperty(key);
  }

  _removeProperty(key: string) {
    this._styles.delete(key);
  }

  getPropertyValue(key: string) {
    const v = this._getPropertyValue(key);
    this._element._trace(`style.getPropertyValue(${key}) => "${v}"`);
    return v;
  }

  _getPropertyValue(key: string): string {
    return this._styles.get(key) ?? "";
  }
}

const cloneNode = (node: Node, deep: boolean) => {
  const uid = node._document._nextUid++;
  if (node instanceof Text) {
    const n = new Text(node._document, uid, node._nodeValue);
    return n;
  }

  if (node instanceof HTMLElement) {
    const n = new HTMLElement(
      node._document,
      uid,
      node._nodeName,
      new Map(node._attributes.entries()),
      new Map(node._properties.entries()),
      new Map(node._styles.entries()),
      node._eventHandlers === null
        ? new Map()
        : new Map(node._eventHandlers.entries()),
    );
    if (deep) {
      _cloneChildren(node, n);
    }
    return n;
  }

  if (node instanceof SVGElement) {
    const n = new SVGElement(
      node._document,
      uid,
      node._nodeName,
      new Map(node._attributes.entries()),
      new Map(node._properties.entries()),
      new Map(node._styles.entries()),
      node._eventHandlers === null
        ? new Map()
        : new Map(node._eventHandlers.entries()),
    );
    if (deep) {
      _cloneChildren(node, n);
    }
    return n;
  }

  if (node instanceof Element) {
    const n = new Element(
      node._document,
      uid,
      node._nodeType,
      node._nodeName,
      node._namespaceURI,
      new Map(node._attributes.entries()),
      new Map(node._properties.entries()),
      new Map(node._styles.entries()),
      node._eventHandlers === null
        ? new Map()
        : new Map(node._eventHandlers.entries()),
    );
    if (deep) {
      _cloneChildren(node, n);
    }
    return n;
  }

  if (node instanceof Comment) {
    const n = new Comment(node._document, uid);
    return n;
  }

  throw Error("This node type doesn't support cloning");
};


const _cloneChildren = (from: Element, to: Element) => {
  let child = from._firstChild;
  while (child !== null) {
    to._appendChild(cloneNode(child, true));
    child = child._nextSibling;
  }
};

export const toSnapshot = (node: any): string => (
  _toSnapshot(node as Node, 0).trimEnd()
);

const _toSnapshot = (node: Node, depth: number) => {
  const uid = node.uid;
  if (node instanceof Text) {
    return (
      indent(depth, `<TEXT#${uid}>`) +
      (node._nodeValue as string) +
      `</TEXT#${uid}>\n`
    );
  }

  if (node instanceof Element) {
    let s = indent(depth, `<${node._nodeName}#${uid}`);
    let propsString = "";
    const innerDepth = depth + 2;
    node._attributes.forEach((v, k) => {
      propsString += indent(innerDepth, `${k}="${v}"\n`);
    });
    node._properties.forEach((v, k) => {
      propsString += indent(innerDepth, `.${k.toString()}=${JSON.stringify(v)}\n`);
    });
    node._styles.forEach((v, k) => {
      propsString += indent(innerDepth, `~${k}="${v}"\n`);
    });
    if (node._eventHandlers !== null) {
      node._eventHandlers.forEach((v, k) => {
        propsString += indent(innerDepth, `@${k}=[${v.map((v) => v.name).join(", ")}]\n`);
      });
    }
    let child = node._firstChild;
    let childrenString = "";
    while (child !== null) {
      childrenString += _toSnapshot(child, depth + 2);
      child = child._nextSibling;
    }

    if (propsString === "") {
      if (childrenString === "") {
        s += "/>\n";
      } else {
        s += ">\n";
        s += childrenString;
        s += indent(depth, `</${node.nodeName}#${uid}>\n`);
      }
    } else {
      s += "\n";
      s += propsString;
      if (childrenString === "") {
        s += indent(depth, "/>\n");
      } else {
        s += indent(depth, ">\n");
        s += childrenString;
        s += indent(depth, `</${node.nodeName}#${uid}>\n`);
      }
    }
    return s;
  }

  if (node instanceof Comment) {
    return indent(depth, `<!>\n`);
  }

  let s = indent(depth, `<${node._nodeName}#${uid}>\n`);
  let child = node._firstChild;
  while (child !== null) {
    s += _toSnapshot(child, depth + 2);
    child = child._nextSibling;
  }
  return s + indent(depth, `</${node._nodeName}#${uid}>\n`);
};

interface HTMLParserContext {
  doc: Document;
  s: string;
  i: number;
}

// It is not a valid HTML parser, and it was designed this way intentionally,
// so that we could catch extra whitespaces, etc.
function parseHTML(doc: Document, html: string, namespaceURI: string): DocumentFragment {
  const ctx: HTMLParserContext = {
    doc,
    s: html,
    i: 0,
  };
  const fragment = doc._createDocumentFragment();
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
          parent._appendChild(parseComment(ctx));
          continue;
        }
      }
      parent._appendChild(parseElement(ctx, namespaceURI));
    } else {
      parent._appendChild(parseText(ctx));
    }
  }
}

const IDENTIFIER = /[a-zA-Z_][\w-]*/y;
const ATTR_IDENTIFIER = /[&a-zA-Z_][\w-]*/y;

function parseElement(ctx: HTMLParserContext, namespaceURI: string): Element {
  if (!parseCharCode(ctx, CharCode.LessThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '<' character\n${ctx.s}`);
  }
  const tagName = parseRegExp(ctx, IDENTIFIER);
  if (tagName === void 0) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a valid tag name\n${ctx.s}`);
  }
  const element = new Proxy(
    document._createElementNS(namespaceURI, tagName),
    ELEMENT_PROXY_HANDLER,
  );
  parseSkipWhitespace(ctx);
  parseAttributes(ctx, element);
  if (!parseCharCode(ctx, CharCode.MoreThan)) {
    throw new Error(`Invalid HTML [${ctx.i}]: expected a '>' character\n${ctx.s}`);
  }
  if (!VOID_ELEMENTS.test(tagName)) {
    if (tagName === "textarea") {
      let start = ctx.i;
      while (ctx.i < ctx.s.length) {
        const c = ctx.s.charCodeAt(ctx.i);
        if (c === CharCode.LessThan) {
          break;
        }
        ctx.i++;
      }
      element._setProperty("value", ctx.s.substring(start, ctx.i));
    } else {
      parseChildren(ctx, element, namespaceURI);
    }
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
    const key = parseRegExp(ctx, ATTR_IDENTIFIER);
    if (key === void 0) {
      throw new Error(`Invalid HTML [${ctx.i}]: invalid attribute name\n${ctx.s}`);
    }
    if (parseCharCode(ctx, CharCode.EqualsTo)) {
      const value = parseAttributeString(ctx);
      element._setAttribute(key, value);
    } else {
      element._setAttribute(key, "");
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
  return document._createComment();
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
  return document._createTextNode(s.substring(start, ctx.i));
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
}

const VOID_ELEMENTS = (
  /^(embed|input|param|source|track|area|base|link|meta|br|col|hr|img|wbr)$/
);

const indent = (i: number, s: string) => " ".repeat(i) + s;

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
