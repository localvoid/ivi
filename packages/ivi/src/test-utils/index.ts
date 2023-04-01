import {
  type Root, type VAny,
  defineRoot, dirtyCheck, unmount, hydrate, findDOMNode, update,
} from "../index.js";

export class TestRoot {
  _root: Root;
  _isDirty: boolean;

  get root() { return this._root; }
  get isDirty() { return this._isDirty; }

  constructor() {
    this._root = null!;
    this._isDirty = false;
  }

  findDOMNode<T extends Node>(): T | null {
    return findDOMNode<T>(this._root);
  }

  update(v: VAny, forceUpdate?: boolean) {
    update(this._root, v, forceUpdate);
  }

  dirtyCheck(forceUpdate?: boolean) {
    dirtyCheck(this._root, forceUpdate);
  }

  dispose() {
    unmount(this._root, true);
  }

  hydrate(v: VAny) {
    hydrate(this._root, v);
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
  const root = _createRoot(parentElement, nextNode, testRoot);
  testRoot._root = root;
  return testRoot;
};

const _createRoot = defineRoot<TestRoot>(
  (root, state) => { state._invalidate(); },
);
