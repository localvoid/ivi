import { checkNestingViolations } from "../debug/html_nesting_rules";
import { Op } from "./operations";
import { OpState } from "./state";
import { _mount, _update, _unmount, _dirtyCheck, _resetState } from "./reconciler";

/**
 * Root.
 */
export interface Root {
  /**
   * Container element.
   */
  container: Element | null;
  /**
   * Current state.
   */
  state: OpState | null;
  /**
   * Next operation.
   */
  next: Op | undefined;
}

export type Portal = Root;

export const createPortal = (): Portal => ({ container: null, state: null, next: void 0 });

/**
 * Root nodes.
 */
export const ROOTS = [] as Root[];

/**
 * Portals.
 */
export const PORTALS = [] as Root[];

/**
 * Find root node of a container.
 *
 * @param predicate - Find predicate.
 * @returns root node or undefined when root node doesn't exist.
 */
export const findRoot = (predicate: (root: Root) => boolean) => PORTALS.find(predicate) || ROOTS.find(predicate);

export function forEachRoot(fn: (root: Root) => void) {
  ROOTS.forEach(fn);
  PORTALS.forEach(fn);
}
/**
 * Performs a dirty checking.
 */
export function dirtyCheck() {
  forEachRoot((root) => {
    const { container, state, next } = root;
    _resetState();
    if (next !== void 0) {
      root.next = void 0;
      root.state = _update(container!, state, next, false, true);
    } else if (state !== null) {
      _dirtyCheck(container!, state, false, true);
    }

    /* istanbul ignore else */
    if (DEBUG) {
      if (root.state) {
        checkNestingViolations(container!, root.state);
      }
    }
  });
}

export function mountPortal(portal: Portal, container: Element): void {
  portal.container = container;
  PORTALS.push(portal);
}
