
const _readers: (() => boolean | undefined)[] = [];

/**
 * Add DOM Reader.
 *
 * DOM Reader will be be invoked on each frame in the read phase.
 *
 * @param reader Task that will be executed until it returns `false`.
 */
export function addDOMReader(reader: () => boolean | undefined): void {
    if (__IVI_BROWSER__) {
        _readers.push(reader);
    }
}

/**
 * Execute DOM Reader tasks.
 */
export function executeDOMReaders(): void {
    if (__IVI_BROWSER__) {
        for (let i = 0; i < _readers.length; i++) {
            const reader = _readers[i];
            if (reader()) {
                if (i === _readers.length) {
                    _readers.pop();
                } else {
                    _readers[i--] = _readers.pop() !;
                }
            }
        }
    }
}
