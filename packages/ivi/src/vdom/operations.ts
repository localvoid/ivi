import { Box } from "../core/box";
import { EventHandler } from "../events/event_handler";
import { NodeFlags } from "./node_flags";
import { StateNode } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor } from "./component";

export interface OpType {
  readonly flags: NodeFlags;
  readonly descriptor: ComponentDescriptor | ElementProtoDescriptor | string | null;
}

export const createOpType = (
  flags: NodeFlags,
  descriptor: ComponentDescriptor | ElementProtoDescriptor | string | null,
): OpType => ({ flags, descriptor });

export const EVENTS = createOpType(NodeFlags.Events, null);
export const REF = createOpType(NodeFlags.Ref, null);
export const CONTEXT = createOpType(NodeFlags.Context, null);
export const TRACK_BY_KEY = createOpType(NodeFlags.TrackByKey | NodeFlags.MultipleChildren, null);

export interface OpNode<T = any> {
  readonly type: OpType;
  readonly data: T;
}

export const createOpNode = <T>(type: OpType, data: T): OpNode<T> => ({ type, data });

export interface ElementData<T = any> {
  readonly className: string | undefined;
  readonly attrs: T | undefined;
  readonly children: OpChildren;
}

export type OpChildren = string | number | OpNode | RecursiveOpChildrenArray | null;
export interface RecursiveOpChildrenArray extends Array<OpChildren> { }

export interface OpData<T = any> {
  readonly data: T;
  readonly child: OpNode | string | number | null;
}

export type EventsData = OpData<EventHandler | Array<EventHandler | null> | null>;
export type RefData = OpData<Box<StateNode>>;
export type ContextData = OpData<{}>;

export const Events = DEBUG ?
  (
    data: EventHandler | Array<EventHandler | null> | null,
    child: OpNode | string | number | null,
  ): OpNode<EventsData> => {
    if (child !== null && typeof child === "object" && child.type === TRACK_BY_KEY) {
      throw new Error(`Invalid child OpNode, Events can't have TrackByKey as a child`);
    }
    return createOpNode(EVENTS, { data, child });
  } :
  (
    data: EventHandler | Array<EventHandler | null> | null,
    child: OpNode | string | number | null,
  ): OpNode<EventsData> => (
      createOpNode(EVENTS, { data, child })
    );

export const Ref = DEBUG ?
  (
    data: Box<StateNode>,
    child: OpNode | string | number | null,
  ): OpNode<RefData> => {
    if (child !== null && typeof child === "object" && child.type === TRACK_BY_KEY) {
      throw new Error(`Invalid child OpNode, Ref can't have TrackByKey as a child`);
    }
    return createOpNode(REF, { data, child });
  } :
  (
    data: Box<StateNode>,
    child: OpNode | string | number | null,
  ): OpNode<RefData> => createOpNode(REF, { data, child });

/**
 * Context creates a context OpNode that will modify current context.
 *
 * @example
 *
 *     render(
 *       Context({ key: 123 },
 *         ChildComponent(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param ctx - Context object
 * @param child - child OpNode
 * @returns context OpNode
 */
export const Context = DEBUG ?
  (data: {}, child: OpNode | string | number | null): OpNode<ContextData> => {
    if (child !== null && typeof child === "object" && child.type === TRACK_BY_KEY) {
      throw new Error(`Invalid child OpNode, Context can't have TrackByKey as a child`);
    }
    return createOpNode(CONTEXT, { data, child });
  } :
  (data: {}, child: OpNode | string | number | null): OpNode<ContextData> => createOpNode(CONTEXT, { data, child });

export interface Key<K, V> {
  readonly k: K;
  readonly v: V;
}
export const key = <K, V>(k: K, v: V): Key<K, V> => ({ k, v });

export const TrackByKey = DEBUG ?
  <T>(items: Key<T, OpNode | number | string>[]) => {
    if (DEBUG) {
      const keys = new Set<T>();
      for (let i = 0; i < items.length; i++) {
        const { k, v } = items[i];
        if (keys.has(k)) {
          throw new Error(`Invalid key, found duplicated key: ${k}`);
        }
        keys.add(k);
        if (typeof v === "object" && v.type === TRACK_BY_KEY) {
          throw new Error(`Invalid child OpNode, TrackByKey can't have TrackByKey children`);
        }
      }
    }
    return createOpNode(TRACK_BY_KEY, items);
  } :
  <T>(items: Key<T, OpNode | number | string>[]) => createOpNode(TRACK_BY_KEY, items);
