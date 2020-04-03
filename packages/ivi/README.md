# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

## Status

Maintenance mode. Bug fixes and documentation updates only.

## Quick Start

### Hello World

The easiest way to get started with ivi is to use [this basic example on CodeSandbox](https://codesandbox.io/s/qlypwvz6o6).

```js
import { _, render } from "ivi";
import { h1 } from "ivi-html";

render(
  h1(_, _, "Hello World!"),
  document.getElementById("app"),
);
```

`render()` function has a standard interface that is used in many Virtual DOM libraries. First argument is used to
specify a Virtual DOM to render, and the second one is a DOM node that will be used as a container.

Virtual DOM API in ivi is using factory functions to instantiate Virtual DOM nodes.

Factory functions for HTML elements are declared in the `ivi-html` package.

`h1()` function will instantiate a "Virtual DOM" node for a `<h1>` element.

`_` is a shortcut for an `undefined` value.

## Documentation

### Operations ("Virtual DOM")

Virtual DOM in ivi has some major differences from other implementations. Events and keys are decoupled from DOM
elements to improve composition model. Simple stateless components can be implemented as a basic immediately executed
functions, DOM events can be attached to components, fragments or any other node.

Internally, all "Virtual DOM" nodes in ivi are called operations and has a type `Op`.

```ts
type Op = string | number | OpNode | OpArray | null;
interface OpArray extends Readonly<Array<Op>> { }
```

#### Element Factories

All factory functions that create DOM elements have an interface:

```ts
type ElementFactory<T> = (className?: string, attrs?: T, children?: Op) => OpNode<ElementData<T>>;
```

`ivi-html` package contains factories for HTML elements.

`ivi-svg` package contains factories for SVG elements.

```ts
import { _, render } from "ivi";
import { div } from "ivi-html";

render(
  div(_, _, "Hello World"),
  document.getElementById("app")!,
);
```

#### Element Prototypes

Element prototypes are used to create factories for elements with predefined attributes.

```ts
import { _, elementProto, render } from "ivi";
import { input, CHECKED } from "ivi-html";

const checkbox = elementProto(input(_, { type: "checkbox" }));

render(
  checkbox(_, { checked: CHECKED(true) }),
  document.getElementById("app")!,
);
```

#### Fragments

All virtual dom nodes and component root nodes can have any number of children nodes. Fragments and dynamic children
lists can be deeply nested.

```ts
const C = component((c) => () => (
  [1, 2]
));

render(
  div(_, _, [
    [C(), C()],
    [C(), C()],
  ]),
  document.getElementById("app")!,
);
```

##### Fragments Memoization

Fragments in ivi can be memoized or hoisted like any other node. Because ivi doesn't use normalization to implement
fragments, memoized fragments will immediately short-circuit diffing algorithm.

```ts
const C = component((c) => {
  let memo;

  return (title) => (
    div(_, _, [
      h1(_, _, title),
      memo || memo = [
        span(_, _, "Static"),
        " ",
        span(_, _, "Fragment"),
      ],
    ])
  );
});
```

#### Components

All components has an interface `(component) => (props) => VDOM`.

Outer function is used to store internal state, creating dataflow pipelines, attaching hooks and creating an "update"
function. It is important that outer function doesn't have any access to the `props` to prevent unexpected
"memory leaks". `component` is an opaque object, it is used as a first argument for almost all component functions like
`invalidate()`, `useEffect()` etc.

Internal "update" function passes input data through dataflow pipelines and returns a Virtual DOM.

```js
import { _, component, invalidate, render } from "ivi";
import { h1 } from "ivi-html";

const Counter = component((c) => {
  let counter = 0;

  const ticker = useEffect(c, (interval) => {
    const id = setInterval(() => {
      counter++;
      invalidate(c);
    }, interval);
    return () => clearInterval(id);
  });

  return (interval) => (
    ticker(interval),

    div(_, _, `Counter: ${counter}`),
  );
});

render(
  Counter(1000),
  document.getElementById("app"),
);
```

```js
const Counter = component((c) => {
  let counter = 0;
  // ...
  return () => vdom;
});
```

`component()` function creates Virtual DOM factory functions for component nodes. All component factory functions has an
interface `Factory(props)`.

In the outer function we are declaring internal state `counter`.

```js
  const ticker = useEffect(c, (interval) => {
    // ...
    return () => cleanup;
  });
```

`useEffect()` creates a function that will be used to perform side effects. Side effect functions can optionally return
a cleanup function, it will be automatically invoked when component is unmounted from the document or when input
property `interval` is modified.

```js
  const ticker = useEffect(c, (interval) => {
    const id = setInterval(() => {
      counter++;
      invalidate(c);
    }, interval);
    return () => clearInterval(id);
  });
```

Side effect function `ticker()` registers a timer function that is periodically invoked and increments `counter` from
the internal state. When internal state is modified, we need to trigger an update for the component. To trigger an
update, we are using `invalidate()` function. Invalidate function will mark component as dirty and enqueue a task for
dirty checking.

Periodic timers registered with `setInterval()` function should be unregistered when they are no longer used. To
unregister periodic timer we are creating and returning a cleanup function `() => clearInterval(id)`.

```js
  return (interval) => (
    ticker(interval),

    div(_, _, `Counter: ${counter}`),
  );
```

The final step for a component is to create an "update" function, it should pass input data through dataflow pipelines
and return a Virtual DOM. Update function will be invoked when component is invalidated or component properties are
modified.

##### Stateless Components

One of the unique features in ivi is that it doesn't store any magic properties like keys on "Virtual DOM" nodes.
Decoupling magic properties from "Virtual DOM" nodes allows us to use immediately invoked functions as stateless
components.

```js
const Link = (href, children) => a("link", { href }, children);
const LINKS = [1, 2];

render(
  TrackByKey(LINKS.map((id) => (
    key(id, Link(`#${id}`, id))
  ))),
  document.getElementById("app"),
);
```

#### Events

Synthetic events subsystem is using its own two-phase event dispatching algorithm. Custom event dispatching makes it
possible to decouple event handlers from DOM elements and improve composition model.

```ts
function Events(events: EventHandler, children: Op): Op<EventsData>;

