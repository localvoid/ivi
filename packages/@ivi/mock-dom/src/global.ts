export { toSnapshot } from "./index.js";
import {
  DOMException as _DOMException,
  Node as _Node,
  Element as _Element,
  HTMLElement as _HTMLElement,
  SVGElement as _SVGElement,
  Template as _Template,
  DocumentFragment as _DocumentFragment,
  Document as _Document,
  CSSStyleDeclaration as _CSSStyleDeclaration
} from "./index.js";

declare global {
  let DOMException: typeof _DOMException;
  let Node: typeof _Node;
  let Element: typeof _Element;
  let HTMLElement: typeof _HTMLElement;
  let SVGElement: typeof _SVGElement;
  let Template: typeof _Template;
  let DocumentFragment: typeof _DocumentFragment;
  let Document: typeof _Document;
  let CSSStyleDeclaration: typeof _CSSStyleDeclaration;
  let document: _Document;
}

// TODO: How to avoid (global as any). It seems that extending NodeJ.Global
// doesn't work.
(global as any).DOMException = _DOMException;
(global as any).Node = _Node;
(global as any).Element = _Element;
(global as any).HTMLElement = _HTMLElement;
(global as any).SVGElement = _SVGElement;
(global as any).Template = _Template;
(global as any).DocumentFragment = _DocumentFragment;
(global as any).Document = _Document;
(global as any).CSSStyleDeclaration = _CSSStyleDeclaration;

(global as any).document = new _Document();

export const trace = (fn: () => void): string[] => {
  let log;
  try {
    document._startTracing();
    fn();
  } finally {
    log = document._log;
    document._stopTracing();
  }
  return log!;
};

export const reset = () => {
  document._reset();
};

export const emit = (node: any, type: string) => {
  let target: _Node | null = node;
  while (target !== null) {
    if (target._eventHandlers !== null) {
      const handlers = target._eventHandlers.get(type);
      if (handlers !== void 0) {
        for (const h of handlers) {
          h();
        }
      }
    }
    target = target._parentNode;
  }
};
