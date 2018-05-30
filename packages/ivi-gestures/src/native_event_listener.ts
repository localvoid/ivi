export const enum NativeEventListenerFlags {
  TrackMove = 1,
  PreventDefault = 1 << 1,
}

export interface NativeEventListener {
  activate(): void;
  deactivate(): void;
  set(flags: NativeEventListenerFlags): void;
  clear(flags: NativeEventListenerFlags): void;
}