type EventHandler = EventHandlerNode | EventHandlerArray | null;
interface EventHandlerArray extends Readonly<Array<EventHandler>> { }
```

`Events()` operation is used to attach event handlers. `events` argument can be a singular event handler, `null` or
recursive array of event handlers.

```ts
import { _, Events, onClick, render } from "ivi";
import { button } from "ivi-html";

render(
  Events(onClick((ev, currentTarget) => { console.log("click"); }),
    button(_, _, "Click Me"),
  ),
  document.getElementById("app")!,
);
```

##### Stop Propagation

Event handler should return `true` value to stop event propagation.

```ts
onClick((ev) => true);
```

#### Context

```ts
interface ContextDescriptor<T> {
  get(): T;
  set(value: T, children: Op): ContextOp<T>;
}
function contextValue<T>(): ContextDescriptor<T>;
```

`contextValue()` creates context getter `get()` and operation factory for context nodes `set()`.

```ts
import { _, context, statelessComponent, render } from "ivi";
import { div } from "ivi-html";

const Value = context<string>();
const C = statelessComponent(() => Value.get());

render(
  Value.set("context value",
    C(),
  ),
  document.getElementById("app")!,
);
```

#### TrackByKey

```ts
function TrackByKey(items: Key<any, Op>[]): OpNode<Key<any, Op>[]>;
```

`TrackByKey()` operation is used for dynamic children lists.

```ts
import { _, TrackByKey, key, render } from "ivi";
import { div, span } from "ivi-html";

const items = [1, 2, 3];

render(
  div(_, _,
    TrackByKey(items.map((i) => key(i, span(_, _, i)))),
  ),
  document.getElementById("app")!,
);
```

#### Attribute Directives

By default, reconciliation algorithm assigns all attributes with `setAttribute()` and removes them with
`removeAttribute()` functions, but sometimes we need to assign properties or assign attributes from different
namespaces. To solve this problems, ivi introduces the concept of Attribute Directives, this directives can extend the
default behavior of the attributes reconciliation algorithm. It significantly reduces code complexity, because we no
longer need to bake in all this edge cases into reconciliation algorithm. Also it gives an additional escape hatch to
manipulate DOM elements directly.

There are several attribute directives defined in ivi packages:

```ts
// ivi
function PROPERTY<T>(v: T): AttributeDirective<T>;
function UNSAFE_HTML(v: string): AttributeDirective<string>;
function AUTOFOCUS(v: boolean): AttributeDirective<boolean>;

