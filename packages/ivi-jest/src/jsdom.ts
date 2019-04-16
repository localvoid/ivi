interface Listener {
  readonly type: string;
  readonly handler: any;
  readonly options: any;
}

export function useResetJSDOMGlobalEventListeners() {
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

export function useResetJSDOM() {
  useResetJSDOMGlobalEventListeners();
}
