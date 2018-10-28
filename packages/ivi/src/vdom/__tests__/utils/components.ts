import { VNode, component, withShouldUpdate } from "ivi";

export const Stateful = component<VNode>(() => (child) => child);
export const Static = component<VNode>(() => (child) => child, withShouldUpdate(() => false));
