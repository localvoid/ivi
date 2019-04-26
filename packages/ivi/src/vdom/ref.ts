import { Box, UNMOUNT_TOKEN } from "../core";
import { Op } from "./operations";
import { OpState } from "./state";
import { component } from "./factories";
import { useUnmount } from "./hooks";

export interface RefProps {
  readonly r: Box<OpState | null>;
  readonly c: Op;
}

function updateRef(prev: Box<OpState | null> | undefined, next: Box<OpState | null>, s: OpState): Box<OpState | null> {
  if (prev !== void 0 && prev !== next) {
    prev.v = null;
  }
  next.v = s;
  return next;
}

const _Ref = component<RefProps>((s) => {
  let _ref: Box<OpState | null>;
  const h = (p: {} | RefProps) => (
    (p === UNMOUNT_TOKEN) ? (_ref.v = null, void 0) : (_ref = updateRef(_ref, (p as RefProps).r, s), (p as RefProps).c)
  );
  useUnmount(s, h as () => void);
  return h as (p: { r: Box<OpState | null>, c: Op }) => Op;
});

/**
 * Ref creates a component that captures internal state into a boxed value.
 *
 * @param r Boxed value.
 * @param c Children operations.
 * @returns Ref node.
 */
export const Ref = (r: Box<OpState | null>, c: Op) => _Ref({ r, c });
