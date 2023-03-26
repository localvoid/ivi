import type { RootDescriptor, SNode, SRoot, VAny, VRoot } from "./index.js";
import { Flags, createSNode, dirtyCheck, update, unmount } from "./index.js";
import { findDOMNode } from "./dom.js";

const TEST_ROOT_DESCRIPTOR: RootDescriptor<TestRoot> = {
  f: Flags.Root,
  p1: (root) => { root.s1._invalidate(); },
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
    update(
      this._root,
      v,
      forceUpdate === true
        ? Flags.ForceUpdate
        : 0,
    );
  }

  dirtyCheck() {
    dirtyCheck(this._root, 0);
  }

  dispose() {
    unmount(this._root, true);
  }

  _invalidate() {
    this._isDirty = true;
  }
}

/**
 * # Unstable API. It may change in the future versions.
 */
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
    null,
    testRoot,
  );
  testRoot._root = sNode;
  return testRoot;
};
