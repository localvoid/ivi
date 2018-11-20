import { OpNode } from "./operations";

/**
 * ElementProtoDescriptor is a descriptor for an element prototype.
 *
 * @example
 *
 *     const DivWithIdAttribute = element(div(_, { id: "predefined-id" }));
 *
 *     render(
 *       DivWithIdAttribute("class-name", { title: "Title" }, "Hello World"),
 *       document.getElementById("app")!,
 *     );
 */
export interface ElementProtoDescriptor {
  /**
   * DOM Node that will be cloned.
   */
  node: Node | null;
  /**
   * Operation that were used to create a DOM Node.
   */
  readonly proto: OpNode;
}
