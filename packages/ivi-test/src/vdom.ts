import { CSSStyleProps, shallowEqual, Predicate } from "ivi-core";
import { EventSource } from "ivi-events";
import { Context, VNode, VNodeFlags, Component, ComponentClass, StatelessComponent, ConnectDescriptor } from "ivi";
import { containsClassName, containsEventHandler, matchValues, matchKeys } from "./utils";
import { VNodeMatcher, query, queryAll, closest } from "./query";
import { SnapshotFlags, toSnapshot } from "./snapshot";

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
    if (depth === -1 || depth > 1) {
      return _virtualRender(depth - 1, vnode._children, vnode, context);
    }
  }
  return false;
}

export function virtualRender(
  root: VNode<any>,
  rootContext: Context = {},
  depth = 1,
): VNodeWrapper {
  visitUnwrapped(root, null, rootContext,
    function (vnode: VNode<any>, parent: VNode<any> | null, context: Context) {
      return _virtualRender(depth, vnode, parent, context);
    },
  );
  return new VNodeWrapper(root, null, rootContext);
}

export class VNodeListWrapper {
  readonly items: VNodeWrapper[];

  constructor(items: VNodeWrapper[]) {
    this.items = items;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  filter(matcher: VNodeMatcher): VNodeListWrapper {
    return new VNodeListWrapper(this.items.filter(function (i) {
      return matcher.match(i);
    }));
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
  readonly vnode: VNode<any>;
  readonly parent: VNodeWrapper | null;
  readonly context: Context;

  constructor(vnode: VNode<any>, parent: VNodeWrapper | null, context: Context) {
    this.vnode = vnode;
    this.parent = parent;
    this.context = context;
  }

  is(matcher: VNodeMatcher): boolean {
    return matcher.match(this);
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

  isContextComponent(): boolean {
    return (this.vnode._flags & VNodeFlags.UpdateContext) !== 0;
  }

  isConnectComponent(): boolean {
    return (this.vnode._flags & VNodeFlags.Connect) !== 0;
  }

  isKeepAliveComponent(): boolean {
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

  getDOMInstance<P extends Node>(): P {
    if (!this.isText() && !this.isElement()) {
      throw new Error("VNodeWrapper::getDOMInstance() can only be called on DOM nodes");
    }
    if (this.vnode._instance === null) {
      throw new Error("Virtual DOM node is not instantiated");
    }
    return this.vnode._instance as P;
  }

  getComponentInstance<P extends Component<any>>(): P {
    if (!this.isStatefulComponent()) {
      throw new Error("VNodeWrapper::getComponentInstance() can only be called on stateful components");
    }
    if (this.vnode._instance === null) {
      throw new Error("Virtual DOM node is not instantiated");
    }
    return this.vnode._instance as P;
  }

  getCurrentContext<P = {}>(): Context<P> {
    return this.context as Context<P>;
  }

  getKey(): any {
    if ((this.vnode._flags & VNodeFlags.Key) === 0) {
      return null;
    }
    return this.vnode._key;
  }

  getChildren(): VNodeListWrapper {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getChildren() can only be called on element nodes");
    }
    const flags = this.vnode._flags;
    let children: VNodeWrapper[];
    if ((flags & VNodeFlags.ChildrenArray) !== 0) {
      children = (this.vnode._children as VNode[]).map((c) => {
        return new VNodeWrapper(c, this, this.context);
      });
    } else if ((flags & VNodeFlags.ChildrenVNode) !== 0) {
      children = [new VNodeWrapper(this.vnode._children as VNode<any>, this, this.context)];
    } else {
      children = [];
    }
    return new VNodeListWrapper(children);
  }

  getClassName(): string | null {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::getClassName() can only be called on element nodes");
    }
    return this.vnode._className;
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

  getInnerText(): string {
    return innerText(this);
  }

  getInputValue(): string | null {
    if (!this.isInputElement()) {
      throw new Error("VNodeWrapper::getInputValue() can only be called on input element nodes");
    }
    return this.vnode._children as string | null;
  }

  getInputChecked(): boolean | null {
    if (!this.isInputElement()) {
      throw new Error("VNodeWrapper::getInputChecked() can only be called on input element nodes");
    }
    return this.vnode._children as boolean | null;
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
    return (this.vnode._flags & VNodeFlags.Key) !== 0;
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

  hasEventHandler(eventSource: EventSource): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasEventHandler() can only be called on element nodes");
    }
    return hasEventHandler(this, eventSource);
  }

  hasUnsafeHTML(html?: string): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::hasUnsafeHTML() can only be called on element nodes");
    }
    return hasUnsafeHTML(this, html);
  }

  isAutofocused(): boolean {
    if (!this.isElement()) {
      throw new Error("VNodeWrapper::isAutofocused() can only be called on element nodes");
    }
    return isAutofocused(this);
  }

  hasInputValue(value?: string): boolean {
    if (!this.isInputElement()) {
      throw new Error("VNodeWrapper::hasInputValue() can only be called on input element nodes");
    }
    return hasInputValue(this, value);
  }

