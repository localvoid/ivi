# Context

Context is an important part to build encapsulated and reusable components. Context implicitly propagates data through
component trees.

Almost all React-like libraries have implemented contexts, but nobody is actually using them, except for some simple
use cases, because they are [completely broken](https://facebook.github.io/react/docs/context.html#updating-context).
ivi syncing algorithm doesn't have such problems, it is using a different way to optimize updates.

## Context API for Components

The natural way to update context is to use context API for stateful components.

```ts
interface Component<P> {
    updateContext<C>(): C | undefined;
    invalidateContext(): void;
    // ...
}
```

`updateContext` method is used to modify context. Values assigned with `updateContext` method won't be available to the
component that updates context, new context values will be propagated to children.

```ts
function A(props: null, context: { key: string }) {
    return $h("div").children(context.key);
}

class B extends Component<null> {
    updateContext() {
        return {
            key: "value",
        };
    }

    render() {
        return $c(A);
    }
}
```

`invalidateContext` should be invoked when internal state changes should trigger an update of the current context.

When component is using just `this.props` to modify current context, there is no need to call `invalidateContext`
method, syncing algorithm can automatically detect that context is using `props` object and each time it is modified,
it will trigger context update.

```ts
class StatefulComponent extends Component<null> {
    private counter = 0;

    attached() {
        setInterval(() => {
            this.counter++;
            this.invalidateContext();
        }, 1000);
    }

    updateContext() {
        return {
            counter: this.counter,
        };
    }

    render() {
        return $c(ChildComponentThatUsesContextToGetCounterValue);
    }
}
```

### Optimization hints

This example works perfectly fine, even when component `B` returns `false` as an optimization hint for syncing
algorithm. When syncing algorithm detects situations like this, instead of trying to update components that didn't
changed, it will propagate new context through existing Virtual DOM tree until it finds a component that depends on the
data from context.

```ts
function A(props: null, context: { counter: number }) {
    return $h("div").children(`Counter: ${context.counter}`);
}

function B() {
    return $c(A);
}
B.isPropsChanged = () => false;

class C extends Component<null> {
    private counter = 0;

    attached() {
        setInterval(() => {
            this.counter++;
            this.invalidateContext();
        }, 1000);
    }

    updateContext() {
        return {
            counter: this.counter,
        };
    }

    render() {
        return $c(ChildComponentThatUsesContextToGetCounterValue);
    }
}
```
