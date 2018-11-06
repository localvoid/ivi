export interface Action<U extends any[]> {
  (...args: U): void;
  _s: Array<(...args: U) => void>;
}

export function action<U extends any[]>(handler: (...args: U) => void): Action<U> {
  const r = function () {
    const subs = r._s;
    handler.apply(void 0, arguments);
    for (let i = 0; i < subs.length; i++) {
      subs[i].apply(void 0, arguments);
    }
  } as Action<U>;
  r._s = [];
  return r;
}

export function handleAction<T, U extends any[]>(a: Action<U>, handler: (...args: U) => void): void {
  a._s.push(handler);
}
