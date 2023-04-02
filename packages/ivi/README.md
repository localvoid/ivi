# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE)

Lightweight Embeddable Web UI library.

- `f(state) => UI`
- The [basic example](#examples) is just 2.7KB.
- [Vite](#vite) / [Astro](#astro) plugins.
- [Precompiled](#template-optimizations) templates optimized for size and
performance.
- [Small memory footprint](#internal-data-structures).
- [Embeddable](#custom-scheduler).
- Server-Side Rendering and Client-Side Hydration.

## Examples

```js
import { createRoot, update, component, useState } from "ivi";
import { htm } from "@ivi/htm";

const Example = component((c) => {
  const [count, setCount] = useState(c, 0);
  const inc = () => { setCount(count() + 1); };

  return () => htm`
    <div class="app">
      <div>${count()}</div>
      <button @click=${inc}>Increment</button>
    </div>
  `;
});

update(
  createRoot(document.getElementById("app")),
  Example(),
);
```

The size of the precompiled example above is just 2.7KB. It includes entire
runtime for declarative UI rendering. Precompiled templates are
[optimized](#template-optimizations) for code size and cold-start performance
and doesn't generate any additional code for hydration.

- [Examples from the https://react.dev/learn rewritten with ivi API](https://github.com/localvoid/ivi/blob/master/docs/misc/migrating-from-react.md)
- [TodoMVC (HTML templates)](https://github.com/localvoid/ivi-examples/tree/master/apps/todomvc-htm)
- [TodoMVC (ivi templates)](https://github.com/localvoid/ivi-examples/tree/master/apps/todomvc-htm)
- [ivi REPL](https://github.com/localvoid/ivi-repl)

## Table of Contents

- [Setup](#setup)
  - [Vite](#vite)
  - [Astro](#astro)
  - [Rollup](#rollup)
  - [Babel Plugin](#babel-plugin)
- [Declarative UI](#declarative-ui)
  - [Templates](#templates)
    - [HTML Template Language](#html-template-language)
    - [ivi Template Language](#ivi-template-language)
  - [Expressions](#expressions)
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
    - [`hydrate(root, v)`](#hydrate)
    - [`defineRoot(onInvalidate)`](#defineroot)
  - [Components](#components)
    - [`component(factory, areEqual)`](#component)
    - [`useUnmount(component, hook)`](#useunmount)
    - [`invalidate(component)`](#invalidate)
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
  - [Stateless Components with `areEqual` hook](#stateless-components-with-areequal-hook)
  - [Integrating External Widgets](#integrating-external-widgets)
- [Advanced](#advanced)
  - [Component Invalidation and Dirty Checking](#component-invalidation-and-dirty-checking)
  - [Right-to-Left Updates](#right-to-left-updates)
  - [Template Call-Site Unique Identity](#template-call-site-unique-identity)
  - [Forcing Component Updates](#forcing-component-updates)
  - [Template Cloning](#template-cloning)
  - [Internal Data Structures](#internal-data-structures)
    - [UI Tree](#ui-tree-data-structures)
    - [Templates](#template-data-structures)
  - [Template Optimizations](#template-optimizations)
  - [Custom Scheduler](#custom-scheduler)

## Setup

ivi templates will work without any precompilation for Client-Side Rendering,
but it is highly recommended to use precompilation to improve performance and
reduce code size.

### Vite

`"@ivi/vite-plugin"` package provides [Vite](https://vitejs.dev/) plugin that
supports Client-Side Rendering and
[Server-Side Rendering](https://vitejs.dev/guide/ssr.html).

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { ivi } from "@ivi/vite-plugin";

export default defineConfig({
  plugins: [ivi()],
});
```

### Astro

`"@ivi/astro"` package provides [Astro](https://astro.build/) integration plugin
that supports Server-Side Rendering and Client-Side Hydration.

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import ivi from "@ivi/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [ivi()],
});
```

### Rollup

`"@ivi/rollup-plugin"` package provides
[Rollup](https://rollupjs.org/) / [Vite](https://vitejs.dev/) plugin that
supports Client-Side Rendering only.

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

### Babel Plugin

`"@ivi/babel-plugin"` package provides babel plugins for precompiling and
optimizing templates.

- `"@ivi/babel-plugin/client"` plugin precompiles templates and should be
applied in a module transformation pass for Client-Side Rendering.
- `"@ivi/babel-plugin/client-optimizer"` deduplicates shared data and should be applied in a chunk transformation pass for Client-Side Rendering.
- `"@ivi/babel-plugin/server"` plugin precompiles templates for Server-Side
rendering.

## Declarative UI

### Templates

ivi supports different template languages and it is easy to create a new one.
All compilation complexity is abstracted away in `"ivi/template/..."` modules.

#### HTML Template Language

`"@ivi/htm"` package provides [HTML Template Language](https://github.com/localvoid/ivi/blob/master/packages/@ivi/htm/README.md).

It is a simple HTML-like language with dynamic expressions.

```js
import { htm } from "@ivi/htm";
const Example = component((c) => {
  // ...
  return () => htm`
    <div class="app">
      <div>${count()}</div>
      <button @click=${inc}>Increment</button>
    </div>
  `;
});
```

#### ivi Template Language

`"@ivi/tpl"` package provides [ivi Template Language](https://github.com/localvoid/ivi/blob/master/packages/@ivi/tpl/README.md).

It was designed as a concise language for defining DOM tree structures and uses
indentation for nesting.

```js
import { htm } from "@ivi/tpl";
const Example = component((c) => {
  // ...
  return () => htm`
    div.app
      div ${count()}
      button @click=${inc} "Increment"
  `;
});
```

### Expressions

#### Conditionals

```js
const Example = component((c) => {
  // ...
  return (show) => htm`
    <div>
      ${show && htm`<span>Show</span>`}
    </div>
  `;
});
```

#### Arrays

Javascript arrays can be used for composing UI nodes:

```js
const ArraysInsideTemplates = () => htm`
  <div>
    ${[
      htm`<div>a</div>`,
      htm`<div>b</div>`,
    ]}
  </div>
`;

const NestedArrays = () => htm`
  <div>
    ${[
      [htm`<div>a</div>`, htm`<div>b</div>`],
      [htm`<div>c</div>`, htm`<div>d</div>`],
    ]}
  </div>
`;

const ComponentsWithMultipleRootNodes = component((c) => () => ([
  htm`<div>a</div>`,
  htm`<div>b</div>`,
]));
```

When arrays are diffed, stateless tree nodes mapped onto their stateful nodes
by their position in the array.

When array contains a conditional expression that returns a "hole"
`null`, `undefined` or `false` value, the hole will occupy a slot in a stateful
tree, so that all nodes will be correclty mapped onto their stateful nodes. E.g.

```js
[
  conditional ? "text" : null,
  StatefulComponent(),
]
```

In the example above, when `conditional` expression goes from a text to a hole
and vice versa, `StatefulComponent` will preserve its internal state.

When array grows or shrinks in size, stateful nodes will be removed and created
at the end.

#### Dynamic Lists

Dynamic lists that map stateless nodes onto a stateful ones is not an
optimization technique. It is used to correctly preserve components state, custom DOM elements state, CSS animations state, etc.

Stateless nodes are mapped onto their stateful nodes by their unique key
`getKey()`, dynamic lists shouldn't have any duplicated keys.

```ts
function List<E, K>(
  // Input Entries.
  entries: E[],
  // Function that retrieves unique key from an entry.
  getKey: (entry: E, index: number) => K,
  // Function that renders an entry.
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
const EntryView = (entry: DataEntry) => (
  htm`<li>${entry.text}</li>`
);

const ListView = (data: DataEntry[]) => htm`
  <ul>${List(data, getEntryKey, EntryView)}</ul>
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

## Components

### Stateful Components

[`component()`](#component) function is used to declare components. It creates
a factory function that produces stateless view nodes.

```js
const Example = component((c) => {
  return (props) => (
    htm`<div>${props.value}</div>`
  );
});

update(
  document.body,
  htm`
  <div>
    ${Example({ value: "Hello World" })}
  </div>
  `
);
```

Stateful components are using javascript closures to store internal state.

```js
const Example = component((c) => {
  // Internal state.
  let _i = 0;

  // Render function.
  return () => (
    htm`<div>${_i}</div>`
  );
});
```

When internal state is mutated, it doesn't trigger component updates and it
should be manually invalidated with [`invalidate()`](#invalidate) function.

```js
const Example = component((c) => {
  // Internal state.
  let _i = 0;
  const onClick = () => {
    _i++;
    // Marks component as dirty and schedules an update.
    invalidate(c);
  };
  // Render function.
  return () => (
    htm`
    <div>
      ${_i}
      <button @click=${onClick} />
    </div>`
  );
});
```

There are high-level APIs like [`useState()`](#usestate) or
[`useReducer()`](#usereducer) that use low-level [`invalidate()`](#invalidate)
function behind the scenes to automatically invalidate components when internal
state is mutated:

```js
const Example = component((c) => {
  // Internal state.
  const [i, setI] = useState(c, 0);
  const onClick = () => {
    set(i() + 1);
  };
  // Render function.
  return () => (
    htm`
    <div>
      ${i()}
      <button @click=${onClick} />
    </div>`
  );
});
```

### Stateless Components

Basic stateless components can be implemented with simple functions.

```js
const Button = (text, onClick) => htm`
  <button @click=${onClick}>${text}</button>
`;
```

## API

### Opaque Types

Opaque type hides its internal representation at boundaries between a module
and code that works with the module.

It is useful in use cases like Server-Side Rendering. When code is executed on
the server, some types will have completely different internal representation.

### Stateful Tree

```ts
type SNode = Opaque;
type Root<State> = Opaque<State>;
type Component<Props> = Opaque<Props>;
```

> *Server-Side Rendering doesn't use stateful trees to render into a string. All
stateful nodes will have an `undefined` value on the server.*

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

#### **`createRoot()`**

```ts
function createRoot(
  parentElement: Element,
  nextNode: Node | null = null,
): Root;
```

`createRoot` creates a root node that uses microtask queue for scheduling
updates.

> *SSR: Throws an exception.*

#### **`dirtyCheck()`**

```ts
function dirtyCheck(
  root: Root,
  forceUpdate: boolean = false,
): void;
```

`dirtyCheck` performs dirty checking in a root subtree.

When `forceUpdate` option is enabled, all components in a root subtree will be
updated.

> *SSR: Throws an exception.*

#### **`update()`**

```ts
function update(
  root: Root,
  v: VAny,
  forceUpdate: boolean = false,
): void;
```

`update` updates a root subtree.

When `forceUpdate` option is enabled, all components in a root subtree will be
updated.

> *SSR: Throws an exception.*

#### **`unmount()`**

```ts
function unmount(
  root: Root,
  detach: boolean,
): void;
```

`unmount` unmounts a root subtree.

When `detach` option is enabled, root DOM nodes will be detached from the DOM.

> *SSR: Throws an exception.*

#### **`hydrate()`**

```ts
function hydrate(
  root: Root,
  v: VAny,
): void;
```

`hydrate` hydrates a root subtree.

> *SSR: Throws an exception.*

#### **`defineRoot()`**

```ts
function defineRoot(
  onInvalidate: (root: Root<undefined>) => void,
) : (parentElement: Element, nextNode: Node | null) => Root<undefined>;

function defineRoot<S>(
  onInvalidate: (root: Root<S>, state: S) => void,
) : (parentElement: Element, nextNode: Node | null, state: S) => Root<S>;
```

`defineRoot` defines a root node with a custom invalidated hook.

`onInvalidate` is a custom invalidate hook.

### Components

#### **`component()`**

```ts
function component(
  factory: (c: Component) => () => VComponent<undefined>,
): () => VComponent<undefined>;
function component<P>(
  factory: (c: Component) => (props: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => VComponent<P>;
```

`component` creates a factory that produces component nodes.

`factory` is a function that produces stateful component render functions.

`areEqual` is a function that checks input properties for changes and is used
as an optimization hint to avoid updates when properties didn't change. When
root subtree is updated with `forceUpdate` option, `areEqual` hint is ignored
and all components are updated.

#### **`invalidate()`**

```ts
function invalidate(c: Component): void;
```

> *SSR: Throws an exception.*

#### **`useUnmount()`**

```ts
function useUnmount(component: Component, hook: () => void): void;
```

Adds an unmount hook.

> *SSR: Throws an exception.*

### Component State

#### **`useMemo()`**

```ts
function useMemo<T, U>(
  areEqual: (prev: T, next: T) => boolean,
  fn: (props: T) => U,
): (props: T) => U;
```

`useMemo` creates a memoized function.

> *SSR: Returns a `fn` function.*

#### **`useState()`**

```ts
function useState<S>(
  component: Component,
  state: S,
): [
  get: () => S,
  set: (s: S) => void,
];
```

`useState` creates a reactive value.

> *SSR: `set` function throws an exception.*

#### **`useReducer()`**

```ts
type Dispatch<A> = (action: A) => void;

function useReducer<S, A>(
  c: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): [
  get: () => S,
  dispatch: Dispatch<A>,
];
```

`useReducer` creates a reactive state reducer.

> *SSR: `dispatch` function throws an exception.*

### Side Effects

#### **`useEffect()`**

```ts
function useEffect(
  c: Component,
  effect: () => (() => void) | void,
): () => void;
function useEffect<P>(
  c: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

Side effects created with `useEffect` are executed immediately after `Root`
node finishes an update.

> *SSR: Returns a noop function.*

#### **`useLayoutEffect()`**

```ts
function useLayoutEffect(
  c: Component,
  effect: () => (() => void) | void,
): () => void;
function useLayoutEffect<P>(
  c: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

Layout effects created with `useLayoutEffect` are executed before animation
frame.

> *SSR: Returns a noop function.*

#### **`useIdleEffect()`**

```ts
function useIdleEffect(
  c: Component,
  effect: () => (() => void) | void,
): () => void;
function useIdleEffect<P>(
  c: Component,
  effect: (props: P) => (() => void) | void,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => void;
```

Idle effects created with `useIdleEffect` are executed when browser is idle.

> *SSR: Returns a noop function.*

### List

#### **`List()`**

```ts
function List<E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList;
```

`List` creates a stateless view node for dynamic lists.

`getKey` function should return a unique key for an entry.

`render` function renders an entry.

### Context

### **`context()`**

```ts
function context = <T>(): [
  get: (component: Component) => T | undefined,
  provider: (value: T, children: VAny) => VContext<T>,
]
```

`context` creates context getter and context provider functions.

`get` function finds the closest context value.

`provider` function creates stateless context nodes.

### DOM Utilities

#### **`eventDispatcher()`**

```ts
interface DispatchEventOptions {
  // Option indicating whether the event bubbles. The default
  // is `false`.
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

`eventDispatcher` creates an event dispatcher that finds the closest child DOM
node and emits a
[`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
with [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
method.

Event dispatcher invokes event handlers synchronously. All event handlers are
invoked before event dispatcher returns.

> *SSR: Event dispatcher throws an exception.*

#### **`findDOMNode()`**

```ts
function findDOMNode<T extends Node | Text>(
  node: SNode | null,
): T | null;
```

`findDOMNode` finds the closest DOM node child that belongs to a stateful node
subtree.

> *SSR: Throws an exception.*

#### **`containsDOMElement()`**

```ts
function containsDOMElement(
  node: SNode,
  element: Element,
): boolean;
```

`containsDOMElement` checks if a stateful node contains a DOM elements in its
subtree.

> *SSR: Throws an exception.*

#### **`hasDOMElement()`**

```ts
function hasDOMElement(
  node: SNode,
  child: Element,
): boolean;
```

`hasDOMElement` checks if a stateful node has a DOM element as its child.

> *SSR: Throws an exception.*

### Equality Functions

### **`preventUpdates()`**

```ts
function preventUpdates<T>(a: T, b: T): true;
```

`preventUpdates` is a noop function that always returns `true` value.

#### **`strictEq()`**

```ts
function strictEq<T>(a: T, b: T): boolean;
```

`strictEq` checks values for equality with strict equality operator `===`.

#### **`shallowEq()`**

```ts
function shallowEq<T extends object>(a: T, b: T): boolean;
```

`shallowEq` checks objects with shallow equality algorithm and uses strict
equality operator to check individual values for equality.

#### **`shallowEqArray()`**

```ts
function shallowEqArray<T>(a: T[], b: T[]): boolean;
```

`shallowEqArray` checks arrays with shallow equality algorithm and uses
strict equality operator to check individual values for equality.

## CheatSheet

### Stateless Components with `areEqual` hook

```js
const _Button = ([text, onClick]) => htm`
  <button @click=${onClick}>${text}</button>
`;
const Button = component(
  // Component factory will reuse the same hoisted render
  // function for all component instances.
  () => _Button,
  // areEqual function
  (prev, next) => (
    prev[0] === next[0] &&
    prev[1] === next[1]
  ),
);
```

### Integrating External Widgets

```js
import { createRoot, update, component, useEffect } from "ivi";
import { htm } from "@ivi/htm";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

const App = component((c) => {
  let _container: HTMLElement;
  let _editor: EditorView;

  const ref = (e: HTMLElement) => { _container = e; };
  useEffect(c, () => {
    _editor = new EditorView({
      extensions: [basicSetup, javascript()],
      parent: _container,
    });
  })();

  return () => htm`
    <div class="App">
      <div class="CodeMirror" ${ref}></div>
    </div>
  `;
});

update(
  createRoot(document.body),
  App(),
);
```

## Advanced

### Component Invalidation and Dirty Checking

Component invalidation algorithm is implemented by marking component as dirty
and marking all its parent nodes with a flag that they have a dirty subtree.
When marking algorithm reaches root node, it invokes `OnRootInvalidated()` hook
that can be used to implement a [custom scheduler](#custom-scheduler).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://localvoid.github.io/ivi/images/component-invalidated-1-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://localvoid.github.io/ivi/images/component-invalidated-1-light.png">
  <img src="https://localvoid.github.io/ivi/images/component-invalidated-1-light.png">
</picture>

1. Component invalidated and marked with `Dirty` flag.
2. Node marked with `DirtySubtree` flag.
3. Root Node marked with `DirtySubtree` flag, `OnRootInvalidated()` hook
invoked.
4. Component invalidated and marked with `Dirty` flag, parents already marked
with `DirtySubtree` flag.

When scheduler decides to update a root node with a dirty subtree, it starts a
dirty checking algorithm. This algorithm goes top-down in a right-to-left order,
visiting all nodes with a dirty subtree flag until it reaches a dirty component
and updates it.

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

### Template Call-Site Unique Identity

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

### Forcing Component Updates

There are some use cases that require a lot of frequent reads from a reactive
variable. And whenever this variable changes, it affects a lot of UI nodes, like
switching between light/dark themes.

Instead of creating a lot of subscriptions to this variables, it is recommended
to use simple javascript values and rerender entire UI subtree with
`dirtyCheck(root, true)` when this values are changed.

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
  return () => htm`
    div
      div =${theme}
      button @click=${toggleTheme} 'Toggle Theme'
  `;
});

updateRoot(root, App());
```

### Template Cloning

Template cloning is an optimization that is used for cloning HTML templates
with a
[`Node.cloneNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
method.

By default, template cloning is enabled for all templates. But sometimes it
would be wasteful to create a template for cloning and instantiate from it when
this template is rendered just once on the page.

To disable cloning, template should have a leading comment `/*-c*/`. E.g.

```js
const Example = () => /*-c*/htm`
  <div class="Title">${text}</div>
`;
```

Templates with just one element that doesn't have any static properties will
be created with [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement).

```js
htm`<div attr=${0}>${1}</div>`;
```

### Internal Data Structures

To get a rough estimate of memory usage it is important to understand internal
data structures.

In the description below we are going to calculate memory usage in a
Chromium-based engines with [Pointer Compression in V8](https://v8.dev/blog/pointer-compression).

#### UI Tree

UI Tree is implemented with a stateful tree `SNode` and immutable stateless
tree `VAny`.

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

This data structures were carefully designed to have small memory overhead
and avoid a lot of polymorphic/megamorphic call-sites that access this data
structures.

To understand why monomorphic call-sites are important for performance, it is
recommended to read a great article on this topic: ["What's up with monomorphism?"](https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html).

#### Template

Templates are precompiled into a static part that is stored in a
`TemplateDescriptor` object and an array of dynamic expressions.

```js
const Example = (attr, child) => htm`div :attr=${attr} span ${child}`;
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
  // Data is an array of string values that stores keys for dynamic properties.
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
  // Data
  d: any[],
}

// Stateless tree node VTemplate.
type VTemplate<P = any> = VNode<TemplateDescriptor, P>;
```

### Template Optimizations

`@ivi/babel-plugin` module contains a babel plugin with a template compiler and
optimizer that significantly improves start-up performance.

Template compiler doesn't just eliminate compilation step during runtime, it
also hoists static expressions and deduplicates OpCodes, static data and
template factory functions. E.g.

```js
import { className } from "styles.css";

const a = (id) => htm`
<div class=${className} id=${id}></div>
`;
const b = (id) => htm`
<div class=${className} id=${id}></div>
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
existing frameworks or web components. The basic root node instantiated with
`createRoot()` function is using microtask queue to schedule updates. Root
nodes with custom scheduling algorithm can be created by defining new root
factories with `defineRoot()` function.

```ts
function defineRoot(onInvalidate: (root: Root<undefined>) => void)
  : (parentElement: Element, nextNode: Node | null) => Root<undefined>;
function defineRoot<S>(onInvalidate: (root: Root<S>) => void)
  : (parentElement: Element, nextNode: Node | null, state: S) => Root<S>;
```

As an example, to remove any batching and immediately update root subtree
when it is invalidated we can define the following root node:

```ts
import { defineRoot } from "ivi";

const createSyncRoot = defineRoot((root) => {
  // Immediately triggers dirty checking.
  dirtyCheck(root);
});
```

#### Using `requestAnimationFrame()` for Scheduling UI Updates

Scheduling algorithm with `rAF` batching has some potential footguns with race
conditions.

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
  return () => htm`
    form
      input
        @input=${onInput}
        *value=${state().value}
      input
        :type='submit'
        :value='Submit'
        .disabled=${!state().valid}
  `;
});

updateRoot(
  createRoot(document.getElementById("app")!),
  Form(),
);
```

In this example, if the user types really fast and pushes an `[enter]` button,
it is possible to get an execution order like this:

- User types `0` into `<input>`.
- `onChange()` event handler is triggered, `state.valid` switches into a `false`
  state.
- User pushes an `[enter]` button.
- Browser sends submit request because UI is still in the old state
  `<input type="submit" .disabled={false} />`
- `rAF` event is triggered, submit button goes into disabled state.

The simplest way to avoid issues like this is to use microtasks for batching.
But if you really want to add `rAF` scheduling, it is possible to solve issues like this by introducing some synchronization primitives:

```js
import { uiReady } from "my-custom-scheduler";

const onSubmit = async (ev) => {
  await uiReady();
  submit();
};
```

## License

[MIT](http://opensource.org/licenses/MIT)
