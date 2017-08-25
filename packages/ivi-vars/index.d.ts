export const enum Target {
  Node = 1,
  Browser = 1 << 1,
  EvergreenBrowser = 1 << 2,
  Electron = 1 << 3,
  Cordova = 1 << 4,
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
