import { Box } from "ivi-shared";
import { EventHandler } from "../events/event_handler";
import { NodeFlags } from "./node_flags";
import { OpNodeState } from "./state";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor, StatelessComponentDescriptor } from "./component";

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
  readonly descriptor: StatelessComponentDescriptor | ComponentDescriptor | ElementProtoDescriptor | string | null;
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
  descriptor: StatelessComponentDescriptor | ComponentDescriptor | ElementProtoDescriptor | string | null,
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
export const TRACK_BY_KEY = createOpType(NodeFlags.TrackByKey, null);

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
  readonly children: OpChildren;
}

/**
 * Operation data for Events operations.
 */
export type EventsData = OpData<EventHandler | Array<EventHandler | null> | null>;

/**
 * Operation data for Ref operations.
 */
export type RefData = OpData<Box<OpNodeState | null>>;

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
 * @param children Child operation.
 * @returns Event handler OpNode.
 */
export const Events = (
  data: EventHandler | Array<EventHandler | null> | null,
  children: OpChildren,
): OpNode<EventsData> => createOpNode(EVENTS, { data, children });

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
 * @param children Child operation.
 * @returns Ref OpNode.
 */
export const Ref = (
  data: Box<OpNodeState | null>,
  children: OpChildren,
): OpNode<RefData> => createOpNode(REF, { data, children });

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
 * @param children Child operation.
 * @returns Context OpNode.
 */
export const Context = (
  data: {},
  children: OpChildren,
): OpNode<ContextData> => createOpNode(CONTEXT, { data, children });

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
  <T>(items: Key<T, OpChildren>[]) => {
    /* istanbul ignore else */
    if (DEBUG) {
      const keys = new Set<T>();
      for (let i = 0; i < items.length; i++) {
        const { k } = items[i];
        if (keys.has(k)) {
          throw new Error(`Invalid key, found duplicated key: ${k}`);
        }
        keys.add(k);
      }
    }
    return createOpNode(TRACK_BY_KEY, items);
  } :
  <T>(items: Key<T, OpChildren>[]) => createOpNode(TRACK_BY_KEY, items);
