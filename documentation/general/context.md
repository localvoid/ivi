# Context

Context implicitly propagates data through component trees.

## Context API

Context is updated with a special virtual nodes created with a `context()` function.

```ts
function context<T = {}>(context: T, child: VNode<any>): VNode<T>;
```

Context data can be accessed with a [connect](external-state.md) selectors.

## Example

```ts
const Counter = component(class extends Component {
  private _ctx = {
    counter: 0,
  }

  attached() {
    setInterval(() => {
      this._ctx = { counter: this._ctx.counter + 1 };
      this.invalidate();
    }, 1000);
  }

  render() {
    return context(this._ctx,
      child(),
    );
  }
});

const child = connect<number, undefined, { counter: number }>(
  (prev, props, context) => {
    const counter = context.counter;

    return (prev && prev === counter) ? prev :
      counter;
  },
  (counter) => (
    div().c(counter)
  ),
);
```
