# New Context API

Remove `invalidateContext`, `updateContext` component methods and replace it with a simple specialized virtual node
created with a function `$ctx`.

```ts
function $ctx(context: {[key: string]: any}, child: VNode<any>): VNode;
```

## Example

### Old API

```ts
class StatefulComponent extends Component {
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

### New API

```ts
class StatefulComponent extends Component {
    private context = {
        counter: 0,
    }

    attached() {
        setInterval(() => {
            this.context = { counter: this.context.counter + 1 };
            this.invalidate();
        }, 1000);
    }

    render() {
        return $ctx(this.context, $c(ChildComponentThatUsesContextToGetCounterValue));
    }
}
```
