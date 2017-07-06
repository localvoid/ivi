import { Context, SelectorData } from "ivi-core";
import { VNodeFlags, VNode, vNodeEqualKeys } from "./vnode";
import { BlueprintNode } from "./blueprint";
import { ComponentClass, StatelessComponent, Component } from "./component";
import { ConnectDescriptor } from "./connect_descriptor";
import { escapeAttributeValue, escapeText } from "./escape";

/**
 * attributeName converts property names to attribute names.
 *
 * @param name Property name.
 * @returns Attribute name.
 */
function attributeName(name: string): string {
  switch (name) {
    case "acceptCharset":
      return "accept-charset";
    case "htmlFor":
      return "for";
  }
  return name;
}

/**
 * renderElementProps renders element properties to string.
 *
 * @param props Element properties.
 * @returns Element properties in string format.
 */
function renderElementProps(props: { [key: string]: string }): string {
  let result = "";

  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = props[key];
    if (typeof value !== "boolean") {
      if (value !== null) {
        result += ` ${attributeName(key)}="${escapeAttributeValue(value)}"`;
      }
    } else {
      if (value === true) {
        result += ` ${key}`;
      }
    }
  }

  return result;
}

/**
 * renderElementStyle renders element styles to string.
 *
 * @param style Element styles.
 * @returns Element styles in string format.
 */
function renderElementStyle(style: { [key: string]: any }): string {
  const keys = Object.keys(style);
  if (keys.length === 0) {
    return "";
  }

  let result = ` style="`;
  let semicolon = false;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = style[key];
    if (semicolon === true) {
      result += ";";
    } else {
      semicolon = true;
    }
    result += `${key}:${escapeAttributeValue(value)}`;
  }

  return `${result}"`;
}

/**
 * renderOpenElement renders open tag for an element.
 *
 * @param node Virtual DOM node.
 * @returns Open tag in a string format.
 */
export function renderOpenElement(node: VNode<any>): string {
  const flags = node._flags;
  let result;
  if ((flags & VNodeFlags.InputElement) === 0) {
    result = node._tag as string;
  } else {
    if ((flags & VNodeFlags.TextAreaElement) === 0) {
      result = `<input type="${node._tag}"`;

      const value = node._children;
      if (value !== null) {
        if (typeof value === "string") {
          result += ` value="${escapeAttributeValue(value)}"`;
        } else if (value === true) {
          result += ` checked`;
        }
      }
    } else {
      result = `<textarea`;
    }
  }

  if (node._className !== null) {
    result += ` class="${node._className}"`;
  }
  if (node._props !== null) {
    result += renderElementProps(node._props);
  }
  if (node._style !== null) {
    result += renderElementStyle(node._style);
  }
  result += ">";

  return result;
}

/**
 * renderVNode renders Virtual DOM node to string format.
 *
 * @param node Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function renderVNode(node: VNode<any>, context: Context): string {
  const flags = node._flags;
  if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    if ((flags & VNodeFlags.Element) !== 0) {
      let result = renderOpenElement(node);
      if ((flags & VNodeFlags.VoidElement) === 0) {
        if (node._children !== null) {
          let childrenString;
          if ((flags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
            childrenString = "";
            if ((flags & VNodeFlags.ChildrenArray) !== 0) {
              const children = node._children as VNode<any>[];
              for (let i = 0; i < children.length; i++) {
                childrenString += renderVNode(children[i], context);
              }
            } else {
              childrenString = renderVNode(node._children as VNode<any>, context);
            }
          } else { // ((flags & VNodeFlags.ChildrenBasic) !== 0)
            childrenString = escapeText(node._children as string);
          }
          if ((flags & VNodeFlags.NewLineEatingElement) !== 0) {
            if (childrenString.length > 0 && childrenString.charCodeAt(0) === 10) { // "\n"
              result += "\n";
            }
          }
          result += childrenString;
        }
        result += node._close;
      }
      return result;
    } else { // ((flags & VNodeFlags.Text) !== 0)
      return escapeText(node._children as string);
    }
  } else { // ((flags & VNodeFlags.Component) !== 0)
    if ((flags & VNodeFlags.LinkedBlueprint) === 0) {
      if ((flags & VNodeFlags.ComponentClass) !== 0) {
        const component = new (node._tag as ComponentClass)(node._props);
        return renderVNode(component.render(), context);
      } else { // ((node._flags & VNodeFlags.ComponentFunction) !== 0)
        let root;
        if ((flags & VNodeFlags.Connect) !== 0) {
          const connect = node._tag as ConnectDescriptor<any, any, any>;
          const selectData = connect.select(null, node._props, context);
          root = connect.render(selectData.out);
        } else {
          if ((flags & VNodeFlags.UpdateContext) !== 0) {
            context = Object.assign({}, context, node._props);
            root = node._children as VNode;
          } else {
            root = (node._tag as StatelessComponent)(node._props);
          }
        }
        return renderVNode(root, context);
      }
    } else {
      return patchVNode(node._style as BlueprintNode, node, context);
    }
  }
}

/**
 * patchCheckDeepChanges checks deep changes that can occur because of context changes, and if nothing is changed
 * it will use prerendered string.
 *
 * @param bp Blueprint node.
 * @param context Current context.
 * @returns Blueprint node in a string format.
 */
