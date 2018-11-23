import { OpNode, component, statelessComponent } from "ivi";

export const Stateful = component<OpNode>(() => (child) => child);
export const Static = statelessComponent<OpNode>((child) => child, () => false);
