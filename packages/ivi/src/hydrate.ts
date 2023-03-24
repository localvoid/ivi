import {
  type SNode, type SRoot, type VAny, type VArray, type VComponent,
  type TemplateDescriptor, type Component, type ComponentDescriptor,
  type ComponentState, type ListProps, type ElementDirective,
  _Array, _isArray, Flags, RENDER_CONTEXT, _flushDOMEffects,
  nodeGetFirstChild, nodeGetLastChild, nodeGetNextSibling, nodeGetPrevSibling,
  elementAddEventListener, elementGetAttribute, createSNode, dirtyCheck,
} from "./index.js";
import {
  ChildOpCode, PropOpCode, StateOpCode, TemplateFlags,
} from "@ivi/template-compiler/format";

export const hydrate = (root: SRoot, v: VAny): void => {
  const domSlot = root.v.p;
  RENDER_CONTEXT.p = domSlot.p;
  RENDER_CONTEXT.n = domSlot.n;
  root.c = _hydrate(root, v);
  _flushDOMEffects();
  dirtyCheck(root, 0);
};

/**
 * Hydrates Node.
 *
 * @param parentSNode Parent Stateful Node.
 * @param v Stateless Node.
 * @returns Hydrated Stateful Node.
 */
const _hydrate = (parentSNode: SNode, v: VAny): SNode | null => {
  if (v !== false && v != null) {
    if (typeof v === "object") {
      if (_isArray(v)) {
        return _hydrateList(parentSNode, Flags.Array, v, v);
      } else {
        const descriptor = v.d;
        const props = v.p;
        const type = descriptor.f & (Flags.Template | Flags.Component);
        if (type === Flags.Template) {
          const ctx = RENDER_CONTEXT;
          const tplData = (descriptor as TemplateDescriptor).p1;
          const stateOpCodes = tplData.s;
          const propOpCodes = tplData.p;
          const data = tplData.d;
          const flags = tplData.f;
          const state = _Array<Node>(flags & TemplateFlags.Mask6);
          const currentDOMNode = _getCurrentDOMNode();
          state[0] = currentDOMNode;

          if (stateOpCodes.length > 0) {
            ctx.si = 0;
            _hydrateAssignTemplateSlots(
              currentDOMNode,
              stateOpCodes,
              0,
              stateOpCodes.length,
              state,
            );
          }

          if (propOpCodes.length > 0) {
            let currentElement = currentDOMNode as Element;
            for (let i = 0; i < propOpCodes.length; i++) {
              const op = propOpCodes[i];
              const type = op & (
                PropOpCode.Directive |
                PropOpCode.Property |
                PropOpCode.DiffDOMProperty |
                PropOpCode.Event
              );
              if (type) {
                const dataIndex = op >> PropOpCode.DataShift;
                if (type === PropOpCode.SetNode) {
                  currentElement = state[dataIndex] as Element;
                } else {
                  const prop = props[(op >> PropOpCode.InputShift) & PropOpCode.Mask6];
                  if (type === PropOpCode.Directive) {
                    (prop as ElementDirective)(currentElement);
                  } else {
                    const key = data[dataIndex];
                    if (type === PropOpCode.Event) {
                      elementAddEventListener.call(currentElement, key, prop);
                    } else { // type === PropOpCode.Property || type === PropOpCode.DiffDOMProperty
                      if ((currentElement as Record<string, any>)[key] !== prop) {
                        (currentElement as Record<string, any>)[key] = prop;
                      }
                    }
                  }
                }
              }
            }
          }

          const parentElement = ctx.p;
          const stateNode = createSNode(Flags.Template, v, null, state, parentSNode);
          const childrenSize = (flags >> TemplateFlags.ChildrenSizeShift) & TemplateFlags.Mask6;
          if (childrenSize > 0) {
            const childOpCodes = tplData.c;
            const children = _Array<SNode | null>(childrenSize);
            stateNode.c = children;
            ctx.p = currentDOMNode as Element;
            ctx.n = null;
            let childrenIndex = 0;
            for (let i = 0; i < childOpCodes.length; i++) {
              const childOpCode = childOpCodes[i];
              const type = childOpCode & ChildOpCode.Type;
              const value = childOpCode >> ChildOpCode.ValueShift;
              if (type === ChildOpCode.Child) {
                children[childrenIndex++] = _hydrate(stateNode, props[value]);
              } else if (type === ChildOpCode.SetNext) {
                ctx.n = state[value];
              } else { // ChildOpCode.SetParent
                ctx.p = state[value] as Element;
                ctx.n = null;
              }
            }
            ctx.p = parentElement;
          }
          ctx.n = currentDOMNode;
          return stateNode;
        } else if (type === Flags.Component) {
          const componentState: ComponentState = { r: null, u: null };
          const sNode: Component = createSNode<VComponent, ComponentState>(
            Flags.Component,
            v as VComponent,
            null,
            componentState,
            parentSNode,
          );
          const renderFn = (descriptor as ComponentDescriptor).p1(sNode);
          componentState.r = renderFn;
          sNode.c = _hydrate(sNode, renderFn(props));
          return sNode;
        }
        // List
        return _hydrateList(
          parentSNode,
          Flags.List,
          (props as ListProps).v,
          v,
        );
      }
    } else {
      const node = _getCurrentDOMNode();
      RENDER_CONTEXT.n = node;
      return createSNode(Flags.Text, v, null, node, parentSNode);
    }
  }
  return null;
};

