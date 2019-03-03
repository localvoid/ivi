const nodeProto = __IVI_TARGET__ === "ssr" ? void 0 : Node.prototype;
const elementProto = __IVI_TARGET__ === "ssr" ? void 0 : Element.prototype;

/**
 * Shortcut for an `Object.prototype.hasOwnProperty`.
 */
export const objectHasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Shortcut for a `Node.prototype.insertBefore`.
 */
export const nodeInsertBefore = (
  __IVI_DEBUG__ ?
    function <T extends Node>(this: Node, newChild: T, refChild: Node | null): T {
      return this.insertBefore(newChild, refChild);
    } :
    /* istanbul ignore next */nodeProto!.insertBefore
);

/**
 * Shortcut for a `Node.prototype.removeChild`.
 */
export const nodeRemoveChild = (
  __IVI_DEBUG__ ?
    function <T extends Node>(this: Node, oldChild: T): T {
      return this.removeChild(oldChild);
    } :
    /* istanbul ignore next */nodeProto!.removeChild
);

/**
 * Shortcut for a `Node.prototype.replaceChild`.
 */
export const nodeReplaceChild = (
  __IVI_DEBUG__ ?
    function <T extends Node>(this: Node, newChild: Node, oldChild: T): T {
      return this.replaceChild(newChild, oldChild);
    } :
    /* istanbul ignore next */nodeProto!.replaceChild
);

/**
 * Shortcut for a `Node.prototype.cloneNode`.
 */
export const nodeCloneNode = (
  __IVI_DEBUG__ ?
    function (this: Node, deep?: boolean): Node {
      return this.cloneNode(deep);
    } :
    /* istanbul ignore next */nodeProto!.cloneNode
);

/**
 * Shortcut for an `Element.prototype.setAttribute`.
 */
export const elementSetAttribute = (
  __IVI_DEBUG__ ?
    function (this: Element, qualifiedName: string, value: string): void {
      this.setAttribute(qualifiedName, value);
    } :
    /* istanbul ignore next */elementProto!.setAttribute
);

/**
 * Shortcut for an `Element.prototype.setAttributeNS`.
 */
export const elementSetAttributeNS = (
  __IVI_DEBUG__ ?
    function (this: Element, namespace: string | null, qualifiedName: string, value: string): void {
      this.setAttributeNS(namespace, qualifiedName, value);
    } :
    /* istanbul ignore next */elementProto!.setAttributeNS
);

/**
 * Shortcut for an `Element.prototype.removeAttribute`.
 */
export const elementRemoveAttribute = (
  __IVI_DEBUG__ ?
    function (this: Element, qualifiedName: string): void {
      this.removeAttribute(qualifiedName);
    } :
    /* istanbul ignore next */elementProto!.removeAttribute
);
