# Components

## Stateless Component

```ts
const HelloComponent = statelessComponent((props: string) => (
  h.div().children(`Hello ${props}`);
));
```

## Stateful Component

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
const HelloComponent = statefulComponent(class extends Component<string> {
  render() {
    return h.div().children(`Hello ${this.props}`);
  }
});
```

### Constructor

```ts
class HelloComponent extends Component<string> {
  private internalState: string;

  constructor(props: string) {
    super(props);
    this.internalState = this.props;
  }

  render() {
    return h.div().children(`Hello ${this.internalState}`);
  }
}
```

### Properties

```ts
interface Component<P = undefined> {
  props: P;
}
```

### Methods

Invalidate view. This method should be invoked when internal state changes should trigger an update of the current view.

```ts
interface Component {
  invalidate(): void;
}
```

```ts
class CounterComponent extends Component {
  private counter = 0;

  attached() {
    setInterval(() => {
      this.counter++;
      this.invalidate();
    }, 1000);
  }

  render() {
    return h.div().children(`Counter: ${this.counter}`);
  }
}
```

### Lifecycle methods

Render component representation with a Virtual DOM.

```ts
interface Component {
  render(): VNode<any> | undefined;
}
```

```ts
class HelloComponent extends Component<string> {
  render() {
    return h.div().children(`Hello ${this.props}`);
  }
}
```

Component received a new props.

```ts
interface Component {
  newPropsReceived(oldProps: P, newProps: P): void;
}
```

```ts
class HelloComponent extends Component<string> {
  private internalState = this.props + "!!";

  newPropsReceived(oldProps: string, newProps: string) {
    this.internalState = newProps + "!!";
  }

  render() {
    return h.div().children(`Hello ${this.internalState}`);
  }
}
```

Component is attached to the document. Attached methods are invoked in top to bottom order.

```ts
interface Component {
  attached(): void;
}
```

Component is detached from the document. Detached methods are invoked in bottom to top order.

```ts
interface Component {
  detached(): void;
}
```

Component updated.

`updated` lifecycle is invoked for all parents every time component is updated or any descendant component is updated.
`local` argument is used to distinguish between updates that was caused by updating one of the descendants or
updates in the current component.

```ts
interface Component {
  updated(local: boolean): void;
}
```

Component invalidated.

```ts
interface Component {
  invalidated(): void;
}
```
