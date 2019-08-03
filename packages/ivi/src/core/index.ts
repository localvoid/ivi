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
export { bitset } from "./bitset";
export { Predicate } from "./predicate";
export { clock, advanceClock } from "./clock";
export { Box, box } from "./box";
export {
  TaskToken, DirtyCheckToken, UnmountToken, EMPTY_OBJECT, TASK_TOKEN, DIRTY_CHECK_TOKEN, UNMOUNT_TOKEN, EMPTY_ARRAY,
} from "./token";
export { getFunctionName } from "./function";
export { addErrorHandler, catchError } from "./error";
export { append, unorderedArrayDeleteByIndex, unorderedArrayDelete, orderedArrayFindIndexForInsert } from "./array";
export { NOOP, NOOP_FALSE, NOOP_TRUE } from "./noop";
export { RepeatableTaskList, runRepeatableTasks } from "./repeatable_task_list";
export { strictEqual, shallowEqual, shallowEqualArray } from "./equal";
export { lazy, memo, memoObject, memoArray } from "./memo";
export {
  Observable, ObservableValue, WatchList, observable, apply, assign, mut, signal, emit, computed, selector,
  watch, saveObservableDependencies, dirtyCheckWatchList, enableWatch, disableWatch,
} from "./observable";
