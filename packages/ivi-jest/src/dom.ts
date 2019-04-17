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
 * useRequestAnimationFrame mocks `requestAnimationFrame()` and `cancelAnimationFrame()`.
 */
export function useRequestAnimationFrame() {
  const prevRAF = window.requestAnimationFrame;
  const prevCAF = window.cancelAnimationFrame;
  let tasks: Array<FrameRequestCallback | null> = [];
  const rAF = jest.fn((cb: FrameRequestCallback) => (tasks.push(cb) - 1));
  const cAF = jest.fn((id: number) => { tasks[id] = null; });

  beforeEach(() => {
    window.requestAnimationFrame = rAF;
    window.cancelAnimationFrame = cAF;
    (global as any).requestAnimationFrame = rAF;
    (global as any).cancelAnimationFrame = cAF;
  });

  afterEach(() => {
    rAF.mockReset();
    cAF.mockReset();
    tasks = [];
    window.requestAnimationFrame = prevRAF;
    window.cancelAnimationFrame = prevCAF;
    (global as any).requestAnimationFrame = prevRAF;
    (global as any).cancelAnimationFrame = prevCAF;
  });

  return {
    flush(time = 0) {
      const copy = tasks;
      tasks = [];
      for (let i = 0; i < copy.length; i++) {
        const task = copy[i];
        if (task !== null) {
          task(time);
        }
      }
    },
  };
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
