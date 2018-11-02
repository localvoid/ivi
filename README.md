# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi) [![CircleCI Status](https://circleci.com/gh/localvoid/ivi.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/localvoid/ivi) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

|Package      |NPM version                                                                                                  |
|-------------|-------------------------------------------------------------------------------------------------------------|
|ivi          |[![npm version](https://img.shields.io/npm/v/ivi.svg)](https://www.npmjs.com/package/ivi)                    |
|ivi-scheduler|[![npm version](https://img.shields.io/npm/v/ivi-scheduler.svg)](https://www.npmjs.com/package/ivi-scheduler)|
|ivi-html     |[![npm version](https://img.shields.io/npm/v/ivi-html.svg)](https://www.npmjs.com/package/ivi-html)          |
|ivi-svg      |[![npm version](https://img.shields.io/npm/v/ivi-svg.svg)](https://www.npmjs.com/package/ivi-svg)            |

## Features

- Declarative rendering with "Virtual DOM"
- Components
- Extensible synthetic event subsystem
- Synchronous and deterministic update algorithm with [minimum number of DOM operations](https://github.com/localvoid/ivi/blob/master/documentation/misc/children-reconciliation.md)
- Optional [scheduler](https://github.com/localvoid/ivi/blob/master/documentation/advanced/scheduler.md)
- Test utilities
- **EXPERIMENTAL** [gesture events](https://github.com/localvoid/ivi/tree/master/packages/ivi-gestures)

## Library Size

ivi has a tree shakeable API, so it can scale from simple widgets to complex desktop applications.

Size of the [basic example](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction)
bundled with [Rollup](https://github.com/rollup/rollup) and minified with
[terser](https://github.com/fabiosantoscode/terser) is just a **2.6KB** (minified+compressed).

## Quick Start

### Hello World

The easiest way to get started with ivi is to use [this basic example on CodeSandbox](https://codesandbox.io/s/qlypwvz6o6).

The smallest ivi example looks like this:

```js
import { setupScheduler, updateHandler, render } from "ivi";
import { h1 } from "ivi-html";

setupScheduler(updateHandler);

render(
  h1().t("Hello World!"),
  document.getElementById("app"),
);
```

Since ivi has a tree shakeable API, all dependencies should be imported explicity, even the basic scheduler
implementation. We don't want any unused code to be a part of the final bundle when we decide to use a full-featured
scheduler implementation.

```js
setupScheduler(updateHandler);
```

All ivi applications should start by setting up a scheduler implementation. In this code we are using `updateHandler`
from the basic scheduler. Basic scheduler is implemented in the `ivi` package.

```js
render(
  h1().t("Hello World!"),
  document.getElementById("app"),
);
```

`render()` function has a standard interface that is used in many Virtual DOM libraries. First argument is used to
specify a Virtual DOM to render, and the second one is a DOM node that will be used as a container.

Virtual DOM API in ivi is using factory functions to instantiate Virtual DOM nodes and
[method chaining](https://en.wikipedia.org/wiki/Method_chaining) to assign properties. There are different pros and cons
for this API compared to JSX.

Factory functions for HTML elements are declared in the `ivi-html` package. `h1()` function will instantiate a Virtual
DOM node for a `<h1>` element, and method `t()` is used to assign a text content.

### Components

Components API were heavily influenced by the new [React hooks API](https://reactjs.org/docs/hooks-intro.html).

There are several differences in the ivi API that solve major flaws in the React hooks API design:

- [Weird hooks rules](https://reactjs.org/docs/hooks-rules.html)
- Excessive memory allocations each time component is updated
- ["Memory leaking"](https://codesandbox.io/s/lz61v39r7) caused by
[closure context sharing](https://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html)

All components has an interface `(component) => (props) => VDOM`.

Outer function is used to store internal state, creating dataflow pipelines and attaching hooks and should return an
"update" function. It is important that outer function doesn't have any access to the `props` to prevent unexpected
"memory leaks". `component` is an opaque object, it is used as a first argument for almost all component functions like
`invalidate()`, `useEffect()` etc.

Internal "update" function passes input data through dataflow pipelines and returns a Virtual DOM.

API is slightly different from the React hooks API, but it has the same properties and the most important one is
composability.

```js
import { setupScheduler, updateHandler, component, invalidate, render } from "ivi";
import { h1 } from "ivi-html";

setupScheduler(updateHandler);

const Counter = component((c) => {
  let counter = 0;

  const ticker = useEffect((interval) => {
    const id = setInterval(() => {
      counter++;
      invalidate(c);
    }, interval);
    return () => clearInterval(id);
  });

  return (interval) => (
    ticker(interval),

    div().t(`Counter: ${counter}`),
  );
});

render(
  Counter(1000),
  document.getElementById("app"),
);
```

As always, first thing that we need to do in the ivi application is to setup a scheduler with `setupScheduler()`
function.

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
  const ticker = useEffect((interval) => {
    // ...
    return () => cleanup;
  });
```

`useEffect()` creates a function that will be used to perform side effects. Side effect functions can optionally return
a cleanup function, it will be automatically invoked when component is unmounted from the document or when input
property `interval` is modified.

```js
  const ticker = useEffect((interval) => {
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

    div().t(`Counter: ${counter}`),
  );
```

The final step for a component is to create an "update" function, it should pass input data through dataflow pipelines
and return a Virtual DOM. Update function will be invoked when component is invalidated or component properties are
modified.

## Architecture

Virtual DOM in ivi is implemented as a synchronous and deterministic single pass algorithm. The difference between
single pass and two pass algorithms is that we don't generate "patch" objects and instead of that we immediately
apply all detected changes.

One of the major ideas that heavily influenced the design of the reconciliation algorithm in ivi were that instead of
optimizing for an infinitely large number of DOM nodes, it is better to optimize for real world use cases. Optimizing
for a large number of DOM nodes doesn't make any sense, because when there is an insane number of DOM nodes in the
document, recalc style, reflow, etc will be so slow, so that application will be completely unusable. That is why
reconciliation algorithm always starts working from the root nodes in dirty checking mode. In dirty checking mode
it just checks selectors and looks for dirty components. This approach makes it easy to implement contexts, selectors,
update priorities and significantly reduces code complexity.

All data structures are optimized to make sure that they are using as least memory as possible, [bitwise operations](https://en.wikipedia.org/wiki/Bitwise_operation) with different ["hacks"](https://github.com/localvoid/ivi/blob/029adbd368acebca2501d59503c65bf34c0d2411/packages/ivi/src/vdom/sync.ts#L74) are
used everywhere in the code. All frequently accessed data structures always using the same shape, almost all call sites
in the code are [monomorphic](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html). Frequently used
DOM attributes are stored directly on the Virtual DOM nodes.

Virtual DOM nodes are storing children in circular linked lists instead of the traditional approach with arrays. With
circular linked lists, passing children as props to components or simple functions doesn't require any memory copies,
children normalization and imlicit key assignment is super cheap, there are less special cases in the children
reconciliation algorithm.

Children reconciliation algorithm is using pre-processing optimizations to improve performance for the most common use
cases. To find the minimum number of DOM operations when nodes are rearranged it is using a
[LIS](https://en.wikipedia.org/wiki/Longest_increasing_subsequence)-based algorithm.

Synthetic events are usually implemented by storing references to Virtual DOM nodes on the DOM nodes, ivi is using a
different approach that doesn't require storing any data on the DOM nodes. Event dispatcher implements two-phase event
flow and goes through Virtual DOM tree. It allows us to attach DOM events not just on elements, but also on components.

## Performance

Designing UI library with a focus on performance is quite hard, there are many different optimization goals and we need
to find a balanced solution that should produce the best possible outcome for a complex application. Simple applications
usually doesn't suffer from performance problems, so the focus should be on the architecture of complex applications.

Here is a list of different optimization goals (in random order) that we should be focusing on:

- Application code size
- Library code size
- Time to render first interactive page
- Rendering performance
- Updating performance
- Memory usage
- Garbage collection
- Reduce [impact of polymorphism](http://benediktmeurer.de/2018/03/23/impact-of-polymorphism-on-component-based-frameworks-like-react/)
- Increase probability that executed code is JITed (usually depends on the application code size)

Virtual DOM is not the best possible solution if we were trying to find a solution that focuses on direct update
performance, but small updates doesn't have any significant impact on performance, even 2x speedup that reduces time
from 0.1ms to 0.05ms will be hardly noticeable. Virtual DOM trades update performance to improve performance in many
other areas.

### Performance Benchmarks

There are no good ways how to compare performance of different libraries, and there are no good benchmarks since all
benchmarks are biased towards some type of libraries. So we need to understand how to read numbers from this biased
benchmarks.

To explain why benchmarks are biased I'll use [the most popular benchmark](https://github.com/krausest/js-framework-benchmark).
It contains implementations for many different libraries and ivi is
[among the fastest libraries](https://krausest.github.io/js-framework-benchmark/current.html) in this benchmark, even
when benchmark is biased towards libraries that use direct data bindings to connect observable data with DOM elements.

There are several key characteristics and we need to compare them with numbers from complex web applications:

- Number of DOM Elements
- Ratio of DOM Elements per Component
- Ratio of Event Handlers per DOM Element
- Ratio of Data Bindings per DOM Element
- Ratio of Components per Component Type
- Complex data transformations

As an example of a complex application I'll use Google Mail.

#### Number of DOM Elements

```
Benchmark: 8000-80000
Google Mail: ~4000
```

In some test cases of this benchmark there is an insane amount of DOM elements. Usually when there are so many DOM
elements in the document, recalc style, reflow, etc will be so slow, so it doesn't matter how fast is UI library,
application will be completely unusable.

Libraries that are using algorithms and data structures that can easily scale to any number of DOM elements will
obviously benefit from such insane numbers of DOM elements.

#### Ratio of DOM Elements per Component

```
Benchmark: +Infinity
Google Mail: ~3 (rough estimate, guessed by looking at DOM nodes in the document)
```

Since benchmark doesn't impose any strict requirements how to structure benchmark implementation, many implementations
just choosing to go with the simplest solution and implement it without any components.

Good luck figuring out how library will perform in a scenario when components are involved. And for some libraries,
components has a huge impact on performance, since they were optimized just to deal with low-level primitives.

#### Event Handlers per DOM Element

```
Benchmark: ~0.25 without event delegation
Google Mail: ~0.25
```

There also no strict requirements how to handle user interactions, some libraries are attaching event handlers to
DOM nodes and some implementations are using event delegation technique to reduce number of event handlers to 1 per
8000-80000 DOM Elements (0.000125 - 0.0000125).

Libraries like React and ivi are using synthetic events with custom event dispatcher, so behind the scenes they are
registering one native event handler per each event type, but it is an internal implementation detail and the key
difference between event delegation and synthetic events is that synthetic events doesn't break component encapsulation,
components aren't leaking any information about their DOM structure.

#### Data Bindings per DOM Element

```
Benchmark: ~0.375
Google Mail: ~2 (rough estimate, guessed by looking at DOM nodes in the document)
```

Such low number of data bindings is a huge indicator that benchmark is biased toward libraries with fine-grained direct
data bindings.

Virtual DOM libraries by design are trying to optimize for use cases when the ratio of data bindings per DOM element is
greater or equal than 1.

#### Components per Component Types

It is hard to guess how many different component types are used in Google Mail, but if it is like any other complex
application, the ratio of components per component type shouldn't be too high.

Benchmark implementations with zero components are obviously have zero component types. When there are no components,
libraries that generate "optimal" code and don't care about the size of the generated code, and the amount of different
code paths will have an advantage in a microbenchmark like this.

But in a complex application it maybe worthwile to reduce the amount of the generated code instead of trying to optimize
micro updates by a couple of microseconds. Virtual DOM libraries are usually have a compact code, because they are using
a single code path for creating and updating DOM nodes, with no additional code for destroying DOM nodes. Single code
path has an additional advantage that it has a higher chances that this code path will be JITed earlier.

#### Complex data transformations

Since there are no complex data transformation in the benchmark, it is an ideal situation for libraries with
fine-grained direct data bindings. Just bind an observable value to DOM nodes directly and all problems are solved.

But in real applcations there are complex data transformation that lose all information about data changes, servers are
sending data snapshots that doesn't contain any information how nodes should be rearranged and many other use cases.

## Documentation

### Virtual DOM

Virtual DOM API is using factory functions to instantiate Virtual DOM nodes and
[method chaining](https://en.wikipedia.org/wiki/Method_chaining) to assign properties.

```ts
import { onClick } from "ivi";
import { div } from "ivi-html";

const node = div("node-class", { id: "unique-id" })
  .e(onClick((ev) => { console.log("click"); }));
```

In this example, virtual DOM node is created with a `div()` function, this node will represent a `<div />` element.
Method `e()` is used to assign events.

All factory functions that create DOM elements have an interface:

```ts
type VNodeElementFactory<T, N extends Element> = (className?: string, attrs?: T, style?: CSSStyleProps) => VNode<T, N>;
```

#### Methods

```ts
interface VNode<P> {
  k(key: any): this;
  e(events: Array<EventHandler | null> | EventHandler | null): this;
  t(text: string | number): this;
  c(...children: Array<VNode<any> | string | number | null>): this;
}
```

Method `k()` is used to assign keys, they are used to uniquely identify virtual nodes among its siblings.

Method `e()` is used to assign events.

Method `t()` assigns a text content to a virtual dom node.

Method `c()` is a variadic method and accepts variable number of children. Children argument can be a string, number,
virtual dom node or a collection of virtual dom nodes created with functions like `map()`, `mapRange()`, `mapIterable()`
or `fragment()`.

#### Children collections

```ts
function fragment(...args: Array<VNode | string | number | null>): VNode | null;
```

`fragment()` is a variadic function that creates a fragment children collection.

```ts
function Button(slot) {
  return div("button").c(slot);
}

render(
  Button(
    fragment(
      span().c("Click"),
      " ",
      span().c("Me"),
    ),
  ),
  DOMContainer,
);
```

#### Dynamic lists

```ts
function map<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U> | null): VNode<U> | null;
function mapRange<T>(start: number, end: number, fn: (idx: number) => VNode<T> | null): VNode<T> | null;
function mapIterable<T>(iterable: IterableIterator<VNode<T>>): VNode<T> | null;
```

`map()`, `mapRange()` and `mapIterable()` functions are used to generate dynamic lists with keyed elements.

`map()` creates a children collection with the results of calling a provided function on every element in the calling
array.

```ts
render(
  div().c(
    map([1, 2, 3], (item) => div().k(item)),
  ),
  DOMContainer,
);
```

`mapRange()` creates a children collection with the results of calling a provided function on every number in the
provided range.

```ts
const items = [1, 2, 3];

render(
  div().c(
    mapRange(0, items.length, (i) => div().k(items[i])),
  ),
  DOMContainer,
);
```

`mapIterable()` creates a children collection from an `IterableIterator` object.

```ts
const items = [1, 2, 3];

render(
  div().c(mapIterable(function* () {
    for (const item of items) {
      yield div().k(item);
    }
  }())),
  DOMContainer,
);
```

#### Syncable Values

By default, syncing algorithm assigns all attributes with `setAttribute()` and removes them with `removeAttribute()`,
but sometimes we need to assign properties or assign attributes from different namespaces. To solve this problems, ivi
introduces the concept of [Syncable Values](../advanced/syncable-value.md), this values can extend the default behavior
of the attribute syncing algorithm. It significantly reduces complexity, because we no longer need to bake in all this
edge cases into syncing algorithm, also it gives an additional escape hatch to manipulate DOM elements directly.

There are several syncable values defined in ivi packages:

```ts
// ivi
function PROPERTY<T>(v: T | undefined): SyncableValue<T>;
function UNSAFE_HTML(v: string | undefined): SyncableValue<string>;

// ivi-html
function VALUE(v: string | number | undefined): SyncableValue<string | number>;
function CHECKED(v: boolean | undefined): SyncableValue<boolean>;

// ivi-svg
function XML_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean>;
function XLINK_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean>;

// ivi-scheduler
function AUTOFOCUS(v: boolean | undefined): SyncableValue<boolean>;
```

`PROPERTY()` function creates a SyncableValue that assigns a property to a property name derived from the `key`
of the attribute.

`UNSAFE_HTML()` function creates a SyncableValue that assigns an `innerHTML` property to an Element.

`VALUE()` function creates a SyncableValue that assigns a `value` property to an HTMLInputElement or HTMLTextAreaElement.

`CHECKED()` function creates a SyncableValue that assigns a `checked` property to an HTMLInputElement.

`XML_ATTR()` function creates a SyncableValue that assigns an attribute from XML namespace, attribute name is
derived from the `key`.

`XLINK_ATTR()` function creates a SyncableValue that assigns an attribute from XLINK namespace, attribute name
is derived from the `key`.

`AUTOFOCUS()` function creates a SyncableValue that triggers focus when value is synced from `undefined` or `false` to
`true`.

##### Example

```ts
import { input, CHECKED } from "ivi-html";

const e = input("", { type: "checked": CHECKED(true) })
```

#### Additional functions

##### Retrieve DOM instance from a virtual DOM node

```ts
function getDOMNode<T extends Node>(node: VNode<any, T>): T | null;
```

`getDOMNode()` retrieves a closest DOM node from a virtual DOM node. This method works with any node type.

##### Retrieve Component instance from a virtual DOM node

```ts
function getComponent<T extends Component<any>>(node: VNode): T | null;
```

`getComponent()` retrieves a component instance from a virtual DOM node.

##### Trigger an update

```ts
const enum InvalidateFlags {
  /**
   * Forces synchronous update.
   */
  RequestSyncUpdate = 1,
}

function update(flags?: InvalidateFlags);
```

`update()` function triggers update handler that performs dirty checking.

##### Rendering virtual DOM into a document

```ts
function render(node: VNode<any> | null, container: Element, flags?: InvalidateFlags): void;
```

`render()` function assigns a new virtual DOM root node to the `container` and performs dirty checking.

### Components

#### Virtual DOM node factory

```ts
function component(
  c: (c: Component<undefined>) => () => VNode,
): () => VNode<undefined>;

function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;
```

`component()` function creates a factory function that will instantiate virtual DOM nodes for the component.

```ts
import { component } from "ivi";

const Hello = component<string>(() => (text) = div().t(`Hello ${text}`));
```

#### Hooks

##### `useEffect()`

```ts
function useEffect<P>(
  c: Component,
  hook: (props: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useEffect()` lets you perform side effects, it replaces `componentDidMount()`, `componentWillUnmount()` and
`componentDidUpdate()` methods of a class-based components API.

##### `useSelect()`

```ts
function useSelect<T>(
  c: Component,
  selector: (props?: undefined, context?: undefined, prev?: T | undefined) => T,
): () => T;
function useSelect<T, P>(
  c: Component,
  selector: (props: P, context?: undefined, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
function useSelect<T, P, C>(
  c: Component,
  selector: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
```

`useSelect()` creates a selector hook.

Selectors are used for sideways data loading and accessing current context.

```js
const Pixel = component((c) => {
  const getColor = useSelect(c, (i, { colors }) => colors[i]);

  return (i) => span("pixel", _, { "background": getColor(i) });
});
```

##### `useDetached()`

```ts
function useDetached(c: Component, hook: () => void): void;
```

`useDetached()` creates a hook that will be invoked when component is detached from the document.

#### Additional Functions

##### `invalidate()`

```ts
function invalidate<P>(c: Component<P>, flags?: InvalidateFlags): void;
```

`invalidate()` marks component as dirty and triggers an update.

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
      return t("Loading...");
    }
    return t(isOnline ? "Online" : "Offline");
  };
});
```

##### Pass Information Between Hooks

```js
const EntryList = component((c) => {
  const getFilter = useSelect(c, () => query().filter());
  const getEntriesByFilterType = useSelect(c, (filter) => (query().entriesByFilterType(filter).result));

  return () => (
    ul("", { id: "todo-list" }).c(
      map(getEntriesByFilterType(getFilter()), (e) => EntryField(e).k(e.value.id))
    )
  );
});
```

### Examples and demo applications

#### Boilerplate

- [Basic Boilerplate](https://github.com/localvoid/ivi-boilerplate/)

#### Basic

- [Introduction](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction/)
- [Stateful Component](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/02_stateful_component/)
- [Events](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/03_events/)
- [Forms](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/04_forms/)
- [Collapsable](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/05_collapsable/)

#### Apps

- [TodoMVC](https://github.com/localvoid/ivi-todomvc/)
- [ndx search demo](https://github.com/localvoid/ndx-demo/)
- [Snake Game](https://github.com/localvoid/ivi-examples/tree/master/packages/apps/snake/)

#### Benchmarks

- [UIBench](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/uibench/)
- [DBMon](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/dbmon/)
- [10k Components](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/10k/)

## License

[MIT](http://opensource.org/licenses/MIT)
