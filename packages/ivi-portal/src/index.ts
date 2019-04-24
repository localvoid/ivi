import { Op, key, TrackByKey, Key, OpNode, component, useSelect, useUnmount } from "ivi";
import { SetContextState } from "packages/ivi/src/vdom/operations";
import { getContext } from "packages/ivi/src/vdom/context";

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

const defaultPortalDecorator = (children: Op) => children;
const EMPTY = TrackByKey<number>([]);
let nextId = 0;

/**
 * portal creates a portal.
 *
 * @param rootDecorator Root decorator.
 * @returns Portal.
 */
export const portal = (rootDecorator: (children: Op) => Op = defaultPortalDecorator) => {
  let children = EMPTY;
  return {
    root: component((c) => {
      const getChildren = useSelect<Op>(c, () => children);
      return () => rootDecorator(getChildren());
    })(),
    entry: component<Op>((c) => {
      const id = nextId++;
      let prevOp: Op | undefined;
      let prevKey: Key<number, Op> | undefined;
      useUnmount(c, () => { children = updateChildren(children, prevKey!, void 0); });
      return (op: Op) => {
        if (prevOp === void 0 || prevOp !== op) {
          const ctx = getContext();
          prevOp = op;
          children = updateChildren(
            children,
            prevKey,
            prevKey = key(id, ctx === null ? op : SetContextState(ctx, op)),
          );
        }
        return null;
      };
    }),
  };
};
