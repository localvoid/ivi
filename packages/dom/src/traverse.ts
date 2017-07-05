/**
 * nodeDepth traverses the DOM to the top and calculates DOM Node depth.
 *
 * @param node DOM Node.
 * @returns DOM Node depth.
 */
export function nodeDepth(node: Node | null): number {
    let depth = 0;
    while (node !== null) {
        depth++;
        node = node.parentNode;
    }
    return depth;
}

/**
 * firstLeaf finds a first leaf node.
 *
 * @param node DOM Node.
 * @return A leaf node.
 */
export function firstLeaf(node: Node): Node {
    while (node !== null) {
        const next = node.firstChild;
        if (next === null) {
            break;
        } else {
            node = next;
        }
    }
    return node;
}

/**
 * nextSibling finds a next sibling node.
 *
 * @param node DOM Node.
 * @return Next sibling.
 */
export function nextSibling(node: Node | null): Node | null {
    while (node !== null) {
        if (node.nextSibling !== null) {
            return node.nextSibling;
        }
        node = node.parentNode;
    }
    return null;
}
