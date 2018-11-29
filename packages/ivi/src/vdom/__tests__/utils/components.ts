import { Op, component, statelessComponent } from "ivi";

export const Stateful = component<Op>(() => (child) => child);
export const Stateless = statelessComponent<Op>((child) => child);
export const Static = statelessComponent<Op>((child) => child, () => false);
