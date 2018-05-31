# Components

## Stateless Component

```ts
const A = statelessComponent((props: string) => (
  div().c(`Hello ${props}`)
));

render(
  A("World!"),
  DOMContainer,
);
```

### `shouldUpdate` hint

`shouldUpdate` hint is used as an early hint that can prevent unnecessary updates.

```ts
const A = withShouldUpdate<{ title: string }>(
  (prev, next) => prev.title !== next.title,
  statelessComponent((props) => (
    div().c(`Hello ${props}`)
  )),
);

render(
  A({ title: "World!" }),
  DOMContainer,
);
```

`withShouldUpdate()` creates a virtual DOM node factory that produces nodes for stateless components with custom
`shouldUpdate` function to prevent unnecessary updates.

## Stateful Component

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
const A = statefulComponent(class extends Component<string> {
  render() {
    return div().c(`Hello ${this.props}`);
  }
});

render(
  A("World!"),
  DOMContainer,
);
```

### Constructor

```ts
class A extends Component<string> {
  private internalState: string;

  constructor(props: string) {
    super(props);
    this.internalState = this.props;
  }

  render() {
    return div().c(`Hello ${this.internalState}`);
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

#### `invalidate()`

```ts
interface Component {
  invalidate(): void;
}
```

`invalidate()` method invalidates view. This method should be invoked when internal state changes should trigger a
modification of the current view.

```ts
class Counter extends Component {
  private counter = 0;

  attached() {
    setInterval(() => {
      this.counter++;
      this.invalidate();
    }, 1000);
  }

  render() {
    return div().c(`Counter: ${this.counter}`);
  }
}
```

### Lifecycle methods

#### `render()`

```ts
interface Component {
  render(): VNode<any>;
}
```

`render()` method is used to produce a component representation with a virtual DOM.

```ts
class A extends Component<string> {
  render() {
    return div().c(`Hello ${this.props}`);
  }
}
```

#### `shouldUpdate(prev, next)`

```ts
interface Component {
  shouldUpdate(prev: P, next: P): boolean;
}
```

Lifecycle method `shouldUpdate` is used as a hint to reduce unnecessary updates.

```ts
interface Props {
  title: string;
}

class A extends Component<Props> {
  shouldUpdate(prev: Props, next: Props) {
    return prev.title !== next.title;
  }

  render() {
    return div().c(`Hello ${this.props.title}`);
  }
}
```

#### `newPropsReceived(prev, next)`

```ts
interface Component {
  newPropsReceived(oldProps: P, newProps: P): void;
}
```

`newPropsReceived()` method is invoked when component is received a new props.

```ts
class A extends Component<string> {
  private internalState = this.props + "!!";

  newPropsReceived(oldProps: string, newProps: string) {
    this.internalState = newProps + "!!";
  }

  render() {
    return div().c(`Hello ${this.internalState}`);
  }
}
```

#### `attached()`

```ts
interface Component {
  attached(): void;
}
```

`attached()` method is invoked when component is attached to the document. Attached methods are invoked in top to
bottom order.

#### `detached()`

```ts
interface Component {
  detached(): void;
}
```

`detached()` method is invoked when component is detached from the document. Detached methods are invoked in bottom to
top order.

#### `updated()`

```ts
interface Component {
  updated(): void;
}
```

`updated()` invoked every time component is updated.

#### `invalidated()`

```ts
interface Component {
  invalidated(): void;
}
```

`invalidated()` method is invoked when component is invalidated.
