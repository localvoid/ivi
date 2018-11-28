const nodeProto = Node.prototype;
const elementProto = Element.prototype;

/**
 * Shortcut for an `Object.prototype.hasOwnProperty`.
 */
export const objectHasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Shortcut for a `Node.prototype.insertBefore`.
 */
export const nodeInsertBefore = nodeProto.insertBefore;

/**
 * Shortcut for a `Node.prototype.removeChild`.
 */
export const nodeRemoveChild = nodeProto.removeChild;

/**
 * Shortcut for a `Node.prototype.replaceChild`.
 */
export const nodeReplaceChild = nodeProto.replaceChild;

/**
 * Shortcut for a `Node.prototype.cloneNode`.
 */
export const nodeCloneNode = nodeProto.cloneNode;

/**
 * Shortcut for an `Element.prototype.setAttribute`.
 */
export const elementSetAttribute = elementProto.setAttribute;

/**
 * Shortcut for an `Element.prototype.setAttributeNS`.
 */
export const elementSetAttributeNS = elementProto.setAttributeNS;

/**
 * Shortcut for an `Element.prototype.removeAttribute`.
 */
export const elementRemoveAttribute = elementProto.removeAttribute;
