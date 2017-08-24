import { objectGetOwnPropertyDescriptor } from "ivi-core";

export const win = window;
export const doc = document;

const nodeProto = Node.prototype;
const elementProto = Element.prototype;
const _nodeInsertBefore = nodeProto.insertBefore;
const _nodeRemoveChild = nodeProto.removeChild;
const _nodeReplaceChild = nodeProto.replaceChild;
const _nodeGetParentElement = objectGetOwnPropertyDescriptor(nodeProto, "parentElement").get!;
const _nodeGetFirstChild = objectGetOwnPropertyDescriptor(nodeProto, "firstChild").get!;
const _nodeNodeValueDescriptor = objectGetOwnPropertyDescriptor(nodeProto, "nodeValue");
const _nodeGetNodeValue = _nodeNodeValueDescriptor.get!;
const _nodeSetNodeValue = _nodeNodeValueDescriptor.set!;
const _nodeSetTextContent = objectGetOwnPropertyDescriptor(nodeProto, "textContent").set!;
const _elementSetAttribute = elementProto.setAttribute;
const _elementSetAttributeNS = elementProto.setAttributeNS;
const _elementRemoveAttribute = elementProto.removeAttribute;
const _elementSetClassName = objectGetOwnPropertyDescriptor(elementProto, "className").set!;
const _elementSetInnerHTML = objectGetOwnPropertyDescriptor(elementProto, "innerHTML").set!;

export function nodeInsertBefore(parent: Node, newChild: Node, refChild: Node | null): void {
  _nodeInsertBefore.call(parent, newChild, refChild);
}

export function nodeRemoveChild(parent: Node, child: Node): void {
  _nodeRemoveChild.call(parent, child);
}

export function nodeReplaceChild(parent: Node, newChild: Node, oldChild: Node): void {
  _nodeReplaceChild.call(parent, newChild, oldChild);
}

export function nodeGetParentElement(node: Node): Element | null {
  return _nodeGetParentElement.call(node);
}

export function nodeGetFirstChild(node: Node): Node | null {
  return _nodeGetFirstChild.call(node);
}

export function nodeGetNodeValue(node: Node): any {
  return _nodeGetNodeValue.call(node);
}

export function nodeSetNodeValue(node: Node, value: any): void {
  _nodeSetNodeValue.call(node, value);
}

export function nodeSetTextContent(node: Node, value: string): void {
  _nodeSetTextContent.call(node, value);
}

export function elementRemoveAttribute(el: Element, name: string): void {
  _elementRemoveAttribute.call(el, name);
}

export function elementSetAttribute(el: Element, name: string, value: any): void {
  _elementSetAttribute.call(el, name, value);
}

export function elementSetAttributeNS(el: Element, namespace: string, name: string, value: any): void {
  _elementSetAttributeNS.call(el, namespace, name, value);
}

export function elementSetClassName(el: Element, className: string): void {
  _elementSetClassName.call(el, className);
}

export function elementSetInnerHTML(node: Node, value: string): void {
  _elementSetInnerHTML.call(node, value);
}
