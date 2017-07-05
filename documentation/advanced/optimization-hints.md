# Optimization Hints

By default, syncing algorithm in ivi will always update everything below an entry point. This algorithm is highly
optimized and can synchronize tens thousands components on a modern computer without any problems, and it is more likely
that you'll start to notice jank because document will contain a huge amount of DOM nodes. But it is still quite useful
to reduce syncing overhead with an optimization hints.

ivi sync algorithm always traverses through entire virtual dom trees, and there is no way to bail out with lifecycle
methods like `shouldComponentUpdate` from React library. Traversing through virtual dom trees in ivi library is super
cheap even with huge virtual dom trees.

When sync algorithms traverses through virtual dom trees and finds components, it will update them only when they are
dirty. Component becomes dirty when props are changed `isPropsChanged` or component is invalidated with `invalidate()`
method. By default, all props are checked for changes by their identity.

## isPropsChanged

When syncing algorithm updates component properties, it will check for `isPropsChanged` method on component instances,
or function with the same name on functional components. When this function returns `false`, it gives a hint to syncing
algorithm that props arent't changed.

```ts
interface StatelessComponent<P> {
  isPropsChanged(oldProps: P, newProps: P): boolean;
  // ...
}

interface Component<P> {
  isPropsChanged(oldProps: P, newProps: P): boolean;
  // ...
}
```

For example, this is how functional component can declare an optimization hint:

```ts
function StatelessComponent(props: string) {
  return h.div().children(`Hello ${props}`);
}

StatelessComponent.isPropsChanged = function(oldProps: string, newProps: string): boolean {
  return oldProps !== newProps;
}
```

## Best practices

Try to avoid any optimizations until you've found a bottleneck in your application.

This optimizations should be applied as a last resort when building an application. All underlying algorithms in ivi are
extremely optimized, so that you can focus on building your application instead of trying to optimize it.
