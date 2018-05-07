const nodeProto = Node.prototype;
const elementProto = Element.prototype;
const _nodeInsertBefore = nodeProto.insertBefore;
const _nodeRemoveChild = nodeProto.removeChild;
const _nodeReplaceChild = nodeProto.replaceChild;
const _nodeCloneNode = nodeProto.cloneNode;
const _elementSetAttribute = elementProto.setAttribute;
const _elementSetAttributeNS = elementProto.setAttributeNS;
const _elementRemoveAttribute = elementProto.removeAttribute;

export function nodeInsertBefore(parent: Node, newChild: Node, refChild: Node | null): void {
  if (DEBUG) {
    parent.insertBefore(newChild, refChild);
  } else {
    _nodeInsertBefore.call(parent, newChild, refChild);
  }
}

export function nodeRemoveChild(parent: Node, child: Node): void {
  if (DEBUG) {
    parent.removeChild(child);
  } else {
    _nodeRemoveChild.call(parent, child);
  }
}

export function nodeReplaceChild(parent: Node, newChild: Node, oldChild: Node): void {
  if (DEBUG) {
    parent.replaceChild(newChild, oldChild);
  } else {
    _nodeReplaceChild.call(parent, newChild, oldChild);
  }
}

export function nodeCloneNode(node: Node): Node {
  if (DEBUG) {
    return node.cloneNode(false);
  } else {
    return _nodeCloneNode.call(node, false);
  }
}

export function elementRemoveAttribute(el: Element, name: string): void {
  if (DEBUG) {
    el.removeAttribute(name);
  } else {
    _elementRemoveAttribute.call(el, name);
  }
}

export function elementSetAttribute(el: Element, name: string, value: any): void {
  if (DEBUG) {
    el.setAttribute(name, value);
  } else {
    _elementSetAttribute.call(el, name, value);
  }
}

export function elementSetAttributeNS(el: Element, namespace: string, name: string, value: any): void {
  if (DEBUG) {
    el.setAttributeNS(namespace, name, value);
  } else {
    _elementSetAttributeNS.call(el, namespace, name, value);
  }
}
