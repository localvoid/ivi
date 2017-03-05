# Connect

Because ivi sync algorithm is working in a slightly different way than traditional virtual dom engines, we can build
almost zero-cost connect components.

Connect is a virtual dom node with a special behavior, it can be used to build APIs like [redux-connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
in a much more efficient way.

## Low Level API

```ts
interface SelectData<T = {}, U = {}> {
    in: T,
    out: U,
}

interface ConnectDescriptor<T, U, K> {
    select: (prev: SelectData<K, U> | null | boolean, props: T, context: Context) => SelectData<K, U>;
    render: (props: U, context: Context) => IVNode<any>;
}

function $connect<T, U, K>(
    connectDescriptor: ConnectDescriptor<T, U, K>,
    props: T,
): VNode<T>;
```

## High Level API example

ivi library doesn't provide any high level connect APIs, and it is just a basic example how to use low level connect API
to build high level APIs.

```ts
function connect<T, U, K>(
    select: (prev: SelectData<K, U> | null | boolean, props: T, context: Context) => SelectData<K, U>;
    component: ComponentClass<U>;
): (props: T) => VNode<T> {
    const descriptor = {
        select,
        function(props: U): IVNode<U> {
            return $c(component, props);
        },
    };
    return function(props: T): VNode<T> {
        return $connect(descriptor, props);
    };
}

function View(props: number) {
    return $t(`Number: ${props}`);
}

const $container = connect(
    (prev: SelectData<number, number> | null | boolean, props: number, context: Context<{ store: number[] }>) => {
        const value = context.store[props];
        if (prev && prev.in === value) {
            return prev;
        }
        return {
            in: value,
            out: value,
        };
    },
    View,
);

const context = { store: new Array(100).fill(1); };
render($ctx(context, $container(10)));
```
