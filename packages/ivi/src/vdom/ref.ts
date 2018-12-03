import { Box } from "ivi-shared";
import { Op } from "./operations";
import { OpState } from "./state";
import { component } from "./factories";
import { useUnmount } from "./hooks";

const _Ref = component<{ ref: Box<OpState | null>, child: Op }>((c) => {
  let _ref: Box<OpState | null>;
  useUnmount(c, () => {
    _ref.v = null;
  });
  return ({ ref, child }) => (_ref = ref, ref.v = c, child);
});
export const Ref = (ref: Box<OpState | null>, child: Op) => _Ref({ ref, child });