const _getCurrentDOMNode = (): Node => {
  const ctx = RENDER_CONTEXT;
  let node: Node = (ctx.n === null)
    ? nodeGetLastChild.call(ctx.p)
    : nodeGetPrevSibling.call(ctx.n);
  while (node.nodeType === NodeType.Comment) {
    const comment = node as Comment;
    node = nodeGetPrevSibling.call(node);
    comment.remove();
  }
  return node;
};

const _hydrateList = (
  parentState: SNode,
  flags: Flags,
  children: VArray,
  vNode: VAny,
): SNode => {
  let i = children.length;
  const sChildren = _Array(i);
  const sNode = createSNode(flags, vNode, sChildren, null, parentState);
  while (i > 0) {
    sChildren[--i] = _hydrate(sNode, children[i]);
  }
  return sNode;
};

const enum NodeType {
  Element = 1,
  Text = 3,
  Cdata = 4,
  Comment = 8,
}

const _parseInt = parseInt;
const _parseOffset = (s: string, _i: number) => _parseInt(s, 16);

const _hydrateAssignTemplateSlots = (
  currentNode: Node,
  opCodes: StateOpCode[],
  offset: number,
  endOffset: number,
  state: Node[],
) => {
  const ctx = RENDER_CONTEXT;
  let exprOffsetIndex = 0;
  let exprOffsets: number[] | undefined;
  while (true) {
    const op = opCodes[offset++];
    if (op & StateOpCode.PrevExpr) {
      // Lazy getAttribute call.
      if (exprOffsets === void 0) {
        exprOffsets = elementGetAttribute.call(currentNode, "^")!
          .split(" ")
          .map(_parseOffset);
      }
      let exprOffset = exprOffsets[exprOffsetIndex++];
      while (exprOffset-- > 0) {
        currentNode = nodeGetNextSibling.call(currentNode);
        if (currentNode.nodeType === NodeType.Comment) {
          const comment = currentNode as Comment;
          currentNode = nodeGetNextSibling.call(currentNode);
          comment.remove();
        }
      }
    }
    if (op & StateOpCode.Save) {
      state[++ctx.si] = currentNode;
    }
    if (op & StateOpCode.EnterOrRemove) {
      const enterOffset = op >> StateOpCode.OffsetShift;
      // Enter offset is used to disambiguate between enter and remove
      // operations. Remove operations will always have a 0 enterOffset.
      if (enterOffset) { // Enter
        let node = nodeGetFirstChild.call(currentNode);
        _hydrateAssignTemplateSlots(
          node,
          opCodes,
          offset,
          offset += enterOffset,
          state,
        );
      } else { // Remove
        // Remove operation implies that current node is always a comment node
        // followed by a text node.
        const commentNode = currentNode as Comment;
        state[++ctx.si] = currentNode = nodeGetNextSibling.call(currentNode);
        commentNode.remove();
      }
    }
    if (offset === endOffset) {
      return;
    }
    currentNode = nodeGetNextSibling.call(currentNode);
  }
};
