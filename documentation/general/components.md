# Components

Components API were heavily influenced by the new [React hooks API](https://github.com/reactjs/rfcs/pull/68).

There are several differences in the ivi API that solve major flaws in the React hooks API design:

- [Weird rules](https://reactjs.org/docs/hooks-rules.html) for hooks
- Excessive memory allocations each time component is updated
- Memory leaking caused by [closure context sharing](https://mrale.ph/blog/2012/09/23/grokking-v8-closures-for-fun.html)

Instead of relying on some internal magic, we are using closures to store internal state. Components have a simple
interface `(component) => (props) => VDOM`. Outer function is used for storing internal state, creating data
pipelines, attaching hooks, triggering side effects. It is important that outer function doesn't have any access to the
`props` to prevent any memory leaking. Internal function passes input data into data pipelines that can trigger side
effects and returns a Virtual DOM.

## API

### Virtual DOM node factory

```ts
function component(
  c: (c: Component<undefined>) => () => VNode,
  ...options: Array<(d: ComponentDescriptor<undefined>) => void>
): () => VNode<undefined>;

function component<P>(
  c: (c: Component<P>) => (props: P) => VNode,
  ...options: Array<(d: ComponentDescriptor<P>) => void>
): undefined extends P ? (props?: P) => VNode<P> : (props: P) => VNode<P>;
```

`component()` function creates a factory function that will instantiate virtual DOM nodes for the component.

```ts
import { component, invalidate, effect, render } from "ivi";

const Counter = component<number>((c) => {
  let i = 0;
  const timer = effect<number>(c, (delay) => {
    const tid = setInterval(() => {
      i++;
      invalidate(c);
    }, delay);
    return () => { clearInterval(tid); };
  });

  (delay) => (
    timer(delay),

    div().t(i),
  );
});
```

#### Options

`withShouldUpdate()` is used as a hint that can prevent unnecessary updates.

```ts
const A = component(
  () => ({ title }) => div().t(`Hello ${title}`),
  withShouldUpdate((prev, next) => prev.title !== next.title,
);
```

### Hooks

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
  selector: (prev: T | undefined) => T,
  shouldUpdate?: (prev: P, next: P) => boolean,
): () => T;
function useSelect<T, P>(
  c: Component,
  selector: undefined extends P ? (prev: T | undefined, props?: P) => T : (prev: T | null, props: P) => T,
  shouldUpdate?: (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
function useSelect<T, P, C>(
  c: Component,
  selector: (prev: T | undefined, props: P, context: C) => T,
  shouldUpdate?: (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
```

`useSelect()` creates a selector hook.

Selectors are used for sideways data loading.

Essentially it is a some form of dirty checking. Each time ivi performs a dirty checking, all selectors will pull data
from external sources.

To improve performance, selectors should use memoization and reuse previous values.

```ts
const Pixel = component<number>((c) => {
  const getColor = useSelect<string, number, { colors: string[] }>(c,
    (prev, i, { colors }) => colors[i],
  );

  return (i) => span("pixel", _, { "background": getColor(i) });
});
```

##### `useDetached()`

```ts
function useDetached(c: Component, hook: () => void): void;
```

`useDetached()` creates a hook that will be invoked when component is detached from the document.

### Additional Functions

##### `invalidate()`

```ts
function invalidate<P>(c: Component<P>, flags?: InvalidateFlags): void;
```

`invalidate()` marks component as dirty and triggers an update.
