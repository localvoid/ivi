
let _nextReader: DOMReader | null = null;
let _currentReader: DOMReader | null = null;

/**
 * DOM Reader flags.
 */
export const enum DOMReaderFlags {
    /**
     * DOM Reader is canceled.
     */
    Canceled = 1,
}

/**
 * DOM Reader.
 */
export class DOMReader {
    /**
     * See `DOMReaderFlags` for details.
     */
    flags: DOMReaderFlags;
    /**
     * Task that will be executed when scheduler starts a read phase. It will be executed once per frame.
     */
    readonly task: () => void;
    _prev: DOMReader | null;
    _next: DOMReader | null;

    constructor(action: () => void) {
        this.flags = 0;
        this.task = action;
        this._prev = null;
        this._next = null;
    }

    cancel() {
        if (!(this.flags & DOMReaderFlags.Canceled)) {
            this.flags |= DOMReaderFlags.Canceled;
            if (_currentReader !== this) {
                removeDOMReader(this);
            }
        }
    }
}

/**
 * Register a DOM Reader that will be invoked on each frame in the read phase.
 *
 * @param task Task that will be executed.
 * @returns DOMReader instance.
 */
export function addDOMReader(task: () => void): DOMReader {
    const reader = new DOMReader(task);
    if (_nextReader) {
        _nextReader._prev = reader;
        reader._next = _nextReader;
    }
    _nextReader = reader;
    return reader;
}

/**
 * Unregister a DOM Reader.
 *
 * @param reader DOMReader instance.
 */
export function removeDOMReader(reader: DOMReader): void {
    if (reader._prev) {
        reader._prev._next = reader._next;
    } else {
        _nextReader = reader._next;
    }
    if (reader._next) {
        reader._next._prev = reader._prev;
    }
}

/**
 * Execute DOM Reader tasks.
 */
export function executeDOMReaders(): void {
    if (__IVI_BROWSER__) {
        let nextReader = _nextReader;
        while (nextReader) {
            _currentReader = nextReader;
            nextReader.task();
            if (nextReader.flags & DOMReaderFlags.Canceled) {
                const tmp = nextReader;
                nextReader = nextReader._next;
                removeDOMReader(tmp);
            } else {
                nextReader = nextReader._next;
            }
        }
        _currentReader = null;
    }
}
