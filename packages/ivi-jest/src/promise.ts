/**
 * usePromiseQueue adds support for waiting until promise tasks are executed.
 */
export function usePromiseQueue() {
  return {
    wait: () => Promise.resolve(),
  };
}
