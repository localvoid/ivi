import { Box } from "../core/box";
import { EventHandler } from "../events/event_handler";
import { NodeFlags } from "./node_flags";
import { StateNode } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor } from "./component";

/**
 * Operation type.
 */
export interface OpType {
  /**
   * See {@link NodeFlags} for details.
   */
  readonly flags: NodeFlags;
  /**
   * Operation type descriptor.
   */
  readonly descriptor: ComponentDescriptor | ElementProtoDescriptor | string | null;
}

/**
 * createOpType creates {@link OpType} instances.
 *
 * @param flags See {@link NodeFlags} for details.
 * @param descriptor Operation type descriptor.
 * @returns {@link OpType} instance.
 */
export const createOpType = (
  flags: NodeFlags,
  descriptor: ComponentDescriptor | ElementProtoDescriptor | string | null,
): OpType => ({ flags, descriptor });

/**
 * OpType for Events nodes.
 */
export const EVENTS = createOpType(NodeFlags.Events, null);

/**
 * OpType for Ref nodes.
 */
export const REF = createOpType(NodeFlags.Ref, null);

/**
 * OpType for Context nodes.
 */
export const CONTEXT = createOpType(NodeFlags.Context, null);

/**
 * OpType for TrackByKey nodes.
 */
export const TRACK_BY_KEY = createOpType(NodeFlags.TrackByKey | NodeFlags.MultipleChildren, null);

/**
 * Operation node.
 */
export interface OpNode<T = any> {
  /**
   * Operation type.
   */
  readonly type: OpType;
  /**
   * Operation data.
   */
  readonly data: T;
}

/**
 * createOpNode creates an {@link OpNode} instance.
 *
 * @param type Operation type.
 * @param data Operation data.
 * @returns {@link OpNode} instance.
 */
export const createOpNode = <T>(type: OpType, data: T): OpNode<T> => ({ type, data });

/**
 * Operation data for element operations.
 */
export interface ElementData<T = any> {
  /**
   * Element class name.
   */
  readonly className: string | undefined;
  /**
   * Element attributes.
   */
  readonly attrs: T | undefined;
  /**
   * Children operations.
   */
  readonly children: OpChildren;
}

/**
 * Children operations supported by element nodes.
 */
export type OpChildren = string | number | OpNode | RecursiveOpChildrenArray | null;

/**
 * Recursive children array operations supported by element nodes.
 */
export interface RecursiveOpChildrenArray extends Array<OpChildren> { }

/**
 * Generic operation data for simple operations.
 */
export interface OpData<T = any> {
  /**
   * Generic data.
   */
  readonly data: T;
  /**
   * Child operation.
   */
  readonly child: OpNode | string | number | null;
}

/**
 * Operation data for Events operations.
 */
export type EventsData = OpData<EventHandler | Array<EventHandler | null> | null>;

/**
 * Operation data for Ref operations.
 */
export type RefData = OpData<Box<StateNode>>;

/**
 * Operation data for Context operations.
 */
export type ContextData = OpData<{}>;

/**
 * Operation factory for event handlers.
 *
 * @example
 *
 *     render(
 *       Events(onClick(() => { console.log("clicked"); }),
 *         ChildComponent(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param data Event handlers.
 * @param child Child operation.
 * @returns Event handler OpNode.
 */
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

/**
 * Operation factory for ref nodes.
 *
 * @example
 *
 *     const _ref = box();
 *
 *     render(
 *       Ref(_ref,
 *         div(),
 *       ),
 *       DOMContainer,
 *     );
 *
 *     getDOMNode(_ref);
 *
 * @param data Boxed value.
 * @param child Child operation.
 * @returns Ref OpNode.
 */
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
 * Operation factory for context nodes.
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
 * @param data Context object.
 * @param child Child operation.
 * @returns Context OpNode.
 */
export const Context = DEBUG ?
  (data: {}, child: OpNode | string | number | null): OpNode<ContextData> => {
    if (child !== null && typeof child === "object" && child.type === TRACK_BY_KEY) {
      throw new Error(`Invalid child OpNode, Context can't have TrackByKey as a child`);
    }
    return createOpNode(CONTEXT, { data, child });
  } :
  (data: {}, child: OpNode | string | number | null): OpNode<ContextData> => createOpNode(CONTEXT, { data, child });

/**
 * Key is an object that is used by TrackByKey operations to track operations.
 */
export interface Key<K, V> {
  /**
   * Key.
   */
  readonly k: K;
  /**
   * Value.
   */
  readonly v: V;
}

/**
 * key creates a {@link Key} instance.
 *
 * @param k Key.
 * @param v Value.
 * @returns {@link Key} instance.
 */
export const key = <K, V>(k: K, v: V): Key<K, V> => ({ k, v });

/**
 * Operation factory for track by key nodes.
 *
 * @example
 *
 *     const items = [1, 2, 3];
 *     render(
 *       TrackByKey(items.map((item) => key(item, div(_, _, item))),
 *       DOMContainer,
 *     );
 *
 * @param items Keyed operations.
 * @returns Track by key OpNode.
 */
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
