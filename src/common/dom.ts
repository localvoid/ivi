/**
 * Miscellaneous DOM related stuff.
 */

export const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
export const XLINK_NAMESPACE = "http://www.w3.org/1999/xlink";
export const XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";

/**
 * Traverses the DOM to the top and calculates DOM Node depth.
 *
 * @param node DOM Node.
 * @returns DOM Node depth.
 */
export function nodeDepth(node: Node | null): number {
    let depth = 0;
    while (node) {
        depth++;
        node = node.parentNode;
    }
    return depth;
}
