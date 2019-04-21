export type LifecycleCounters = ReturnType<typeof createLifecycleCounters>;

const createLifecycleCounters = () => ({
  global: 0,
  constructor: 0,
  areEqual: 0,
  effect: 0,
  mutationEffect: 0,
  layoutEffect: 0,
  unmount: 0,
  render: 0,
});

export function useLifecycleCounters() {
  let state = new Map<string, number>();
  let counters = createLifecycleCounters();

  afterEach(() => {
    state = new Map<string, number>();
    counters = createLifecycleCounters();
  });
  return {
    touch: (id: string, name: keyof LifecycleCounters): void => {
      state.set(`${id}.${name}`, counters.global++);
      state.set(`${id}.${name}!`, counters[name]++);
    },
    get: (id: string, name: keyof LifecycleCounters, global = true): number => {
      let key = `${id}.${name}`;
      if (!global) {
        key += "!";
      }
      const v = state.get(key);
      if (v !== void 0) {
        return v;
      }
      return -1;
    },
  };
}
