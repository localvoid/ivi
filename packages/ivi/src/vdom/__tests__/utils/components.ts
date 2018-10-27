import { VNode, component, statefulComponent, withShouldUpdate } from "ivi";

export const Stateless = component<VNode>(child => child);
export const Stateful = statefulComponent<VNode>((h) => (child) => child);
export const Static = component<VNode>(child => child, withShouldUpdate(() => false));
