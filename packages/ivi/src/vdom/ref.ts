import { Box } from "../core";
import { Op } from "./operations";
import { OpState } from "./state";
import { component } from "./factories";
import { useUnmount } from "./hooks";

function updateRef(prev: Box<OpState | null> | undefined, next: Box<OpState | null>, s: OpState): Box<OpState | null> {
  if (prev !== void 0 && prev !== next) {
    prev.v = null;
  }
  next.v = s;
  return next;
}

const _Ref = component<{ r: Box<OpState | null>, c: Op }>((s) => {
  let _ref: Box<OpState | null>;
  const h = (p: true | { r: Box<OpState | null>, c: Op }) => (
    (p === true) ? (_ref.v = null, void 0) : (_ref = updateRef(_ref, p.r, s), p.c)
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
