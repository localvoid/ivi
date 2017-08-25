const nodeProto = Node.prototype;
const elementProto = Element.prototype;
const _nodeInsertBefore = nodeProto.insertBefore;
const _nodeRemoveChild = nodeProto.removeChild;
const _nodeReplaceChild = nodeProto.replaceChild;
const _elementSetAttribute = elementProto.setAttribute;
const _elementSetAttributeNS = elementProto.setAttributeNS;
const _elementRemoveAttribute = elementProto.removeAttribute;

export function nodeInsertBefore(parent: Node, newChild: Node, refChild: Node | null): void {
  _nodeInsertBefore.call(parent, newChild, refChild);
}

export function nodeRemoveChild(parent: Node, child: Node): void {
  _nodeRemoveChild.call(parent, child);
}

export function nodeReplaceChild(parent: Node, newChild: Node, oldChild: Node): void {
  _nodeReplaceChild.call(parent, newChild, oldChild);
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
