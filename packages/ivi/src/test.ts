import { findDOMNode } from "./dom.js";
import { RootDescriptor, SNode, SRoot, VAny, VRoot } from "./index.js";
import {
  Flags,
  RENDER_CONTEXT,
  createSNode,
  dirtyCheck,
  mount,
  update,
  unmount,
} from "./index.js";

const TEST_ROOT_DESCRIPTOR: RootDescriptor<TestRoot> = {
  f: Flags.Root,
  p1: (root) => { root.s._invalidate(); },
  p2: null,
};

export class TestRoot {
  _root: SRoot;
  _isDirty: boolean;

  get root() { return this._root; }
  get isDirty() { return this._isDirty; }

  constructor() {
    this._root = null!;
    this._isDirty = false;
  }

  findDOMNode<T extends Node>(): T | null {
    return findDOMNode<T>(this._root.c as SNode | null);
  }

  update(v: VAny, forceUpdate: boolean = false) {
    const root = this._root;
    const domSlot = root.v.p;
    RENDER_CONTEXT.p = domSlot.p;
    RENDER_CONTEXT.n = domSlot.n;
    root.f = Flags.Root;
    root.c = (
      (root.c === null)
        ? mount(
          root,
          v,
        )
        : update(
          root,
          root.c as SNode,
          v,
          forceUpdate === true
            ? Flags.ForceUpdate
            : 0,
        )
    );

  }

  dirtyCheck() {
    const root = this._root;
    const domSlot = root.v.p;
    RENDER_CONTEXT.p = domSlot.p;
    RENDER_CONTEXT.n = domSlot.n;
    dirtyCheck(root.c as SNode, 0);
    root.f = Flags.Root;
  }

  dispose() {
    const root = this._root;
    if (root.c !== null) {
      RENDER_CONTEXT.p = root.v.p.p;
      unmount(root.c as SNode, true);
    }
  }

  _invalidate() {
    this._isDirty = true;
  }
}

export const createRoot = (
  parentElement: Element = document.body,
  nextNode: Node | null = null,
) => {
  const testRoot = new TestRoot();
  const sNode = createSNode<VRoot, TestRoot>(
    Flags.Root,
    {
      d: TEST_ROOT_DESCRIPTOR,
      p: {
        p: parentElement,
        n: nextNode,
      },
    },
    null,
    testRoot,
    null,
  );
  testRoot._root = sNode;
  return testRoot;
};
