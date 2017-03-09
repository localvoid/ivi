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

## High Level API

ivi library doesn't provide any high level connect APIs, so it is better to build some high level abstractions on top of
this low level API.

[ivix](https://github.com/ivijs/ivix) library can be used as an example of a high level API for connecting data to
components.
