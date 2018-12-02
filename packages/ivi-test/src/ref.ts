import { Op, OpState, component, Box } from "ivi";

const _Ref = component<{ ref: Box<OpState | null>, child: Op }>((c) => ({ ref, child }) => (ref.v = c, child));
export const Ref = (ref: Box<OpState | null>, child: Op) => _Ref({ ref, child });
