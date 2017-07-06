import { DEV_MODE, DevModeFlags } from "./dev_mode";

let nextId = 0;

export interface TraceLogEntry {
  id: number;
  text: string;
  count: number;
}

export class TraceLog {
  private readonly maxEntries: number;
  private readonly entries: TraceLogEntry[];
  private readonly onChangeHandlers: Array<() => void>;
  private i: number;

  constructor(maxEntries: number = 200) {
    this.maxEntries = maxEntries;
    this.entries = [];
    this.onChangeHandlers = [];
    this.i = -1;
  }

  push(text: string) {
    if (this.i !== -1) {
      const last = this.entries[this.i];
      if (last.text === text) {
        this.entries[this.i] = {
          id: last.id,
          text,
          count: last.count + 1,
        };
        this.changed();
        return;
      }
    }
    this.i = (this.i + 1) % this.maxEntries;
    this.entries[this.i] = {
      id: nextId++,
      text,
      count: 1,
    };
    this.changed();
  }

  forEach(fn: (entry: TraceLogEntry, index: number) => void): void {
    const entries = this.entries;
    const length = entries.length;
    for (let i = 0; i < length; i++) {
      fn(entries[(this.i + i + 1) % length], i);
    }
  }

  onChange(handler: () => void): void {
    this.onChangeHandlers.push(handler);
  }

  private changed() {
    for (let i = 0; i < this.onChangeHandlers.length; i++) {
      this.onChangeHandlers[i]();
    }
  }
}

const TRACE_LOG = new TraceLog();

export function trace(text: string): void {
  if (__IVI_DEV__) {
    if (DEV_MODE & DevModeFlags.EnableTracing) {
      TRACE_LOG.push(text);
    }
  }
}

export function getTraceLog(): TraceLog {
  return TRACE_LOG;
}
