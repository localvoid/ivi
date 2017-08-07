import { VNode, render, update } from "ivi";
import { triggerNextTick, triggerNextFrame } from "./scheduler";
import { reset } from "./reset";
import { VNodeWrapper } from "./vdom";

let _container: HTMLDivElement | null = null;

export class DOMRenderer {
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.container = container;
  }

  render(vnode: VNode<any>): VNodeWrapper {
    render(vnode, this.container);
    return new VNodeWrapper(vnode, null, {});
  }

  update(): void {
    update();
  }

  nextTick(): void {
    triggerNextTick();
  }

  nextFrame(time?: number): void {
    triggerNextFrame(time);
  }
}

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
