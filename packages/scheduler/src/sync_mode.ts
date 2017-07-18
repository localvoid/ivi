let SYNC_MODE: boolean;

export function setSyncMode(v: boolean): void {
  if (__IVI_DEV__) {
    SYNC_MODE = v;
  }
}

export function isSyncMode(): boolean {
  if (__IVI_DEV__) {
    return SYNC_MODE;
  }
  return false;
}
