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

const nodeProto = process.env.IVI_TARGET === "ssr" ? void 0 : Node.prototype;
const elementProto = process.env.IVI_TARGET === "ssr" ? void 0 : Element.prototype;

/**
 * Shortcut for a `Document`.
 */
export const doc = (process.env.IVI_TARGET === "ssr" ? void 0 : document) as Document;

/**
 * Shortcut for an `Object.prototype.hasOwnProperty`.
 */
export const objectHasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Shortcut for a `Node.prototype.insertBefore`.
 */
export const nodeInsertBefore = process.env.IVI_TARGET === "ssr" ? void 0 : nodeProto!.insertBefore;

/**
 * Shortcut for a `Node.prototype.removeChild`.
 */
export const nodeRemoveChild = process.env.IVI_TARGET === "ssr" ? void 0 : nodeProto!.removeChild;

/**
 * Shortcut for a `Node.prototype.replaceChild`.
 */
export const nodeReplaceChild = process.env.IVI_TARGET === "ssr" ? void 0 : nodeProto!.replaceChild;

/**
 * Shortcut for a `Node.prototype.cloneNode`.
 */
export const nodeCloneNode = process.env.IVI_TARGET === "ssr" ? void 0 : nodeProto!.cloneNode;

/**
 * Shortcut for an `Element.prototype.setAttribute`.
 */
export const elementSetAttribute = process.env.IVI_TARGET === "ssr" ? void 0 : elementProto!.setAttribute;

/**
 * Shortcut for an `Element.prototype.setAttributeNS`.
 */
export const elementSetAttributeNS = process.env.IVI_TARGET === "ssr" ? void 0 : elementProto!.setAttributeNS;

/**
 * Shortcut for an `Element.prototype.removeAttribute`.
 */
export const elementRemoveAttribute = process.env.IVI_TARGET === "ssr" ? void 0 : elementProto!.removeAttribute;

/**
 * Shortcut for a `Node.textContent = value`.
 */
export const nodeSetTextContent = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
    getDescriptor(nodeProto, "textContent")!.set
);

/**
 * Shortcut for an `Element.className = value`.
 */
export const elementSetClassName = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
    getDescriptor(elementProto, "className")!.set
);

/**
 * Shortcut for a `HTMLElement.style`.
 */
export const htmlElementGetStyle = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
    getDescriptor(HTMLElement.prototype, "style")!.get
);

/**
 * Shortcut for a `SVGElement.style`.
 */
export const svgElementGetStyle = (
  process.env.IVI_TARGET === "ssr" ? void 0 :
    getDescriptor(SVGElement.prototype, "style")!.get
);
