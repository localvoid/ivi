# Connect

The idea is to provide API to build efficient components similar to [redux-connect](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)
.

ivi sync algorithm is working in a slightly different way than React, and it is possible to implement `redux-connect` in
a much more efficient way that doesn't require adding/removing any update callbacks or creating stateful component
instances, so we won't need to pay the perf price during slow insert/remove operations.

## Solutions

### shouldUpdate method

```ts
interface Component<P> {
    shouldUpdate(): undefined | boolean;
}
```

This method has nothing in common with React `shouldComponentUpdate` method, it will be invoked when component isn't in
a dirty state. By default it will return `undefined` value, it means that this method shouldn't have any effect on the
decision to update component, otherwise it will add additional custom logic to check if component should be updated.

### $connect VNode

Create a specialized virtual dom node as a specialized version of stateless component with additional lifecycle hooks.
It may have interface similar to `redux-connect`, it is a much easier solution that doesn't require too much thinking
about APIs.
