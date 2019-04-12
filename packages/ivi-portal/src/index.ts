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
  prev: Key<number, Op> | undefined,
  next: Key<number, Op> | undefined,
) {
  const nextChildren = trackByOp.d.slice();
  if (prev === void 0) {
    nextChildren.push(next!);
  } else {
    const idx = nextChildren.indexOf(prev);
    if (next === void 0) {
      nextChildren.splice(idx, 1);
    } else {
      nextChildren[idx] = next;
    }
  }
  return TrackByKey(nextChildren);
}

const defaultPortal = (children: Op) => children;
const EMPTY = TrackByKey<number>([]);
let nextId = 0;

/**
 * portal creates a portal.
 *
 * @param inner Inner component.
 * @returns Portal.
 */
export const portal = (inner: (children: Op) => Op = defaultPortal) => {
  let children = EMPTY;
  return {
    root: component((c) => {
      const getChildren = useSelect<Op>(c, () => children);
      return () => inner(getChildren());
    })(),
    entry: component<Op>((c) => {
      const getContext = useSelect(c, context);
      const id = nextId++;
      let prevCtx: {};
      let prevOp: Key<number, OpNode<ContextData>> | undefined;
      useUnmount(c, () => { children = updateChildren(children, prevOp!, void 0); });
      return (op: Op) => {
        const ctx = getContext();
        if (prevOp === void 0 || prevOp.v.d.c !== op || prevCtx !== ctx) {
          children = updateChildren(children, prevOp, prevOp = key(id, Context(prevCtx = ctx, op)));
        }
        return null;
      };
    }),
  };
};
