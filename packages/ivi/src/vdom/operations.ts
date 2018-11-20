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

const EVENTS = createOpType(NodeFlags.Events, null);
const REF = createOpType(NodeFlags.Ref, null);
const CONTEXT = createOpType(NodeFlags.Context, null);
const TRACK_BY_KEY = createOpType(NodeFlags.TrackByKey | NodeFlags.MultipleChildren, null);

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
  readonly child: OpNode;
}

export interface Ref<T> {
  v: T;
}

export type EventsData = OpData<EventHandler | Array<EventHandler | null> | null>;
export type RefData = OpData<Ref<StateNode>>;
export type ContextData = OpData<{}>;

export const Events = (
  data: EventHandler | Array<EventHandler | null> | null, child: OpNode,
): OpNode<EventsData> => (
    createOpNode(EVENTS, { data, child })
  );

export const Ref = (data: Ref<StateNode>, child: OpNode): OpNode<RefData> => createOpNode(REF, { data, child });
export const Context = (data: {}, child: OpNode): OpNode<ContextData> => createOpNode(CONTEXT, { data, child });

export interface Key<K, V> {
  readonly k: K;
  readonly v: V;
}
export const key = <K, V>(k: K, v: V): Key<K, V> => ({ k, v });

export const TrackByKey = (items: Key<any, OpNode | number | string>[]) => createOpNode(TRACK_BY_KEY, items);
