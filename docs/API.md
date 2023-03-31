# API

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
  - [`component(factory)`](#component)
  - [`invalidate(component)`](#invalidate)
- [Component State](#component-state)
  - [`useMemo(areEqual, fn)`](#usememo)
  - [`useState(component, value)`](#usestate)
  - [`useReducer(component, value, reducer)`](#usereducer)
- [Side Effects](#side-effects)
  - [`useEffect(component, effect)`](#useeffect)
  - [`useLayoutEffect(component, effect)`](#uselayouteffect)
  - [`useIdleEffect(component, effect)`](#useidleeffect)
- [List](#list)
  - [`List(entries, getKey, render)`](#list-1)
- [Context](#context)
  - [`contextType()`](#contexttype)
  - [`context(component, type)`](#context-1)
  - [`Context(type, value)`](#context-2)
- [DOM Utilities](#dom-utilities)
  - [`emit(node, eventName, detail, options)`](#emit)
  - [`findDOMNode(node)`](#finddomnode)
  - [`containsDOMElement(node, element)`](#containsdomelement)
  - [`hasDOMElement(node, element)`](#hasdomelement)
- [Equality Functions](#equality-functions)
  - [`preventUpdates(a, b)`](#preventupdates)
  - [`strictEq(a, b)`](#stricteq)
  - [`shallowEq(a, b)`](#shalloweq)
  - [`shallowEqArray(a, b)`](#shalloweqarray)

## Opaque Types

Opaque type hides its internal representation at boundaries between a module
and code that works with the module. It is useful in use cases like Server
Side Rendering. When code is executed on the server, some types will have
completely different internal representation.

## Stateful Tree

```ts
type SNode = Opaque;
type Root<State> = Opaque<State>;
type Component<Props> = Opaque<Props>;
```

*Server Side Rendering doesn't use stateful trees to render into a string. All
stateful nodes will have an `undefined` value on the server.*

## Stateless Tree

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
  | VList      // Dynamic List with track by key algo
  | VAny[]     // Dynamic List with track by index algo
  ;

type VRoot = Opaque;
type VTemplate = Opaque;
type VComponent = Opaque;
type VList = Opaque;
```

## Root

### **`createRoot()`**

```ts
function createRoot(parentElement: Element, nextNode: Node | null): Root;
```

`createRoot` creates a root node that uses microtask queue for scheduling
updates.

*Throws an exception in SSR context.*

### **`dirtyCheck()`**

```ts
function dirtyCheck(root: Root, forceUpdate?: boolean = false): void;
```

`dirtyCheck` performs dirty checking in a root subtree.

When `forceUpdate` option is enabled, all components in the root subtree will be
updated.

*Throws an exception in SSR context.*

### **`update()`**

```ts
function update(root: Root, v: VAny, forceUpdate?: boolean = false): void;
```

`update` updates root subtree.

When `forceUpdate` option is enabled, all components in the root subtree will be
updated.

*Throws an exception in SSR context.*

### **`unmount()`**

```ts
function unmount(root: Root, detach: boolean): void;
```

`unmount` unmounts root subtree.

When `detach` option is enabled, root DOM nodes will be detached from the DOM.

*Throws an exception in SSR context.*

### **`hydrate()`**

```ts
function hydrate(root: Root, v: VAny): void;
```

`hydrate` hydrates root subtree.

*Throws an exception in SSR context.*

### **`defineRoot()`**

```ts
function defineRoot(onInvalidate: (root: Root<undefined>) => void)
  : (parentElement: Element, nextNode: Node | null) => Root<undefined>;
function defineRoot<S>(onInvalidate: (root: Root<S>) => void)
  : (parentElement: Element, nextNode: Node | null, state: S) => Root<S>;
```

`defineRoot` defines a root node with a custom invalidation hook.

## Components

### **`component()`**

```ts
function component(
  factory: (c: Component) => () => VComponent<undefined>,
): () => VComponent<undefined>;
function component<P>(
  factory: (c: Component) => (props: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean
): (props: P) => VComponent<P>;
```

`component` creates a factory for component nodes.

`areEqual` is a function that checks input properties for changes and is used
as an optimization hint to avoid updates when properties didn't change. When
root subtree is updated with `forceUpdate` option, `areEqual` hint is ignored
and all components are updated.

### **`invalidate()`**

```ts
function invalidate(c: Component): void;
```

*Throws an exception in SSR context.*

## Component State

### **`useMemo()`**

```ts
function useMemo<T, U>(
  areEqual: (prev: T, next: T) => boolean,
  fn: (props: T) => U,
): (props: T) => U;
```

*Returns a `fn` function in SSR context.*

### **`useState()`**

```ts
function useState<S>(c: Component, state: S): [
  get: () => S,
  set: (s: S) => void,
];
```

*`set` function throws an exception in SSR context.*

### **`useReducer()`**

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

*`dispatch` function throws an exception in SSR context.*

## Side Effects

### **`useEffect()`**

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

*Returns a noop function in SSR context.*

### **`useLayoutEffect()`**

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

*Returns a noop function in SSR context.*

### **`useIdleEffect()`**

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

*Returns a noop function in SSR context.*

## List

### **`List()`**

```ts
function List<E, K>(
  entries: E[],
  getKey: (entry: E, index: number) => K,
  render: (entry: E) => VAny,
): VList;
```

`List` creates a stateless node for dynamic lists.

`getKey` function should return a unique key for an entry.

`render` function renders an entry.

## Context

### **`contextType()`**

```ts
type ContextType<T> = Opaque<T>;

function contextType<T>(): ContextType<T>;
```

`contextType` creates unique context type.

### **`context()`**

```ts
function context<T>(c: Component, type: ContextType<T>): T | undefined;
```

`getContext` retrieves context value associated with a context type.

### **`Context()`**

```ts
function Context(type: ContextType<T>, value: T): VContext<T>;
```

`Context` creates stateless context node with a value associated with a context
type.

## DOM Utilities

### **`emit()`**

```ts
interface EmitOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

function emit<T>(
  c: Component,
  eventType: string,
  detail: T,
  options?: EmitOptions,
): boolean;
```

`emit` function finds the closest child DOM node and emits a
[`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
with [`EventTarget.dispatchEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)
method.

*Throws an exception in SSR context.*

### **`findDOMNode()`**

```ts
function findDOMNode<T extends Node | Text>(node: SNode | null): T | null;
```

`findDOMNode` finds the closest DOM node child that belongs to a stateful node
subtree.

*Throws an exception in SSR context.*

### **`containsDOMElement()`**

```ts
function containsDOMElement(node: SNode, element: Element): boolean;
```

`containsDOMElement` checks if a stateful node contains a DOM elements in its
subtree.

*Throws an exception in SSR context.*

### **`hasDOMElement()`**

```ts
function hasDOMElement(node: SNode, child: Element): boolean;
```

`hasDOMElement` checks if a stateful node has a DOM element as its child.

*Throws an exception in SSR context.*

## Equality Functions

### **`preventUpdates()`**

```ts
function preventUpdates<T>(a: T, b: T): true;
```

`preventUpdates` is a noop function that always returns `true` value.

### **`strictEq()`**

```ts
function strictEq<T>(a: T, b: T): boolean;
```

`strictEq` checks values for equality with strict equality operator `===`.

### **`shallowEq()`**

```ts
function shallowEq<T extends object>(a: T, b: T): boolean;
```

`shallowEq` checks objects with shallow equality algorithm and uses strict
equality operator to check individual values for equality.

### **`shallowEqArray()`**

```ts
function shallowEqArray<T>(a: T[], b: T[]): boolean;
```

`shallowEqArray` checks arrays with shallow equality algorithm and uses
strict equality operator to check individual values for equality.
