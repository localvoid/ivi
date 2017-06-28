import { RepeatableTaskList } from "ivi-core";

const _readers = new RepeatableTaskList();

/**
 * Add DOM Reader.
 *
 * DOM Reader will be be invoked on each frame in the read phase.
 *
 * @param reader Task that will be executed until it returns `false`.
 */
export function addDOMReader(reader: () => boolean | undefined): void {
    if (__IVI_BROWSER__) {
        _readers.add(reader);
    }
}

/**
 * Execute DOM Reader tasks.
 */
export function executeDOMReaders(): void {
    if (__IVI_BROWSER__) {
        _readers.run();
    }
}
