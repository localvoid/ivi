import { VNodeFlags } from "./flags";
import { StatefulComponent, StatelessComponent } from "./component";
import { VNode } from "./vnode";
import { ConnectDescriptor } from "./connect_descriptor";

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => h.div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render render function.
 * @returns factory that produces stateless component nodes.
 */
export function statelessComponent(c: () => VNode): () => VNode<undefined>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => h.div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render render function.
 * @returns factory that produces stateless component nodes.
 */
export function statelessComponent<P>(
  render: undefined extends P ? (props?: P) => VNode<any> : (props: P) => VNode<any>,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * statelessComponent creates a virtual DOM node factory that produces nodes for stateless components.
 *
 *     const A = statelessComponent<{ text: string }>(
 *       (props) => h.div().c(props.text),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param render render function.
 * @returns factory that produces stateless component nodes.
 */
export function statelessComponent<P>(render: (props: P) => VNode<any>): (props: P) => VNode<P> {
  const d = { render, shouldUpdate: null };
  const f = function (props: P): VNode<P> {
    const n = new VNode<P>(
      VNodeFlags.StatelessComponent,
      d,
      props,
      void 0,
      null,
    );
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * withShouldUpdate creates a virtual DOM node factory that produces nodes for stateless components with custom
 * `shouldUpdate` function to prevent unnecessary updates.
 *
 *     const A = withShouldUpdate<{ text: string }>(
 *       (prevProps, nextProps) => prevProps.text !== nextProps.text,
 *       statelessComponent(
 *         (props) => h.div().c(props.text),
 *       ),
 *     );
 *
 *     render(
 *       A({ text: "Hello" }),
 *       DOMContainer,
 *     );
 *
 * @param shouldUpdate function that performs an early check that prevent unnecessary updates.
 * @param factory factory that produces stateless component nodes.
 * @returns factory that produces stateless component nodes.
 */
export function withShouldUpdate<P>(
  shouldUpdate: (oldProps: P, newProps: P) => boolean,
  factory: (props: P) => VNode<P>,
): (props: P) => VNode<P> {
  const v = factory(null as any);
  const d = { render: (v.tag as StatelessComponent<P>).render, shouldUpdate };
  const f = function (props: P): VNode<P> {
    const n = new VNode<P>(
      VNodeFlags.StatelessComponent | VNodeFlags.ShouldUpdateHint,
      d,
      props,
      void 0,
      null,
    );
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 *     const A = component(class extends Component<string> {
 *       onClick = Events.onClick(() => console.log(this.props));
 *
 *       render() {
 *         return (
 *           h.button()
 *             .e(this.onClick)
 *             .c("Click Me")
 *         );
 *       }
 *     });
 *
 *     render(
 *       A("clicked"),
 *       DOMContainer,
 *     );
 *
 * @param c stateful component.
 * @returns factory that produces stateful component nodes.
 */
export function statefulComponent(c: StatefulComponent<undefined>): () => VNode<undefined>;

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 *     const A = component(class extends Component<string> {
 *       onClick = Events.onClick(() => console.log(this.props));
 *
 *       render() {
 *         return (
 *           h.button()
 *             .e(this.onClick)
 *             .c("Click Me")
 *         );
 *       }
 *     });
 *
 *     render(
 *       A("clicked"),
 *       DOMContainer,
 *     );
 *
 * @param c stateful component.
 * @returns factory that produces stateful component nodes.
 */
export function statefulComponent<P>(
  c: StatefulComponent<P>,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * statefulComponent creates a virtual DOM node factory that produces nodes for stateful components.
 *
 *     const A = component(class extends Component<string> {
 *       onClick = Events.onClick(() => console.log(this.props));
 *
 *       render() {
 *         return (
 *           h.button()
 *             .e(this.onClick)
 *             .c("Click Me")
 *         );
 *       }
 *     });
 *
 *     render(
 *       A("clicked"),
 *       DOMContainer,
 *     );
 *
 * @param c stateful component.
 * @returns factory that produces stateful component nodes.
 */
export function statefulComponent<P>(
  c: StatefulComponent<P>,
): (props: P) => VNode<P> {
  const f = function (props: P): VNode<P> {
    const n = new VNode<P>(
      VNodeFlags.StatefulComponent,
      c,
      props,
      void 0,
      null,
    );
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}

/**
 * context creates a virtual DOM node that will modify current context.
 *
 *     render(
 *       context({ key: 123 },
 *         ChildComponent(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param ctx context object.
 * @param child child node.
 * @returns context node.
 */
export function context<T = {}>(ctx: T, child: VNode): VNode<T> {
  /* istanbul ignore else */
  if (DEBUG) {
    if (child.prev !== child) {
      throw new Error("Context node contains an invalid child. Child should be a singular VNode.");
    }
  }
  return new VNode<T>(
    VNodeFlags.UpdateContext,
    null,
    ctx,
    void 0,
    child,
  );
}

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (prev, props, context) => {
 *         const result = context.result;
 *
 *         return (prev !== null && prev === result) ? prev :
 *           result;
 *       },
 *       (text) => h.div().c(text),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select selector function.
 * @param render render function.
 * @returns factory that produces connector nodes.
 */
export function connect<T>(
  select: (prev: T | null) => T,
  render: (props: T) => VNode<any>,
): () => VNode<undefined>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (prev, props, context) => {
 *         const result = context.result;
 *
 *         return (prev !== null && prev === result) ? prev :
 *           result;
 *       },
 *       (text) => h.div().c(text),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select selector function.
 * @param render render function.
 * @returns factory that produces connector nodes.
 */
export function connect<T, P>(
  select: undefined extends P ? (prev: T | null, props?: P) => T : (prev: T | null, props: P) => T,
  render: (props: T) => VNode<any>,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (prev, props, context) => {
 *         const result = context.result;
 *
 *         return (prev !== null && prev === result) ? prev :
 *           result;
 *       },
 *       (text) => h.div().c(text),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select selector function.
 * @param render render function.
 * @returns factory that produces connector nodes.
 */
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  render: (props: T) => VNode<any>,
): undefined extends P ? () => VNode<P> : (props: P) => VNode<P>;

/**
 * connect creates a virtual DOM node factory that produces connector nodes.
 *
 *     const Connector = connect<string, undefined, { result: string }>(
 *       (prev, props, context) => {
 *         const result = context.result;
 *
 *         return (prev !== null && prev === result) ? prev :
 *           result;
 *       },
 *       (text) => h.div().c(text),
 *     );
 *
 *     render(
 *       context({ result: "text" },
 *         Connector(),
 *       ),
 *       DOMContainer,
 *     );
 *
 * @param select selector function.
 * @param render render function.
 * @returns factory that produces connector nodes.
 */
export function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  render: (props: T) => VNode<any>,
): (props: P) => VNode<P> {
  const descriptor = { select, render };
  const f = function (props: P): VNode<P> {
    const n = new VNode<P>(
      VNodeFlags.Connect,
      descriptor as ConnectDescriptor<any, any, {}>,
      props,
      void 0,
      null,
    );
    /* istanbul ignore else */
    if (DEBUG) {
      n.factory = f;
    }
    return n;
  };
  return f;
}
