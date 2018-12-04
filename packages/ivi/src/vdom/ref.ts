import { Box } from "ivi-shared";
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
  useUnmount(s, () => { _ref.v = null; });
  return ({ r, c }) => (_ref = updateRef(_ref, r, s), c);
});

/**
 * Ref creates a component that captures internal state into a boxed value.
 *
 * @param r Boxed value.
 * @param c Children operations.
 * @returns Ref node.
 */
export const Ref = (r: Box<OpState | null>, c: Op) => _Ref({ r, c });
