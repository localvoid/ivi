# Context

Context is an important part to build encapsulated and reusable components. Context implicitly propagates data through
component trees.

Almost all React-like libraries have implemented contexts, but nobody is actually using them, except for some simple
use cases, because they are [completely broken](https://facebook.github.io/react/docs/context.html#updating-context).
ivi syncing algorithm doesn't have such problems, it is using a different way to optimize updates.

## Context API

Context is updated via special virtual nodes created with a `$ctx` function.

```ts
function $ctx<T = {}>(context: Context<T>, child: VNode<any>): VNode<Context<T>>;
```

Syncing algorithm is comparing context by object identity to detect that context has been changed, so it is required
that context object has a new identity to update context.

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
        return $ctx(this._ctx, $c(ChildComponentThatUsesContextToGetCounterValue));
    }
}
```
