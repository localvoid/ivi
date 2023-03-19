import type { RootDescriptor, SRoot, VAny } from "./index.js";
import { Flags, createSNode, dirtyCheck, update, unmount } from "./index.js";

const _queueMicrotask = queueMicrotask;

const ROOT_DESCRIPTOR: RootDescriptor = {
  // Root Descriptor should always have a `Flags.Root` flag.
  f: Flags.Root,
  // OnRootInvalidated hook
  p1: (root: SRoot) => {
    // Schedules a microtask for dirty checking.
    _queueMicrotask(() => {
      dirtyCheck(root, 0);
    });
  },
  // p2 should always be initialized with `null` value. This propery is
  // initialized so that all `Descriptor` objects will have the same object
  // shape and all call-sites that access Descriptor objects will be in a
  // monorphic state.
  p2: null,
};

/**
 * Creates a new root.
 *
 * @param p Parent DOM Element.
 * @param n Next DOM Element.
 * @returns Root Node.
 */
export const createRoot = (p: Element, n: Node | null = null): SRoot<null> => (
  createSNode(
    // SRoot node should always have a `Flags.Root` flag.
    Flags.Root,
    // VNode object.
    {
      // VNode descriptor should be initialized with `RootDescriptor`
      d: ROOT_DESCRIPTOR,
      // VNode props object contains the location in the DOM tree where subtree
      // should be rendered.
      p: {
        // Parent DOM Element.
        p,
        // Next DOM Node.
        n,
      },
    },
    // Children should always be initialized with `null` value.
    null,
    // State `SRoot<State>` that can be used to store any value.
    null,
    // Parent SNode should always have a `null` value.
    null,
  )
);

/**
 * Updates a root subtree.
 *
 * @param root Root Node.
 * @param next Stateless Node.
 * @param forceUpdate Force update for all components.
 */
export const updateRoot = (
  root: SRoot<null>,
  next: VAny,
  forceUpdate: boolean = false,
): void => {
  update(
    root,
    next,
    forceUpdate === true
      ? Flags.ForceUpdate
      : 0,
  );
};

/**
 * Force update for all components in a root subtree.
 *
 * @param root Root Node.
 */
export const forceUpdateRoot = (root: SRoot<null>): void => {
  dirtyCheck(
    // Parent SNode should always be a root node.
    root,
    // Force update flag.
    Flags.ForceUpdate,
  );
};

/**
 * Disposes a root subtree and triggers all unmount hooks.
 *
 * @param root Root Node.
 * @param detach Detach root nodes from the DOM.
 */
export const disposeRoot = (root: SRoot<null>, detach: boolean): void => {
  // Unmounts a root subtree.
  unmount(
    // Root node.
    root,
    // Detach DOM nodes.
    detach,
  );
};
