import { VNode, render, update } from "ivi";
import { triggerNextTick, triggerNextFrame } from "./scheduler";
import { reset } from "./reset";
import { VNodeWrapper } from "./vdom";

let _container: HTMLDivElement | null = null;

/**
 * DOMRenderer is a helper object for testing Virtual DOM in a real DOM.
 */
export class DOMRenderer {
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
  }

  /**
   * render renders a VNode in a test container and returns a VNodeWrapper object.
   *
   * @param vnode VNode.
   * @returns VNodeWrapper object.
   */
  render(vnode: VNode<any>): VNodeWrapper {
    render(vnode, this.container);
    return new VNodeWrapper(vnode, null, {});
  }

  /**
   * update triggers update in a scheduler.
   */
  update(): void {
    update();
  }

  /**
   * nextTick triggers next tick in a scheduler and execute all microtasks, tasks and frame updates.
   */
  nextTick(): void {
    triggerNextTick();
  }

  /**
   * nextFrame triggers next frame in a scheduler and executal all frame updates.
   *
   * @param time Current time.
   */
  nextFrame(time?: number): void {
    triggerNextFrame(time);
  }
}

/**
 * initDOMRenderer instantiates and initializes DOMRenderer object.
 *
 * @returns DOMRenderer.
 */
export function initDOMRenderer(): DOMRenderer {
  if (_container === null) {
    _container = document.createElement("div");
    _container.className = "ivi-dom-test-container";
    document.body.appendChild(_container);
  } else {
    _container.innerText = "";
  }

  reset();

  return new DOMRenderer(_container);
}
