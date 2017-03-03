# Connect

The idea is to provide API to build efficient components similar to [redux-connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
.

ivi sync algorithm is working in a slightly different way than React, and it is possible to implement `redux-connect` in
a much more efficient way that doesn't require adding/removing any update callbacks or creating stateful component
instances, so we won't need to pay the perf price during slow insert/remove operations.

## connect VNode

Specialized virtual dom node with connect behavior.

```ts
interface SelectData<T = {}, U = {}> {
    in: T,
    out: U,
}

function updateConnectComponent<T, U>(
    vnode: VNode<T>,
    select: (prev: SelectData<{}, U>, props: T, context: Context) => U,
    render: (props: U, context: Context) => VNode<U>,
    prev: any,
    props: T,
    context: Context,
): VNode<T> {
    const next = select(prev, props, context);
    if (prev === next) {
        return vnode;
    }
    return render(next.out, context);
}

function connect<T, U>(
    select: (prev: SelectData<{}, U>, props: T, context: Context) => U,
    render: (props: U, context: Context) => VNode<U>,
): (props: T) => VNode<T> {
    return function(props: T) {
        return $connect({
            select: select,
            render: render,
        }, props);
    };
}

const $connectedComponent = connect(
    function (prev: SelectData<number, number>, props: number, context: Context) {
        const item = select(prev ? prev.in.item : null);
        if (prev && prev.in.item === item) {
            return prev;
        }

        return {
            in: item,
            out: item,
        };
    },
    function (props: number, context: Context) {
        return $h("div").children(props);
    }
```
