# Components

## Stateless Component

Stateless components are implemented with simple functions. Component functions has two parameters: `props` parameter
for component properties and optional parameter `context` with current context.

```ts
function StatelessComponent(props: string) {
    return $h("div").children(`Hello ${props}`);
}
```

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

```ts
interface Component<P> {
    get context(): Context;
    get props(): P;
}
```

`context` getter returns current context.

`props` getter returns current props.

### Methods

Invalidate current view and add component to the update queue. This method should be invoked when internal state changes
should trigger an update of the current view.

```ts
interface Component<P> {
    invalidate(): void;
}
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

Invalidate current context and add component to the update queue. This method should be invoked when internal state
changes should trigger an update of the current context.

```ts
interface Component<P> {
    invalidateContext(): void;
}
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
interface Component<P> {
    render(): VNode<any> | undefined;
}
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
interface Component<P> {
    didReceiveNewProps(oldProps: P, newProps: P): void;
}
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
interface Component<P> {
    didReceiveNewContext(oldContext: Context, newContext: Context): void;
}
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
interface Component<P> {
    updateContext<C>(): C | undefined;
}
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
interface Component<P> {
    didMount(): void;
}
```

Component is unmounted from the document.

```ts
interface Component<P> {
    didUnmount(): void;
}
```

Component will be updated.

```ts
interface Component<P> {
    willUpdate(): void;
}
```

Component did updated.

```ts
interface Component<P> {
    didUpdate(): void;
}
```

Component did invalidated.

```ts
interface Component<P> {
    didInvalidate(): void;
}
```
