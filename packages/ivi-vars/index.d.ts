export const enum Target {
  Evergreen = 1,
  Electron = 1 << 1,
  Cordova = 1 << 2,
}

/**
 * Development Mode.
 * 
 * @const {boolean}
 */
export const DEV: boolean;

/**
 * Target Environment.
 * 
 * @const {number}
 */
export const TARGET: Target;
