import { enableTestEnvironment } from "ivi-core";

let _resetTasks: (() => void)[] = [];

enableTestEnvironment(function (task: () => void): void {
  _resetTasks.push(task);
});

/**
 * Resets to a base state.
 */
export function reset() {
  const tasks = _resetTasks;
  if (tasks.length > 0) {
    _resetTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      tasks[i]();
    }
  }
}
