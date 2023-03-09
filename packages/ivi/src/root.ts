import type { RootDescriptor, SNode, SRoot, VAny } from "./index.js";
import {
  Flags,
  RENDER_CONTEXT,
  createSNode,
  dirtyCheck,
  mount,
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
      root.f = Flags.Root;
      dirtyCheck(root.v.p.p, root.s, 0);
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
 * @returns {@link SRoot} instance.
 */
export const createRoot = (p: Element, n: Node | null = null): SRoot<null> => (
  createSNode(
    // SRoot node should always have a `Flags.Root` flag.
    Flags.Root,
    // VNode object
    {
      // VNode descriptor should be initialized with `RootDescriptor`
      d: ROOT_DESCRIPTOR,
      // VNode props object contains the location in the DOM tree where subtree
      // should be rendered.
      p: {
        // Parent DOM Element
        p,
        // Next DOM Node
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
 * Updates UI subtree.
 *
 * @param root {@link SRoot} instance.
 * @param v UI representation.
 * @param forceUpdate Forces update for all components in the subtree.
 */
export const updateRoot = (
  root: SRoot<null>,
  v: VAny,
  forceUpdate: boolean,
) => {
  //
  var domSlot = root.v.p;
  // Assign next node to the current render context.
  RENDER_CONTEXT.n = domSlot.n;
  // Flags should always be reassigned on update to clear dirty flags.
  root.f = Flags.Root;
  root.c = (
    (root.c === null)
      ? mount(
        // Parent SNode should always be a root node.
        root,
        // Parent Element
        domSlot.p,
        // UI Representation
        v,
      )
      : update(
        // Parent SNode should always be a root node.
        root,
        // Parent Element
        domSlot.p,
        // Previous UI state
        root.c as SNode,
        // UI Representation
        v,
        // Force update
        forceUpdate === true
          ? Flags.ForceUpdate
          : 0,
      )
  );
};

/**
 * Disposed UI subtree and triggers all unmount hooks.
 *
 * @param root {@link SRoot} instance.
 * @param detach Detach root nodes from the DOM.
 */
export const disposeRoot = (root: SRoot<null>, detach: boolean) => {
  if (root.c !== null) {
    unmount(
      // Parent Element.
      root.v.p.p,
      // Previous UI state.
      root.c as SNode,
      // Detach root nodes.
      detach,
    );
  }
};
