/**
 * TraceLogEntry is an entry in a TraceLog.
 */
export interface TraceLogEntry {
  /**
   * Unique ID.
   */
  id: number;
  /**
   * Log message.
   */
  message: string;
  /**
   * The number of collapsed messages.
   */
  count: number;
}

/**
 * TraceLog is a container of trace messages.
 *
 * It automatically collapses similar message into one entry.
 */
export class TraceLog {
  private readonly maxEntries: number;
  private readonly entries: TraceLogEntry[];
  private readonly onChangeHandlers: Array<() => void>;
  private i: number;
  private nextId: number;

  constructor(maxEntries: number = 200) {
    this.maxEntries = maxEntries;
    this.entries = [];
    this.onChangeHandlers = [];
    this.i = -1;
    this.nextId = 0;
  }

  /**
   * push adds a message to the log.
   *
   * @param message Log message.
   */
  push(message: string): void {
    if (this.i !== -1) {
      const last = this.entries[this.i];
      if (last.message === message) {
        this.entries[this.i] = {
          id: last.id,
          message,
          count: last.count + 1,
        };
        this.changed();
        return;
      }
    }
    this.i = (this.i + 1) % this.maxEntries;
    this.entries[this.i] = {
      id: this.nextId++,
      message,
      count: 1,
    };
    this.changed();
  }

  /**
   * forEach iterates over log entries and invokes callback functions.
   *
   * @param fn Callback.
   */
  forEach(fn: (entry: TraceLogEntry, index: number) => void): void {
    const entries = this.entries;
    const length = entries.length;
    for (let i = 0; i < length; i++) {
      fn(entries[(this.i + i + 1) % length], i);
    }
  }

  /**
   * onChange adds a handler that will be invoked when new message is added.
   *
   * @param handler Callback.
   */
  onChange(handler: () => void): void {
    this.onChangeHandlers.push(handler);
  }

  private changed() {
    for (let i = 0; i < this.onChangeHandlers.length; i++) {
      this.onChangeHandlers[i]();
    }
  }
}