function patchCheckDeepChanges(
  bp: BlueprintNode,
  context: Context,
): string {
  const flags = bp.flags;
  if ((flags & (VNodeFlags.Element | VNodeFlags.Text)) !== 0) {
    let result = bp.string;
    if ((flags & VNodeFlags.Element) !== 0) {
      if ((flags & VNodeFlags.VoidElement) === 0) {
        if (bp.children !== null) {
          if ((flags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
            const children = bp.children;
            if ((flags & VNodeFlags.ChildrenArray) !== 0) {
              for (let i = 0; i < (children as BlueprintNode[]).length; i++) {
                result += patchCheckDeepChanges(
                  (children as BlueprintNode[])[i],
                  context,
                );
              }
            } else {
              result += patchCheckDeepChanges(
                children as BlueprintNode,
                context,
              );
            }
          } else {
            result += bp.children as string;
          }
        }
        result += bp.vnode._close;
      }
    }
    return result;
  } else {
    if ((flags & (VNodeFlags.Connect | VNodeFlags.UpdateContext)) === 0) {
      if ((flags & VNodeFlags.DeepConnect) === 0) {
        return bp.string;
      } else {
        return patchCheckDeepChanges(
          bp.children as BlueprintNode,
          context,
        );
      }
    } else {
      if ((flags & VNodeFlags.Connect) !== 0) {
        const connect = bp.vnode._tag as ConnectDescriptor<any, any, any>;
        const prevSelectData = bp.data as SelectorData;
        const selectData = connect.select(
          prevSelectData,
          bp.vnode._props,
          context,
        );
        const prevChildren = bp.children as BlueprintNode;
        if (prevSelectData === selectData) {
          if ((flags & VNodeFlags.DeepConnect) === 0) {
            return bp.string;
          } else {
            return patchCheckDeepChanges(
              prevChildren,
              context,
            );
          }
        } else {
          return patchVNode(
            prevChildren,
            connect.render(selectData.out),
            context,
          );
        }
      } else {
        context = Object.assign({}, context, bp.vnode._props);
        return patchCheckDeepChanges(
          bp.children as BlueprintNode,
          context,
        );
      }
    }
  }
}

/**
 * patchComponentVNode performs a diff/patch on blueprint component node.
 *
 * @param a Blueprint node.
 * @param b Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function patchComponentVNode(a: BlueprintNode, b: VNode<any>, context: Context): string {
  const component = a.data as Component;
  // Update component props
  const oldProps = a.vnode._props;
  const newProps = b._props;
  const oldRoot = a.children as BlueprintNode;
  if (component.isPropsChanged(oldProps, newProps) === true) {
    const newComponent = new (b._tag as ComponentClass)(newProps);
    const newRoot = newComponent.render();
    return patchVNode(oldRoot, newRoot, context);
  } else {
    if ((a.flags & VNodeFlags.DeepConnect) === 0) {
      return a.string;
    } else {
      return patchCheckDeepChanges(oldRoot, context);
    }
  }
}

/**
 * patchStatelessComponentVNode performs a diff/patch on blueprint stateless component node.
 *
 * @param a Blueprint node.
 * @param b Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function patchStatelessComponentVNode(a: BlueprintNode, b: VNode<any>, context: Context): string {
  const fn = b._tag as StatelessComponent;
  if (
    ((a.flags & VNodeFlags.CheckChangedProps) === 0 && a.vnode._props !== b._props) ||
    ((a.flags & VNodeFlags.CheckChangedProps) !== 0 && fn.isPropsChanged!(a.vnode._props, b._props) === true)
  ) {
    return patchVNode(
      a.children as BlueprintNode,
      fn(b._props),
      context,
    );
  } else {
    if ((a.flags & VNodeFlags.DeepConnect) === 0) {
      return a.string;
    } else {
      return patchCheckDeepChanges(
        a.children as BlueprintNode,
        context,
      );
    }
  }
}

/**
 * patchConnectVNode performs a diff/patch on blueprint connect node.
 *
 * @param a Blueprint node.
 * @param b Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function patchConnectVNode(a: BlueprintNode, b: VNode<any>, context: Context): string {
  const connect = b._tag as ConnectDescriptor<any, any, any>;
  const prevSelectData = a.data as SelectorData;
  const selectData = connect.select(
    prevSelectData,
    b._props,
    context,
  );
  if (prevSelectData === selectData) {
    return patchCheckDeepChanges(
      a.children as BlueprintNode,
      context,
    );
  } else {
    return patchVNode(
      a.children as BlueprintNode,
      connect.render(selectData.out),
      context,
    );
  }
}

/**
 * patchUpdateContextVNode performs a diff/patch on blueprint update context node.
 *
 * @param a Blueprint node.
 * @param b Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function patchUpdateContextVNode(a: BlueprintNode, b: VNode<any>, context: Context): string {
  if ((b._flags & VNodeFlags.UpdateContext) !== 0) {
    context = Object.assign({}, context, b._props);
  }
  return patchVNode(
    a.children as BlueprintNode,
    b._children as VNode<any>,
    context,
  );
}

/**
 * patchVNode performs a diff/patch on blueprint node.
 *
 * @param a Blueprint node.
 * @param b Virtual DOM node.
 * @param context Current context.
 * @returns Virtual DOM node in string format.
 */
function patchVNode(a: BlueprintNode, b: VNode<any>, context: Context): string {
  const aVNode = a.vnode;
  if (aVNode !== b) {
    const aFlags = a.flags;
    const bFlags = b._flags;
    if (
      ((aFlags ^ bFlags) & VNodeFlags.Syncable) === 0 &&
      aVNode._tag === b._tag &&
      (
        ((bFlags & VNodeFlags.LinkedBlueprint) !== 0) ||
        (((aFlags ^ bFlags) & VNodeFlags.Key) === 0 && aVNode._key === b._key)
      )
    ) {
      if ((bFlags & (VNodeFlags.Text | VNodeFlags.Element)) !== 0) {
        if ((bFlags & VNodeFlags.Text) !== 0) {
          return (a.children === b._children) ?
            a.string :
            escapeText(b._children as string);
        } else { // ((flags & VNodeFlags.Element) !== 0)
          let result;
          if (
            aVNode._props !== b._props ||
            aVNode._style !== b._style ||
            aVNode._className !== b._className
          ) {
            result = renderOpenElement(b);
          } else {
            result = a.string;
          }

          if ((bFlags & VNodeFlags.VoidElement) === 0) {
            if (b._children !== null) {
              result += patchChildren(
                a,
                a.flags,
                bFlags,
                a.children,
                b._children,
                context,
              );
            }

            result += aVNode._close;
          }
          return result;
        }
      } else { // ((flags & VNodeFlags.Component) !== 0)
        if ((bFlags & VNodeFlags.ComponentClass) !== 0) {
          return patchComponentVNode(a, b, context);
        } else { // (flags & VNodeFlags.ComponentFunction)
          if ((bFlags & (VNodeFlags.UpdateContext | VNodeFlags.Connect)) !== 0) {
            if ((bFlags & VNodeFlags.Connect) !== 0) {
              return patchConnectVNode(a, b, context);
            } else {
              return patchUpdateContextVNode(a, b, context);
            }
          } else {
            return patchStatelessComponentVNode(a, b, context);
          }
        }
      }
    } else {
      return renderVNode(b, context);
    }
  } else {
    return patchCheckDeepChanges(a, context);
  }
}

/**
 * patchChildren performs a diff on children and tries to find matching children.
 *
 * @param aParent Blueprint parent node.
 * @param aParentFlags Blueprint parent node flags.
 * @param bParentFlags Virtual DOM parent node flags.
 * @param a Blueprint children.
 * @param b Virtual DOM children.
 * @param context Current context.
 * @returns Children in string format.
 */
function patchChildren(
  aParent: BlueprintNode,
  aParentFlags: VNodeFlags,
  bParentFlags: VNodeFlags,
  a: BlueprintNode[] | BlueprintNode | string | number | boolean | null,
  b: VNode[] | VNode | string | number | boolean,
  context: Context,
): string {
  if ((aParentFlags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) === 0) {
    if ((bParentFlags & (VNodeFlags.ChildrenVNode | VNodeFlags.ChildrenArray)) !== 0) {
      if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
        let result = "";
        for (let i = 0; i < (b as VNode<any>[]).length; i++) {
          result += renderVNode((b as VNode<any>[])[i], context);
        }
        return result;
      } else { // ((bParentFlags & VNodeFlags.ChildrenVNode) !== 0)
        return renderVNode(b as VNode<any>, context);
      }
    } else { // ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0)
      if (a !== null && aParent.vnode._children === b) {
        return a as string;
      }
      return escapeText(b as string);
    }
  } else {
    let node;
    if ((aParentFlags & VNodeFlags.ChildrenArray) !== 0) {
      if ((bParentFlags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
        if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
          return patchChildrenTrackByKeys(
            aParent.childrenKeyIndex,
            aParent.childrenPosIndex,
            a as BlueprintNode[],
            b as VNode<any>[],
            context,
          );
        } else { // ((bParentFlags & VNodeFlags.ChildrenVNode) !== 0)
          for (let i = 0; i < (a as BlueprintNode[]).length; i++) {
            node = (a as BlueprintNode[])[i];
            if (vNodeEqualKeys(node.vnode, b as VNode<any>) === true) {
              return patchVNode(node, b as VNode<any>, context);
            }
          }

          return renderVNode(b as VNode<any>, context);
        }
      } else { // ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0)
        return escapeText(b as string);
      }
    } else { // ((aParentFlags & VNodeFlags.ChildrenVNode) !== 0) {
      if ((bParentFlags & (VNodeFlags.ChildrenArray | VNodeFlags.ChildrenVNode)) !== 0) {
        if ((bParentFlags & VNodeFlags.ChildrenArray) !== 0) {
          let result = "";
          for (let i = 0; i < (b as VNode<any>[]).length; i++) {
            node = (b as VNode<any>[])[i];
            if (vNodeEqualKeys((a as BlueprintNode).vnode, node) === true) {
              result += patchVNode(a as BlueprintNode, node, context);
            } else {
              result += renderVNode((b as VNode<any>[])[i], context);
            }
          }
          return result;
        } else {
          return patchVNode(a as BlueprintNode, b as VNode, context);
        }
      } else { // ((bParentFlags & VNodeFlags.ChildrenBasic) !== 0)
        return escapeText(b as string);
      }
    }
  }
}

