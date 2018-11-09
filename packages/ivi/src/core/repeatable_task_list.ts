import { unorderedArrayDeleteByIndex } from "./array";

/**
 * RepeatableTaskList is a data structure for tasks that will be repeated until they return `true` value.
 */
export type RepeatableTaskList = Array<() => boolean | void>;

/**
 * runRepeatableTasks runs repeatable tasks.
 *
 * @param tasks - Repeatable tasks
 */
export function runRepeatableTasks(tasks: RepeatableTaskList): void {
  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i]() === true) {
      unorderedArrayDeleteByIndex(tasks, i--);
    }
  }
}
