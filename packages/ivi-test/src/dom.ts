import { VNode, render, update, setupScheduler, BASIC_SCHEDULER } from "ivi";
import { triggerNextTick, triggerNextFrame } from "ivi-test-scheduler";
import { VNodeWrapper } from "./vdom";

/**
 * DOMRenderer is a helper object for testing Virtual DOM in a real DOM.
 */
export class DOMRenderer {
  constructor(private container: HTMLDivElement) {
    setupScheduler(BASIC_SCHEDULER);
  }

  /**
   * reset resets current state.
   */
  reset = () => {
    render(null, this.container);
  }

  /**
   * render renders a VNode in a test container and returns a VNodeWrapper object.
   *
   * @param vnode VNode.
   * @returns VNodeWrapper object.
   */
  render(vnode: VNode): VNodeWrapper {
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
   * nextFrame triggers next frame in a scheduler and executes all frame updates.
   *
   * @param time Current time.
   */
  nextFrame(time?: number): void {
    triggerNextFrame(time);
  }
}

/**
 * createDOMRenderer instantiates and initializes DOMRenderer object.
 *
 * @returns DOMRenderer.
 */
export function createDOMRenderer(): DOMRenderer {
  const container = document.createElement("div");
  container.className = "ivi-test-container";
  document.body.appendChild(container);

  return new DOMRenderer(container);
}
