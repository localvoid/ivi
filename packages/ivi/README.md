# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE)

Lightweight Embeddable Web UI library.

- The core library size is just 2.5KB.
- `f(state) => UI`
- [Precompiled](#template-compilation) templates optimized for size and
performance.
- [Small memory footprint](#memory-footprint).
- [Embeddable](#custom-scheduler)

## Basic Example

```js
import { component, invalidate } from "ivi";
import { useState } from "ivi/state";
import { createRoot, updateRoot } from "ivi/root";
import { htm } from "ivi/template";

const Counter = component((c) => {
  const [count, setCount] = useState(0);
  const inc = () => { setCount(count() + 1); };

  return () => htm`
    div.app
      div.counter ${count()}
      button @click=${inc}
        'Increment'
  `;
});

updateRoot(
  createRoot(document.getElementById("app")),
  Counter(),
);
```

## Templates

`ivi/template` module provides an interface for creating templates with
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates):

- `htm` creates a template with [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) nodes.
- `svg` creates a template with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement) nodes.

```js
htm`
div :id='app'
  h1 'Template Example'
  div.content
    ${condition ? "true" : "false"}
`
```

In this example we are creating a root element `<div id="app">` with two
children: `<h1>TemplateExample</h1>` and `<div class="content">{..}</div>`.
In an HTML it could look something like that:

```html
<div id="app">
  <h1>Template Example</h1>
  <div class="content">
    {condition ? "true" : "false"}
  </div>
</div>
```

As we can see from this example, indentation level is used for children nesting.
Also, children can be nested by declaring them on the same line as their parent,
e.g.:

```js
htm`
div 'prefix' ${expr} 'suffix'
`
```

HTML:

```html
<div>prefix{expr}suffix</div>
```

### Text Nodes

Static text nodes are declared either with `'text'` or a `#'text'#` syntax to
remove ambiguity that we can often see in HTML-like template languages:

```html
<div>
  text
  <span></span>
</div>
```

Some template languages will create text nodes with a `"prefix "` text node and
some will create a `"prefix"` text node.

```js
htm`
div
  'text'
  span
`
```

In this example we can immediately see that there won't be any whitespaces
between text node and a span element.

### Element Properties Syntax:

- [`div.classA.classB`](#class-names) - Static class names `<div class="classA classB">`
- [`div${expr}`](#class-names) - Dynamic class names `element.className = expr`
- [`div :name='value'`](#attributes) - Static attribute with a value `<div name="value">`.
- [`div :name`](#attributes) - Static attribute without a value `<div name>`.
- [`div :name=${expr}`](#attributes) - Dynamic attribute `element.setAttribute(name, expr)`.
- [`div .name=${expr}`](#properties) - Property `element[name] = expr`.
- [`div *name=${expr}`](#properties) - Property `element[name] = expr`, uses DOM value for diffing.
- [`div ~name=${expr}`](#styles) - Style `element.style.setProperty(name, expr)`
- [`div @name=${expr}`](#events) - Event `element.addEventListener(name, expr)`
- [`div =${expr}`](#text-content) - Text Content `element.textContent = expr`
- [`div $${directive}`](#directives) - Directive `directive(element)`


#### Class Names

Static class names are declared with a `.` character immediately after a tag
name:

```js
htm`
div.class-one.class-two ${expr}
`
```

HTML:

```html
<div class="class-one class-two"></div>
```

Dynamic class names are declared with an expression immediately after a tag
name:

```js
htm`
div${condition ? "class-one" : "class-two"}
`
```

HTML:

```html
<div class={condition ? "class-one" : "class-two"}></div>
```

Static and dynamic class names cannot be mixed together.

#### Attributes

- `div :name='value'` - Static attribute with a value `<div name="value">`.
- `div :name` - Static attribute without a value `<div name>`.
- `div :name=${expr}` - Dynamic attribute `element.setAttribute

DOM attributes are assigned with `Element.setAttribute(..)` method and support
several different forms:

When dynamic attribute has an `undefined` value, it will be removed from the
DOM element with `Element.removeAttribute(..)` method.

#### Properties

- `div .name=${expr}` - Property `element[name] = expr`.
- `div *name=${expr}` - Property `element[name] = expr`, uses DOM value for diffing.

Properties are assigned with an assignment operator `Element.name = value` and
support only dynamic values:

Diffing with a DOM value is useful in use cases when we use `<input>` values to
avoid triggering unnecessary `change` events.

#### Styles

- `div ~name=${expr}` - Style `element.style.setProperty(name, expr)`

Styles are assigned with a `CSSStyleDeclaration.setProperty(..)`
method.

When style has an `undefined` value, it will be removed with a
`CSSStyleDeclaration.removeProperty(..)` method.

#### Events

- `div @name=${expr}` - Event `element.addEventListener(name, expr)`

Events are assigned with an `EventTarget.addEventListener(..)` method.

When event has an `undefined` value, it will be removed with an
`EventTarget.removeEventListener(..)` method.

#### Text Content

- `div =${expr}` - Text Content `element.textContent = expr`

Text content property can be used as an optimization that slightly reduces
[memory overhead](#memory-footprint) for elements with a text child. It will
create a text node with a [`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
property and won't have any stateful nodes associated with a text node.

Text content value should have a string or a number type.

#### Directives

- `div $${directive}` - Directive `directive(element)`

Directive is a function that is invoked each time template is updated and
receives a DOM element associated with a directive:

```ts
type ElementDirective = <E extends Element>(element: E) => void;
```

Directive function is invoked only when template is created with a
different function, so if we are going to reuse the same function, it can be
used as a DOM element created callback:

```js
const Example = component((c) => {
  const onCreated = (innerElement) => {
    // ..
  };
  return () => htm`
    div.outer
      div.inner $${onCreated}
  `;
});
```

Directives can be used not just as a simple DOM created callbacks, but also as
a stateful directives. E.g.

```js
function createStatefulDirective() {
  // Internal state that stores previous value.
  let prev;
  // Returns a factory that creates directive functions.
  return (next) => (element) => {
    // Check if previous value has been changed.
    if (prev !== next) {
      prev = next;
      // Updates textContent only when input value is changed.
      element.textContent = next;
    }
  };
}

const Example = component((c) => {
  const directive = createStatefulDirective();
  return (i) => htm`
    div $${directive(i)}
  `;
});
```

### Template Cloning

Template cloning is an optimization that is used for cloning HTML templates
with a
[Node.cloneNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
method.

By default, template cloning is enabled for all templates. But sometimes it
would be wasteful to create a template for cloning and instantiate from it when
this template is rendered just once on the page.

To disable cloning, template should have a `-c` option at the beginning. E.g.

```js
htm`-c
h1.Title ${text}
`
```

## Dynamic Lists

```ts
/**
 * Creates a dynamic list.
 *
 * @typeparam E Entry type.
 * @typeparam K Key type.
 * @param entries Entries.
 * @param getKey Get key from entry function.
 * @param render Render entry function.
 * @returns Dynamic list.
 */
function List<E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList;
```

Example:

```ts
interface DataEntry {
  key: number;
  text: string;
}
const getEntryKey = (entry: DataEntry) => entry.key;
const EntryView = (entry: DataEntry) => htm`li ${entry.text}`;

const ListView = (data: DataEntry[]) => htm`
  ul ${List(data, getEntryKey, EntryView)}
`;
```

Dynamic lists are using an optimal algorithm that uses minimal number of
`Node.insertBefore()` operations to rearrange DOM nodes. Almost all popular
libraries are using naive algorithms and can handle efficiently only basic use
cases. And some libraries optimizing their list diffing algorithms only for use
cases that are used in benchmarks.

Reducing `Node.insertBefore()` operations is important not just because it
invalidates internal data structures, but also because each time one of
the DOM nodes attached to the document is moved, it may produce a
[MutationObserver notification](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
And a lot of popular extensions are using Mutation Observers to observe entire
document subtree, so each `insertBefore` operation can become quite costly when
it is used outside of benchmarking sandboxes.

## Stateful Components

```js
/**
 * Creates a factory that produces component nodes.
 *
 * @typeparam P Property type.
 * @param create Function that creates stateful render functions.
 * @param areEqual Function that checks `props` for equality.
 * @returns Factory that produces component nodes.
 */
function component<P>(
  create: (c: Component) => (props: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => VComponent<P>;

/**
 * Invalidates component.
 *
 * @param c Component instance.
 */
function invalidate(c: Component): void;
```

### Stateless Components

Basic stateless components can be implemented with simple functions. E.g.

```js
const Button = (text, onClick) => htm`button @click=${onClick} ${text}`;
```

Stateless components with custom `areEqual` hook can be implemented by hoisting
render function in a stateful component factory. E.g.

```js
const _Button = ([text, onClick]) => htm`button @click=${onClick} ${text}`;
const Button = component(
  () => _Button,
  (prev, next) => prev[0] === next[0] && prev[1] === next[1],
);
```

## Component State

`ivi/state` module provides simple abstractions for managing component state.

### Memoized Functions

```ts
/**
 * Creates a memoized function.
 *
 * @typeparam T Input type.
 * @typeparam U Output type.
 * @param fn
 * @param areEqual `areEqual` function.
 * @returns memoized function.
 */
function memo<T, U>(
  fn: (props: T) => U,
  areEqual: (prev: T, next: T) => boolean,
): (props: T) => U;
```

Example:

```js
const FullName = component((c) => {
  const fullName = memo(
    ([firstName, lastName]) => `${firstName} ${lastName}`,
    (prev, next) => prev[0] === next[0] && prev[1] === next[1],
  );

  return ({firstName, lastName}) => htm`
    div.fullName ${fullName([firstName, lastName])}
  `;
});
```

### Reactive State

```ts
/**
 * Creates a reactive state.
 *
 * @typeparam S State type.
 * @param component Component instance.
 * @param state Initial state value.
 * @returns A tuple with a getter and setter functions.
 */
function useState<S>(component: Component, state: S): [() => S, (s: S) => void];
```

Example:

```js
const Counter = component((c) => {
   const [getCounter, setCounter] = useState(c, 0);
   const inc = () => {
     setCounter(getCounter() + 1);
   };

   return () => htm`
     div.app
       div.counter ${getCounter()}
       button @click=${inc} 'Increment'
   `;
 });
```

### Reactive State Reducer

```ts
/**
 * Creates a reactive state reducer.
 *
 * @typeparam S State type.
 * @typeparam A Reducer action type.
 * @param component Component instance.
 * @param state Initial state.
 * @param reducer Reducer function.
 * @returns State reducer.
 */
function useReducer<S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): (action?: A) => S;
```

Example:

```js
const Counter = component((c) => {
   const counter = useReducer(c, 0, (state, action) => {
     if (action === "inc") {
       return state + 1;
     }
     return state;
   });
   const inc = () => {
     counter("inc");
   };

   return () => htm`
     div.app
       div.counter ${counter()}
       button @click=${inc} 'Increment'
   `;
 });
```

## Component Hooks

### Unmount

```ts
/**
 * useUnmount creates an unmount hook.
 *
 * @param component Component instance.
 * @param hook Unmount hook.
 */
function useUnmount(component: Component, hook: () => void): void;
```

Example:

```js
const UnmountMe = component((c) => {
  useUnmount(c, () => {
    console.log("unmounted");
  });

  return () => null;
});
```

### Effect

```ts
/**
 * useEffect creates a side effect hook.
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook Side effect function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
function useEffect = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual: (prev: P, next: P) => boolean,
): (props: P) => void;
```

Example:

```js
const Counter = component((c) => {
  let i = 0;
  const timer = useEffect(c,
    (delay) => {
      const tid = setInterval(() => {
        i++;
        invalidate(c);
      }, delay);
      return () => { clearInterval(tid); };
    },
    (prev, next) => prev !== next,
  );

  return (delay) => (
    timer(delay),
    htm`span.Counter ${i}`
  );
});
```

## Root Node

`ivi/root` module provides a basic root nodes implementation that uses
[`queueMicrotask()`](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask) to schedule updates.

```ts
/**
 * Creates a new root.
 *
 * @param p Parent DOM Element.
 * @param n Next DOM Element.
 * @returns {@link SRoot} instance.
 */
function createRoot(p: Element, n: Node | null = null): SRoot<null>;

/**
 * Updates UI subtree.
 *
 * @param root {@link SRoot} instance.
 * @param v UI representation.
 * @param forceUpdate Forces update for all components in the subtree.
 */
function updateRoot(root: SRoot<null>, v: VAny, forceUpdate: boolean = false): void;

/**
 * Disposed UI subtree and triggers all unmount hooks.
 *
 * @param root {@link SRoot} instance.
 * @param detach Detach root nodes from the DOM.
 */
function disposeRoot(root: SRoot<null>, detach: boolean): void;
```

## Utils

### Equality Functions

`ivi/equal` module provides functions that can be used to check input values
for changes.

```ts
/**
 * Checks if values are equal with a strict equality operator `===`.
 *
 * @param a
 * @param b
 * @returns True when values are strictly equal.
 */
const strictEq = <T>(a: T, b: T): boolean;

/**
 * Checks if objects are shallowly equal.
 *
 * shallowEqual algorithm is using strict equality operator `===` to
 * compare object values.
 *
 * @param a
 * @param b
 * @returns True when objects are shallow equal.
 */
function shallowEq<T extends Record<string | symbol, unknown>>(a: T, b: T): boolean;

/**
 * Checks if arrays are shallow equal.
 *
 * shallowEqualArray algorithm is using strict equality operator `===` to
 * compare array values.
 *
 * @param a
 * @param b
 * @returns True whan arrays are shallow equal.
 */
function shallowEqArray<T>(a: T[], b: T[]): boolean;
```

### State Tree DOM Utils

`ivi/dom` module.

```ts
/**
 * Finds the closest DOM node from the {@link SNode} instance.
 *
 * @typeparam T DOM node type.
 * @param sNode {@link SNode} instance.
 * @returns DOM node.
 */
function findDOMNode<T extends Node | Text>(sNode: SNode | null): T | null;

/**
 * Checks if {@link SNode} contains a DOM element.
 *
 * @param parent {@link SNode}.
 * @param element DOM element.
 * @returns true when parent contains an element.
 */
function containsDOMElement(parent: SNode, element: Element): boolean;

/**
 * Checks if {@link SNode} has a child DOM element.
 *
 * @param parent {@link SNode}.
 * @param child DOM element.
 * @returns true when parent has a DOM element child.
 */
function hasDOMElement = (parent: SNode, child: Element): boolean;
```

## Setup

It is an optional step, ivi templates will work without any precompilation, but
it is highly recommended to use precompilation to improve performance.

### Rollup / Vite

`@ivi/rollup-plugin` package provides a plugin that can be used with a Vite or
Rollup toolchains.

```js
import { defineConfig } from "vite";
import { ivi } from "@ivi/rollup-plugin";

export default defineConfig({
  plugins: [ivi()],
});
```

### Babel Plugin

`@ivi/babel-plugin` package provides a babel plugins for precompiling and
optimizing templates.

- `ivi` plugin precompiles templates and should be applied in a module
transformation pass.
- `iviOptimizer` deduplicates shared data and should be applied in a chunk
transformation pass.

## Advanced

### Mental Model

#### Component Invalidation and Dirty Checking

Component invalidation algorithm is implemented by marking component as dirty
and marking all its parent nodes with a flag that they have a dirty subtree.
When marking algorithm reaches root node, it invokes `OnRootInvalidated()` hook
that can be used to implement a [custom scheduler](#custom-scheduler).

When scheduler decides to update a root node with a dirty subtree, it starts a
dirty checking algorithm. This algorithm goes top-down visiting all nodes with a
dirty subtree flag until it reaches a dirty component and updates it.

#### Right-to-Left Updates

One of the reasons why the core library is so small is because update algorithm
is implemented in RTL order. Algorithm that performs updates in RTL order
simplifies a lot of complex issues with DOM updates. The main issue with DOM
updates is that when we start updating a DOM tree structure, we need to have
a reference to a parent and a next DOM node, so that we can use
`parent.insertBefore(newNode, nextNode)`. In most cases it is easy to retrieve
a next DOM node, but there are edge cases like when we have two adjacent
conditional expressions and one of their states is that it completely removes
a DOM node from the tree, or two adjacent components with conditionals at their
roots, etc.

Majority of libraries are dealing with this edge cases by introducing marker
DOM nodes (comment or an empty text node). For example, to implement
conditional expressions we can add an empty text node when conditional doesn't
render any DOM node and when conditional goes into a state when it needs to
add a DOM node, it will use a marker node as a next DOM node reference. In some
edge case scenarios, some libraries can [insert a lot](https://github.com/sveltejs/svelte/issues/3586) of marker nodes. Update algorithm in ivi doesn't
use any marker nodes.

The RTL algorithm that is used in ivi also makes it way much easier to implement
node displacements without introducing any additional code paths, fragments and
pretty much everything that involves updating a DOM structure.

#### Template Call-Site Unique Identity

Each call-site that creates template has unique identity, so even identical
templates created from different call-sites won't be able to diff against each
other.

```js
function TemplateUniqueIdentity(condition, text) {
  return (condition)
    ? htm`div ${text}`
    : htm`div ${text}`;
}
```

In this example, when `condition` is changed, update algorithm will replace
entire div element with a new one, instead of updating just text node.

It is designed this way so that even with precompilation it will have the same
behavior as runtime compiler. It is quite easy to figure out during
precompilation that two templates have similar shapes, but the major downside
is that we will need to switch to whole program deduplication and it is going
to have an impact on the chunking algorithm.

#### Memory Footprint

In the description below we are going to calculate memory usage in a
Chromium-based engines with [Pointer Compression in V8](https://v8.dev/blog/pointer-compression).

To get a rough estimate of memory usage it is important to understand internal
data structures. UI tree is implemented with a stateful tree `SNode` and
immutable stateless tree `VAny`.

Stateless tree has a simple data structure:

```ts
// 20 bytes
interface VNode<D extends VDescriptor, P> {
  // Descriptors are reused for all VNodes with the same type and its memory
  // usage can be ignored during estimation.
  readonly d: D;
  // Prop value is used for storing the results of template expressions in an
  // array, prop value for Components, or VRoot and VList props.
  readonly p: P;
}

type VArray = VAny[];
type VAny =
  | null
  | string
  | number
  | VRoot      // VNode<RootDescriptor, RootProps>
  | VTemplate  // VNode<TemplateDescriptor, P>
  | VComponent // VNode<ComponentDescriptor, P>
  | VList      // VNode<ListDescriptor, ListProps<K>>
  | VArray
  ;

// 20 bytes
interface RootProps {
  // Parent Element
  p: Element,
  // Next Node
  n: Node | null,
}

// 20 bytes
interface ListProps<K> {
  // Keys
  k: K[],
  // Stateless Tree Nodes
  v: VAny[],
}
```

For each stateless node `VAny` there is a stateful node `SNode` that has an
interface:

```ts
// 32 bytes
interface SNode<V extends VAny, S> {
  // Stateless node associated with the current state.
  v: V;
  // Bitflags
  f: Flags; // SMI value - Small Integer
  // Children nodes.
  c: SNode | (SNode | null)[] | null;
  // Additional State that depends on the type of the SNode.
  s: S;
  // Parent node.
  p: SNode | null,
}

// Additional state size of the root nodes depends on the implementation of
// root nodes. Default root implementation doesn't use any additional state and
// stores `null` value in the additional state slot.
type SRoot<S> = SNode<VRoot, S>;
// Text nodes are storing a reference to a Text DOM node.
type SText = SNode<string | number, Text>;
// Template nodes are storing a reference to a root DOM node, DOM nodes with
// dynamic properties and DOM nodes that will be used as a reference for
// `parent.insertBefore(node, nextNode)` operations. Slots for DOM nodes with
// dynamic properties that also used as a reference for insertBefore operation
// will share the same slots, there won't be any duplicated references.
type STemplate = SNode<VTemplate, Node[]>;
// Dynamic lists don't have any additional state.
type SList = SNode<VList, null>;
// See component state below.
type SComponent = SNode<VComponent, ComponentState>;

// 20 bytes.
interface ComponentState {
  // Render function.
  r: null | ((props: any) => VAny),
  // Unmount hooks.
  // Usually components don't have any unmount hooks, or they have just one
  // unmount hook. When there is one hook, it will be stored without any
  // additional arrays.
  u: null | (() => void) | (() => void)[];
}
```

As we can see, ivi data structures are carefully designed to have a small
memory overhead and static shapes to make sure that all call-sites that
accessing it will be in a [monomorphic state](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html).

### Template Compilation

`@ivi/babel-plugin` module contains a babel plugin with a template compiler and
optimizer that significantly improves start-up performance.

Template compiler doesn't just eliminate compilation step during runtime, it
also hoists static expressions and deduplicates OpCodes, static data and
template factory functions. E.g.

```js
import { className } from "styles.css";

const a = (id) => htm`
div${className} :id=${id}
`;
const b = (id) => htm`
div${className} :id=${id}
`;
```

Will generate two different templates with shared data structures:

```js
import { className } from "styles.css";
import { _h, _T, _t } from "ivi";

const EMPTY_ARRAY = [];
const SHARED_DATA = ["id"];
const ELEMENT_FACTORY_1 = _h('<div class="' + className + '"></div>');
const SHARED_OP_CODES_1 = [/*..*/];
const _tpl_a = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* data */SHARED_DATA,
);
const _tpl_b = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* data */SHARED_DATA,
);

const a = (id) => _t(_tpl_a, [id]);
const b = (id) => _t(_tpl_b, [id]);
```

Quite often, OpCodes that are used for different purposes (prop,child,state)
are going to have similar values, so when OpCodes are deduplicated they are
treated as simple arrays with integers that can be used for different purposes.

Shared data `SHARED_DATA` is deduplicated into one array that is shared between
all templates.

Data structures are deduplicated only in the same chunk scope to avoid
generating a lot of small chunks.

### Custom Scheduler

ivi is designed as an embeddable solution, so that it can be integrated into
existing frameworks or web components. The core module `ivi` doesn't provide
any schedulers. When ivi component is invalidated it will find a `SRoot` node
and invoke `OnRootInvalidated()` hook.

```ts
type OnRootInvalidated<S> = (root: SRoot<S>) => void;
```

As an example, there is a simple scheduler implemented in an `ivi/root`
module that uses microtasks to batch updates.

```ts
const _queueMicrotask = queueMicrotask;

const ROOT_DESCRIPTOR: RootDescriptor = {
  // Root Descriptor should always have a `Flags.Root` flag.
  f: Flags.Root,
  // OnRootInvalidated hook
  p1: (root: SRoot) => {
    _queueMicrotask(() => {
      // Retrieves DOM slot from VNode object.
      var domSlot = root.v.p;
      // Assign parent element and next node to the render context.
      RENDER_CONTEXT.p = domSlot.p;
      RENDER_CONTEXT.n = domSlot.n;
      // Updates invalidated components.
      dirtyCheck(root.c as SNode, 0);
      // Flags should always be reassigned to clear dirty flags.
      root.f = Flags.Root;
    });
  },
  // p2 should always be initialized with `null` value. This propery is
  // initialized so that all `Descriptor` objects will have the same object
  // shape and all call-sites that access Descriptor objects will be in a
  // monorphic state.
  p2: null,
};

/**
 * Creates a new root.
 *
 * @param p Parent DOM Element.
 * @param n Next DOM Element.
 * @returns {@link SRoot} instance.
 */
export const createRoot = (p: Element, n: Node | null = null): SRoot<null> => (
  createSNode(
    // SRoot node should always have a `Flags.Root` flag.
    Flags.Root,
    // VNode object.
    {
      // VNode descriptor should be initialized with `RootDescriptor`
      d: ROOT_DESCRIPTOR,
      // VNode props object contains the location in the DOM tree where subtree
      // should be rendered.
      p: {
        // Parent DOM Element.
        p,
        // Next DOM Node.
        n,
      },
    },
    // Children should always be initialized with `null` value.
    null,
    // State `SRoot<State>` that can be used to store any value.
    null,
    // Parent SNode should always have a `null` value.
    null,
  )
);

/**
 * Updates UI subtree.
 *
 * @param root {@link SRoot} instance.
 * @param v UI representation.
 * @param forceUpdate Forces update for all components in the subtree.
 */
export const updateRoot = (
  root: SRoot<null>,
  v: VAny,
  forceUpdate: boolean = false,
): void => {
  // Retrieves DOM slot from VNode object.
  var domSlot = root.v.p;
  // Assign parent element and next node to the render context.
  RENDER_CONTEXT.p = domSlot.p;
  RENDER_CONTEXT.n = domSlot.n;
  // Flags should always be reassigned on update to clear dirty flags.
  root.f = Flags.Root;
  root.c = (
    (root.c === null)
      ? mount(
        // Parent SNode should always be a root node.
        root,
        // UI Representation.
        v,
      )
      : update(
        // Parent SNode should always be a root node.
        root,
        // Previous UI state.
        root.c as SNode,
        // UI Representation.
        v,
        // Force update.
        forceUpdate === true
          ? Flags.ForceUpdate
          : 0,
      )
  );
};

/**
 * Disposed UI subtree and triggers all unmount hooks.
 *
 * @param root {@link SRoot} instance.
 * @param detach Detach root nodes from the DOM.
 */
export const disposeRoot = (root: SRoot<null>, detach: boolean): void => {
  if (root.c !== null) {
    // Assign parent element to the render context.
    RENDER_CONTEXT.p = root.v.p.p;
    // Unmounts a root subtree.
    unmount(
      // Previous UI state.
      root.c as SNode,
      // Detach root nodes.
      detach,
    );
  }
};
```

## License

[MIT](http://opensource.org/licenses/MIT)
