export interface LifecycleCounters {
  global: number;
  constructor: number;
  shouldUpdate: number;
  effect: number;
  detached: number;
  render: number;
}

const LIFECYCLE_COUNTERS: LifecycleCounters = {
  global: 0,
  constructor: 0,
  shouldUpdate: 0,
  effect: 0,
  detached: 0,
  render: 0,
};

let LIFECYCLE_DATA: Map<string, number> | undefined;

export function lifecycleTouch(id: string, name: keyof LifecycleCounters): void {
  if (LIFECYCLE_DATA) {
    LIFECYCLE_DATA.set(`${id}.${name}`, LIFECYCLE_COUNTERS.global++);
    LIFECYCLE_DATA.set(`${id}.${name}!`, LIFECYCLE_COUNTERS[name]++);
  }
}

export function lifecycleGet(id: string, name: keyof LifecycleCounters, global = true): number {
  if (LIFECYCLE_DATA) {
    let key = `${id}.${name}`;
    if (!global) {
      key += "!";
    }
    const v = LIFECYCLE_DATA.get(key);
    if (v !== undefined) {
      return v;
    }
  }
  return -1;
}

export function checkLifecycle(
  fn: (
    get: (id: string, name: keyof LifecycleCounters, global?: boolean) => number,
  ) => void,
): void {
  LIFECYCLE_DATA = new Map<string, number>();
  LIFECYCLE_COUNTERS.global = 0;
  LIFECYCLE_COUNTERS.constructor = 0;
  LIFECYCLE_COUNTERS.shouldUpdate = 0;
  LIFECYCLE_COUNTERS.effect = 0;
  LIFECYCLE_COUNTERS.detached = 0;
  LIFECYCLE_COUNTERS.render = 0;
  fn(lifecycleGet);
  LIFECYCLE_DATA = undefined;
}
