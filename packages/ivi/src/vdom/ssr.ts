import { Context } from "ivi-core";
import { VNode } from "./vnode";

/**
 * Blueprint Node.
 */
export interface BlueprintNode {
  __brand: "ivi-blueprint-node";
}

/**
 * createBlueprint creates a blueprint that can be used to optimize rendering to string.
 *
 * @param node Virtual DOM node.
 * @param context Context.
 * @param blueprint Blueprint that will be reused to reduce memory usage.
 * @returns Blueprint.
 */
export function createBlueprint(node: VNode<any>, context: Context = {}, blueprint?: BlueprintNode): BlueprintNode {
  throw new Error("createBlueprint() function isn't available in browser environment.");
}

/**
 * linkBlueprint links blueprint to a component factory.
 *
 * Linked blueprint will be automatically for rendering components produced from this factory.
 *
 * @param componentFactory Component factory.
 * @param blueprint Blueprint node.
 */
export function linkBlueprint<P>(componentFactory: (props?: P) => VNode<P>, blueprint: BlueprintNode): void {
  throw new Error("linkBlueprint() function isn't available in browser environment.");
}

/**
 * renderToString renders Virtual DOM to string.
 *
 * @param node Virtual DOM.
 * @param context Current context.
 * @param blueprint When blueprint is specified, it will perform diff/patch on blueprint.
 * @returns Virtual DOM in string format.
 */
export function renderToString(
  node: VNode<any>,
  context: Context = {},
  blueprint?: BlueprintNode,
): string {
  throw new Error("renderToString() function isn't available in browser environment.");
}

/**
 * serializeState serializes javascript state into string and performs escaping to prevent from XSS attacks.
 *
 * @param data State.
 * @returns Serialized state.
 */
export function serializeState(data: any): string {
  throw new Error("serializeState() function isn't available in browser environment.");
}
