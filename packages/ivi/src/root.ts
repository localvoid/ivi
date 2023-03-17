import type { RootDescriptor, SNode, SRoot, VAny } from "./index.js";
import {
  Flags,
  RENDER_CONTEXT,
  createSNode,
  dirtyCheck,
  update,
  unmount,
} from "./index.js";

const _queueMicrotask = queueMicrotask;

const ROOT_DESCRIPTOR: RootDescriptor = {
  // Root Descriptor should always have a `Flags.Root` flag.
  f: Flags.Root,
  // OnRootInvalidated hook
  p1: (root: SRoot) => {
    _queueMicrotask(() => {
      // Retrieves DOM slot from VNode object.
      const domSlot = root.v.p;
      // Assign parent element and next node to the render context.
      RENDER_CONTEXT.p = domSlot.p;
      RENDER_CONTEXT.n = domSlot.n;
      // Updates invalidated components.
      dirtyCheck(root.c as SNode, 0);
      // Flags should always be reassigned to clear dirty flags.
      root.f = Flags.Root;
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
 * @param v Stateless Node.
 * @param forceUpdate Force update for all components.
 */
export const updateRoot = (
  root: SRoot<null>,
  v: VAny,
  forceUpdate: boolean = false,
): void => {
  // Retrieves DOM slot from VNode object.
  const domSlot = root.v.p;
  // Assign parent element and next node to the render context.
  RENDER_CONTEXT.p = domSlot.p;
  RENDER_CONTEXT.n = domSlot.n;
  root.c = update(
    // Parent SNode should always be a root node.
    root,
    // Previous UI state.
    root.c as SNode,
    // UI Representation.
    v,
    // Force update.
    forceUpdate === true
      ? Flags.ForceUpdate
      : 0,
  );
  // Flags should always be reassigned on update to clear dirty flags.
  root.f = Flags.Root;
};

/**
 * Force update for all components in a root subtree.
 *
 * @param root Root Node.
 */
export const forceUpdateRoot = (root: SRoot<null>): void => {
  // Checks if a Root Node has any children.
  if (root.c !== null) {
    update(
      // Parent SNode should always be a root node.
      root,
      // Previous Stateful Node
      root.c as SNode,
      // Previous Stateless Node.
      (root.c as SNode).v,
      // Force update flag.
      Flags.ForceUpdate,
    );
    // Flags should always be reassigned on update to clear dirty flags.
    root.f = Flags.Root;
  }
};

/**
 * Disposes a root subtree and triggers all unmount hooks.
 *
 * @param root Root Node.
 * @param detach Detach root nodes from the DOM.
 */
export const disposeRoot = (root: SRoot<null>, detach: boolean): void => {
  if (root.c !== null) {
    // Clear dirty flags.
    root.f = Flags.Root;
    // Assign parent element to the render context.
    RENDER_CONTEXT.p = root.v.p.p;
    // Unmounts a root subtree.
    unmount(
      // Previous UI state.
      root.c as SNode,
      // Detach root nodes.
      detach,
    );
  }
};
