import { Op, key, TrackByKey, Key, OpNode, ContextData, Context, context, component, useSelect, useUnmount } from "ivi";

/**
 * Portal.
 */
export interface Portal {
  /**
   * Root Node.
   */
  readonly root: Op;
  /**
   * Portal Entry.
   */
  readonly entry: (children: Op) => Op;
}

/**
 * updateChildren updates and returns a new portal children list.
 *
 * @param trackByOp TrackBy operation.
 * @param prev Previous child operation.
 * @param next Next child operation.
 * @returns TrackBy operation.
 */
function updateChildren(
  trackByOp: OpNode<Key<number, Op>[]>,
  prev: Key<number, Op> | null,
  next: Key<number, Op> | null,
) {
  const nextChildren = trackByOp.d.slice();
  if (prev === null) {
    nextChildren.push(next!);
  } else {
    const idx = nextChildren.indexOf(prev);
    if (next === null) {
      nextChildren.splice(idx, 1);
    } else if (idx === -1) {
      nextChildren.push(next);
    } else {
      nextChildren[idx] = next;
    }
  }
  return TrackByKey(nextChildren);
}

const defaultPortal = (children: Op) => children;

const empty = TrackByKey<number>([]);
let _nextId = 0;

/**
 * portal creates a portal.
 *
 * @param inner Inner component.
 * @returns Portal.
 */
export const portal = (inner: (children: Op) => Op = defaultPortal) => {
  let children = empty;
  return {
    root: component((c) => {
      const getChildren = useSelect<Op>(c, () => children);
      return () => inner(getChildren());
    })(),
    entry: component<Op>((c) => {
      const getContext = useSelect(c, context);
      const id = _nextId++;
      let prev: Key<number, OpNode<ContextData>> | null = null;
      useUnmount(c, () => {
        if (prev !== null) {
          children = updateChildren(children, prev, null);
        }
      });

      return (op: Op) => {
        if (op === null) {
          if (prev !== null) {
            children = updateChildren(children, prev, null);
            prev = null;
          }
        } else if (prev === null || prev.v.d.c !== op) {
          children = updateChildren(children, prev, prev = key(id, Context(getContext(), op)));
        }
        return null;
      };
    }),
  };
};
