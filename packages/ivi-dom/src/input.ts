import { TARGET, Target } from "ivi-vars";
import { FEATURES, FeatureFlags } from "ivi-core";

const KEY_CODE_TO_KEY: { [key: number]: string } = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  91: "Meta",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Win",
};

/**
 * getEventCharCode retrieves a normalized `charCode` from a KeyboardEvent.
 *
 * #quirks
 *
 * @param ev Keyboard Event
 * @returns Normalized KeyboardEvent `charCode` value.
 */
export function getEventCharCode(ev: KeyboardEvent): number {
  const keyCode = ev.keyCode;
  let charCode = ev.charCode;

  if (charCode === 0 && keyCode === 13) {
    charCode = 13;
  }

  if (charCode >= 32 || charCode === 13) {
    return charCode;
  }

  return 0;
}

/**
 * getEventKey retrieves a `key` from a KeybordEvent with a fallback for browsers that doesn't support `key` property.
 *
 * #quirks
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 *
 * @param ev Keyboard Event.
 * @returns KeyboardEvent `key` value.
 */
export function getEventKey(ev: KeyboardEvent): string {
  if (ev.type === "keypress") {
    const charCode = getEventCharCode(ev);
    if (charCode === 13) {
      return "Enter";
    }
    return String.fromCharCode(charCode);
  } else if (ev.type === "keydown" || ev.type === "keyup") {
    const key = KEY_CODE_TO_KEY[ev.keyCode];
    if (key !== undefined) {
      return key;
    }
  }

  return "Unidentified";
}

/**
 * getMouseButtons retrieves a `buttons` property from a MouseEvent with a fallback implementation for Safari.
 *
 * #quirks
 *
 * @param ev
 * @returns MouseEvent `buttons` value.
 */
export const getMouseButtons = ((TARGET & Target.Electron) || (FEATURES & FeatureFlags.MouseEventButtons)) ?
  function (ev: MouseEvent): number {
    return ev.buttons;
  } :
  function (ev: MouseEvent): number {
    const button = ev.button;
    const r = 1 << button;
    if ((r & (2 | 4)) !== 0) {
      return button << (((r >> 2) ^ 1) << 1);
    }
    return r;
  };