/**
 * patchChildrenTrackByKeys performs a diff on children lists and tries to find similar nodes with matching
 * keys.
 *
 * @param keyIndex Children index for explicit keys.
 * @param posIndex Children index for positional keys.
 * @param a Blueprint children.
 * @param b Virtual DOM children.
 * @param context Current context.
 * @returns Children nodes in string format.
 */
function patchChildrenTrackByKeys(
  keyIndex: Map<any, BlueprintNode> | null,
  posIndex: Map<any, BlueprintNode> | null,
  a: BlueprintNode[],
  b: VNode[],
  context: Context,
): string {
  let aStart = 0;
  let bStart = 0;
  const aEnd = a.length - 1;
  const bEnd = b.length - 1;
  let aStartNode = a[aStart];
  let bStartNode = b[bStart];
  let aNode;
  let bNode;
  let result = "";

  while (vNodeEqualKeys(aStartNode.vnode, bStartNode) === true) {
    result += patchVNode(aStartNode, bStartNode, context);
    aStart++;
    bStart++;
    if (aStart > aEnd || bStart > bEnd) {
      break;
    }
    aStartNode = a[aStart];
    bStartNode = b[bStart];
  }

  while (bStart <= bEnd) {
    aNode = undefined;
    bNode = b[bStart++];
    if ((bNode._flags & VNodeFlags.Key) !== 0) {
      if (keyIndex !== null) {
        aNode = keyIndex.get(bNode._key);
      }
    } else {
      if (posIndex !== null) {
        aNode = posIndex.get(bNode._key);
      }
    }
    if (aNode === undefined) {
      result += renderVNode(bNode, context);
    } else {
      result += patchVNode(aNode, bNode, context);
    }
  }

  return result;
}

/**
 * renderToString renders Virtual DOM to string.
 *
 * @param node Virtual DOM.
 * @param context Current context.
 * @param blueprint When blueprint is specified, it will perform diff/patch on blueprint.
 * @returns Virtual DOM in string format.
 */
export function renderToString(
  node: VNode<any>,
  context: Context = {},
  blueprint?: BlueprintNode,
): string {
  if (blueprint === undefined) {
    return renderVNode(node, context);
  } else {
    return patchVNode(blueprint, node, context);
  }
}
