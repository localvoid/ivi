export function rAF(cb: (time?: number) => void): void {
  requestAnimationFrame(cb);
}

export function sMT(cb: () => void): void {
  Promise.resolve().then(cb);
}
