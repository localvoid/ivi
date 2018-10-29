# Components

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

### Options

`withShouldUpdate()` is used as a hint that can prevent unnecessary updates.

```ts
const A = component(
  () => ({ title }) => div().t(`Hello ${title}`),
  withShouldUpdate((prev, next) => prev.title !== next.title,
);
```

## API

```ts
function invalidate<P>(c: Component<P>, flags?: InvalidateFlags): void;
```

`invalidate()` marks component as dirty and triggers an update.

### Hooks

```ts
function useDetached(c: Component, hook: () => void): void;
```

`useDetached()` creates a hook that will be invoked when component is detached from the document.

```ts
function useSelect<T>(
  c: Component,
  selector: (prev: T | undefined) => T,
): () => T;
function useSelect<T, P>(
  c: Component,
  selector: undefined extends P ? (prev: T | undefined, props?: P) => T : (prev: T | null, props: P) => T,
): undefined extends P ? () => T : (props: P) => T;
function useSelect<T, P, C>(
  c: Component,
  selector: (prev: T | undefined, props: P, context: C) => T,
): undefined extends P ? () => T : (props: P) => T;
```

`useSelect()` creates a selector hook.

Selectors are used for sideways data loading.

Essentially it is a some form of dirty checking. Each time ivi performs a dirty checking, all selectors will pull data
from external sources.

To improve performance, selectors should use memoization and reuse previous values.

```ts
const Pixel = component<number>((c) => {
  const getColor = useSelect<string, number, { colors: string[] }>(
    c,
    (prev, i, { colors }) => colors[i],
  );

  return (i) => span("pixel", _, { "background": getColor(i) });
});
```
