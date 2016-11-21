# Optimization Hints

By default, syncing algorithm in ivi will always update everything below an entry point. This algorithm is highly
optimized and can synchronize tens thousands components on a modern computer without any problems, and it is more likely
that you'll start to notice jank because document will contain a huge amount of DOM nodes. But it is still quite useful
to reduce syncing overhead with an optimization hints.

If you've used any React-like library, you should be familiar with components method `shouldComponentUpdate`. When this
method returns `false`, it stops synchronization process for entire subtree. ivi syncing algorithm has a slightly
different way to reduce unnecessary updates, it is built around different optimization hints.

## isPropsChanged

When syncing algorithm updates component properties, it will check for `isPropsChanged` method on component instances,
or function with the same name on functional components. When this function returns `false`, it gives a hint to syncing
algorithm that props arent't changed. Most of the time this hint will indicate that there is no need to update entire
subtree, but it doesn't guarantee that someone deep in the tree won't be updated. For example, if someone deep inside
is using context, and context has been changed, syncing algorithm will find this component and perform an update.

```ts
interface ComponentFunction<P> {
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
    return $h("div").children(`Hello ${props}`);
}

StatelessComponent.isPropsChanged = function(oldProps: string, newProps: string): boolean {
    return oldProps !== newProps;
}
```

There also one more difference between `shouldComponentUpdate` and `isPropsChanged`, it only checks properties. There is
absolutely no reason to check component's internal state, because when component is invalidated, there is a 99.99%
chance that it should be updated, checking component's internal state for changes is a complete waste of cpu resources.

### Helper functions

There are already two functions for the most common cases with props checking. One function is checking props for
identity `a === b`, and another one performs shallow equality check. This functions can be applied to component classes,
or component functions.

```ts
checkPropsIdentity<P extends ComponentClass<any> | ComponentFunction<any>>(target: P): P;
checkPropsShallowEquality<P extends ComponentClass<any> | ComponentFunction<any>>(target: P): P;
```

```ts
checkPropsIdentity(StatelessComponent);
function StatelessComponent(text: string) {
    return $h("div").children(text);
}
```
```ts
checkPropsIdentity(StatefulComponent);
class StatefulComponent extends Component<string> {
    render() {
        return $h("div").children(this.props);
    }
}
```

## Context hints

Accessing context when rendering view gives a hint to the syncing algorithm that view depends on the context, and each
time context is changed, syncing algorithm will trigger an update for component.

## Props hints

Accessing props when updating context gives a hint to the syncing algorithm that context depends on the props, and each
time props are modified and they are changed `isPropsChanged`, syncing algorithm will trigger context update for
component.

## Best practices

Try to avoid any optimizations until you've found a bottleneck in your application.

This optimizations should be applied as a last resort when building an application. All underlying algorithms in ivi are
extremely optimized, so that you can focus on building your application instead of trying to optimize it.
