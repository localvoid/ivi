import { OpNode, component } from "ivi";

export const Stateful = component<OpNode>(() => (child) => child);
export const Static = component<OpNode>(() => (child) => child, () => false);
