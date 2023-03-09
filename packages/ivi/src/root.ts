import type { RootDescriptor, SRoot, VAny } from "./index.js";
import { Flags, createSNode, dirtyCheck, update, unmount } from "./index.js";

const RESOLVED_PROMISE = Promise.resolve();
const ROOT_DESCRIPTOR: RootDescriptor = {
  f: Flags.Root,
  p1: (root: SRoot) => {
    RESOLVED_PROMISE.then(() => {
      root.f = Flags.Root;
      dirtyCheck(root.v.p.p, root.s, 0);
    });
  },
  p2: null,
};

export const createRoot = (p: Element, n: Node | null = null): SRoot => (
  createSNode(
    Flags.Root,
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
  root.f = Flags.Root;
  root.s = update(root, root.v.p.p, root.s, v, 0);
};

export const disposeRoot = (root: SRoot, detach: boolean) => {
  unmount(root.v.p.p, root.s, detach);
};
