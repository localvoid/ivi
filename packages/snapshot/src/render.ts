import { VNode, VNodeFlags, Context, ComponentClass, StatelessComponent, ConnectDescriptor } from "ivi-ssr";

export type SnapshotNodeType =
  | "text"
  | "element"
  | "component";

export interface SnapshotNode {
  type: SnapshotNodeType;
  // Text Nodes
  content?: string;
  // Element Nodes
  class?: string;
  props?: any;
  style?: any;
  children?: SnapshotNode[];
  unsafeHTML?: string;
  // Component Nodes
  componentName?: string;
  root?: SnapshotNode;
}

const InputTypeRegExp = /type="([a-z]+)"/;
function extractInputType(tag: string): string {
  const match = tag.match(InputTypeRegExp);
  if (match !== null) {
    return match[1];
  }
  return "text";
}

export function render(vnode: VNode<any>, context: Context): SnapshotNode {
  const flags = vnode._flags;
  if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    if ((flags & VNodeFlags.Element) !== 0) {
      const snode: SnapshotNode = { type: "element" };
      let tag = vnode._tag as string;
      if ((flags & VNodeFlags.InputElement) !== 0) {
        tag = "input";
      } else {
        tag = tag.slice(1); // Remove "<"
      }

      if (vnode._className !== null) {
        snode.class = vnode._className;
      }

      let props = vnode._props;
      if ((flags & VNodeFlags.InputElement) !== 0) {
        const type = extractInputType(vnode._tag as string);
        if (props !== null) {
          props = { ...props, type };
        } else {
          props = { type };
        }
        if (vnode._children !== null) {
          if (typeof vnode._children === "string") {
            props = { ...props, value: vnode._children };
          } else {
            props = { ...props, checked: vnode._children };
          }
        }
      }
      if (props !== null) {
        snode.props = vnode._props;
      }

      if (vnode._style !== null) {
        snode.style = vnode._style;
      }

      if ((flags & VNodeFlags.VoidElement) === 0) {
        if (vnode._children !== null) {
          if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
            if ((flags & VNodeFlags.ChildrenArray) !== 0) {
              const children = vnode._children as VNode<any>[];
              const schildren = new Array(children.length);
              for (let i = 0; i < children.length; i++) {
                schildren[i] = render(children[i], context);
              }
              snode.children = schildren;
            } else {
              snode.children = [render(vnode._children as VNode<any>, context)];
            }
          } else { // ((flags & (VNodeFlags.ChildrenBasic | VNodeFlags.UnsafeHTML)) !== 0)
            if ((flags & VNodeFlags.UnsafeHTML) !== 0) {
              snode.unsafeHTML = vnode._children as string;
            } else {
              if (typeof vnode._children === "string") {
                snode.children = [{ type: "text", content: vnode._children }];
              } else {
                snode.children = [{ type: "text", content: (vnode._children as number).toString() }];
              }
            }
          }
        }
      }
      return snode;
    } else {
      if (typeof vnode._children === "string") {
        return { type: "text", content: vnode._children };
      } else {
        return { type: "text", content: (vnode._children as number).toString() };
      }
    }
  } else { // ((flags & VNodeFlags.Component) !== 0)
    if ((flags & VNodeFlags.ComponentClass) !== 0) {
      const component = new (vnode._tag as ComponentClass<any>)(vnode._props);
      return {
        type: "component",
        componentName: (vnode._tag as ComponentClass<any>).displayName,
        root: render(component.render(), context),
      };
    } else { // ((node._flags & VNodeFlags.ComponentFunction) !== 0)
      let root;
      if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) !== 0) {
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = vnode._tag as ConnectDescriptor<any, any, any>;
          const selectData = connect.select(null, vnode._props, context);
          root = connect.render(selectData.out);
        } else {
          context = Object.assign({}, context, vnode._props);
          root = vnode._children as VNode;
        }
        return render(root, context);
      } else {
        root = (vnode._tag as StatelessComponent<any>)(vnode._props);
        return {
          type: "component",
          componentName: (vnode._tag as StatelessComponent<any>).displayName,
          root: render(root, context),
        };
      }
    }
  }
}
