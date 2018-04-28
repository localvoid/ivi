/**
 * It is just an ugly workaround because Karma is running all tests in the same environment.
 */
let _addTestResetTask: (task: () => void) => void;

export function enableTestEnvironment(addTestResetTaskHook: (task: () => void) => void): void {
  if (DEBUG) {
    _addTestResetTask = addTestResetTaskHook;
  }
}

export function isTestEnvironment(): boolean {
  if (DEBUG) {
    return _addTestResetTask !== undefined;
  }
  return false;
}

export function addTestResetTask(task: () => void): void {
  if (DEBUG) {
    if (_addTestResetTask === undefined) {
      throw new Error("Failed to add test reset task. Test environment is disabled.");
    }
    _addTestResetTask(task);
  }
}

export type OnErrorHook = (error: Error) => void;

export interface DevModeHooks {
  /**
   * onError hook is invoked when unhandled exception is thrown.
   */
  onError: OnErrorHook[] | null;
}

export let DEV_HOOKS: DevModeHooks;

if (DEBUG) {
  DEV_HOOKS = {
    onError: null,
  };
}

export function devModeAddHook<T>(hooks: T[] | null, hook: T): T[] {
  if (hooks === null) {
    hooks = [];
  }
  hooks.push(hook);
  return hooks;
}

export function devModeOnError(e: Error): void {
  if (DEBUG) {
    if (DEV_HOOKS.onError) {
      for (const hook of DEV_HOOKS.onError) {
        hook(e);
      }
    }
  }
}
