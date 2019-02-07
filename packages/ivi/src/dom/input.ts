import { MOUSE_EVENT_BUTTONS } from "./feature_detection";

/**
 * KeyboardEvent keyCode values.
 */
export const enum KeyCode {
  WinKeyFFLinux = 0,
  MacEnter = 3,
  Backspace = 8,
  Tab = 9,
  Clear = 12,
  Enter = 13,
  Shift = 16,
  Control = 17,
  Alt = 18,
  Pause = 19,
  CapsLock = 20,
  Escape = 27,
  Space = 32,
  PageUp = 33,
  PageDown = 34,
  End = 35,
  Home = 36,
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40,
  NumNorthEast = 33,
  NumSouthEast = 34,
  NumSouthWest = 35,
  NumNorthWest = 36,
  NumWest = 37,
  NumNorth = 38,
  NumEast = 39,
  NumSouth = 40,
  PrintScreen = 44,
  Insert = 45,
  NumInsert = 45,
  Delete = 46,
  NumDelete = 46,
  Zero = 48,
  Ono = 49,
  Two = 50,
  Three = 51,
  Four = 52,
  Five = 53,
  Six = 54,
  Seven = 55,
  Eight = 56,
  Nine = 57,
  FFSemicolon = 59,
  FFEquals = 61,
  /**
   * US keyboard layouts only.
   */
  QuestionMark = 63,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  G = 71,
  H = 72,
  I = 73,
  J = 74,
  K = 75,
  L = 76,
  M = 77,
  N = 78,
  O = 79,
  P = 80,
  Q = 81,
  R = 82,
  S = 83,
  T = 84,
  U = 85,
  V = 86,
  W = 87,
  X = 88,
  Y = 89,
  Z = 90,
  Meta = 91,
  WinKeyLeft = 91,
  WinKeyRight = 92,
  ContextMenu = 93,
  NumZero = 96,
  NumOne = 97,
  NumTwo = 98,
  NumThree = 99,
  NumFour = 100,
  NumFive = 101,
  NumSix = 102,
  NumSeven = 103,
  NumEight = 104,
  NumNine = 105,
  NumMultiply = 106,
  NumPlus = 107,
  NumMinus = 109,
  NumPeriod = 110,
  NumDivision = 111,
  F1 = 112,
  F2 = 113,
  F3 = 114,
  F4 = 115,
  F5 = 116,
  F6 = 117,
  F7 = 118,
  F8 = 119,
  F9 = 120,
  F10 = 121,
  F11 = 122,
  F12 = 123,
  NumLock = 144,
  ScrollLock = 145,
  /**
   * First OS specific media key.
   */
  FirstMediaKey = 166,
  /**
   * Last OS specific media key.
   */
  LastMediaKey = 183,
  /**
   * US keyboard layouts only.
   */
  Semicolon = 186,
  /**
   * US keyboard layouts only.
   */
  Dash = 189,
  /**
   * US keyboard layouts only.
   */
  Equals = 187,
  /**
   * US keyboard layouts only.
   */
  Comma = 188,
  /**
   * US keyboard layouts only.
   */
  Period = 190,
  /**
   * US keyboard layouts only.
   */
  Slash = 191,
  /**
   * US keyboard layouts only.
   */
  Apostrophe = 192,
  /**
   * US keyboard layouts only.
   */
  Tilde = 192,
  /**
   * US keyboard layouts only.
   */
  SingleQuote = 222,
  /**
   * US keyboard layouts only.
   */
  OpenSquareBracket = 219,
  /**
   * US keyboard layouts only.
   */
  Backslash = 220,
  /**
   * US keyboard layouts only.
   */
  CloseSquareBracket = 221,
  Win = 224,
  MacFFMeta = 224,
  WinIME = 229,
}

/**
 * KeyboardEvent keyLocation values.
 */
export const enum KeyLocation {
  Standard = 0,
  Left = 1,
  Right = 2,
  NumPad = 3,
  Mobile = 4,
  Joystick = 5,
}

/**
 * Flags for MouseEvent buttons property.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons
 */
export const enum MouseButtons {
  Left = 1,
  Right = 1 << 1,
  /**
   * Wheel or middle button.
   */
  Middle = 1 << 2,
  /**
   * Typically the "Browser Back" button.
   */
  Fourh = 1 << 3,
  /**
   * Typically the "Browser Forward" button.
   */
  Fifth = 1 << 4,
}

