import { RepeatableTaskList, DEV_HOOKS, devModeAddHook } from "ivi-core";

const _readers = new RepeatableTaskList();

/**
 * addDOMReader adds DOM Reader to the RepeatableTaskList.
 *
 * DOM Reader will be be invoked on each frame in the read phase.
 *
 * @param reader Task that will be executed until it returns `false`.
 */
export function addDOMReader(reader: () => boolean | undefined): void {
  _readers.add(reader);
}

/**
 * executeDOMReaders executes DOM Reader tasks.
 */
export function executeDOMReaders(): void {
  _readers.run();
}

if (__IVI_DEV__) {
  DEV_HOOKS.onAfterTestHook = devModeAddHook(DEV_HOOKS.onAfterTestHook, function () {
    _readers.tasks.length = 0;
  });
}
