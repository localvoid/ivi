import { CSSStyleProps, shallowEqual, Predicate } from "ivi-core";
import {
  VNode, VNodeFlags, Component, StatefulComponent, StatelessComponent, ConnectDescriptor, EventDispatcher,
} from "ivi";
import { containsClassName, containsEventHandler, matchValues, matchKeys } from "./utils";
import { VNodeMatcher, query, queryAll, closest } from "./query";
import { SnapshotOptions, toSnapshot } from "./snapshot";

export function visitUnwrapped(
  vnode: VNode,
  parent: VNode | null,
  context: {},
  visitor: (vnode: VNode, parent: VNode | null, context: {}) => boolean,
): boolean {
  if (visitor(vnode, parent, context) === true) {
    return true;
  }

  const flags = vnode._f;
  if ((flags & (
    VNodeFlags.ChildrenVNode |
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) !== 0) {
    const children = vnode._c;
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = children as VNode;
      while (child !== null) {
        if (visitUnwrapped(child, vnode, context, visitor)) {
          return true;
        }
        child = child._r;
      }
    } else {
      if ((flags & VNodeFlags.UpdateContext) !== 0) {
        context = { ...context, ...vnode._p };
      }
      if (children !== null) {
        return visitUnwrapped(children as VNode, vnode, context, visitor);
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
  const flags = vnode._f;
  if ((flags & (
    VNodeFlags.ChildrenVNode |
    VNodeFlags.StatelessComponent |
    VNodeFlags.StatefulComponent |
    VNodeFlags.Connect |
    VNodeFlags.UpdateContext
  )) !== 0) {
    let context = wrapper.context;
    const children = vnode._c;
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = children as VNode;
      while (child !== null) {
        if (visitWrapped(new VNodeWrapper(child, wrapper, context), visitor)) {
          return true;
        }
        child = child._r;
      }
    } else {
      if ((flags & VNodeFlags.UpdateContext) !== 0) {
        context = { ...context, ...vnode._p };
      }
      if (children !== null) {
        return visitWrapped(new VNodeWrapper(children as VNode, wrapper, context), visitor);
      }
    }
  }

  return false;
}

function _virtualRender(depth: number, vnode: VNode, parent: VNode | null, context: {}): boolean {
  const flags = vnode._f;

  if ((flags & (
    VNodeFlags.ChildrenVNode |
    VNodeFlags.StatefulComponent |
    VNodeFlags.StatelessComponent |
    VNodeFlags.UpdateContext |
    VNodeFlags.Connect
  )) !== 0) {
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      let child: VNode | null = vnode._c as VNode;
      while (child !== null) {
        _virtualRender(depth, child, vnode, context);
        child = child._r;
      }
    } else if ((flags & (VNodeFlags.StatefulComponent | VNodeFlags.StatelessComponent)) !== 0) {
      if ((flags & VNodeFlags.StatefulComponent) !== 0) {
        const component = vnode._i = new (vnode._t as StatefulComponent<any>)(vnode._p);
        vnode._c = component.render();
      } else {
        const component = vnode._t as StatelessComponent<any>;
        vnode._c = component.render(vnode._p);
      }
    } else {
      if ((flags & VNodeFlags.UpdateContext) !== 0) {
        vnode._i = context = { ...context, ...vnode._p };
      } else {
        const connect = vnode._t as ConnectDescriptor<any, any, any>;
        const next = vnode._i = connect.select(null, vnode._p, context);
        vnode._c = connect.render(next);
      }
    }
    if (depth > 1) {
      return _virtualRender(depth - 1, vnode._c as VNode, vnode, context);
    }
  }

  return false;
}

export function virtualRender(root: VNode, context: {} = {}, depth = Number.MAX_SAFE_INTEGER): VNodeWrapper {
  visitUnwrapped(root, null, context, (v, p, c) => _virtualRender(depth, v, p, c));
  return new VNodeWrapper(root, null, context);
}

export class VNodeListWrapper {
  constructor(public readonly items: VNodeWrapper[]) { }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  filter(matcher: VNodeMatcher): VNodeListWrapper {
    return new VNodeListWrapper(this.items.filter((i) => matcher.match(i)));
  }

  forEach(fn: (n: VNodeWrapper, i: number) => void): void {
    this.items.forEach(fn);
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

  some(matcher: VNodeMatcher): boolean {
    return this.items.some(matcher.match);
  }

  every(matcher: VNodeMatcher): boolean {
    return this.items.every(matcher.match);
  }
}

export class VNodeWrapper {
  constructor(
    public readonly vnode: VNode,
    public readonly parent: VNodeWrapper | null,
    public readonly context: {},
  ) { }

  is(matcher: VNodeMatcher): boolean {
    return matcher.match(this);
  }

  isText(): boolean {
    return (this.vnode._f & VNodeFlags.Text) !== 0;
  }

  isElement(): boolean {
    return (this.vnode._f & VNodeFlags.Element) !== 0;
  }

  isComponent(): boolean {
    return (this.vnode._f & (VNodeFlags.StatefulComponent | VNodeFlags.StatelessComponent)) !== 0;
  }

  isStatefulComponent(): boolean {
    return (this.vnode._f & VNodeFlags.StatefulComponent) !== 0;
  }

  isStatelessComponent(): boolean {
    return (this.vnode._f & VNodeFlags.StatelessComponent) !== 0;
  }

  isContext(): boolean {
    return (this.vnode._f & VNodeFlags.UpdateContext) !== 0;
  }

  isConnect(): boolean {
    return (this.vnode._f & VNodeFlags.Connect) !== 0;
  }

  getTagName(): string {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getTagName() can only be called on element nodes");
    }
    return this.vnode._t as string;
  }

  getDOMInstance<P extends Node>(): P {
    if (!this.isText() && !this.isElement()) {
      throw new Error("VNodeWrapper::getDOMInstance() can only be called on DOM nodes");
    }
    if (this.vnode._i === null) {
      throw new Error("Virtual DOM node is not instantiated");
    }
    return this.vnode._i as P;
  }

  getComponentInstance<P extends Component<any>>(): P {
    if (!this.isStatefulComponent()) {
      throw new Error("VNodeWrapper::getComponentInstance() can only be called on stateful components");
    }
    if (this.vnode._i === null) {
      throw new Error("Virtual DOM node is not instantiated");
    }
    return this.vnode._i as P;
  }

  getCurrentContext<P = {}>(): P {
    return this.context as P;
  }

  getKey(): any {
    if ((this.vnode._f & VNodeFlags.Key) === 0) {
      return null;
    }
    return this.vnode._k;
  }

  getChildren(): VNodeListWrapper {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getChildren() can only be called on element nodes");
    }
    const flags = this.vnode._f;
    let children: VNodeWrapper[];
    if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      children = [];
      let child: VNode | null = this.vnode._c as VNode;
      do {
        children.push(new VNodeWrapper(child, this, this.context));
        child = child._r;
      } while (child !== null);
    } else {
      children = [];
    }
    return new VNodeListWrapper(children);
  }

  getClassName(): string | undefined {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getClassName() can only be called on element nodes");
    }
    return this.vnode._cs;
  }

  getElementProps(): any {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getElementProps() can only be called on element nodes");
    }
    return this.vnode._p;
  }

  getElementStyle(): any {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getElementProps() can only be called on element nodes");
    }
    return this.vnode._s;
  }

  getInnerText(): string {
    return innerText(this);
  }

  hasFactory(factory: Function): boolean {
    return hasFactory(this, factory);
  }

  hasParent(matcher: VNodeMatcher): boolean {
    return hasParent(this, matcher.match);
  }

  hasChild(matcher: VNodeMatcher): boolean {
    return hasChild(this, matcher.match);
  }

  hasSibling(matcher: VNodeMatcher): boolean {
    return hasSibling(this, matcher.match);
  }

  hasPrevSibling(matcher: VNodeMatcher): boolean {
    return hasPrevSibling(this, matcher.match);
  }

  hasClassName(className: string): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasClassName() can only be called on element nodes");
    }
    return hasClassName(this, className);
  }

  hasExplicitKey(): boolean {
    return (this.vnode._f & VNodeFlags.Key) !== 0;
  }

  hasProps(props: { [key: string]: any }): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasProps() can only be called on element nodes");
    }
    return hasProps(this, props);
  }

  hasExactProps(props: { [key: string]: any }): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasExactProps() can only be called on element nodes");
    }
    return hasExactProps(this, props);
  }

  hasAssignedProps(props: { [key: string]: boolean }): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasAssignedProps() can only be called on element nodes");
    }
    return hasAssignedProps(this, props);
  }

  hasStyle(style: CSSStyleProps): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasStyle() can only be called on element nodes");
    }
    return hasStyle(this, style);
  }

  hasExactStyle(style: CSSStyleProps): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasExactStyle() can only be called on element nodes");
    }
    return hasExactStyle(this, style);
  }

  hasAssignedStyle(style: { [key: string]: boolean }): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasAssignedStyle() can only be called on element nodes");
    }
    return hasAssignedStyle(this, style);
  }

  hasEventHandler(eventSource: EventDispatcher): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasEventHandler() can only be called on element nodes");
    }
    return hasEventHandler(this, eventSource);
  }

  hasAutofocus(): boolean {
    return hasAutofocus(this);
  }

  query(matcher: VNodeMatcher): VNodeWrapper | null {
    return query(this, matcher.match);
  }

  queryAll(matcher: VNodeMatcher): VNodeListWrapper {
    return new VNodeListWrapper(queryAll(this, matcher.match));
  }

  closest(matcher: VNodeMatcher): VNodeWrapper | null {
    return closest(this, matcher.match);
  }

  toSnapshot(options?: SnapshotOptions): string {
    return toSnapshot(this.vnode, options);
  }

  emit(ev: Event): void {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::emit() can only be called on element nodes");
    }
    this.getDOMInstance().dispatchEvent(ev);
  }
}

