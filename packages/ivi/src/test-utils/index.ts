import {
  type Root, type VAny,
  defineRoot, dirtyCheck, unmount, findDOMNode, update,
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
    this._isDirty = false;
  }

  dirtyCheck(forceUpdate?: boolean) {
    dirtyCheck(this._root, forceUpdate);
    this._isDirty = false;
  }

  dispose() {
    unmount(this._root, true);
    this._isDirty = false;
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
