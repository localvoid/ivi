import { context } from "./context";
import { Op, key, TrackByKey, Key, OpNode, Context } from "./operations";
import { Component } from "./component";
import { component } from "./factories";
import { useSelect, useUnmount } from "./hooks";

/**
 * Portal instance.
 */
export interface Portal {
  /**
   * Dynamic list of children nodes.
   */
  children: OpNode<Key<number, Op>[]>;
  /**
   * Root node.
   */
  root: Op;
}

/**
 * updateChildren updates portal children list.
 *
 * @param p Portal.
 * @param isRemove Is remove operation.
 * @param child Child node.
 */
function updateChildren(p: Portal, isRemove: boolean, child: Key<number, Op>) {
  const children = p.children.d;
  const k = child.k;
  let i = 0;
  while (i < children.length) {
    if (children[i].k === k) {
      break;
    }
    ++i;
  }
  const newChildren = p.children.d.slice();
  if (isRemove) {
    newChildren.splice(i, 1);
  } else {
    if (i < children.length) {
      newChildren[i] = child;
    } else {
      newChildren.push(child);
    }
  }
  p.children = TrackByKey(newChildren);
}

const defaultPortal = (children: Op) => children;

const empty = TrackByKey<number>([]);

/**
 * portal creates a portal instance.
 *
 * @param inner Inner component.
 * @returns Portal instance.
 */
export const portal = (inner: (children: Op) => Op = defaultPortal): Portal => {
  const p: Portal = { children: empty, root: null };
  p.root = component((c) => {
    const getChildren = useSelect<Op>(c, () => p.children);
    return () => inner(getChildren());
  })();
  return p;
};

let _nextId = 0;

/**
 * usePortal creates a portal entry.
 *
 * @param c Component state.
 * @param p Portal.
 * @returns Portal entry.
 */
export function usePortal(c: Component, p: Portal) {
  const getContext = useSelect(c, context);
  const id = _nextId++;
  let prev: Key<number, Op> | undefined;
  let unmount = false;

  return (op: Op) => {
    const ctx = getContext();

    if (prev === void 0 || prev.v !== op) {
      if (op !== null) {
        updateChildren(p, false, prev = key(id, Context(ctx, op)));
        if (unmount === false) {
          unmount = true;
          useUnmount(c, () => {
            if (prev !== void 0) {
              updateChildren(p, true, prev);
            }
          });
        }
      } else if (prev !== void 0) {
        updateChildren(p, true, prev);
        prev = void 0;
      }
    }
  };
}
