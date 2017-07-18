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

declare global {
  namespace Chai {
    interface Assertion {
      matchDOMOps(
        createElement: number,
        createElementNS: number,
        createTextNode: number,
        appendChild: number,
        insertBefore: number,
        replaceChild: number,
        removeChild: number,
      ): Assertion;
    }
  }
}

export function matchDOMOps(chai: any, utils: any) {
  utils.addMethod(
    chai.Assertion.prototype, "matchDOMOps",
    function (this: any,
      createElement: number,
      createElementNS: number,
      createTextNode: number,
      appendChild: number,
      insertBefore: number,
      replaceChild: number,
      removeChild: number,
    ) {
      const ssfi = utils.flag(this, "ssfi");
      const obj = chai.util.flag(this, "object") as DOMOpsCounter;

      if (obj.createElement !== createElement) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.createElement" ${obj.createElement} to equal ${createElement}`,
          {
            actual: obj.createElement,
            expected: createElement,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.createElementNS !== createElementNS) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.createElementNS" ${obj.createElementNS} to equal ${createElementNS}`,
          {
            actual: obj.createElementNS,
            expected: createElementNS,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.createTextNode !== createTextNode) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.createTextNode" ${obj.createTextNode} to equal ${createTextNode}`,
          {
            actual: obj.createTextNode,
            expected: createTextNode,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.appendChild !== appendChild) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.appendCHild" ${obj.appendChild} to equal ${appendChild}`,
          {
            actual: obj.appendChild,
            expected: appendChild,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.insertBefore !== insertBefore) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.insertBefore" ${obj.insertBefore} to equal ${insertBefore}`,
          {
            actual: obj.insertBefore,
            expected: insertBefore,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.replaceChild !== replaceChild) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.replaceChild" ${obj.replaceChild} to equal ${replaceChild}`,
          {
            actual: obj.replaceChild,
            expected: replaceChild,
            showDiff: true,
          },
          ssfi,
        );
      }

      if (obj.removeChild !== removeChild) {
        throw new chai.AssertionError(
          `Expected DOM ops counter "document.removeChild" ${obj.removeChild} to equal ${removeChild}`,
          {
            actual: obj.removeChild,
            expected: removeChild,
            showDiff: true,
          },
          ssfi,
        );
      }
    });
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