// ivi-html
function VALUE(v: string | number): AttributeDirective<string | number>;
function CONTENT(v: string | number): AttributeDirective<string | number>;
function CHECKED(v: boolean): AttributeDirective<boolean>;

// ivi-svg
function XML_ATTR(v: string | number | boolean): AttributeDirective<string | number>;
function XLINK_ATTR(v: string | number | boolean): AttributeDirective<string | number>;
```

`PROPERTY()` function creates an `AttributeDirective` that assigns a property to a property name derived from the `key`
of the attribute.

`UNSAFE_HTML()` function creates an `AttributeDirective` that assigns an `innerHTML` property to an Element.

`AUTOFOCUS()` function creates an `AttributeDirective` that triggers focus when value is updated from `undefined` or
`false` to `true`.

`VALUE()` function creates an `AttributeDirective` that assigns a `value` property to an HTMLInputElement or
HTMLTextAreaElement.

`CHECKED()` function creates an `AttributeDirective` that assigns a `checked` property to an HTMLInputElement.

`XML_ATTR()` function creates an `AttributeDirective` that assigns an attribute from XML namespace, attribute name is
derived from the `key`.

`XLINK_ATTR()` function creates an `AttributeDirective` that assigns an attribute from XLINK namespace, attribute name
is derived from the `key`.

##### Example

```ts
import { input, CHECKED } from "ivi-html";

const e = input("", { type: "checked", checked: CHECKED(true) })
```

##### Custom Attribute Directives

```ts
interface AttributeDirective<P> {
  v: P;
  u?: (element: Element, key: string, prev: P | undefined, next: P | undefined) => void;
  s?: (key: string, next: P) => void;
}
```

```ts
function updateCustomValue(element: Element, key: string, prev: number | undefined, next: number | undefined) {
  if (prev !== next && next !== void 0) {
    (element as any)._custom = next;
  }
}
```

First thing that we need to do is create an update function. Update function has 4 arguments: `element` will contain
a target DOM element, `key` is an attribute name that was used to assign this value, `prev` is a previous value and
`next` is the current value.

In this function we are just checking that the value is changed, and if it is changed, we are assigning it to the
`_custom` property.

```ts
export const CUSTOM_VALUE = (v: number): AttributeDirective<number> => ({ v, u: updateCustomValue });
```

Now we need to create a function that will be used to instantiate `AttributeDirective` objects.

#### Additional functions

##### Trigger an update

```ts
function requestDirtyCheck();
```

`requestDirtyCheck()` function requests a dirty checking.

##### Rendering virtual DOM into a document

```ts
function render(children: Op, container: Element): void;
```

`render()` function assigns a new virtual DOM root node to the `container` and requests dirty checking.

### Components

#### Virtual DOM node factory

```ts
function component(
  c: (c: Component<undefined>) => () => Op,
): () => OpNode<undefined>;

function component<P1>(
  c: (c: Component) => (p1: P1, p2: P2) => Op,
  areEqual1?: undefined extends P1 ? undefined : (prev: P1, next: P1) => boolean,
  areEqual2?: undefined extends P2 ? undefined : (prev: P2, next: P2) => boolean,
): undefined extends P1 ?
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>) :
  (undefined extends P2 ? (p1?: P1, p2?: P2) => ComponentOp<P1, P2> : (p1: P1, p2: P2) => ComponentOp<P1, P2>);
```

`component()` function creates a factory function that will instantiate component nodes. Factory function can have up
to two properties `P1` and `P2`.

By default, all components and hooks are using strict equality `===` operator as `areEqual` function.

```ts
import { _, component, Op, render } from "ivi";
import { button } from "ivi-html";

const Button = component<{ disabled?: boolean }, Op>(() => (attrs, children) => (
  button("button", attrs, children)
));

