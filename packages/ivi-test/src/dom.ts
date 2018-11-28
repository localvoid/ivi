import { OpNode, render, requestDirtyCheck, withNextFrame } from "ivi";

/**
 * DOMRenderer is a helper object for testing Virtual DOM in a real DOM.
 */
export class DOMRenderer {
  constructor(private container: HTMLDivElement) { }

  /**
   * reset resets current state.
   */
  reset = () => {
    withNextFrame(() => { render(null, this.container); })();
  }

  /**
   * render renders a VNode in a test container and returns a VNodeWrapper object.
   *
   * @param vnode VNode.
   * @returns Container object.
   */
  render(vnode: OpNode): Element {
    withNextFrame(() => { render(vnode, this.container); })();
    return this.container;
  }

  /**
   * dirtyCheck triggers dirty checking.
   */
  dirtyCheck(): void {
    withNextFrame(() => { requestDirtyCheck(); })();
  }
}

/**
 * createDOMRenderer instantiates and initializes DOMRenderer object.
 *
 * @returns DOMRenderer.
 */
export function createDOMRenderer(): DOMRenderer {
  const container = document.createElement("div");
  container.id = "ivi-test-container";
  document.body.appendChild(container);

  return new DOMRenderer(container);
}
