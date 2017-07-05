# Context

Context implicitly propagates data through component trees.

## Context API

Context is updated with a special virtual nodes created with a `context()` function.

```ts
function context<T = {}>(context: Context<T>, child: VNode<any>): VNode<Context<T>>;
```

Context data can be accessed with a [connect](external-state.md) selectors.

## Example

```ts
class StatefulComponent extends Component {
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
    return context(this._ctx, child());
  }
}

function Child(counter: number) {
  return h.div().children(counter);
}

interface ChildSelectorData {
  in: number,
  out: number,
}

const child = connect(
  function(prev: ChildSelectorData, props: null, context: Context<{ counter: number }>) {
      const counter = context.counter;
      if (prev && prev.in === counter) {
          return prev;
      }
      return selectorData(counter);
  },
  Child,
);
```