export function isElement(wrapper: VNodeWrapper, tagName: string): boolean {
  const vnode = wrapper.vnode;
  return ((vnode._f & VNodeFlags.Element) !== 0 && vnode._t === tagName);
}

export function isElementWithClassName(wrapper: VNodeWrapper, tagName: string, className: string): boolean {
  const vnode = wrapper.vnode;
  return (
    isElement(wrapper, tagName) === true &&
    vnode._cs !== void 0 &&
    containsClassName(vnode._cs, className) === true
  );
}

export function hasFactory(wrapper: VNodeWrapper, factory: Function): boolean {
  const vnode = wrapper.vnode;
  return (vnode.factory === factory);
}

export function hasKey(wrapper: VNodeWrapper, key: any): boolean {
  const vnode = wrapper.vnode;
  return ((vnode._f & VNodeFlags.Key) !== 0 && vnode._k === key);
}

export function hasClassName(wrapper: VNodeWrapper, className: string): boolean {
  const vnode = wrapper.vnode;
  return (vnode._cs !== void 0 && containsClassName(vnode._cs, className) === true);
}

export function hasProps(wrapper: VNodeWrapper, props: { [key: string]: any }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== void 0 && matchValues(vnode._p, props) === true);
}

export function hasExactProps(wrapper: VNodeWrapper, props: { [key: string]: any }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && shallowEqual(vnode._p, props) === true);
}

