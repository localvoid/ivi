import { DEV_MODE, DevModeFlags } from "./dev_mode";

export interface TraceLogEntry {
    text: string;
    count: number;
}

export class TraceLog {
    private readonly maxEntries: number;
    private readonly entries: TraceLogEntry[];
    private i: number;

    constructor(maxEntries: number = 200) {
        this.maxEntries = maxEntries;
        this.entries = [];
        this.i = -1;
    }

    push(text: string) {
        if (this.i !== -1 && this.entries[this.i].text === text) {
            this.entries[this.i].count++;
            return;
        }
        this.i = (this.i + 1) % this.maxEntries;
        this.entries[this.i] = {
            text: text,
            count: 1,
        };
    }

    forEach(fn: (text: string, count: number, index: number) => void): void {
        const entries = this.entries;
        const length = entries.length;
        for (let i = 0; i < length; i++) {
            const entry = entries[(this.i + i + 1) % length];
            fn(entry.text, entry.count, i);
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
