export type DOMOpsCounters = ReturnType<typeof createState>;

const createState = () => ({
  createElement: 0,
  createElementNS: 0,
  createTextNode: 0,
  appendChild: 0,
  insertBefore: 0,
  replaceChild: 0,
  removeChild: 0,
  innerHTML: 0,
  textContent: 0,
  nodeValue: 0,
});

export function useDOMOpsCounters(): () => DOMOpsCounters {
  const createElement = Document.prototype.createElement;
  const createElementNS = Document.prototype.createElementNS;
  const createTextNode = Document.prototype.createTextNode;
  const appendChild = Node.prototype.appendChild;
  const insertBefore = Node.prototype.insertBefore;
  const replaceChild = Node.prototype.replaceChild;
  const removeChild = Node.prototype.removeChild;
  const innerHTML = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML")!;
  const textContent = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")!;
  const nodeValue = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue")!;
  let state = createState();

  beforeEach(() => {
    state = createState();

    Document.prototype.createElement = function (this: Document) {
      state.createElement++;
      return createElement.apply(this, arguments as any);
    };
    Document.prototype.createElementNS = function (this: Document) {
      state.createElementNS++;
      return createElementNS.apply(this, arguments as any) as any;
    };
    Document.prototype.createTextNode = function (this: Document) {
      state.createTextNode++;
      return createTextNode.apply(this, arguments as any);
    };
    Node.prototype.appendChild = function (this: Document) {
      state.appendChild++;
      return appendChild.apply(this, arguments as any) as any;
    };
    Node.prototype.insertBefore = function (this: Document) {
      state.insertBefore++;
      return insertBefore.apply(this, arguments as any) as any;
    };
    Node.prototype.replaceChild = function (this: Document) {
      state.replaceChild++;
      return replaceChild.apply(this, arguments as any) as any;
    };
    Node.prototype.removeChild = function (this: Document) {
      state.removeChild++;
      return removeChild.apply(this, arguments as any) as any;
    };
    Object.defineProperty(Element.prototype, "innerHTML", {
      get() {
        return innerHTML.get!.apply(this);
      },
      set() {
        state.innerHTML++;
        innerHTML.set!.apply(this, arguments as any);
      },
    });
    Object.defineProperty(Node.prototype, "textContent", {
      get() {
        return textContent.get!.apply(this);
      },
      set() {
        state.textContent++;
        textContent.set!.apply(this, arguments as any);
      },
    });
    Object.defineProperty(Node.prototype, "nodeValue", {
      get() {
        return nodeValue.get!.apply(this);
      },
      set() {
        state.nodeValue++;
        nodeValue.set!.apply(this, arguments as any);
      },
    });
  });

  afterEach(() => {
    Document.prototype.createElement = createElement;
    Document.prototype.createElementNS = createElementNS;
    Document.prototype.createTextNode = createTextNode;
    Node.prototype.appendChild = appendChild;
    Node.prototype.insertBefore = insertBefore;
    Node.prototype.replaceChild = replaceChild;
    Node.prototype.removeChild = removeChild;
    Object.defineProperty(Element.prototype, "innerHTML", innerHTML);
    Object.defineProperty(Node.prototype, "textContent", textContent);
    Object.defineProperty(Node.prototype, "nodeValue", nodeValue);
  });

  return () => state;
}
