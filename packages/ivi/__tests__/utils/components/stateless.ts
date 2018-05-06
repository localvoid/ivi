import { VNode } from "../../../src/vdom/vnode";
import { statelessComponent } from "../../../src/vdom/vnode_factories";

export const staticComponent = statelessComponent<VNode>((child) => child, () => false);
