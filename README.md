# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi) [![CircleCI Status](https://circleci.com/gh/localvoid/ivi.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/localvoid/ivi) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

|Package      |NPM version                                                                                                  |
|-------------|-------------------------------------------------------------------------------------------------------------|
|ivi          |[![npm version](https://img.shields.io/npm/v/ivi.svg)](https://www.npmjs.com/package/ivi)                    |
|ivi-html     |[![npm version](https://img.shields.io/npm/v/ivi-html.svg)](https://www.npmjs.com/package/ivi-html)          |
|ivi-svg      |[![npm version](https://img.shields.io/npm/v/ivi-svg.svg)](https://www.npmjs.com/package/ivi-svg)            |

## Features

- Declarative rendering with "Virtual DOM"
- Powerful [composition model](https://codesandbox.io/s/k9m8wlqky3)
- [Immutable](#immutable-virtual-dom) "Virtual DOM"
- [Fragments](#fragments)
- [Components](#components)
- Extensible synthetic event subsystem
- Synchronous and deterministic reconciliation algorithm with [minimum number of DOM operations](#children-reconciliation)
- Test utilities
- **EXPERIMENTAL** [gesture events](https://github.com/localvoid/ivi/tree/master/packages/ivi-gestures)

## Library Size

ivi has a tree shakeable API, so it can scale from simple widgets to complex desktop applications.

Size of the [basic example](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction)
bundled with [Rollup](https://github.com/rollup/rollup) and minified with
[terser](https://github.com/fabiosantoscode/terser) is just a **3.1KB** (minified+compressed).

Size of the [TodoMVC](https://github.com/localvoid/ivi-todomvc) application is **5.5KB** (minified+compressed).

## Quick Start

### Hello World

The easiest way to get started with ivi is to use [this basic example on CodeSandbox](https://codesandbox.io/s/qlypwvz6o6).

The smallest ivi example looks like this:

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

Factory functions for HTML elements are declared in the `ivi-html` package. `h1()` function will instantiate a Virtual
DOM node for a `<h1>` element.

`_` is a shortcut for an `undefined` value.

### Components

Components API were heavily influenced by the new [React hooks API](https://reactjs.org/docs/hooks-intro.html).

There are several differences in the ivi API because we don't need to support concurrent rendering, and because of it we
could try to solve some flaws in the React hooks API design:

- [Hooks rules](https://reactjs.org/docs/hooks-rules.html)
- Excessive memory allocations each time component is updated
- ["Memory leaking"](https://codesandbox.io/s/lz61v39r7) caused by
[closure context sharing](https://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html)

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

  const ticker = useEffect((interval) => {
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

    div(_, _, `Counter: ${counter}`),
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
in the code are [monomorphic](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html).

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

Virtual DOM is not the best possible solution if we were trying to find a solution that focuses on small updates
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
Benchmark: ~0.25 (some implementations are using workarounds to reduce it to 0.125)
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

Virtual DOM in ivi has some major differences from other implementations. Events and keys are implemented as a
special nodes instead of attributes. Using special nodes instead of attributes improves composition patterns, simple
stateless components can be implemented as a basic immediately executed functions, DOM events can be attached to
components, fragments or any other node.

Internally, all "Virtual DOM" nodes in ivi are called operations and has a type `Op`.

```ts
type Op = string | number | OpNode | OpArray | null;
interface OpArray extends Array<Op> { }
```

#### Immutable Virtual DOM

When I've implemented my first virtual dom library in 2014, I've used mutable virtual dom nodes and I had no idea how to
efficiently implement it otherwise, since that time many other virtual dom libraries just copied this terrible idea, and
now it is [everywhere](https://vuejs.org/v2/guide/render-function.html#Constraints). Some libraries are using different
workarounds to hide that they are using mutable virtual dom nodes, but this workarounds has hidden costs when mutable
nodes are passed around.

ivi is using immutable virtual dom like React does, and it is still has an extremely fast reconciler, there are no any
hidden costs, zero normalization passes, nothing gets copied when dealing with edge cases.

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

#### Fragments

All virtual dom nodes and component root nodes can have any number of children nodes. Fragments and dynamic children
lists can be deeply nested. All dynamic children lists are using their own key namespaces to prevent key collisions.

#### Events

```ts
function Events(events: EventHandler, children: Op): Op<EventsData>;

type EventHandler = EventHandlerNode | EventHandlerArray | null;
interface EventHandlerArray extends Array<EventHandler> { }
```

`Events()` operation is used to attach event handlers. `events` argument can be a singular event handler, `null` or
recursive array of event handlers.

```ts
import { _, Events, onClick, render } from "ivi";
import { button } from "ivi-html";

render(
  Events(onClick((ev) => { console.log("click"); }),
    button(_, _, "Click Me"),
  ),
  document.getElementById("app")!,
);
```

#### Context

```ts
function Context(data: {}, children: Op): OpNode<ContextData>;
```

`Context()` operation is used to assign context.

```ts
import { _, Context, component, render } from "ivi";
import { div } from "ivi-html";

const C = component((c) => {
  const getContextValue = useSelect<_, { key: string }>((props, ctx) => ctx.key);

  return () => div(_, _, getContextValue());
});

render(
  Context({ key: "value" },
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
function PROPERTY<T>(v: T | undefined): AttributeDirective<T>;
function UNSAFE_HTML(v: string | undefined): AttributeDirective<string>;
function AUTOFOCUS(v: boolean | undefined): AttributeDirective<boolean>;

// ivi-html
function VALUE(v: string | number | undefined): AttributeDirective<string | number>;
function CHECKED(v: boolean | undefined): AttributeDirective<boolean>;

// ivi-svg
function XML_ATTR(v: string | number | boolean | undefined): AttributeDirective<string | number | boolean>;
function XLINK_ATTR(v: string | number | boolean | undefined): AttributeDirective<string | number | boolean>;
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
export interface AttributeDirective<P> {
  v: P | undefined;
  s: (element: Element, key: string, prev: P | undefined, next: P | undefined) => void;
}
```

```ts
function updateCustomValue(element: Element, key: string, prev: number | undefined, next: number | undefined) {
  if (prev !== next) {
    (element as any)._custom = next;
  }
}
```

First thing that we need to do is to create an update function. Update function has 4 arguments: `element` will contain
a target DOM element, `key` is an attribute name that was used to assign this value, `prev` is a previous value and
`next` is the current value.

In this function we are just checking that the value is changed, and if it is changed, we are assigning it to the
`_custom` property.

```ts
export function CUSTOM_VALUE(v: number | undefined): AttributeDirective<number> {
  return (v === undefined) ? ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED : { v, u: syncCustomValue };
}
```

Now we need to create a function that will be used to instantiate `AttributeDirective` objects. In this function we are
using predefined `ATTRIBUTE_VALUE_SKIP_UNDEFINED` attribute directive to ignore updates when the value is `undefined`,
otherwise we are creating a new `AttributeDirective` object with the value `v` and update function `updateCustomValue`.

###### Predefined Attribute Directives

```ts
const ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED: AttributeDirective<any>;
const ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED: AttributeDirective<any>;
```

`ATTRIBUTE_DIRECTIVE_SKIP_UNDEFINED` has `undefined` value with `NOOP` synchronization function.

`ATTRIBUTE_DIRECTIVE_REMOVE_ATTR_UNDEFINED` has `undefined` value and it will remove `key` attribute from the DOM
element.

#### Additional functions

##### Trigger an update

```ts
const enum UpdateFlags {
  /**
   * Forces synchronous update.
   */
  RequestSyncUpdate = 1,
}

function requestDirtyCheck(flags?: UpdateFlags);
```

`requestDirtyCheck()` function requests a dirty checking.

##### Rendering virtual DOM into a document

```ts
function render(children: Op, container: Element, flags?: UpdateFlags): void;
```

`render()` function assigns a new virtual DOM root node to the `container` and requests dirty checking.

### Components

#### Virtual DOM node factory

```ts
function component(
  c: (c: Component<undefined>) => () => OpChildren,
): () => OpNode<undefined>;

function component<P>(
  c: (c: Component<P>) => (props: P) => OpChildren,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => OpNode<P> : (props: P) => OpNode<P>;
```

`component()` function creates a factory function that will instantiate component nodes.

By default, all components and hooks are using strict equality `===` operator as a `shouldUpdate` function.

```ts
import { _, component } from "ivi";
import { div } from "ivi-html";

const Hello = component<string>(() => (text) = div(_, _, `Hello ${text}`));
```

#### Hooks

##### `useEffect()`

```ts
function useEffect<P>(
  c: StateNode,
  hook: (props: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useEffect()` lets you perform side effects, it replaces `componentDidMount()`, `componentWillUnmount()` and
`componentDidUpdate()` methods of a class-based components API.

##### `useMutationEffect()`

```ts
function useMutationEffect<P>(
  c: StateNode,
  hook: (props: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useMutationEffect()` lets you perform DOM mutation side effects.

##### `useLayoutEffect()`

```ts
function useLayoutEffect<P>(
  c: StateNode,
  hook: (props: P) => (() => void) | void,
  shouldUpdate?: (prev: P, next: P) => boolean,
): (props: P) => void;
```

`useLayoutEffect()` lets you perform DOM layout side effects.

##### `useSelect()`

```ts
function useSelect<T>(
  c: StateNode,
  selector: (props?: undefined, context?: undefined, prev?: T | undefined) => T,
): () => T;
function useSelect<T, P>(
  c: StateNode,
  selector: (props: P, context?: undefined, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
function useSelect<T, P, C>(
  c: StateNode,
  selector: (props: P, context: C, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
```

`useSelect()` creates a selector hook.

Selectors are used for sideways data accessing or retrieving data from the current context. It is a low-level and more
flexible alternative to redux connectors.

```js
const Pixel = component((c) => {
  const getColor = useSelect(c, (i, { colors }) => colors[i]);

  return (i) => span("pixel", { style: { background: getColor(i) }});
});
```

##### `useUnmount()`

```ts
function useUnmount(c: Component, hook: () => void): void;
```

`useUnmount()` creates a hook that will be invoked when component is unmounted from the document.

#### Additional Functions

##### `invalidate()`

```ts
function invalidate(c: Component, flags?: UpdateFlags): void;
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

### Synthetic Events

Synthetic events subsystem is using its own two-phase event dispatching algorithm. With custom event dispatching
algorithm it is possible to create new events like "click outside", gestures and DnD events.

#### Event Handler

Event Handler is an object that contains information about `EventDispatcher` that is used for dispatching events
and a handler function that will be executed when dispatcher fires an event.

`ivi` package provides event handler factories for all native events.

```ts
import { onClick, onKeyDown } from "ivi";

const click = onClick((ev) => { console.log("clicked"); });
const keyDown = onKeyDown((ev) => { console.log("Key Down"); });
```

#### Example

```ts
import { _, component, render, Events, onClick } from "ivi";
import { div } from "ivi-html";

const C = component((c) => {
  let counter1 = 0;
  let counter2 = 0;

  // There are no restrictions in number of attached event handlers with the same type, it is possible to attach
  // multiple `onClick` event handlers.
  const events = [
    onClick((ev) => {
      counter1++;
      invalidate(c);
    }),
    onClick((ev) => {
      counter2++;
      invalidate(c);
    }),
  ]);

  return () => (
    Events(events,
      div(_, _, `Clicks: [${counter1}] [${counter2}]`),
    )
  );
});

render(
  Events(onClick(() => { console.log("event handler attached to component"); }),
    C(),
  ),
  document.getElementById("app"),
);
```

### Children Reconciliation

Children reconciliation algorithm in ivi works in a slightly different way than
[React children reconciliation](https://facebook.github.io/react/docs/reconciliation.html).

There are two types of children lists: static fragments (basic arrays) and dynamic children lists (`TrackByKey()`
nodes).

Static fragments can't have variable number of nodes, to remove node from a static fragment it should be
replaced with a hole `null`. When fragments length is changed, previous fragment will be completely destroyed and new
one instantiated, in majority of use cases this heuristics is way much better than appending/removing nodes at the end.
Static fragments can have deeply nested fragments or dynamic children lists and each fragment is used as a completely
separate entity.

Dynamic children lists are wrapped in a `TrackByKey()` nodes, each node in dynamic children list should be wrapped in a
`Key` object that should contain unique key. Dynamic children list algorithm is using a
[LIS](https://en.wikipedia.org/wiki/Longest_increasing_subsequence)-based algorithm to find a minimum number of DOM
operations.

Finding a minimum number of DOM operations is not just about performance, it is also about preserving internal state
of DOM nodes. Moving DOM nodes isn't always a side-effect free operation, it may restart animations, drop focus, reset
scrollbar positions, stop video playback, collapse IME etc.

#### Defined Behaviour

This is the behaviour that you can rely on when thinking how reconciliation algorithm will update dynamic children
lists.

- Inserted nodes won't cause any nodes to move.
- Removed nodes won't cause any nodes to move.
- Moved nodes will be rearranged in a correct positions with a minimum number of DOM operations.

#### Undefined Behaviour

Moved nodes can be rearranged in any way. `[ab] => [ba]` transformation can move node `a` or node `b`. Applications
shouldn't rely on this behaviour.

### Examples and demo applications

#### CodeSandbox

- [Hello World](https://codesandbox.io/s/vm9l368jk0)
- [Update](https://codesandbox.io/s/qx8jkjx514)
- [Components](https://codesandbox.io/s/oor080n22y)
- [Stateful Components](https://codesandbox.io/s/64m11k50rr)
- [Events](https://codesandbox.io/s/pmppl5wp70)
- [Conditional Rendering](https://codesandbox.io/s/y79nwp613j)
- [Dynamic Lists](https://codesandbox.io/s/006ol1moxp)
- [Forms](https://codesandbox.io/s/zlk18r8n03)
- [Composition](https://codesandbox.io/s/k9m8wlqky3)

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
