import { Assertion, AssertionError, addAssertionType, errMsg, e, r } from "iko";

export class DOMOpsCounter {
  createElement = 0;
  createElementNS = 0;
  createTextNode = 0;
  appendChild = 0;
  insertBefore = 0;
  replaceChild = 0;
  removeChild = 0;

  reset() {
    this.createElement = 0;
    this.createElementNS = 0;
    this.createTextNode = 0;
    this.appendChild = 0;
    this.insertBefore = 0;
    this.replaceChild = 0;
    this.removeChild = 0;
  }
}

declare module "iko" {
  function expect(counter: DOMOpsCounter): DOMOpsCounterAssertion;
}

addAssertionType(function (obj: any) {
  if (typeof obj === "object" && obj instanceof DOMOpsCounter) {
    return new DOMOpsCounterAssertion(obj);
  }
  return undefined;
});

export class DOMOpsCounterAssertion extends Assertion<DOMOpsCounter> {
  toMatchDOMOps(
    createElement: number,
    createElementNS: number,
    createTextNode: number,
    appendChild: number,
    insertBefore: number,
    replaceChild: number,
    removeChild: number,
  ): DOMOpsCounterAssertion {
    const obj = this.obj;

    if (obj.createElement !== createElement) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.createElement' to be ", e(createElement),
        ", instead it is ", r(obj.createElement), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.createElementNS !== createElementNS) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.createElementNS' to be ", e(createElementNS),
        ", instead it is ", r(obj.createElementNS), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.createTextNode !== createTextNode) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.createTextNode' to be ", e(createTextNode),
        ", instead it is ", r(obj.createTextNode), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.appendChild !== appendChild) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.appendChild' to be ", e(appendChild),
        ", instead it is ", r(obj.appendChild), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.insertBefore !== insertBefore) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.insertBefore' to be ", e(insertBefore),
        ", instead it is ", r(obj.insertBefore), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.replaceChild !== replaceChild) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.replaceChild' to be ", e(replaceChild),
        ", instead it is ", r(obj.replaceChild), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    if (obj.removeChild !== removeChild) {
      const message = errMsg()
        .matcherHint("toMatchDOMOps")
        .info("Expected DOM ops counter 'document.removeChild' to be ", e(removeChild),
        ", instead it is ", r(obj.removeChild), "\n");

      throw new AssertionError(message.compose(), this.toMatchDOMOps);
    }

    return this;
  }
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

  // patch
  const counter = new DOMOpsCounter();
  Document.prototype.createElement = function (this: Document) {
    counter.createElement++;
    return createElement.apply(this, arguments);
  };
  Document.prototype.createElementNS = function (this: Document) {
    counter.createElementNS++;
    return createElementNS.apply(this, arguments);
  };
  Document.prototype.createTextNode = function (this: Document) {
    counter.createTextNode++;
    return createTextNode.apply(this, arguments);
  };
  Node.prototype.appendChild = function (this: Document) {
    counter.appendChild++;
    return appendChild.apply(this, arguments);
  };
  Node.prototype.insertBefore = function (this: Document) {
    counter.insertBefore++;
    return insertBefore.apply(this, arguments);
  };
  Node.prototype.replaceChild = function (this: Document) {
    counter.replaceChild++;
    return replaceChild.apply(this, arguments);
  };
  Node.prototype.removeChild = function (this: Document) {
    counter.removeChild++;
    return removeChild.apply(this, arguments);
  };

  fn(counter);

  // restore
  Document.prototype.createElement = createElement;
  Document.prototype.createElementNS = createElementNS;
  Document.prototype.createTextNode = createTextNode;
  Node.prototype.appendChild = appendChild;
  Node.prototype.insertBefore = insertBefore;
  Node.prototype.replaceChild = replaceChild;
  Node.prototype.removeChild = removeChild;
}
