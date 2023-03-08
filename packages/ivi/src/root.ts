import { createSNode, dirtyCheck, NodeFlags, RootDescriptor, SRoot, VAny } from "./index.js";
import { update, unmount } from "./index.js";

const RESOLVED_PROMISE = Promise.resolve();
const ROOT_DESCRIPTOR: RootDescriptor = {
  f: NodeFlags.Root,
  p1: (root: SRoot) => {
    RESOLVED_PROMISE.then(() => {
      root.f &= NodeFlags.CleanMask;
      dirtyCheck(root.v.p.p, root.s, false);
    });
  },
  p2: null,
};

export const createRoot = (p: Element, n: Node | null = null): SRoot => (
  createSNode(
    NodeFlags.Root,
    {
      d: ROOT_DESCRIPTOR,
      p: { p, n },
    },
    [],
    null,
    null,
  )
);

export const updateRoot = (root: SRoot, v: VAny) => {
  root.f &= NodeFlags.CleanMask;
  root.s = update(root, root.v.p.p, root.s, v, false);
};

export const disposeRoot = (root: SRoot) => {
  unmount(root.v.p.p, root.s);
};