render(
  Button(_,
    "click me",
  ),
  container,
);
```

#### Hooks

##### `useEffect()`

```ts
function useEffect<P>(
  c: Component,
  hook: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useEffect()` lets you perform side effects. It is fully deterministic and executes immediately when function created
by `useEffect()` is invoked. It is safe to perform any subscriptions in `useEffect()` without losing any events.

```ts
const Timer = component<number>((c) => {
  let i = 0;
  const tick = useEffect<number>(c, (interval) => {
    const id = setInterval(() => {
      i++;
      invalidate(c);
    });
    return () => { clearInterval(id); };
  });

  return (t) => (
    tick(t),

    div(_, _, i),
  );
})
```

##### `useMutationEffect()`

```ts
function useMutationEffect<P>(
  c: Component,
  hook: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useMutationEffect()` lets you perform DOM mutation side effects. It will schedule DOM mutation task that will be
executed immediately after all DOM updates.

##### `useLayoutEffect()`

```ts
function useLayoutEffect<P>(
  c: Component,
  hook: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useLayoutEffect()` lets you perform DOM layout side effects. It will schedule DOM layout task that will be executed
after all DOM updates and mutation effects.

##### `useUnmount()`

```ts
function useUnmount(c: Component, hook: (token: UnmountToken) => void): void;
```

`useUnmount()` creates a hook that will be invoked when component is unmounted from the document.

`hook` function always receives `UNMOUNT_TOKEN` as a first argument, it can be used in micro optimizations to reduce
memory allocations.

```js
const C = component((c) => {
  const h = (p) => {
    if (p === UNMOUNT_TOKEN) {
      // unmount
    } else {
      // render
    }
  };
  useUnmount(c, h);
  return h;
});
```

#### Additional Functions

##### `invalidate()`

```ts
function invalidate(c: Component): void;
```

`invalidate()` marks component as dirty and requests dirty checking.

#### Using a Custom Hook

```js
function useFriendStatus(c) {
  let isOnline = null;

  function handleStatusChange(status) {
    isOnline = status.isOnline;
    invalidate(c);
  }

  const subscribe = useEffect(c, (friendID) => (
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange),
    () => { ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange); }
  ));

  return (friendID) => {
    subscribe(friendID);
    return isOnline;
  };
}

const FriendStatus = component((c) => {
  const getFriendStatus = useFriendStatus(c);

  return (props) => {
    const isOnline = getFriendStatus(props.friend.id);

    if (isOnline === null) {
      return "Loading...";
    }
    return isOnline ? "Online" : "Offline";
  };
});
```

##### Pass Information Between Hooks

```js
const useFilter = selector(() => query().filter());
const useEntriesByFilterType = selector((filter) => (query().entriesByFilterType(filter).result));

const EntryList = component((c) => {
  const getFilter = useFilter(c);
  const getEntriesByFilterType = useEntriesByFilterType(c);

  return () => (
    ul("", { id: "todo-list" },
      TrackByKey(getEntriesByFilterType(getFilter()).map((e) => key(e.id, EntryField(e)))),
    )
  );
});
```

### Accessing DOM Nodes

```ts
function getDOMNode(opState: OpState): Node | null;
```

`getDOMNode()` finds the closest DOM Element.

```ts
import { component, useMutationEffect, getDOMNode } from "ivi";
import { div } from "ivi-html";

const C = component((c) => {
  const m = useMutationEffect(c, () => {
    const divElement = getDOMNode(c);
    divElement.className = "abc";
  });

  return () => (m(), div());
});
```

### Observables and Dirty Checking

Observables in ivi are designed as a solution for coarse-grained change detection and implemented as a directed graph
(pull-based) with monotonically increasing clock for change detection. Each observable value stores time of the last
update and current value.

Observables can be used to store either immutable tree structures or mutable graphs. Since ivi is fully deterministic,
there isn't any value in using immutable data structures everywhere, it is better to use immutable values for small
objects and mutable data structures for collections, indexing and references to big objects.

#### Observable

```ts
interface Observable<T> {
  t: number;
  v: T;
}
type ObservableValue<T> = T extends Observable<infer U> ? U : never;
```

```ts
const value = observable(1);
```

`observable()` creates an observable value.

```ts
const value = observable(1);
assign(value, 2);
```

`assign()` assigns a new value.

```ts
const value = observable({ a: 1 });
mut(value).a = 2;
```

`mut()` updates time of the last update and returns current value.

#### Watching observable values

```ts
const value = observable(1);
const C = statelessComponent(() => watch(value));
```

`watch()` adds observable or computed values to the list of dependencies. All dependencies are automatically removed
each time component or computed value is updated.

#### Computeds

```ts
const a = observable(1);
const b = observable(2);
const sum = computed(() => watch(a) + watch(b));

sum();
// => 3
```

`computed()` creates computed value that will be evaluated lazily when it is requested.

#### Signals

Signals are observables without any values.

```ts
type Entry = ReturnType<typeof createEntry>;

const collection = observable<Entry[]>([]);
const entryPropertyChanged = signal();

function addEntry(property: number) {
  mut(collection).push(observable({ property }));
}

function entrySetProperty(entry: Entry, value: number) {
  mut(entry).property = value;
  emit(entryPropertyChanged);
}
```

`signal()` creates a new signal.

`emit()` emits a signal.

#### Watching a subset of an Observable object

```ts
const C = component((c) => {
  const get = memo((entry) => computed((prev) => {
    const v = watch(entry);
    return prev !== void 0 && prev === v.value ? prev : v.value;
  }));
  return (entry) => watch(get(entry))().value;
});
```

Computeds are using strict equality `===` as an additional change detection check. And we can use it to prevent
unnecessary computations when result value is the same.

### Portals

Portals are implemented in the `ivi-portal` package. It has a simple API:

```ts
export interface Portal {
  readonly root: Op;
  readonly entry: (children: Op) => Op;
}
function portal(rootDecorator?: (children: Op) => Op): Portal;
```

`portal()` function creates a `Portal` instance that has a `root` node and an `entry()` function. `root` node is used to
render a portal root and `entry()` function renders elements inside of a portal.

`rootDecorator` argument can be used to provide a decorator for a root node, by default it is a simple identity function
`(v) => v`.

#### Example

```ts
import { _, render, component, invalidate, Events, onClick, } from "ivi";
import { div, button } from "ivi-html";
import { portal } from "ivi-portal";

const MODAL = portal();

const App = component((c) => {
  let showModal = false;
  const showEvent = onClick(() => { showModal = true; invalidate(c); });

  return () => ([
    showModal ? MODAL.entry(div("modal", _, "This is being rendered inside the #modal-root div.")) : null,
    Events(showEvent, button(_, _, "Show modal")),
  ]);
});

render(App(), document.getElementById("app"));
render(MODAL.root, document.getElementById("modal-root"));
```

### Environment Variables

#### `NODE_ENV`

- `production` - Disables runtime checks that improve development experience.

#### `IVI_TARGET`

- `browser` - Default target.
- `evergreen` - Evergreen browsers.
- `electron` - [Electron](https://github.com/electron/electron).

#### Webpack Configuration

```js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.IVI_TARGET": JSON.stringify("browser"),
    }),
  ],
}
```

#### Rollup Configuration

```js
export default {
  plugins: [
    replace({
      values: {
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.IVI_TARGET": JSON.stringify("browser"),
      },
    }),
  ],
};
```

## Caveats

### Legacy Browsers Support

React is probably the only library that tries hard to hide all browser quirks for public APIs, almost all other
libraries claim support for legacy browsers, but what it usually means is that their test suite passes in legacy
browsers and their test suites doesn't contain tests for edge cases in older browsers. ivi isn't any different from
many other libraries, it fixes some hard issues, but it doesn't try to fix all quirks for legacy browsers.

### Component Factories Ambiguity

Stateless components implemented as immediately executed functions won't have any nodes in a "Virtual DOM" tree and
reconciliation algorithm won't be able to detect when we are rendering completely different components.

```ts
const A = () => div();
const B = () => div();
render(
  condition ? A() : B(),
  container,
);
```

In this example, when `condition` is changed, instead of completely destroying previous `<div>` element and
instantiating a new one, reconciliation algorithm will reuse `<div>` element.

### Rendering into `<body>`

Rendering into `<body>` is disabled to prevent some [issues](https://github.com/facebook/create-react-app/issues/1568).
If someone submits a good explanation why this limitation should be removed, it is possible to remove this limitation
from the code base.

### Rendering into external `Document`

Rendering into external `Document` (iframe, window, etc) isn't supported.

### Server-Side Rendering

There is no SSR.

### Synthetic Events

Synthetic events subsystem dispatches events by traversing state tree. Worst case scenario is that it will need to
traverse entire state tree to deliver an event, but it isn't the problem because it is hard to imagine an application
implemented as a huge flat list of DOM nodes.

All global event listeners for synthetic events are automatically registered when javascript is loaded. ivi is relying
on dead code elimination to prevent registration of unused event listeners. React applications has lazy event listeners
registration and all global event listeners always stay registered even when they aren't used anymore, it seems that
there aren't many issues with it, but if there is a good explanation why it shouldn't behave this way, it is possible to
add support for removing global event listeners by using dependency counters.

There are no `onMouseEnter()` and `onMouseLeave()` events, [here is an example](https://codesandbox.io/s/k9m8wlqky3) how
to implement the same behavior using `onMouseOver()` event.

`onTouchEnd()`, `onTouchMove()`, `onTouchStart()` and `onWheel()` are
[passive](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners)
event listeners. `onActiveTouchEnd()`, `onActiveTouchMove()`, `onActiveTouchStart()` and `onActiveWheel()` will add
active event listeners.

### Dirty Checking

Dirty checking provides a solution for a wide range of edge cases. Dirty checking always goes through entire state
tree, checks invalidated components, selectors, observables, propagates context values and makes it possible to
efficiently solve all edge cases with nested keyed lists, fragments, holes (`null` ops).

Dirty checking is heavily optimized and doesn't allocate any memory. To understand how much overhead to expect from
dirty checking algorithm, we can play with a stress test benchmark for dirty checking:
https://localvoid.github.io/ivi-examples/benchmarks/dirtycheck/ (all memory allocations are from `perf-monitor` counter)

This benchmark has a tree structure with 10 root containers, each container has 10 subcontainers and each subcontainer
has 50 leaf nodes. Containers are DOM elements wrapped in a stateful component node with children nodes wrapped in
`TrackByKey()` operation, each leaf node is a DOM element wrapped in a stateful component node with text child node
wrapped in a fragment and `Events()` operation, also each leaf node watches two observable values. It creates so many
unnecessary layers to get a better understanding how it will behave in the worst case scenarios.

### Unhandled Exceptions

ivi doesn't try to recover from unhandled exceptions raised from user space code. If there is an unhandled exception, it
means that there is a bug in the code and bugs lead to security issues. To catch unhandled execptions, all entry points
are wrapped with `catchError()` decorator. When unhandled exception reaches this decorator, application goes into error
mode. In error mode, all entry points are blocked because it is impossible to correctly recover from bugs.

`addErrorHandler()` adds an error handler that will be invoked when application goes into error mode.

- [Bugs Aren't Recoverable Errors!](http://joeduffyblog.com/2016/02/07/the-error-model/#bugs-arent-recoverable-errors)

### Portals

Portal implementation relies on the reconciler execution order.

Reconciler always mounts and updates nodes from right to left and this example won't work correctly:

```js
render([App(), PORTAL.root], document.getElementById("app"));
```

To fix this example, we should either place portal roots before components that use them:

```js
render([PORTAL.root, App()], document.getElementById("app"));
```

Or render them in a different container:

```js
render(App(), document.getElementById("app"));
render(PORTAL.root, document.getElementById("portal"));
```

Root nodes are always updated in the order in which they were originally mounted into the document.

### Custom Elements (Web Components)

Creating custom elements isn't supported, but there shouldn't be any problems with using custom elements.

## Examples and demo applications

### CodeSandbox

- [Hello World](https://codesandbox.io/s/vm9l368jk0)
- [Update](https://codesandbox.io/s/qx8jkjx514)
- [Components](https://codesandbox.io/s/oor080n22y)
- [Stateful Components](https://codesandbox.io/s/64m11k50rr)
- [Events](https://codesandbox.io/s/pmppl5wp70)
- [Conditional Rendering](https://codesandbox.io/s/y79nwp613j)
- [Dynamic Lists](https://codesandbox.io/s/006ol1moxp)
- [Forms](https://codesandbox.io/s/zlk18r8n03)
- [Composition](https://codesandbox.io/s/k9m8wlqky3)
- [Portals](https://codesandbox.io/s/v8z27nxk77)
- [Custom Synthetic Events](https://codesandbox.io/s/zy1wrn0j4)

### Apps

- [TodoMVC](https://github.com/localvoid/ivi-todomvc/)
- [ndx search demo](https://github.com/localvoid/ndx-demo/)
- [Snake Game](https://github.com/localvoid/ivi-examples/tree/master/packages/apps/snake/)
- [TMDb movie database](https://codesandbox.io/s/3x9x5v4kq5) by [@brucou](https://github.com/brucou)

### Benchmarks

- [JS Frameworks Benchmark](https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/ivi)
- [UIBench](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/uibench/)
- [DBMon](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/dbmon/)
- [DirtyCheck](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/dirtycheck/)

## License

[MIT](http://opensource.org/licenses/MIT)
