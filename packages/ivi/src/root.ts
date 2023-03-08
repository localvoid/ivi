import type { RootDescriptor, SRoot, VAny } from "./index.js";
import { NodeFlags, createSNode, dirtyCheck, update, unmountSNode } from "./index.js";

const RESOLVED_PROMISE = Promise.resolve();
const ROOT_DESCRIPTOR: RootDescriptor = {
  f: NodeFlags.Root,
  p1: (root: SRoot) => {
    RESOLVED_PROMISE.then(() => {
      root.f = NodeFlags.Root;
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
  root.f = NodeFlags.Root;
  root.s = update(root, root.v.p.p, root.s, v, false);
};

export const disposeRoot = (root: SRoot, detach: boolean) => {
  unmountSNode(root.v.p.p, root.s, detach);
};
