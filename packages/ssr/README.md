# Server-Side Rendering

`ivi-ssr` package provides a specialized renderer for server-side rendering.

Since ivi 0.8.0, all APIs were completely redesigned to make sure that server-side Virtual DOM rendering can compete
with string based template renderers. And basic benchmarks shows that it can outperform all modern string based
template renderers.

Efficient Virtual DOM rendering is built on two key ideas:

- Minimal API surface that would allow to create completely different implementations, optimized for specific platforms.
- New form of diff/patch rendering, optimized for string rendering.

## Configuring Webpack

`ivi-ssr` package reimplements public APIs from `ivi-html`, `ivi-events` and `ivi` packages. To build code for server
environment, we need to configure module aliasing.

```js
{
    target: "node",
    resolve: {
        alias: {
            "ivi-html": "ivi-ssr",
            "ivi-events": "ivi-ssr",
            "ivi": "ivi-ssr"
        }
    }
}
```

## Server-Side API

### Render to string

```ts
function renderToString(
    node: VNode<any>,
    context: Context = {},
    blueprint?: BlueprintNode,
): string;
```

`renderToString()` function renders Virtual DOM into string. When `blueprint` parameter is specified, instead of
rendering string from scratch, it will apply diff/patch algorithm on blueprint.

### Blueprints

```ts
function createBlueprint(
    node: VNode<any>,
    context: Context = {},
    blueprint?: BlueprintNode,
): BlueprintNode;
```

`createBlueprint()` function creates a blueprint that can be used to optimize rendering to string. When `blueprint`
parameter is specified, it will try to reuse existing blueprint nodes from the specified blueprint to reduce memory
usage.

```ts
function linkBlueprint<P>(
    componentFactory: (props?: P) => VNode<P>,
    blueprint: BlueprintNode,
): void;
```

`linkBlueprint()` function links blueprint to a component factory. Linked blueprint will be automatically used for
rendering components produced from this factory.
