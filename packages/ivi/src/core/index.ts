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
export { EMPTY_OBJECT } from "./empty_object";
export { getFunctionName } from "./function";
export { addErrorHandler, catchError } from "./error";
export { append, unorderedArrayDeleteByIndex, unorderedArrayDelete } from "./array";
export { NOOP, NOOP_FALSE, NOOP_TRUE } from "./noop";
export { RepeatableTaskList, runRepeatableTasks } from "./repeatable_task_list";
export {
  strictEqual, strictNotEqual, shallowEqual, shallowNotEqual, shallowEqualArray, shallowNotEqualArray,
} from "./equal";
export { lazy, memo, memoObject, memoArray } from "./memo";