  isInputChecked(value?: boolean): boolean {
    if (!this.isInputElement()) {
      throw new Error("VNodeWrapper::hasInputChecked() can only be called on input element nodes");
    }
    return hasInputChecked(this, value);
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

  toSnapshot(flags: SnapshotFlags = SnapshotFlags.DefaultFlags): string {
    return toSnapshot(this.vnode, flags);
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
  return ((vnode._flags & VNodeFlags.Element) !== 0 && vnode._tag === tagName);
}

export function isElementWithClassName(wrapper: VNodeWrapper, tagName: string, className: string): boolean {
  const vnode = wrapper.vnode;
  return (
    isElement(wrapper, tagName) === true &&
    vnode._className !== null &&
    containsClassName(vnode._className, className) === true
  );
}

export function isInputElement(wrapper: VNodeWrapper, type: string): boolean {
  const vnode = wrapper.vnode;
  return ((vnode._flags & VNodeFlags.InputElement) !== 0 && vnode._tag === type);
}

export function isInputElementWithClassName(wrapper: VNodeWrapper, type: string, className: string): boolean {
  const vnode = wrapper.vnode;
  return (
    isInputElement(wrapper, type) === true &&
    vnode._className !== null &&
    containsClassName(vnode._className, className) === true
  );
}

export function hasKey(wrapper: VNodeWrapper, key: any): boolean {
  const vnode = wrapper.vnode;
  return ((vnode._flags & VNodeFlags.Key) !== 0 && vnode._key === key);
}

export function hasClassName(wrapper: VNodeWrapper, className: string): boolean {
  const vnode = wrapper.vnode;
  return (vnode._className !== null && containsClassName(vnode._className, className) === true);
}

export function hasProps(wrapper: VNodeWrapper, props: { [key: string]: any }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && matchValues(vnode._props.props, props) === true);
}

export function hasExactProps(wrapper: VNodeWrapper, props: { [key: string]: any }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && shallowEqual(vnode._props.props, props) === true);
}

export function hasAssignedProps(wrapper: VNodeWrapper, props: { [key: string]: boolean }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && matchKeys(vnode._props.props, props));
}

export function hasStyle(wrapper: VNodeWrapper, style: CSSStyleProps): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && matchValues(vnode._props.style, style) === true);
}

export function hasExactStyle(wrapper: VNodeWrapper, style: CSSStyleProps): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && shallowEqual(vnode._props.style, style) === true);
}

export function hasAssignedStyle(wrapper: VNodeWrapper, style: { [key: string]: boolean }): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && matchKeys(vnode._props.style, style));
}

export function hasEventHandler(wrapper: VNodeWrapper, eventSource: EventSource): boolean {
  const vnode = wrapper.vnode;
  return (vnode._props !== null && containsEventHandler(vnode._props.events, eventSource) === true);
}

export function hasUnsafeHTML(wrapper: VNodeWrapper, html?: string): boolean {
  const vnode = wrapper.vnode;
  return ((vnode._flags & VNodeFlags.UnsafeHTML) !== 0 && (html === undefined || vnode._children === html));
}

export function isAutofocused(wrapper: VNodeWrapper): boolean {
  return ((wrapper.vnode._flags & VNodeFlags.Autofocus) !== 0);
}

export function hasInputValue(wrapper: VNodeWrapper, value?: string): boolean {
  const vnode = wrapper.vnode;
  return (vnode._children !== null && (value === undefined || vnode._children === value));
}

export function hasInputChecked(wrapper: VNodeWrapper, checked?: boolean): boolean {
  const vnode = wrapper.vnode;
  return (vnode._children !== null && (checked === undefined || vnode._children === checked));
}

export function hasParent(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  let parent = wrapper.parent;
  while (parent !== null) {
    if (predicate(parent) === true) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

export function hasDirectParent(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  return (parent !== null && predicate(parent) === true);
}

export function hasChild(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  return visitWrapped(wrapper, function (n) {
    return (wrapper !== n && predicate(n) === true);
  });
}

export function hasSibling(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  if (parent !== null && (parent.vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
    const children = parent.vnode._children as VNode[];
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (wrapper.vnode !== c) {
        if (predicate(new VNodeWrapper(c, parent, wrapper.context)) === true) {
          return true;
        }
      }
    }
  }
  return false;
}

export function hasPrevSibling(wrapper: VNodeWrapper, predicate: Predicate<VNodeWrapper>): boolean {
  const parent = wrapper.parent;
  if (parent !== null && (parent.vnode._flags & VNodeFlags.ChildrenArray) !== 0) {
    const children = parent.vnode._children as VNode<any>[];
    let prev: VNode<any> | null = null;
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (wrapper.vnode === c) {
        return (prev !== null && predicate(new VNodeWrapper(prev, parent, wrapper.context)) === true);
      }
      prev = c;
    }
  }
  return false;
}

export function innerText(wrapper: VNodeWrapper): string {
  let result = "";
  visitUnwrapped(
    wrapper.vnode,
    wrapper.parent === null ? null : wrapper.parent.vnode,
    wrapper.context,
    function (vnode) {
      const flags = vnode._flags;
      if ((flags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
        if ((flags & VNodeFlags.Text) !== 0) {
          result += vnode._children;
        } else {
          if ((flags & VNodeFlags.ChildrenBasic) !== 0) {
            result += vnode._children;
          }
        }
      }
      return false;
    },
  );
  return result;
}
