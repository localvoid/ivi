import { Op, key, TrackByKey, Key, OpNode } from "./operations";
import { Component } from "./component";
import { component } from "./factories";
import { useSelect, useUnmount } from "./hooks";

export interface Portal {
  children: OpNode<Key<number, Op>[]>;
  root: Op;
}

function replaceChild(p: Portal, child: Key<number, Op>) {
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
  if (i < children.length) {
    newChildren[i] = child;
  } else {
    newChildren.push(child);
  }
  p.children = TrackByKey(newChildren);
}

function removeChild(p: Portal, child: Key<number, Op>) {
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
  newChildren.splice(i, 1);
  p.children = TrackByKey(newChildren);
}

const defaultPortal = (children: Op) => children;

const empty = TrackByKey<number>([]);

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
  const id = _nextId++;
  let prev: Key<number, Op> | undefined;
  let unmount = false;
  return (op: Op) => {
    if (prev === void 0 || prev.v !== op) {
      if (op !== null) {
        replaceChild(p, prev = key(id, op));
        if (unmount === false) {
          unmount = true;
          useUnmount(c, () => {
            if (prev !== void 0) {
              removeChild(p, prev);
            }
          });
        }
      } else if (prev !== void 0) {
        removeChild(p, prev);
        prev = void 0;
      }
    }
  };
}
