# Server-Side Rendering

`ivi-ssr` package provides a renderer for server-side rendering.

Efficient server-side Virtual DOM rendering is built on two key ideas:

- Minimal API surface that would allow to create completely different implementations, optimized for specific platforms.
- Specialized diff/patch vdom rendering, optimized for string rendering.

## Configuring Webpack

```js
{
  target: "node",
  resolve: {
    alias: {
      "ivi-html": "ivi-ssr-html",
      "ivi-svg": "ivi-ssr-svg",
      "ivi-events": "ivi-ssr",
      "ivi-scheduler": "ivi-ssr",
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
