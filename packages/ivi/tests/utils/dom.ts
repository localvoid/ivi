/* tslint:disable:no-unused-expression */

import { expect } from "chai";

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

export function expectDOMOps(
  counter: DOMOpsCounter,
  createElement: number,
  createElementNS: number,
  createTextNode: number,
  appendChild: number,
  insertBefore: number,
  replaceChild: number,
  removeChild: number,
): void {
  expect(counter.createElement).to.be.equal(createElement, "DOM ops counter 'document.createElement'");
  expect(counter.createElementNS).to.be.equal(createElementNS, "DOM ops counter 'document.createElementNS'");
  expect(counter.createTextNode).to.be.equal(createTextNode, "DOM ops counter 'document.createTextNode'");
  expect(counter.appendChild).to.be.equal(appendChild, "DOM ops counter 'Node.appendChild'");
  expect(counter.insertBefore).to.be.equal(insertBefore, "DOM ops counter 'Node.insertBefore'");
  expect(counter.replaceChild).to.be.equal(replaceChild, "DOM ops counter 'Node.replaceChild'");
  expect(counter.removeChild).to.be.equal(removeChild, "DOM ops counter 'Node.removeChild'");
}
