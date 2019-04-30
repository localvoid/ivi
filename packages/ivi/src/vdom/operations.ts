import { EventHandler } from "../events/event_handler";
import { NodeFlags } from "./node_flags";
import { ElementProtoDescriptor } from "./element_proto";
import { ComponentDescriptor, StatelessComponentDescriptor } from "./component";
import { ContextDescriptor, ContextState } from "./context";

/**
 * Key is an object that is used by TrackByKey operations to track operations.
 *
 * @typeparam K Key type.
 * @typeparam V Value type.
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
 * Operation type.
 */
export interface OpType {
  /**
   * See {@link NodeFlags} for details.
   */
  readonly f: NodeFlags;
  /**
   * Operation type descriptor.
   */
  readonly d:
  | StatelessComponentDescriptor
  | ComponentDescriptor
  | ElementProtoDescriptor
  | ContextDescriptor
  | string
  | null;
}

/**
 * createOpType creates {@link OpType} instances.
 *
 * @param f See {@link NodeFlags} for details.
 * @param d Operation type descriptor.
 * @returns {@link OpType} instance.
 */
export const createOpType = (
  f: NodeFlags,
  d: StatelessComponentDescriptor | ComponentDescriptor | ElementProtoDescriptor | ContextDescriptor | string | null,
): OpType => ({ f, d });

/**
 * OpType for Events nodes.
 */
export const EVENTS = createOpType(NodeFlags.Events, null);

/**
 * OpType for Context state nodes.
 */
export const SET_CONTEXT_STATE = createOpType(NodeFlags.Context | NodeFlags.SetContextState, null);

/**
 * OpType for TrackByKey nodes.
 */
export const TRACK_BY_KEY = createOpType(NodeFlags.TrackByKey, null);

/**
 * Operation with a value.
 *
 * @typeparam T Operation data type.
 */
export interface ValueOp<T = any> {
  /**
   * Operation type.
   */
  readonly t: OpType;
  /**
   * Value.
   */
  readonly v: T;
}

/**
 * Container operation.
 *
 * @typeparam T Operation data type.
 */
export interface ContainerOp<T = any> extends ValueOp<T> {
  /**
   * Children.
   */
  readonly c: Op;
}

/**
 * DOM Element operation.
 *
 * @typeparam T Operation data type.
 */
export interface DOMElementOp<T = any> extends ContainerOp<T | undefined> {
  /**
   * Class name.
   */
  readonly n: string | undefined;
}

/**
 * Events operation.
 */
export type EventsOp = ContainerOp<EventHandler>;

/**
 * Context operation.
 */
export type ContextOp<T = any> = ContainerOp<T>;

/**
 * Set context state operation.
 */
export type SetContextStateOp = ContainerOp<ContextState>;

/**
 * TrackByKey operation.
 */
export type TrackByKeyOp<K = any, V = any> = ValueOp<Key<K, V>[]>;

/**
 * Component operation.
 */
export type ComponentOp<T = any> = ValueOp<T>;

/**
 * Operation node.
 */
export type OpNode =
  | ValueOp
  | ContainerOp
  | DOMElementOp
  | EventsOp
  | ContextOp
  | SetContextStateOp
  | TrackByKeyOp
  | ComponentOp;

/**
 * Operation.
 */
export type Op = string | number | OpNode | OpArray | null;

/**
 * Recursive operation array.
 */
export interface OpArray extends Array<Op> { }

/**
 * createValueOp creates a {@link ValueOp} instance.
 *
 * @typeparam T Operation data type.
 * @param t Operation type.
 * @param v Operation value.
 * @returns {@link ValueOp} instance.
 */
export const createValueOp = <T>(t: OpType, v: T): ValueOp<T> => ({ t, v });

/**
 * createContainerOp creates a {@link ContainerOp} instance.
 *
 * @typeparam T Operation data type.
 * @param t Operation type.
 * @param v Operation value.
 * @param c Operation children.
 * @returns {@link ContainerOp} instance.
 */
export const createContainerOp = <T>(t: OpType, v: T, c: Op): ContainerOp<T> => ({ t, v, c });

/**
 * createDOMElementOp creates a {@link DOMElementOp} instance.
 *
 * @typeparam T Operation data type.
 * @param t Operation type.
 * @param v Operation value.
 * @param c Operation children.
 * @param n Class name.
 * @returns {@link DOMElementOp} instance.
 */
export const createDOMElementOp = <T>(
  t: OpType,
  v: T,
  c: Op,
  n: string | undefined,
): DOMElementOp<T> => ({ t, v, c, n });

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
 * @param v Event handlers.
 * @param c Children operation nodes.
 * @returns Events handler operation.
 */
export const Events = (
  v: EventHandler,
  c: Op,
): EventsOp => createContainerOp(EVENTS, v, c);

/**
 * Operation factory for set context state operation.
 *
 * @param v Context state.
 * @param c Children operation nodes.
 * @returns Set context state operation.
 */
export const SetContextState = (
  v: ContextState,
  c: Op,
): SetContextStateOp => createContainerOp(SET_CONTEXT_STATE, v, c);

/**
 * key creates a {@link Key} instance.
 *
 * @typeparam K Key type.
 * @typeparam V Value type.
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
 * @typeparam K Key type.
 * @param items Keyed operations.
 * @returns Track by key operation.
 */
export const TrackByKey = process.env.NODE_ENV !== "production" ?
  <T>(items: Key<T, Op>[]) => {
    const keys = new Set<T>();
    for (let i = 0; i < items.length; i++) {
      const { k } = items[i];
      if (keys.has(k)) {
        throw new Error(`Invalid key, found duplicated key: ${k}`);
      }
      keys.add(k);
    }
    return createValueOp(TRACK_BY_KEY, items);
  } :
  /* istanbul ignore next */ <T>(items: Key<T, Op>[]) => createValueOp(TRACK_BY_KEY, items);
