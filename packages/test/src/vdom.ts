import { Context, VNode, VNodeFlags, Component, ComponentClass, StatelessComponent, ConnectDescriptor } from "ivi";
import { containsClassName, matchProperties } from "./utils";

const VNodeLooseMatchFlags = 0
  | VNodeFlags.Text
  | VNodeFlags.Element
  | VNodeFlags.ComponentFunction
  | VNodeFlags.ComponentClass
  | VNodeFlags.InputElement
  | VNodeFlags.TextAreaElement
  | VNodeFlags.MediaElement
  | VNodeFlags.SvgElement
  | VNodeFlags.Connect
  | VNodeFlags.UpdateContext
  | VNodeFlags.KeepAlive
  | VNodeFlags.VoidElement;

export function isVNodeLooseMatch(a: VNode<any>, b: VNode<any>): boolean {
  const bFlags = b._flags;
  if (((a._flags ^ bFlags) & VNodeLooseMatchFlags) !== 0) {
    return false;
  }

  if (a._tag !== b._tag) {
    return false;
  }

  if ((bFlags & VNodeFlags.Element) !== 0) {
    if (b._props !== null) {
      if (a._props === null) {
        return false;
      }

      if (matchProperties(a._props.attrs, b._props.attrs) === false) {
        return false;
      }
      if (matchProperties(a._props.syle, b._props.style) === false) {
        return false;
      }

    }
  }
  return true;
}

export function visitUnwrapped(
  vnode: VNode<any>,
  parent: VNode<any> | null,
  context: Context,
  visitor: (vnode: VNode<any>, parent: VNode<any> | null, context: Context) => boolean,
): boolean {
  if (visitor(vnode, parent, context) === true) {
    return true;
  }

  const flags = vnode._flags;
  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray | VNodeFlags.Component)) !== 0) {
    let children = vnode._children;
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode<any>[];
        for (let i = 0; i < children.length; i++) {
          if (visitUnwrapped(children[i], vnode, context, visitor) === true) {
            return true;
          }
        }
      } else {
        return visitUnwrapped(children as VNode<any>, vnode, context, visitor);
      }
    } else {
      if ((flags & VNodeFlags.UpdateContext) !== 0) {
        context = Object.assign({}, context, vnode._props);
      }
      if (children !== null) {
        return visitUnwrapped(children as VNode<any>, vnode, context, visitor);
      }
    }
  }

  return false;
}

export function visitWrapped(
  wrapper: VNodeWrapper,
  visitor: (wrapper: VNodeWrapper) => boolean,
): boolean {
  if (visitor(wrapper) === true) {
    return true;
  }

  const vnode = wrapper.vnode;
  const flags = vnode._flags;
  if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray | VNodeFlags.Component)) !== 0) {
    let context = wrapper.context;
    let children = vnode._children;
    if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      if ((flags & VNodeFlags.ChildrenArray) !== 0) {
        children = children as VNode<any>[];
        for (let i = 0; i < children.length; i++) {
          if (visitWrapped(new VNodeWrapper(children[i], wrapper, context), visitor) === true) {
            return true;
          }
        }
      } else {
        return visitWrapped(new VNodeWrapper(children as VNode<any>, wrapper, context), visitor);
      }
    } else {
      if ((flags & VNodeFlags.UpdateContext) !== 0) {
        context = Object.assign({}, context, vnode._props);
      }
      if (children !== null) {
        return visitWrapped(new VNodeWrapper(children as VNode<any>, wrapper, context), visitor);
      }
    }
  }

  return false;
}

function _virtualRender(depth: number, vnode: VNode<any>, parent: VNode<any> | null, context: Context): boolean {
  const flags = vnode._flags;
  if ((flags & (VNodeFlags.ComponentClass | VNodeFlags.ComponentFunction | VNodeFlags.Connect)) !== 0) {
    if ((flags & (VNodeFlags.ComponentClass | VNodeFlags.ComponentFunction)) !== 0) {
      if ((flags & VNodeFlags.ComponentClass) !== 0) {
        const component = vnode._instance = new (vnode._tag as ComponentClass<any>)(vnode._props);
        vnode._children = component.render();
      } else {
        const component = vnode._tag as StatelessComponent<any>;
        vnode._children = component(vnode._props);
      }
    } else {
      const connect = vnode._tag as ConnectDescriptor<any, any, any>;
      const next = vnode._instance = connect.select(null, vnode._props, context);
      vnode._children = connect.render(next);
    }
    if (depth > 1) {
      return _virtualRender(depth - 1, vnode._children, vnode, context);
    }
  }
  return false;
}

