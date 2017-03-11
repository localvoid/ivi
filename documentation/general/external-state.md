# External State

The recommended way to manage application state with ivi library is to use libraries like
[Redux](http://redux.js.org/). ivi library provides low level primitives that can help with building such libraries in
a more efficient way.

## Connect

Because ivi syncing algorithm is working in a slightly different way than traditional virtual dom engines, we can build
almost zero-cost connect components.

### High Level API

```ts
function connect<T, U, K>(
    select: (prev: SelectorData<K, U> | null, props: null | T, context: Context) => SelectorData<K, U>,
    render: ComponentClass<U> | (props: U) => IVNode<any>,
): (props: null | T) => VNode<T>;
```

### Low Level API

```ts
interface SelectorData<T = {}, U = T> {
    in: T,
    out: U,
}

interface ConnectDescriptor<T, U, K> {
    select: (prev: SelectorData<K, U> | null | boolean, props: T, context: Context) => SelectorData<K, U>;
    render: (props: U) => IVNode<any>;
}

function $connect<T, U, K>(
    connectDescriptor: ConnectDescriptor<T, U, K>,
    props: T,
): VNode<T>;
```

## Basic Store

```ts
function createStore<T, U>(
    state: T,
    reducer: (prev: T, action: U) => T,
    onChange: () => void,
): Store<T, U>;
```

### Selectors

Helper functions to write selectors.

By default, all selectors are memoized locally, with this helper functions it is possible to create selectors memoized
globally, or somewhere else, for example in `Context`.

```ts
function selectData<T, U>(i: T, o?: U): SelectData<T, U>;

function memoizeSelector<T, U extends SelectData>(
    select: (prev: U | null, props: T, context: Context) => U,
    ref: (v?: U | null) => U | null,
): (prev: U | null, props: T, context: Context) => U;

function memoizeSelectorGlobally<T, U extends SelectData>(
    select: (prev: U | null, props: T, context: Context) => U,
): (prev: U | null, props: T, context: Context) => U;
```

### Mutable Data

To make it easier to work with mutable data, ivi library provides a simple function that wraps mutable object into an
immutable reference object. When mutable object is modified, we will create a new `Mutable` wrapper to change its
identity.

```ts
interface Mutable<T> {
    ref: T;
}

function mut<T>(ref: T): Mutable<T> {
    return { ref };
}
```
