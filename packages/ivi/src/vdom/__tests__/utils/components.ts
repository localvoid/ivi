import { OpChildren, component, statelessComponent } from "ivi";

export const Stateful = component<OpChildren>(() => (child) => child);
export const Stateless = statelessComponent<OpChildren>((child) => child);
export const Static = statelessComponent<OpChildren>((child) => child, () => false);
