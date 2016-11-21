# Components

## Stateless Component

Stateless components are implemented with simple functions. Component functions has two parameters: `props` parameter
for component properties and optional parameter `context` with current Context.

```ts
function StatelessComponent(props: string) {
    return $h("div").children(`Hello ${props}`);
}
```

### Context

It is important that to access current context, component function is using `context` parameter instead of trying to
get it from `arguments` list. Syncing algorithm can detect that component doesn't use context and when context is
modified, instead of performing updating components that doesn't use contexts it will propagate new context through
existing virtual dom tree.

## Stateful Component

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
class StatefulComponent extends Component<string> {
    render() {
        return $h("div").children(`Hello ${this.props}`);
    }
}
```

### Constructor

When overriding constructor, all parameters should be passed to the base constructor.

```ts
class StatefulComponent extends Component<string> {
    private internalState: string;

    constructor() {
        super(...arguments);
        this.internalState = this.props;
    }

    render() {
        return $h("div").children(`Hello ${this.internalState}`);
    }
}
```

When you just want to initialize properties, initialize properties at their declaration:

```ts
class StatefulComponent extends Component<string> {
    private internalState = this.props;

    render() {
        return $h("div").children(`Hello ${this.internalState}`);
    }
}
```

### Properties

To get current context, always use `this.context`, unless you want to cache its values and prevent any updates when
context is modified.

```ts
get context(): Context;
```

Get current props.

```ts
get props(): P;
```

### Methods

Invalidate current view and add Component to the update queue. This method should be invoked when internal state changes
should trigger an update of the current view.

```ts
invalidate(): void;
```

```ts
class StatefulComponent extends Component<null> {
    private counter = 0;

    didMount() {
        setInterval(() => {
            this.counter++;
            this.invalidate();
        }, 1000);
    }

    render() {
        return $h("div").children(`Counter: ${this.counter}`);
    }
}
```

Invalidate current context and add Component to the update queue. This method should be invoked when internal state
changes should trigger an update of the current context.

```ts
invalidateContext(): void;
```

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

### Lifecycle methods

Render component representation with a Virtual DOM.

```ts
render(): VNode<any> | undefined;
```

```ts
class StatefulComponent extends Component<string> {
    render() {
        return $h("div").children(`Hello ${this.props}`);
    }
}
```

Component received a new props.

```ts
didReceiveNewProps(oldProps: P, newProps: P): void;
```

```ts
class StatefulComponent extends Component<string> {
    private internalState = this.props + "!!";

    didReceiveNewProps(oldProps: string, newProps: string) {
        this.internalState = newProps + "!!";
    }

    render() {
        return $h("div").children(`Hello ${this.internalState}`);
    }
}
```

Component received a new context.

```ts
didReceiveNewContext(oldContext: Context, newContext: Context): void;
```

```ts
class StatefulComponent extends Component<null> {
    private internalState = this.context.get("key") + "!!";

    didReceiveNewContext(oldContext: Context, newContext: Context) {
        this.internalState = newContext.get("key") + "!!";
    }

    render() {
        return $h("div").children(`Hello ${this.internalState}`);
    }
}
```

Update current context.

```ts
updateContext<C>(): C | undefined;
```

```ts
class StatefulComponent extends Component<string> {
    updateContext() {
        return {
            content: this.props,
        };
    }

    render() {
        return $c(ChildComponentThatUsesContextToGetCounterValue);
    }
}
```

Component is mounted to the document.

```ts
didMount(): void;
```

Component is unmounted from the document.

```ts
didUnmount(): void;
```

Component will be updated.

```ts
willUpdate(): void;
```

Component did updated.

```ts
didUpdate(): void;
```

Component did invalidated.

```ts
didInvalidate(): void;
```
