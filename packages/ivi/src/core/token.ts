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
 /* istanbul ignore else */process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}
);

/**
 * Select token.
 */
export const SELECT_TOKEN: SelectToken = (
  /* istanbul ignore else */process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}
);

/**
 * Unmount token.
 */
export const UNMOUNT_TOKEN: UnmountToken = (
  /* istanbul ignore else */process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}
);

/**
 * Empty object.
 */
export const EMPTY_OBJECT = /* istanbul ignore else */process.env.NODE_ENV !== "production" ? Object.freeze({}) : {};

/**
 * Empty array.
 */
export const EMPTY_ARRAY = /* istanbul ignore else */process.env.NODE_ENV !== "production" ? Object.freeze([]) : [];
