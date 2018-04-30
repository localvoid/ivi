# External State

The recommended way to manage application state with ivi library is to use libraries like
[Redux](http://redux.js.org/).

## Connect

ivi provides first-class support for sideways data loading with `connect` virtual dom nodes. It was inspired by
[Redux connectors](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options),
but instead of implementing them as components, they are implemented as a specialized virtual dom nodes.

Essentially it is a some form of dirty checking. Each time we perform an update, all connectors will pull data from
external sources, prepare it and push to components. To improve performance, selectors should use memoization technique
and reuse previous values.

### API

```ts
function connect<T, P, C>(
  select: (prev: T | null, props: undefined, context: C) => T,
  render: (props: T) => VNode<any>,
): () => VNode<P>;
function connect<T, P, C>(
  select: (prev: T | null, props: P, context: C) => T,
  render: (props: T) => VNode<any>,
): (props: P) => VNode<P>;
```

`connect()` function creates a factory function that will instantiate virtual dom connector nodes.

`select` param is a function that retrieves data from an external state and returns objects that are passed to the
`render` function.

`render` param is a function uses that takes an object created by `select` function and returns a virtual dom node.


### Example

```ts
const article = connect<{ content: string }, number, { articles: Map<number, string> }>(
  (prev, id, context) => {
    const content = context.articles.get(id);
    if (prev && prev.content === content) {
      return prev;
    }
    return { content };
  },
  (props) => (
    h.div().c(props.content)
  )),
);

const articles = new Map<number, string>();
articles.set(1, "Hello World");

render(
  context({ articles }, article(1)),
  document.getElementById("app")!,
);
```

## Memoized Selectors

```ts
function memoizeSelector<T, P>(
  select: (prev: T | null, props: P, context: Context) => T,
  ref: (v?: T | null) => T | null,
): (prev: T | null, props: P, context: Context) => T;
```

By default, all selectors are memoized locally, with this helper function it is possible to create selectors memoized
in the current context.
