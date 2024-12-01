/**
 * SharedStrings is used to deduplicate strings that are used in templates, like
 * attribute keys or event names.
 * 
 * Shared strings are injected into a final bundle in a sorted order.
 */
export class SharedStrings {
  readonly strings: Set<string>;
  sorted: Map<string, number> | null;

  constructor() {
    this.strings = new Set();
    this.sorted = null;
  }

  get(key: string): number {
    if (this.sorted === null) {
      throw new Error("SharedStrings should be sorted");
    }
    const i = this.sorted.get(key);
    if (i === void 0) {
      throw new Error(`Unable to find a string '${key}' in a SharedStrings`);
    }
    return i;
  }

  add(key: string): void {
    if (!this.strings.has(key)) {
      this.strings.add(key);
      this.sorted = null;
    }
  }

  sort() {
    if (this.sorted === null) {
      const sorted = new Map();
      this.sorted = sorted;
      const keys = Array.from(this.strings).sort();
      for (let i = 0; i < keys.length; i++) {
        sorted.set(keys[i], i);
      }
    }
  }

  keys(): MapIterator<string> {
    if (this.sorted === null) {
      throw new Error("SharedStrings should be sorted");
    }
    return this.sorted.keys();
  }
}
