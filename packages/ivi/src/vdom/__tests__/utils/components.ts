import { OpNode, component, statelessComponent } from "ivi";

export const Stateful = component<OpNode | string | number | null>(() => (child) => child);
export const Stateless = statelessComponent<OpNode | string | number | null>((child) => child);
export const Static = statelessComponent<OpNode | string | number | null>((child) => child, () => false);
