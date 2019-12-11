/**
 * Shortcuts for DOM methods and properties are used to reduce megamorphic callsites in the codebase.
 *
 * In many synthetic microbenchmarks it is most likely will be slower, unless synthetic benchmark is implemented with
 * many different html/svg elements. But it is definitely should make it faster in complex real applications.
 *
 * Since Chrome 74, issue with native accessors is finally fixed: https://bugs.chromium.org/p/v8/issues/detail?id=8820
 */

/**
 * `Object.getOwnPropertyDescriptor(o, p)`
 *
 * @param o Object.
 * @param p Property name.
 * @returns Property Descriptor.
 */
const getDescriptor = (o: any, p: string | number | symbol) => Object.getOwnPropertyDescriptor(o, p);

const nodeProto = Node.prototype;
const elementProto = Element.prototype;

/**
 * Shortcut for a `Document`.
 */
export const doc = document;

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

/**
 * Shortcut for an `Element.className = value`.
 */
export const elementSetClassName = getDescriptor(elementProto, "className")!.set;

/**
 * Shortcut for a `HTMLElement.style`.
 */
export const htmlElementGetStyle = getDescriptor(HTMLElement.prototype, "style")!.get;

/**
 * Shortcut for a `SVGElement.style`.
 */
export const svgElementGetStyle = getDescriptor(SVGElement.prototype, "style")!.get;
