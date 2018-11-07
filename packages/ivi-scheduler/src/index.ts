export const rAF = requestAnimationFrame;
export const sMT = (fn: () => void) => { Promise.resolve().then(fn); };
