# Context

Context is an important part to build encapsulated and reusable components. Context implicitly propagates data through
component trees.

Almost all React-like libraries have implemented Contexts, but nobody is actually using them, except for some simple
use cases, because they are [completely broken](https://facebook.github.io/react/docs/context.html#updating-context).
ivi Context implementation doesn't have such problems, its syncing algorithm is built around optimization hints instead
of `shouldComponentUpdate` method that completely prevents any updates for all its children.

## Context API for Components

The natural way to update context is to use context API for stateful components.

```ts
interface Component<P> {
    updateContext<C>(): C | undefined;
    invalidateContext(): void;
    // ...
}
```

`updateContext` method is used to modify current context. All component descendants will receive a modified context.

```ts
function A(props: null, context: Context) {
    return $h("div").children(context.get("key"));
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

    didMount() {
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
function A(props: null, context: Context) {
    return $h("div").children(`Counter: ${context.get("counter")}`);
}

function B() {
    return $c(A);
}
B.isPropsChanged = () => false;

class C extends Component<null> {
    private counter = 0;

    didMount() {
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

## API

Context is represented as an immutable tree. Each time when context is updated, new `Context` node is created.

```ts
interface Context {
    new(data: any, from?: Context);
    get<V>(key: V): V;
    get<V>(key: string): V | undefined;
}
```

`get` method is used to retrieve values from context. It has two interfaces, one is using simple string keys, and the
other one is a key-value mapping.

Retrieving values with a simple key works by iterating through all parent contexts until it finds value, when nothing
is found `undefined` value is returned.

Retrieving values with key-value mapping works by iterating through all parent contexts and mapping all keys with
values on the first occurence, this process goes on until it finds values for all keys. Missing keys will have
`undefined` values.

```ts
const c = new Context({
    a: 1,
    b: 2,
});

c.get("a");
// => 1

c.get({
    a: undefined,
    c: undefined,
});
// => { a: 1, c: undefined }
```

`ROOT_CONTEXT` is a default context that will be implicitly used when rendering root nodes.

```ts
const c = new Context({ key: "value" }, ROOT_CONTEXT);
```
