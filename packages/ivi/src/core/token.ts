export interface TaskToken {
  readonly $$label?: "ivi-task-token";
}

export interface SelectToken {
  readonly $$label?: "ivi-select-token";
}

export interface UnmountToken {
  readonly $$label?: "ivi-unmount-token";
}

/**
 * Task token.
 */
export const TASK_TOKEN: TaskToken = (
  process.env.NODE_ENV !== "production" ? Object.freeze({}) : /* istanbul ignore next */{}
);

/**
 * Select token.
 */
export const SELECT_TOKEN: SelectToken = (
  process.env.NODE_ENV !== "production" ? Object.freeze({}) : /* istanbul ignore next */{}
);

/**
 * Unmount token.
 */
export const UNMOUNT_TOKEN: UnmountToken = (
  process.env.NODE_ENV !== "production" ? Object.freeze({}) : /* istanbul ignore next */{}
);

/**
 * Empty object.
 */
export const EMPTY_OBJECT = process.env.NODE_ENV !== "production" ? Object.freeze({}) : /* istanbul ignore next */{};

/**
 * Empty array.
 */
export const EMPTY_ARRAY = process.env.NODE_ENV !== "production" ? Object.freeze([]) : /* istanbul ignore next */[];
