interface Listener {
  readonly type: string;
  readonly handler: any;
  readonly options: any;
}

/**
 * useResetDOMGlobalEventListeners tracks event handlers for a window and document objects and removes them after
 * each test.
 */
export function useResetDOMGlobalEventListeners() {
  const windowListeners: Listener[] = [];
  const documentListeners: Listener[] = [];
  const windowAddEventListener = window.addEventListener;
  const documentAddEventListener = document.addEventListener;

  window.addEventListener = (type: string, handler: any, options: any) => {
    windowListeners.push({ type, handler, options });
    windowAddEventListener.call(window, type, handler, options);
  };

  document.addEventListener = (type: string, handler: any, options: any) => {
    documentListeners.push({ type, handler, options });
    documentAddEventListener.call(window, type, handler, options);
  };

  afterEach(() => {
    for (let i = 0; i < windowListeners.length; i++) {
      const listener = windowListeners[i];
      window.removeEventListener(listener.type, listener.handler, listener.options);
    }
    for (let i = 0; i < documentListeners.length; i++) {
      const listener = documentListeners[i];
      document.removeEventListener(listener.type, listener.handler, listener.options);
    }
    windowListeners.length = 0;
    documentListeners.length = 0;
  });
}

/**
 * useResetDOM enables following resets:
 * - useResetDOMGlobalEventListeners
 */
export function useResetDOM() {
  useResetDOMGlobalEventListeners();
}

/**
 * useDOMElement creates a DOM element and optionally mounts it to the document body.
 *
 * @example
 *
 *     const container = useDOMElement();
 *     test(() => {
 *       expect(container().tagName).toBe("div");
 *     });
 *
 * @param tagName DOM Element tag name.
 * @param mount Mount element to the document body.
 * @returns DOM Element getter function.
 */
export function useDOMElement(tagName: string = "div", mount = true) {
  let el: HTMLElement;
  beforeEach(() => {
    el = document.createElement(tagName);
    document.body.appendChild(el);
  });
  afterEach(() => {
    document.body.removeChild(el);
  });

  return () => el;
}
