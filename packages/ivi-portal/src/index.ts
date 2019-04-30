import {
  Op, key, TrackByKey, Key, SetContextState, TrackByKeyOp, component, getContext, useSelect, useUnmount, UnmountToken,
  UNMOUNT_TOKEN,

} from "ivi";

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
  trackByOp: TrackByKeyOp,
  prev: Key<number, Op> | undefined,
  next: Key<number, Op> | undefined,
) {
  const nextChildren = trackByOp.v.slice();
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
      let prevOp: Op | undefined;
      let prevKey: Key<number, Op> | undefined;
      const id = nextId++;
      const h = (p: UnmountToken | Op): null | void => {
        if (p !== UNMOUNT_TOKEN) {
          if (prevOp === void 0 || prevOp !== p as Op) {
            const ctx = getContext();
            prevOp = p as Op;
            children = updateChildren(
              children,
              prevKey,
              prevKey = key(id, ctx === null ? p as Op : SetContextState(ctx, p as Op)),
            );
          }
          return null;
        }

        children = updateChildren(children, prevKey!, void 0);
      };
      useUnmount(c, h as (token: UnmountToken) => void);
      return h as (p: Op) => Op;
    }),
  };
};