export function hasAssignedProps(wrapper: VNodeWrapper, props: { [key: string]: boolean }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && matchKeys(vnode._p, props));
}

export function hasStyle(wrapper: VNodeWrapper, style: CSSStyleProps): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && matchValues(vnode._s, style) === true);
}

export function hasExactStyle(wrapper: VNodeWrapper, style: CSSStyleProps): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && shallowEqual(vnode._s, style) === true);
}

export function hasAssignedStyle(wrapper: VNodeWrapper, style: { [key: string]: boolean }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && matchKeys(vnode._s, style));
}

export function hasEventHandler(wrapper: VNodeWrapper, dispatcher: EventDispatcher): boolean {
  const vnode = wrapper.vnode;
  return (vnode._p !== null && containsEventHandler(vnode._e, dispatcher) === true);
}

export function hasAutofocus(wrapper: VNodeWrapper): boolean {
  return ((wrapper.vnode._f & VNodeFlags.Autofocus) !== 0);
}

export function hasParent(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  let parent = wrapper.parent;
  while (parent !== null) {
    if (predicate(parent)) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

export function hasDirectParent(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  return (parent !== null && predicate(parent));
}

export function hasChild(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  return visitWrapped(wrapper, (n) => (wrapper !== n && predicate(n)));
}

export function hasSibling(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  const next = wrapper.vnode._r;
  return (next !== null && predicate(new VNodeWrapper(next, parent, wrapper.context)));
}

export function hasPrevSibling(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  const prev = wrapper.vnode._l;
  if (parent !== null) {
    if (parent.vnode._c === wrapper.vnode) {
      return false;
    }
    return predicate(new VNodeWrapper(prev, parent, wrapper.context));
  }
  return false;
}

export function hasNextSibling(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  const next = wrapper.vnode._r;
  if (next !== null) {
    return predicate(new VNodeWrapper(next, parent, wrapper.context));
  }
  return false;
}

export function innerText(wrapper: VNodeWrapper): string {
  let result = "";
  visitUnwrapped(
    wrapper.vnode,
    wrapper.parent === null ? null : wrapper.parent.vnode,
    wrapper.context,
    (vnode) => {
      if ((vnode._f & VNodeFlags.Text) !== 0) {
        result += vnode._c;
      }
      return false;
    },
  );
  return result;
}
