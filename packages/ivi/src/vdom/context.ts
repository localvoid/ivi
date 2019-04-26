import { createOpType, createOpNode, OpType, ContextOp, Op } from "./operations";
import { NodeFlags } from "./node_flags";

/**
 * Context descriptor.
 */
export interface ContextDescriptor<T = any> {
  /**
   * Retrieves context value.
   */
  get(): T;
  /**
   * Creates a context operation.
   */
  set(value: T, children: Op): ContextOp<T>;
}

/**
 * Context state.
 */
export interface ContextState<T = any> {
  /**
   * Next state.
   */
  readonly n: ContextState | null;
  /**
   * Descriptor.
   */
  readonly d: ContextDescriptor<T>;
  /**
   * Context value.
   */
  v: T;
}

/**
 * Current context.
 */
let n: ContextState | null = null;

/**
 * Used for detecting invalid `ContextDescriptor()` invocations in DEBUG mode.
 */
let contextEnabled = false;

/**
 * Enable checking for invalid `context()` invocations in DEBUG mode.
 */
export function enableContext() {
  contextEnabled = true;
}

/**
 * Disable checking for invalid `context()` invocations in DEBUG mode.
 */
export function disableContext() {
  contextEnabled = false;
}

/**
 * Reset current context.
 */
export function resetContext() {
  n = null;
}

/**
 * pushContext creates a new context state and pushes it to the context stack.
 *
 * @param d Context descriptor.
 * @param v Context value.
 * @returns New {@link ContextState}.
 */
export function pushContext<T = any>(d: ContextDescriptor<T>, v: T): ContextState<T> {
  return n = { n, d, v };
}

/**
 * getContext retrieves current context.
 *
 * @returns current context.
 */
export function getContext(): ContextState | null {
  return n;
}

/**
 * setContext assigns current context.
 *
 * Should be executed before going deeper into context node.
 *
 * @param c Current context.
 */
export function setContext(c: ContextState | null): ContextState | null {
  return n = c;
}

/**
 * contextValue creates a context descriptor.
 *
 * @example
 *
 *     const { set: StoreContext, get: getStore } = contextValue<Store>();
 *     const Component = component((c) => {
 *       const getValue = useSelect(c, () => getStore().value);
 *       return () => getValue();
 *     });
 *     render(
 *       StoreContext(store,
 *         Component(),
 *       ),
 *       container,
 *     );
 *
 * @returns {@link ContextDescriptor}
 */
export function contextValue<T = any>(): ContextDescriptor<T> {
  let type: OpType;
  const d = {
    get: (): T | void => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        if (!contextEnabled) {
          throw Error("Invalid context invocation");
        }
      }

      let next = n;
      while (next !== null) {
        if (next.d === d) {
          return next.v;
        }
        next = next.n;
      }
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== "production") {
        throw Error("Unable to find context value");
      }
    },
    set: (v: T, c: Op) => createOpNode(type, { v, c }),
  };
  type = createOpType(NodeFlags.Context, d as ContextDescriptor<T>);
  return d as ContextDescriptor<T>;
}
