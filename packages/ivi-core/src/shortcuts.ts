const nodeProto = Node.prototype;
const elementProto = Element.prototype;

export const objectHasOwnProperty = Object.prototype.hasOwnProperty;
export const nodeInsertBefore = nodeProto.insertBefore;
export const nodeRemoveChild = nodeProto.removeChild;
export const nodeReplaceChild = nodeProto.replaceChild;
export const nodeCloneNode = nodeProto.cloneNode;
export const elementSetAttribute = elementProto.setAttribute;
export const elementSetAttributeNS = elementProto.setAttributeNS;
export const elementRemoveAttribute = elementProto.removeAttribute;

export const _ = void 0;
