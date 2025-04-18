<p align="center">
  <a href="https://github.com/localvoid/ivi" target="_blank" rel="noopener noreferrer">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".https://localvoid.github.io/ivi/images/ivi-logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://localvoid.github.io/ivi/images/ivi-logo-light.svg">
      <img width="120" height="120" src="https://localvoid.github.io/ivi/images/ivi-logo-light.svg" alt="ivi logo">
    </picture>
  </a>
</p>

ivi is a lightweight embeddable declarative Web UI library.

- `f(state) => UI`
- The [basic example](#examples) is just 2.7KB.
- [Vite](#vite) / [Rollup](#rollup) plugins.
- [Precompiled](#template-optimizations) templates optimized for size and
performance.
- [Small memory footprint](#internal-data-structures).
- [Embeddable](#custom-scheduler).

## Examples

```js
import { createRoot, update, component, useState, html } from "ivi";

const Example = component((c) => {
  const [count, setCount] = useState(c, 0);
  const inc = () => { setCount(count() + 1); };

  return () => html`
    <div class="app">
      <div>${count()}</div>
      <button @click=${inc}>Increment</button>
    </div>
  `;
});

update(
  createRoot(document.body),
  Example(),
);
```

The size of the precompiled example above is just 2.7KB (minified+brotli). It includes entire runtime for declarative UI rendering. Precompiled templates are [optimized](#template-optimizations) for code size and cold-start performance.

- [TodoMVC](https://github.com/localvoid/ivi-examples/tree/master/apps/todomvc-htm)
- [Examples from the https://react.dev/learn rewritten with ivi API](https://github.com/localvoid/ivi/blob/master/docs/misc/migrating-from-react.md)

## Table of Contents

- [Setup](#setup)
  - [Vite](#vite)
  - [Rollup](#rollup)
- [Template Language](#template-language)
  - [Multiple Root Nodes](#multiple-root-nodes)
  - [Childless Elements](#childless-elements)
  - [Whitespace Rules](#whitespace-rules)
  - [Expressions](#expressions)
  - [Element Properties](#element-properties)
    - [Attributes](#attributes)
    - [Properties](#properties)
    - [Styles](#styles)
    - [Events](#events)
    - [Directives](#directives)
  - [Conditionals](#conditionals)
  - [Arrays](#arrays)
  - [Dynamic Lists](#dynamic-lists)
- [Components](#components)
  - [Stateful Components](#stateful-components)
  - [Stateless Components](#stateless-components)
- [API](#api)
  - [Opaque Types](#opaque-types)
  - [Stateful Tree](#stateful-tree)
  - [Stateless Tree](#stateless-tree)
  - [Root](#root)
    - [`createRoot(parentElement, nextNode)`](#createroot)
    - [`dirtyCheck(root, forceUpdate)`](#dirtycheck)
    - [`update(root, v, forceUpdate)`](#update)
    - [`unmount(root, detach)`](#unmount)
    - [`defineRoot(onInvalidate)`](#defineroot)
  - [Components](#components)
    - [`component(factory, areEqual)`](#component)
    - [`getProps(component)`](#getprops)
    - [`invalidate(component)`](#invalidate)
    - [`useUnmount(component, hook)`](#useunmount)
  - [Component State](#component-state)
    - [`useMemo(areEqual, fn)`](#usememo)
    - [`useState(component, value)`](#usestate)
    - [`useReducer(component, value, reducer)`](#usereducer)
  - [Side Effects](#side-effects)
    - [`useEffect(component, effect, areEqual)`](#useeffect)
    - [`useLayoutEffect(component, effect, areEqual)`](#uselayouteffect)
    - [`useIdleEffect(component, effect, areEqual)`](#useidleeffect)
  - [List](#list)
    - [`List(entries, getKey, render)`](#list-1)
  - [Context](#context)
    - [`context()`](#context-1)
  - [Element Directive](#element-directive)
  - [DOM Utilities](#dom-utilities)
    - [`eventDispatcher(eventType, options)`](#eventdispatcher)
    - [`findDOMNode(node)`](#finddomnode)
    - [`containsDOMElement(node, element)`](#containsdomelement)
    - [`hasDOMElement(node, element)`](#hasdomelement)
  - [Equality Functions](#equality-functions)
    - [`preventUpdates(a, b)`](#preventupdates)
    - [`strictEq(a, b)`](#stricteq)
    - [`shallowEq(a, b)`](#shalloweq)
    - [`shallowEqArray(a, b)`](#shalloweqarray)
- [CheatSheet](#cheatsheet)
  - [Passive Event Listener](#passive-event-listener)
  - [Dynamic Argument Name](#dynamic-argument-name)
  - [Integrating External/Imperative Libraries](#integrating-externalimperative-libraries)
- [Advanced](#advanced)
  - [Component Invalidation and Dirty Checking](#component-invalidation-and-dirty-checking)
  - [Right-to-Left Updates](#right-to-left-updates)
  - [Template Call-Site Unique Identity](#template-call-site-unique-identity)
  - [Forcing Component Updates](#forcing-component-updates)
  - [Template Cloning](#template-cloning)
  - [Event Handlers Hoisting](#event-handlers-hoisting)
  - [Internal Data Structures](#internal-data-structures)
    - [UI Tree](#ui-tree-data-structures)
    - [Templates](#template-data-structures)
  - [Template Optimizations](#template-optimizations)
  - [Custom Scheduler](#custom-scheduler)
- [External Dependencies](#external-dependencies)

## Setup

ivi templates will work without any precompilation, but it is highly recommended to use precompilation to improve performance and reduce code size.

### Vite

`"@ivi/vite-plugin"` package provides [Vite](https://vitejs.dev/) plugin.

```ts
// vite.config.mjs
import { defineConfig } from "vite";
import { ivi } from "@ivi/vite-plugin";

export default defineConfig({
  plugins: [ivi()],
});
```

### Rollup

`"@ivi/rollup-plugin"` package provides [Rollup](https://rollupjs.org/) plugin.

```js
// rollup.config.mjs
import { ivi } from "@ivi/rollup-plugin";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
  },
  plugins: [ivi()]
};
```

## Template Language

ivi template language has an HTML-like syntax with additional syntax for DOM properties, events and whitespace removal.

- `html` creates a template with [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) nodes.
- `svg` creates a template with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement) nodes.

```js
import { html } from "ivi";
const Example = component((c) => {
  // ...
  return () => html`
    <div class="app">
      <div>${count()}</div>
      <button @click=${inc}>Increment</button>
    </div>
  `;
});
```

### Multiple Root Nodes

Templates can have multiple root nodes.

```js
html`
  <div></div>
  ${expr}
  text
  <div></div>
`
```

### Childless Elements

Childless elements can be self closed with a `/>` syntax.

```js
html`
  <div
    class="a"
  />
`;
```

### Whitespace Rules

1. Whitespaces around newlines are removed:

```htm
<div>
  <p></p>
  ab
  <p></p>
</div>
```

```htm
<div><p></p>ab<p></p></div>
```

2. Inline whitespaces are collapsed into one whitespace:

```htm
<div>  <span>  a  b  </span>  </div>
```

```htm
<div> <span> a b </span> </div>
```

3. Whitespaces around newlines in text nodes are collapsed into one whitespace:

```htm
<div>
  ab
  cd
</div>
```

```htm
<div>ab cd</div>
```

4. Vertical tab `\v` character prevents from removing all whitespaces around
newlines:

```htm
<div>
  <b>1</b>
  \v item left
<div>
```

```htm
<div><b>1</b> item left</div>
```

### Expressions

In ivi templates, you can include dynamic content called expressions. An expression is just a piece of JavaScript code that gets evaluated when template is rendered. Whatever value an expression produces at that time will be included in the final rendered template.

```js
html`
<div attr=${attributeValueExpr}>
  ${childExpr}
</div>`;
```

### Element Properties

ivi template language supports additional syntax to work with DOM properties, events, etc.

- [`<div name="value" />`](#attributes) - Static attribute.
- [`<div name />`](#attributes) - Static attribute.
- [`<div name=${expr} />`](#attributes) - Dynamic attribute `element.setAttribute(name, expr)`.
- [`<div .name=${expr} />`](#properties) - Property `element[name] = expr`.
- [`<div *name=${expr} />`](#properties) - Property `element[name] = expr`, diffs against a DOM value.
- [`<div ~name="value" />`](#styles) - Static style `<div style="name:value;">`.
- [`<div ~name=${expr} />`](#styles) - Dynamic style `element.style.setProperty(name, expr)`.
- [`<div @name=${expr} />`](#events) - Event `element.addEventListener(name, expr)`.
- [`<div ${directive} />`](#directives) - Client-Side Element Directive `directive(element)`.
- [`<div .textContent=${expr} />`](#text-content) - Text content.

#### Attributes

- `<div name="value" />` - Static attribute with a value `<div name="value">`.
- `<div name />` - Static attribute without a value `<div name>`.
- `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.

DOM attributes are assigned with `Element.setAttribute(..)`.

When dynamic attribute has an `undefined`, `null` or `false` value, it will be removed from the DOM element with `Element.removeAttribute(..)` method.

#### Properties

- `<div .name=${expr} />` - Property `element[name] = expr`.
- `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.

Properties are assigned with an assignment operator `Element.name = value`.

Diffing with a DOM value is useful in use cases when we use `<input>` values to avoid triggering unnecessary `input` events.

#### Styles

- `<div ~name="value" />` - Static style `<div style="value">`.
- `<div ~name=${expr} />` - Dynamic style `element.style.setProperty(name, expr)`.

Static styles are automatically merged with `:style="value"` attribute.

Dynamic styles are assigned with a `CSSStyleDeclaration.setProperty(..)` method.

When style has an `undefined`, `null` or `false` value, it will be removed with `CSSStyleDeclaration.removeProperty(..)` method.

#### Events

- `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`.

Events are assigned with an `EventTarget.addEventListener(..)` method.

When event has an `undefined`, `null` or `false` value, it will be removed with `EventTarget.removeEventListener(..)` method.

#### Text Content

- `<div .textContent=${expr} />` - Text Content `element.textContent = expr`.

Text content property can be used as an optimization that slightly reduces memory consumption for elements with a text child. It will create a text node with a [`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) property and won't have any stateful nodes associated with a text node.

Text content value should have an `undefined`, `null`, `false`, `string` or a `number` type.

#### Directives

- `<div ${directive} />` - Element Directive `directive(element)`.

Directive is a function that is invoked each time template is updated and
receives a DOM element associated with a directive:

```ts
type ElementDirective = <E extends Element>(
  element: E,
) => void;
```

Directive function is invoked only when template is created with a
different function, so if we are going to reuse the same function, it can be
used as a DOM element created callback:

```js
const Example = component((c) => {
  const onCreated = (innerElement) => {
    // ..
  };
  return () => html`
    <div>
      <div class="Inner" ${onCreated} />
    </div>
  `;
});
```

Directives can be used not just as a simple DOM created callbacks, but also as stateful directives. E.g.

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
    <div ${directive(i)} />
  `;
});
```

### Conditionals

You can use regular JavaScript expressions in your templates, which means you can use any javascript control flow constructs like conditional operators, function calls, and if or switch statements to generate dynamic content based on runtime conditions.

This means you can create templates with complex logic that conditionally renders different content based on what's happening in your application. You can nest template expressions inside one another to build up more complex templates, and you can store the results of templates in variables to use them later in your code.

```js
const Example = component((c) => {
  // ...
  return (show) => html`
    <div>
      ${show && html`<span>Show</span>`}
    </div>
  `;
});
```

### Arrays

If an expression is used in the child position of an HTML element and it returns an array, ivi will render all of the items in that array as separate nodes.

```js
const Example = () => html`
  <div>
    ${[
      "Text Node 1",
      "Text Node 2",
    ]}
  </div>
`;
```

ivi allows components to return arrays of elements as their root nodes. This means that a component can return multiple top-level elements instead of just one.

For example, a component could return an array of `<li>` elements that make up a list. When this component is rendered, ivi will treat the array of `<li>` elements as a set of top-level elements, just like it would with a single root element.

This feature provides more flexibility when building complex UI components, as it allows you to create components that generate a dynamic number of top-level elements depending on their input.

```js
const Example = component((c) => {
  return (entries) => entries.map((e) => html`
    <li>${e}</li>
  `);
);
// Example([1, 2, 3])
```

When arrays are updated, stateless tree nodes are mapped onto their stateful nodes by their position in the array.

When array contains a conditional expression that returns a "hole" value (`null`, `undefined` or `false`), the hole will occupy a slot in a stateful tree, so that all nodes will be correclty mapped onto their stateful nodes.

```js
[
  conditional ? "text" : null,
  StatefulComponent(),
]
```

In the example above, when `conditional` expression goes from a text to a "hole" and vice versa, `StatefulComponent` will preserve its internal state.

When array grows or shrinks in size, stateful nodes will be created or removed at the end of an array.

### Dynamic Lists

In ivi, you can render lists of items using the `List()` function that loops through an array of data and returns a list of elements. However, when list is updated, it is important to correctly map rendered items onto their stateful views. This means that if an item is rendered as a component that has internal state that could change as a result of user actions or external events, it should be mapped onto the same component instance.

To render dynamic lists, ivi provides the [`List()`](#list-1) function.

```ts
function List<E, K>(
  // Input Entries.
  entries: E[],
  // Function that retrieves unique key from an entry.
  getKey: (entry: E, index: number) => K,
  // Function that renders an entry.
  render: (entry: E, index: number) => VAny,
): VList;
```

It creates a dynamic list with an array of keys that uniquely identify each item in the list. When list is updated, ivi uses keys to map items onto their stateful nodes.

It's important to note that when rendering a dynamic list, you should always use a unique identifier as a key. This helps ivi identify each element in a list and avoid rendering errors. If you use an index or a random value as a key, ivi may not be able to identify correct elements in a list, which can cause errors.

```ts
interface DataEntry {
  key: number;
  text: string;
}
const getEntryKey = (entry: DataEntry) => entry.key;
const EntryView = (entry: DataEntry) => (
  html`<li>${entry.text}</li>`
);

const ListView = (data: DataEntry[]) => html`
  <ul>${List(data, getEntryKey, EntryView)}</ul>
`;
```

ivi is using an optimal algorithm for dynamic lists that uses the minimum number of `Node.insertBefore()` operations to rearrange DOM nodes.

Reducing `Node.insertBefore()` operations is important not just because it invalidates internal DOM state, but also because each time one of the DOM nodes attached to the document is moved, it may produce a [MutationObserver notification](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). And a lot of popular extensions are using Mutation Observers to observe entire document subtree, so each `insertBefore` operation can become quite costly when it is used outside of benchmarking sandboxes.

## Components

Components can be either stateful or stateless. Stateful components are used when you need to manage state that changes over time, such as user input, network requests, or animations.

### Stateful Components

Stateful components are declared with [`component()`](#component) function. It creates a factory function that produces component nodes.

```js
// `component()` function creates a factory function for component
// nodes of this type.
const Example = component((c) => {
  // When component state is initialized, it should return a render
  // function.
  return (props) => (
    html`<div>${props.value}</div>`
  );
});

update(
  document.body,
  Example({ value: "Hello World" }),
);
```

Stateful components are using JavaScript closures to store internal state.

```js
const Example = component((c) => {
  // Internal state.
  let _counter = 0;

  // Event handler.
  const increment = () => {
    // Mutate internal state.
    _counter++;
    // Invalidate component and schedule an update.
    invalidate(c);
  };

  // Render function.
  return () => html`
    <div>
      <p>Count: ${_counter}</p>
      <button @click=${increment}>Increment</button>
    </div>
  `;
});
```

When internal state is mutated, it doesn't trigger component updates automatically and it should be manually invalidated with [`invalidate()`](#invalidate) function.

There are high-level APIs like [`useState()`](#usestate) or
[`useReducer()`](#usereducer) that use the low-level [`invalidate()`](#invalidate) function behind the scenes to automatically invalidate components when internal state is mutated.

```js
const Example = component((c) => {
  // Internal state.
  const [counter, setCounter] = useState(c, 0);

  const increment = () => {
    // Automatically invalidates component when counter value is mutated.
    setCounter(counter() + 1);
  };

  // Render function.
  return () => (
    html`
    <div>
      <p>Count: ${counter()}</p>
      <button @click=${increment}>Increment</button>
    </div>`
  );
});
```

### Stateless Components

Stateless components in ivi are just basic JavaScript functions. They are faster and more lightweight than stateful components, which makes them a good choice for simple and reusable components that doesn't have any internal state.

```js
const Button = (text, onClick) => html`
  <button @click=${onClick}>${text}</button>
`;
```

## API

### Stateful Tree

```ts
type SNode = Opaque;
type Root<State> = Opaque<State>;
type Component<Props> = Opaque<Props>;
```

### Stateless Tree

```ts
type VAny =
  | null       // Hole
  | undefined  // Hole
  | false      // Hole
  | string     // Text
  | number     // Text
  | VRoot      // Root
  | VTemplate  // Template
  | VComponent // Component
  | VContext   // Context Provider
  | VList      // Dynamic List with track by key algo
  | VAny[]     // Dynamic List with track by index algo
  ;

type VRoot = Opaque;
type VTemplate = Opaque;
type VComponent = Opaque;
type VContext = Opaque;
type VList = Opaque;
```

### Root Nodes

A root node is the topmost node in a stateful tree, from which all other nodes are rendered. It represents an entry point for the ivi rendering algorithm and stores a position in the DOM tree.

#### **`createRoot()`**

`createRoot` creates a root node that uses microtask queue for scheduling updates.

```ts
function createRoot(
  parentElement: Element,
  nextNode: Node | null = null,
): Root;
```

- `parentElement` - Parent DOM Element.
- `nextNode` - Next DOM Node.

#### **`dirtyCheck()`**

`dirtyCheck` performs the dirty checking algorithm in a root subtree and updates all dirty components.

```ts
function dirtyCheck(
  root: Root,
  forceUpdate: boolean = false,
): void;
```

- `root` - Root node.
- `forceUpdate` - Force all components to update, even when they are using optimization hints to reduce updates.

#### **`update()`**

`update` updates a root subtree with a new representation.

```ts
function update(
  root: Root,
  v: VAny,
  forceUpdate: boolean = false,
): void;
```

- `root` - Root node.
- `v` - New representation.
- `forceUpdate` - Force all components to update, even when they are using optimization hints to reduce updates.

#### **`unmount()`**

`unmount` unmounts a root subtree from the DOM and triggers unmount hooks in components.

```ts
function unmount(
  root: Root,
  detach: boolean,
): void;
```

- `root` - Root node.
- `detach` - Detach the topmost DOM nodes from the DOM subtree.

#### **`defineRoot()`**

`defineRoot` creates a root node factory that uses a custom `OnRootInvalidated` hook.

```ts
function defineRoot(
  onInvalidate: (root: Root<undefined>) => void,
) : (parentElement: Element, nextNode: Node | null) => Root<undefined>;

function defineRoot<S>(
  onInvalidate: (root: Root<S>, state: S) => void,
) : (parentElement: Element, nextNode: Node | null, state: S) => Root<S>;
```

- `onInvalidate` - `OnRootInvalidated` hook that receives a root node and custom state associated with that root node.

### Components

#### **`component()`**

`component` creates a factory that produces component nodes.

```ts
function component(
  factory: (c: Component) => () => VComponent<undefined>,
  areEqual?: () => boolean
): () => VComponent<undefined>;
function component<P>(
  factory: (c: Component) => (props: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => VComponent<P>;
```

- `factory` - Function that produces stateful component render functions.
- `areEqual` - Optional function that checks input properties for changes and is used as an optimization hint to reduce unnecessary updates when properties didn't change.

*When root subtree is updated with `forceUpdate` option, `areEqual` hint is ignored and all components are updated.*

#### **`getProps()`**

`getProps` gets current component props from component instance.

```ts
function getProps = <P>(component: Component<P>): P;
```

- `component` - Component instance.

#### **`invalidate()`**

`invalidate` invalidates component and schedules an update.

```ts
function invalidate(component: Component): void;
```

- `component` - Component instance.

#### **`useUnmount()`**

Adds an unmount hook.

```ts
function useUnmount(
  component: Component,
  hook: () => void,
): void;
```
- `component` - Component instance.
- `hook` - Unmount hook.

### Component State

#### **`useMemo()`**

`useMemo` creates a memoized function.

```ts
function useMemo<T, U>(
  areEqual: (prev: T, next: T) => boolean,
  fn: (props: T) => U,
): (props: T) => U;
```

- `areEqual` - Checks input properties for changes to avoid recomputations.
- `fn` - Function to memoize.

#### **`useState()`**

`useState` creates a reactive component state.

```ts
function useState<S>(
  component: Component,
  state: S,
): [
  get: () => S,
  set: (s: S) => void,
];
```

- `component` - Component instance.
- `state` - Initial state.

Returns state getter and state setter functions.

#### **`useReducer()`**

`useReducer` creates a reactive component state reducer.

```ts
type Dispatch<A> = (action: A) => void;

function useReducer<S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): [
  get: () => S,
  dispatch: Dispatch<A>,
];
```

- `component` - Component instance.
- `state` - Initial state.
- `reducer` - State reducer function.

Returns state getter and action dispatcher functions.

### Side Effects

Side effects lets you specify how your components should behave with external systems such as imperative API calls, timer manipulations, or direct DOM interactions.

You can think of it as a combination of `mount`, `update` and `unmount` lifecycles hooks.

#### **`useEffect()`**

`useEffect` creates a side effect that is executed immediately after root node finishes an update.

```ts
function useEffect(
  component: Component,
  effect: () => (() => void) | void,
): () => void;
function useEffect<P>(
  component: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

- `component` - Component instance.
- `effect` - Effect hook.
- `areEqual` - Optional function that checks input properties for changes and is used to control when an effect should be updated.

Returns a side effect function that should be invoked in a render function.

#### **`useLayoutEffect()`**

`useLayoutEffect` creates a side effect that is executed before [animation frame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

```ts
function useLayoutEffect(
  component: Component,
  effect: () => (() => void) | void,
): () => void;
function useLayoutEffect<P>(
  component: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

- `component` - Component instance.
- `effect` - Effect hook.
- `areEqual` - Optional function that checks input properties for changes and is used to control when an effect should be updated.

Returns a side effect function that should be invoked in a render function.

#### **`useIdleEffect()`**

`useIdleEffect` creates a side effect that is executed when browser is [idle](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback).

```ts
function useIdleEffect(
  ccomponent: Component,
  effect: () => (() => void) | void,
): () => void;
function useIdleEffect<P>(
  ccomponent: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

- `component` - Component instance.
- `effect` - Effect hook.
- `areEqual` - Optional function that checks input properties for changes and is used to control when an effect should be updated.

Returns a side effect function that should be invoked in a render function.

### List

#### **`List()`**

`List` creates a dynamic lists.

```ts
function List<E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList;
```

- `entries` - Input data.
- `getKey` - Function that should return an unique key for each data entry.
- `render` - Function that renders an entry.

### Context

### **`context()`**

`context` creates context getter and context provider functions.

```ts
function context = <T>(): [
  get: (component: Component) => T | undefined,
  provider: (value: T, children: VAny) => VContext<T>,
]
```

Returns a `get` function that finds the closest context value, and a `provider` function that creates context nodes.

```js
// Creates a getter and provider functions.
const [getContextValue, contextValueProvider] = context();

const Example = component((c) => {
  return () => html`
    <h1>Hello ${getContextValue(c)}</h1>
  `;
});

update(
  createRoot(document.body),
  contextValueProvider(
    "World",
    Example(),
  ),
);
```

### Element Directive

`ElementDirective` is an escape hatch that allows extending ivi rendering
algorithm.

```ts
type ElementDirective = <E extends Element>(
  element: E,
) => void;
```

### DOM Utilities

#### **`eventDispatcher()`**

`eventDispatcher` creates an event dispatcher that finds the closest child DOM
node and emits a [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) with [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) method.

```ts
interface DispatchEventOptions {
  // Option indicating whether the event bubbles. The default
  // is `true`.
  bubbles?: boolean;
  // Option indicating whether the event can be cancelled. The
  // default is `false`.
  cancelable?: boolean;
  // Option indicating whether the event will trigger listeners
  // outside of a shadow root. The default is `false`.
  composed?: boolean;
}

type EventDispatcher = {
  (component: Component): boolean;
  <T>(component: Component, value: T): boolean;
};

function eventDispatcher = <T>(
  eventType: string,
  options?: DispatchEventOptions,
): EventDispatcher;
```

- `eventType` - Event type.
- `options` - Event options that will be used when event is dispatched.

Event dispatcher invokes event handlers synchronously. All event handlers are invoked before event dispatcher returns.

#### **`findDOMNode()`**

`findDOMNode` finds the closest DOM node child that belongs to a stateful node subtree.

```ts
function findDOMNode<T extends Node | Text>(
  node: SNode | null,
): T | null;
```

- `node` - Stateful node.

#### **`containsDOMElement()`**

`containsDOMElement` checks if a stateful node contains a DOM elements in its subtree.

```ts
function containsDOMElement(
  node: SNode,
  element: Element,
): boolean;
```

- `node` - Stateful node.
- `element` - DOM Element.

#### **`hasDOMElement()`**

`hasDOMElement` checks if a stateful node has a DOM element as its child.

```ts
function hasDOMElement(
  node: SNode,
  child: Element,
): boolean;
```

- `node` - Stateful node.
- `child` - DOM Element.

### Equality Functions

### **`preventUpdates()`**

`preventUpdates` is a noop function that always returns `true` value.

```ts
function preventUpdates<T>(a: T, b: T): true;
```

#### **`strictEq()`**

`strictEq` checks values for equality with strict equality operator `===`.

```ts
function strictEq<T>(a: T, b: T): boolean;
```

#### **`shallowEq()`**

`shallowEq` checks objects with shallow equality algorithm and uses strict equality operator to check individual values for equality.

```ts
function shallowEq<T extends object>(a: T, b: T): boolean;
```

#### **`shallowEqArray()`**

`shallowEqArray` checks arrays with shallow equality algorithm and uses strict equality operator to check individual values for equality.

```ts
function shallowEqArray<T>(a: T[], b: T[]): boolean;
```

## CheatSheet

### Passive Event Listener

```js
const Example = component(() => {
  const _onTouchDown = (ev) => {};

  const addPassiveTouchDown = (element) => {
    element.addEventListener(
      "touchdown",
      _onTouchDown,
      { passive: true },
    );
  };

  return () => html`
    <div ${addPassiveTouchDown}></div>
  `;
});
```

### Dynamic Argument Name

```js
const useDynamicArg = () => {
  let prevKey;
  let prevValue;
  return (key, value) => (element) => {
    if (prevKey !== key) {
      if (prevKey) {
        element.removeAttribute(prevKey);
      }
      element.setAttribute(key, value);
    } else if (prevValue !== value) {
      element.setAttribute(key, value);
    }
  };
};

const Example = component(() => {
  const arg = useDynamicArg();

  return ([key, value]) => html`
    <div ${arg(key, value)}></div>
  `;
});
```

### Integrating External/Imperative Libraries

```js
import { createRoot, update, component, findDOMNode, useEffect, html } from "ivi";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeMirror = component((c) => {
  let _editor;

  useEffect(c, () => {
    _editor = new EditorView({
      extensions: [basicSetup, javascript()],
      // findDOMNode finds the closest child DOM node.
      parent: findDOMNode(c),
    });

    // Reset function will be invoked when component is unmounted.
    return () => {
      _editor.destroy();
    };
  })();
  // ^ When effect doesn't have any dependencies, it can be executed just
  // once in the outer scope. Effect will run when its DOM tree is mounted.

  return () => html`
    <div class="CodeMirror"></div>
  `;
});

update(
  createRoot(document.body),
  CodeMirror(),
);
```

## Advanced

### Component Invalidation and Dirty Checking

Component invalidation algorithm is implemented by marking component as dirty and marking all its parent nodes with a flag that they have a dirty subtree. When marking algorithm reaches a root node, it invokes `OnRootInvalidated()` hook that can be used to implement a [custom scheduler](#custom-scheduler).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://localvoid.github.io/ivi/images/component-invalidated-1-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://localvoid.github.io/ivi/images/component-invalidated-1-light.png">
  <img src="https://localvoid.github.io/ivi/images/component-invalidated-1-light.png">
</picture>

1. Component invalidated and marked with `Dirty` flag.
2. Node marked with `DirtySubtree` flag.
3. Root Node marked with `DirtySubtree` flag, `OnRootInvalidated()` hook invoked.
4. Component invalidated and marked with `Dirty` flag, parents already marked with `DirtySubtree` flag.

When scheduler decides to update a root node with a dirty subtree, it starts a dirty checking algorithm. This algorithm goes top-down in a right-to-left order, visiting all nodes with a dirty subtree flag until it reaches a dirty  component and updates it.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://localvoid.github.io/ivi/images/dirty-checking-1-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://localvoid.github.io/ivi/images/dirty-checking-1-light.png">
  <img src="https://localvoid.github.io/ivi/images/dirty-checking-1-light.png">
</picture>

1. Starts dirty checking from the root node.
2. Clean node, skips visiting its subtree.
3. Node with `DirtySubtree` flag, starts checking its children.
4. Component with `Dirty` flag, triggers an update.
5. Component with `Dirty` flag, triggers an update.
6. Clean node, skips visiting its subtree.

### Right-to-Left Updates

One of the reasons why the core library is so small is because update algorithm is implemented in RTL order. Algorithm that performs updates in RTL order simplifies a lot of complex issues with DOM updates. The main issue with DOM updates is that when we start updating a DOM tree structure, we need to have a reference to a parent and a next DOM node, so that we can use `parent.insertBefore(newNode, nextNode)`. In most cases it is easy to retrieve a next DOM node, but there are edge cases like when we have two adjacent conditional expressions and one of their states is that it completely removes a DOM node from the tree, or two adjacent components with conditionals at their roots, etc.

Majority of libraries are dealing with this edge cases by introducing marker DOM nodes (comment or an empty text node). For example, to implement conditional expressions we can add an empty text node when conditional doesn't render any DOM node and when conditional goes into a state when it needs to add a DOM node, it will use a marker node as a next DOM node reference. The RTL update algorithm in ivi doesn't use any marker nodes.

The RTL algorithm that is used in ivi also makes it way much easier to implement node displacements without introducing any additional code paths, fragments and pretty much everything that involves updating a DOM structure.

### Template Call-Site Unique Identity

Each call-site that creates a template has unique identity, so even identical templates created from different call-sites won't be able to diff against each other.

```js
function TemplateUniqueIdentity(condition, text) {
  return (condition)
    ? html`div ${text}`
    : html`div ${text}`;
}
```

In the example above, when `condition` is changed, instead of updating text node, update algorithm will replace entire div element with a new one.

### Forcing Component Updates

There are some use cases that require a lot of frequent reads from a reactive variable. And whenever this variable changes, it affects a lot of UI nodes, like switching between light/dark themes.

Instead of creating a lot of subscriptions to this variables, it is recommended to use simple javascript values and rerender entire UI subtree with `dirtyCheck(root, true)` when this values are changed.

```js
const root = createRoot(document.getElementById("app"));

let theme = "Light";
function setTheme(t) {
  if (theme !== t) {
    theme = t;
    dirtyCheck(root, true);
  }
}

const App = component((c) => {
  const toggleTheme = () => {
    setTheme((theme === "Light") ? "Dark" : "Light");
  };
  return () => html`
    div
      div =${theme}
      button @click=${toggleTheme} 'Toggle Theme'
  `;
});

update(root, App());
```

### Template Cloning

Template cloning is an optimization that is used for cloning HTML templates
with a [`Node.cloneNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode) method.

By default, template cloning is enabled for all templates. But sometimes it would be wasteful to create a template for cloning and instantiate from it when this template is rendered just once.

To disable cloning, template should have a leading comment `/* preventClone */`. E.g.

```js
const Example = () => /* preventClone */html`
  <div class="Title">${text}</div>
`;
```

Templates with just one element that doesn't have any static properties will be created with [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement).

```js
html`<div attr=${0}>${1}</div>`;
```

### Event Handlers Hoisting

By default, event handlers (arrow function expressions) are automatically hoisted to the outermost scope.

```js
const Example = component((c) => {
  const [count, setCount] = useState(c, 0);

  return () => html`
    <div @click=${() => { setCount(count() + 1); }}>${count()}</div>
  `;
});
```

After event handler hoisting, it will be transformed into:

```js
const Example = component((c) => {
  const [count, setCount] = useState(c, 0);
  const __ivi_hoist_1 = () => { setCount(count() + 1); };

  return () => html`
    <div @click=${__ivi_hoist_1}>${count()}</div>
  `;
});
```

To disable event handlers hoisting, template should have a leading comment `/* preventHoist */`. E.g.

```js
const Example = component((c) => {
  const [count, setCount] = useState(c, 0);

  return () => /* preventHoist */html`
    <div @click=${() => { setCount(count() + 1); }}>${count()}</div>
  `;
});
```

*Multiple annotations can be declared by separating them with `|` operator, e.g. `/* preventClone | preventHoist */`*

### Internal Data Structures

To get a rough estimate of memory usage it is important to understand internal data structures.

In the description below we are going to calculate memory usage in a Chromium-based engines with [Pointer Compression in V8](https://v8.dev/blog/pointer-compression).

#### UI Tree

UI Tree is implemented with a stateful tree `SNode` and immutable stateless tree `VAny`.

Stateless Tree has a simple data structure:

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
  | null       // empty slot
  | undefined  // empty slot
  | false      // empty slot
  | string     // text
  | number     // text
  | VRoot      // VNode<RootDescriptor, RootProps>
  | VTemplate  // VNode<TemplateDescriptor, P>
  | VComponent // VNode<ComponentDescriptor, P>
  | VContext   // VNode<ContextDescriptor, ContextProps<T>>
  | VList      // VNode<ListDescriptor, ListProps<K>>
  | VArray     // VAny[]
  ;

// 20 bytes
// Root Props stores a location where its children should be rendered.
interface RootProps {
  // Parent Element
  p: Element,
  // Next Node
  n: Node | null,
}

// 20 bytes
// Context Props stores a context value and stateless child node.
interface ContextProps<T> {
  // Context value
  v: T;
  // Stateless child
  c: VAny;
}

// 20 bytes
interface ListProps<K> {
  // Keys that uniquely identify each stateless node in a dynamic list.
  k: K[],
  // Stateless nodes
  v: VAny[],
}
```

For each stateless node `VAny` there is a stateful node `SNode` that has an
interface:

```ts
// 32 bytes
interface SNode1<V extends VAny, S1> {
  // Stateless node associated with the current state.
  v: V;
  // Bitflags
  f: Flags; // SMI value - Small Integer
  // Children nodes.
  c: SNode | (SNode | null)[] | null;
  // Parent node.
  p: SNode | null,
  // State Slot #1.
  s1: S1;
}

// 36 bytes
interface SNode2<V = VAny, S1 = any, S2 = any> extends SNode1<V, S1> {
  // State slot #2.
  s2: S2;
}

// Stateful Nodes are using two different shapes. Call-sites that accessing its
// flags to determine node type will be in a polymorphic state. In this case it
// is perfectly fine to use polymorphic call-sites to reduce memory usage.
type SNode<V = VAny> = SNode1<V> | SNode2<V>;

// Additional state size of the root nodes depends on the implementation of
// root nodes. Default root implementation doesn't use any additional state and
// stores `null` value in the additional state slot.
type SRoot<S> = SNode1<VRoot, S>;
// Text nodes are storing a reference to a Text DOM node.
type SText = SNode1<string | number, Text>;
// Template nodes are storing a reference to a root DOM node, DOM nodes with
// dynamic properties and DOM nodes that will be used as a reference for
// `parent.insertBefore(node, nextNode)` operations. Slots for DOM nodes with
// dynamic properties that also used as a reference for insertBefore operation
// will share the same slots, there won't be any duplicated references.
type STemplate = SNode1<VTemplate, Node[]>;
// Dynamic lists doesn't have any additional state.
type SList = SNode1<VList, null>;
// Components are using State Nodes with 2 state slots.
type SComponent = SNode2<
  VComponent,
  // Render function.
  //
  // Stateless components will share the same function.
  // Stateful components will create closures and its memory usage will depend
  // on the size of the closure context.
  null | ((props: any) => VAny),
  // Unmount hooks.
  //
  // Usually components don't have any unmount hooks, or they have just one
  // unmount hook.
  //
  // When there is one hook, it will be stored without any additional arrays.
  // If we add one more hook, array will be preallocated with exactly two
  // slots `[firstHook, newHook]`. And when it grows even more, javascript
  // engine will preallocate internal storage using a growth factor[1][2].
  //
  // 1. https://en.wikipedia.org/wiki/Dynamic_array#Growth_factor
  // 2. https://github.com/v8/v8/blob/1e6775a539a3b88b25cc0ffdb52529c68aad2be8/src/objects/js-objects.h#L584-L590
  null | (() => void) | (() => void)[]
>;
// Contexts doesn't have any additional state.
type SContext = SNode1<null, null>;
```

This data structures were carefully designed to have small memory overhead and avoid a lot of polymorphic/megamorphic call-sites that access this data structures.

To understand why monomorphic call-sites are important for performance, it is recommended to read a great article on this topic: ["What's up with monomorphism?"](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html).

#### Template

Templates are precompiled into a static part that is stored in a `TemplateDescriptor` object and an array of dynamic expressions.

```js
const Example = (attr, child) => html`div :attr=${attr} span ${child}`;
```

Gets compiled into:

```js
// _T() creates TemplateDescriptor
const _tpl_1 = _T(
  // _h() creates a template factory that uses Node.cloneNode(true) to
  // instantiate static template structure.
  _h("<div><span></span></div>"),
  // SMI (Small Integer) value that packs several values:
  // struct Data {
  //   stateSize:6;    // The number of state slots
  //   childrenSize:6; // The number of children slots
  //   svg:1;          // Template with SVG elements
  // }
  // stateSize and childrenSize are used for preallocating arrays with
  // exact number to avoid dynamic growth and reduce memory consumption.
  1026,
  // propOpCodes is an array of SMI values that stores opCodes for updating
  // element properties.
  [2],
  // childOpCodes is an array of SMI values that stores opCodes for updating
  // children nodes.
  [7, 4],
  // stateOpCodes is an array of SMI values that stores opCodes for traversing
  // DOM nodes and saving references to DOM nodes into internal state when
  // template is instantiated.
  [4],
  // An array of string values that stores attribute name, event names, etc.
  ["attr"],
);
// _t() creates stateless tree node VTemplate with shared TemplateDescriptor
// and an array of dynamic expressions.
const Example = (attr, child) => _t(_tpl_1, [attr, child]);
```

```ts
// Descriptor with TemplateData and template factory function.
type TemplateDescriptor = VDescriptor<TemplateData, () => Element>;

interface TemplateData {
  // stateSize / childrenSize / svg flag
  f: number,
  // Prop OpCodes
  p: PropOpCode[],
  // Child OpCodes
  c: ChildOpCode[],
  // State OpCodes
  s: StateOpCode[],
  // Strings
  d: string[],
}

// Stateless tree node VTemplate.
type VTemplate<P = any> = VNode<TemplateDescriptor, P>;
```

### Template Optimizations

Template compiler doesn't just eliminate compilation step during runtime, it also hoists static attributes and event listeners, deduplicates OpCodes, strings and template factory functions. E.g.

```js
import { className } from "styles.css";

const a = (id) => html`
<div class=${className} id=${id}></div>
`;
const b = (id) => html`
<div class=${className} id=${id}></div>
`;
```

Will generate two different templates with shared data structures:

```js
import { className } from "styles.css";
import { _h, _T, _t } from "ivi";

const EMPTY_ARRAY = [];
const __IVI_STRINGS__ = ["id"];
const ELEMENT_FACTORY_1 = _h('<div class="' + className + '"></div>');
const SHARED_OP_CODES_1 = [/*..*/];
const _tpl_a = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* shared strings */__IVI_STRINGS__,
);
const _tpl_b = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* shared strings */__IVI_STRINGS__,
);

const a = (id) => _t(_tpl_a, [id]);
const b = (id) => _t(_tpl_b, [id]);
```

Quite often, OpCodes that are used for different purposes (props,child,state) are going to have similar values, so when OpCodes are deduplicated they are treated as simple arrays with integers that can be used for different purposes.

Shared strrings (attribute keys, event names, etc) are deduplicated into one array (`__IVI_STRINGS__`) that is shared between all templates.

### Custom Scheduler

ivi is designed as an embeddable solution, so that it can be integrated into existing frameworks or web components. The basic root node instantiated with `createRoot()` function is using microtask queue to schedule updates. Root nodes with custom scheduling algorithm can be created by defining new root factories with `defineRoot()` function.

```ts
function defineRoot(onInvalidate: (root: Root<undefined>) => void)
  : (parentElement: Element, nextNode: Node | null) => Root<undefined>;
function defineRoot<S>(onInvalidate: (root: Root<S>) => void)
  : (parentElement: Element, nextNode: Node | null, state: S) => Root<S>;
```

As an example, to remove any batching and immediately update root subtree when it is invalidated we can define the following root node:

```ts
import { defineRoot } from "ivi";

const createSyncRoot = defineRoot((root) => {
  // Immediately triggers dirty checking.
  dirtyCheck(root);
});
```

#### Using `requestAnimationFrame()` for Scheduling UI Updates

Scheduling algorithm with `rAF` batching has some potential footguns with race conditions.

```js
function formStateReducer(state, action) {
  switch (action.type) {
    case "update":
      return {
        value: action.value,
        valid: /^[a-z]+$/.test(action.value),
      };
  }
  return state;
}

const Form = component((c) => {
  const [state, dispatch] = useReducer(c,
    { value: "", valid: false },
    formStateReducer,
  );
  const onInput = (ev) => {
    dispatch({ type: "update", value: ev.target.value });
  };
  return () => html`
    <form>
      <input
        @input=${onInput}
        *value=${state().value}
      />
      <input
        type="submit"
        value="Submit"
        .disabled=${!state().valid}
      />
    </form>
  `;
});

update(
  createRoot(document.getElementById("app")!),
  Form(),
);
```

In this example, if the user types really fast and pushes an `[enter]` button, it is possible to get an execution order like this:

- User types `0` into `<input>`.
- `onChange()` event handler is triggered, `state.valid` switches into a `false`
  state.
- User pushes an `[enter]` button.
- Browser sends submit request because UI is still in the old state
  `<input type="submit" .disabled={false} />`
- `rAF` event is triggered, submit button goes into disabled state.

The simplest way to avoid issues like this is to use microtasks for batching. But if you really want to add `rAF` scheduling, it is possible to solve issues like this by introducing some synchronization primitives:

```js
import { uiReady } from "my-custom-scheduler";

const onSubmit = async (ev) => {
  await uiReady();
  submit();
};
```

## External Dependencies

ivi runtime doesn't depend on any external libraries.

ivi dev tools has a minimal set of dependencies:

- [TypeScript](https://github.com/microsoft/TypeScript/) library is used for template precompilation.
- [`@rollup/pluginutils`](https://github.com/rollup/plugins) is used in a rollup plugin `@ivi/rollup-plugin` to filter out modules.

## License

[MIT](http://opensource.org/licenses/MIT)
