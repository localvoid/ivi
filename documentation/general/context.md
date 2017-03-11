# Context

Context implicitly propagates data through component trees.

## Context API

Context is updated with a special virtual nodes created with a `$ctx` function.

```ts
function $ctx<T = {}>(context: Context<T>, child: VNode<any>): VNode<Context<T>>;
```

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