export function virtualRender(
  root: VNode<any>,
  rootContext: Context = {},
  depth = 1,
): void {
  visitUnwrapped(root, null, rootContext,
    function (vnode: VNode<any>, parent: VNode<any> | null, context: Context) {
      return _virtualRender(depth, vnode, parent, context);
    },
  );
}

export class VNodeListWrapper {
  readonly items: VNodeWrapper[];

  constructor(items: VNodeWrapper[]) {
    this.items = items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  map<P>(fn: (n: VNodeWrapper, i: number) => P): P[] {
    return this.items.map((n, i) => fn(n, i));
  }

  slice(begin?: number, end?: number): VNodeListWrapper {
    return new VNodeListWrapper(this.items.slice(begin, end));
  }

  at(index: number): VNodeWrapper {
    return this.items[index];
  }

  first(): VNodeWrapper {
    return this.items[0];
  }

  last(): VNodeWrapper {
    return this.items[this.items.length - 1];
  }
}

export class VNodeWrapper {
  readonly vnode: VNode<any>;
  readonly parent: VNodeWrapper | null;
  readonly context: Context;

  constructor(vnode: VNode<any>, parent: VNodeWrapper | null, context: Context) {
    this.vnode = vnode;
    this.parent = parent;
    this.context = context;
  }

  isText(): boolean {
    return (this.vnode._flags & VNodeFlags.Text) !== 0;
  }

  isElement(): boolean {
    return (this.vnode._flags & VNodeFlags.Element) !== 0;
  }

  isComponent(): boolean {
    return (this.vnode._flags & VNodeFlags.Component) !== 0;
  }

  isStatefulComponent(): boolean {
    return (this.vnode._flags & VNodeFlags.ComponentClass) !== 0;
  }

  isStatelessComponent(): boolean {
    return (this.vnode._flags & VNodeFlags.ComponentFunction) !== 0;
  }

  isContext(): boolean {
    return (this.vnode._flags & VNodeFlags.UpdateContext) !== 0;
  }

  isConnect(): boolean {
    return (this.vnode._flags & VNodeFlags.Connect) !== 0;
  }

  isKeepAlive(): boolean {
    return (this.vnode._flags & VNodeFlags.KeepAlive) !== 0;
  }

  isInputElement(): boolean {
    return (this.vnode._flags & VNodeFlags.InputElement) !== 0;
  }

  getTagName(): string {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getTagName() can only be called on element nodes");
    }
    if (this.isInputElement()) {
      return "input";
    }
    return this.vnode._tag as string;
  }

  getComponentInstance<P extends Component<any>>(): P {
    if (!this.isStatefulComponent()) {
      throw new Error("VNodeWrapper::getComponentInstance() can only be called on stateful components");
    }
    return this.vnode._instance as P;
  }

  hasExplicitKey(): boolean {
    return (this.vnode._flags & VNodeFlags.Key) !== 0;
  }

  getKey(): any {
    if ((this.vnode._flags & VNodeFlags.Key) === 0) {
      return null;
    }
    return this.vnode._key;
  }

  getClassName(): string | null {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getClassName() can only be called on element nodes");
    }
    return this.vnode._className;
  }

  hasClassName(className: string): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasClassName() can only be called on element nodes");
    }
    if (this.vnode._className === null) {
      return false;
    }
    return containsClassName(this.vnode._className, className);
  }

  getElementProps(): any {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getElementProps() can only be called on element nodes");
    }
    return this.vnode._props.attrs;
  }

  getElementStyle(): any {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getElementProps() can only be called on element nodes");
    }
    return this.vnode._props.style;
  }
}
