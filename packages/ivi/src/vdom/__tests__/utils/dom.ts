export interface DOMOpsCounter {
  createElement: number;
  createElementNS: number;
  createTextNode: number;
  appendChild: number;
  insertBefore: number;
  replaceChild: number;
  removeChild: number;
  textContent: number;
  nodeValue: number;
}

export function checkDOMOps(fn: (counter: DOMOpsCounter) => void): void {
  // save
  const createElement = Document.prototype.createElement;
  const createElementNS = Document.prototype.createElementNS;
  const createTextNode = Document.prototype.createTextNode;
  const appendChild = Node.prototype.appendChild;
  const insertBefore = Node.prototype.insertBefore;
  const replaceChild = Node.prototype.replaceChild;
  const removeChild = Node.prototype.removeChild;
  const textContent = Object.getOwnPropertyDescriptor(Node.prototype, "textContent")!;
  const nodeValue = Object.getOwnPropertyDescriptor(Node.prototype, "nodeValue")!;

  // patch
  const counter = {
    createElement: 0,
    createElementNS: 0,
    createTextNode: 0,
    appendChild: 0,
    insertBefore: 0,
    replaceChild: 0,
    removeChild: 0,
    textContent: 0,
    nodeValue: 0,
  };

  Document.prototype.createElement = function (this: Document) {
    counter.createElement++;
    return createElement.apply(this, arguments as any);
  };
  Document.prototype.createElementNS = function (this: Document) {
    counter.createElementNS++;
    return createElementNS.apply(this, arguments as any) as any;
  };
  Document.prototype.createTextNode = function (this: Document) {
    counter.createTextNode++;
    return createTextNode.apply(this, arguments as any);
  };
  Node.prototype.appendChild = function (this: Document) {
    counter.appendChild++;
    return appendChild.apply(this, arguments as any) as any;
  };
  Node.prototype.insertBefore = function (this: Document) {
    counter.insertBefore++;
    return insertBefore.apply(this, arguments as any) as any;
  };
  Node.prototype.replaceChild = function (this: Document) {
    counter.replaceChild++;
    return replaceChild.apply(this, arguments as any) as any;
  };
  Node.prototype.removeChild = function (this: Document) {
    counter.removeChild++;
    return removeChild.apply(this, arguments as any) as any;
  };
  Object.defineProperty(Node.prototype, "textContent", {
    get: function () {
      textContent.get!.apply(this);
    },
    set: function () {
      counter.textContent++;
      textContent.set!.apply(this, arguments as any);
    }
  });
  Object.defineProperty(Node.prototype, "nodeValue", {
    get: function () {
      nodeValue.get!.apply(this);
    },
    set: function () {
      counter.nodeValue++;
      nodeValue.set!.apply(this, arguments as any);
    }
  });

  fn(counter);

  // restore
  Document.prototype.createElement = createElement;
  Document.prototype.createElementNS = createElementNS;
  Document.prototype.createTextNode = createTextNode;
  Node.prototype.appendChild = appendChild;
  Node.prototype.insertBefore = insertBefore;
  Node.prototype.replaceChild = replaceChild;
  Node.prototype.removeChild = removeChild;
  Object.defineProperty(Node.prototype, "textContent", textContent);
  Object.defineProperty(Node.prototype, "nodeValue", nodeValue);
}
