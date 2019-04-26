declare global {
  /**
   * Adds missing displayName.
   */
  interface Function {
    displayName: string;
  }

  /**
   * Additional properties available on iOS.
   */
  interface TouchEvent {
    rotation: number;
    scale: number;
  }
}

export { _ } from "./shortcuts";
export { Predicate } from "./predicate";
export { Box, box } from "./box";
export {
  TaskToken, SelectToken, UnmountToken, EMPTY_OBJECT, TASK_TOKEN, SELECT_TOKEN, UNMOUNT_TOKEN, EMPTY_ARRAY,
} from "./token";
export { getFunctionName } from "./function";
export { addErrorHandler, catchError } from "./error";
export { append, unorderedArrayDeleteByIndex, unorderedArrayDelete } from "./array";
export { NOOP, NOOP_FALSE, NOOP_TRUE } from "./noop";
export { RepeatableTaskList, runRepeatableTasks } from "./repeatable_task_list";
export { strictEqual, shallowEqual, shallowEqualArray } from "./equal";
export { lazy, memo, memoObject, memoArray } from "./memo";