export type KeyName =
  "Accept" |
  "Add" |
  "Again" |
  "AllCandidates" |
  "Alphanumeric" |
  "Alt" |
  "AltGraph" |
  "Apps" |
  "Attn" |
  "BrowserBack" |
  "BrowserFavorites" |
  "BrowserForward" |
  "BrowserHome" |
  "BrowserRefresh" |
  "BrowserSearch" |
  "BrowserStop" |
  "Camera" |
  "CapsLock" |
  "Clear" |
  "CodeInput" |
  "Compose" |
  "Control" |
  "Crsel" |
  "Convert" |
  "Copy" |
  "Cut" |
  "Decimal" |
  "Divide" |
  "Down" |
  "DownLeft" |
  "DownRight" |
  "Eject" |
  "End" |
  "Enter" |
  "EraseEof" |
  "Execute" |
  "Exsel" |
  "Fn" |
  "F1" |
  "F2" |
  "F3" |
  "F4" |
  "F5" |
  "F6" |
  "F7" |
  "F8" |
  "F9" |
  "F10" |
  "F11" |
  "F12" |
  "F13" |
  "F14" |
  "F15" |
  "F16" |
  "F17" |
  "F18" |
  "F19" |
  "F20" |
  "F21" |
  "F22" |
  "F23" |
  "F24" |
  "FinalMode" |
  "Find" |
  "FullWidth" |
  "HalfWidth" |
  "HangulMode" |
  "HanjaMode" |
  "Help" |
  "Hiragana" |
  "Home" |
  "Insert" |
  "JapaneseHiragana" |
  "JapaneseKatakana" |
  "JapaneseRomaji" |
  "JunjaMode" |
  "KanaMode" |
  "KanjiMode" |
  "Katakana" |
  "LaunchApplication1" |
  "LaunchApplication2" |
  "LaunchMail" |
  "Left" |
  "Menu" |
  "Meta" |
  "MediaNextTrack" |
  "MediaPlayPause" |
  "MediaPreviousTrack" |
  "MediaStop" |
  "ModeChange" |
  "NextCandidate" |
  "Nonconvert" |
  "NumLock" |
  "PageDown" |
  "PageUp" |
  "Paste" |
  "Pause" |
  "Play" |
  "Power" |
  "PreviousCandidate" |
  "PrintScreen" |
  "Process" |
  "Props" |
  "Right" |
  "RomanCharacters" |
  "Scroll" |
  "Select" |
  "SelectMedia" |
  "Separator" |
  "Shift" |
  "Soft1" |
  "Soft2" |
  "Soft3" |
  "Soft4" |
  "Stop" |
  "Subtract" |
  "SymbolLock" |
  "Up" |
  "UpLeft" |
  "UpRight" |
  "Undo" |
  "VolumeDown" |
  "VolumeMute" |
  "VolumeUp" |
  "Win" |
  "Zoom" |
  "Backspace" |
  "Tab" |
  "Cancel" |
  "Esc" |
  "Spacebar" |
  "Del" |
  "DeadGrave" |
  "DeadEacute" |
  "DeadCircumflex" |
  "DeadTilde" |
  "DeadMacron" |
  "DeadBreve" |
  "DeadAboveDot" |
  "DeadUmlaut" |
  "DeadAboveRing" |
  "DeadDoubleacute" |
  "DeadCaron" |
  "DeadCedilla" |
  "DeadOgonek" |
  "DeadIota" |
  "DeadVoicedSound" |
  "DeadSemivoicedSound" |
  "Unidentified";

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

/* istanbul ignore next */
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

/* istanbul ignore next */
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

/* istanbul ignore next */
/**
 * getMouseButtons retrieves a `buttons` property from a MouseEvent with a fallback implementation for Safari.
 *
 * #quirks
 *
 * @param ev Mouse event.
 * @returns MouseEvent `buttons` value.
 */
export const getMouseButtons = (__IVI_TARGET__ === "electron" || MOUSE_EVENT_BUTTONS) ?
  (ev: MouseEvent) => ev.buttons :
  (ev: MouseEvent) => {
    const button = ev.button;
    const r = 1 << button;
    if ((r & (2 | 4)) !== 0) {
      return button << (((r >> 2) ^ 1) << 1);
    }
    return r;
  };
