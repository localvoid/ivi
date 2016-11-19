# Virtual DOM

Virtual DOM API is using method chaining to set properties.

For example, to assign an event and id attribute on a div element:

```ts
const node = $h("div")
    .events({ click: onClick })
    .props({ id: "unique-id" });
```

## Factory functions

Virtual Nodes are created with factory functions. There are 6 VNode factory functions, but most of the time you'll need
just two, one for HTML elements and one for Components.

Factory functions has an overload lists for all HTML and SVG tag names, so TypeScript compiler will automatically use
the correct type for attributes.

HTML Elements. `tagName` parameter specifies HTML tag name, and optional `className` parameter is used to specify class
name.

```ts
$h(tagName: string, className?: string): VNode<P>;
```

Components. `component` parameter specifies a Component, it can be a simple function, or a Component class. `props`
parameter is an object with component properties.

```ts
$c<P>(component: ComponentFunction<P> | ComponentClass<P>, props: P): VNode<P>;
```

SVG Elements.

```ts
$s(tagName: string, className?: string): VNode<P>;
```

HTML Input Elements. `type` parameter specifies an input type attribute, with an exception for `textarea` type, input
element with `textarea` type will be created as a `<textarea>` element.

```ts
$i(type: string, className?: string): VNode<P>;
```

HTML Media Elements. `<audio>` and `<video>` elements.

```ts
$m(tagName: string, className?: string): VNode<P>;
```

Text Node. `content` parameter specifies text node contents.

```ts
$t(content: string): VNode<P>;
```

## Virtual Node Chained Methods

### All Nodes

Key to uniquely identify Virtual Node among its siblings. It is used by children syncing algorithm to find how to
rearrange nodes when they are moved, removed or inserted.

```ts
interface VNode<P> {
    key(key: any): VNode<P>;
}
```

Ref callback is used to get reference for an actual DOM Node or a Component instance. When VNode is mounted, ref
callback will be invoked with a Node value for an element or a Component instance. When VNode is unmounted, ref
callback will be invoked with a `null` value.

```ts
interface VNode<P> {
    ref(ref: (ref: Node | Component<P> | null) => void): VNode<P>;
}
```

### HTML, SVG, Input and Media elements

CSS Style in string format or as an object.

```ts
interface VNode<P> {
    style(style: CSSStyleProps | string | null): VNode<P>;
}
```

Event Handler List.

```ts
interface VNode<P> {
    events(events: EventHandlerList | null): VNode<P>;
}
```

DOM attributes.

```ts
interface VNode<P> {
    props(props: P): VNode<P>;
}
```

### HTML and SVG elements (nodes that can contain children nodes)

Children parameter can be any basic object like string or number, single VNode or a recursive array of VNodes with
basic objects and null values. It will automatically normalize recursive lists by flattening, filtering out null values
and replacing basic objects with text nodes.

```ts
interface VNode<P> {
    children(children: VNodeRecursiveArray | VNode<any> | string | number | boolean | null): VNode<P>;
}
```

To preserve internal state of all children we need to correctly identify which nodes has been moved, inserted or
removed. To do this we need to uniquely identify this nodes, and the most flexible way to do this is to use key
properties. Key property can be assigned for all virtual nodes with a `key(key: any)` method.

For special use cases when parts of children list doesn't move at the beginning and at the end of the children list,
we can use the default null key, algorithm to track children will skip nodes with null keys at the beginning and at
the end.

This method enables track by key algorithm and assigns children. `children` parameter is a recursive array of VNodes.

```ts
interface VNode<P> {
    trackByKeyChildren(children: VNodeRecursiveArray | null): VNode<P>;
}
```

Unsafe HTML is used to specify `innerHTML`, ivi doesn't provide any XSS protection for unsafe HTML, HTML string
specified in `html` parameter will be directly injected into the node.

```ts
interface VNode<P> {
   unsafeHTML(html: string): VNode<P>
}
```

### Input Elements

Input Value and Checked properties.

```ts
interface VNode<P> {
    value(value: string | null): VNode<P>;
    checked(checked: boolean | null): VNode<P>;
}
```

## Rendering and Augmentation

Render Virtual DOM into container.

```ts
function render<T extends Node>(
    node: VNode<any> | null,
    container: Element,
    context: Context = ROOT_CONTEXT,
): T | undefined;
```

Render Virtual DOM into container asynchronously. This function will update DOM tree once per animation frame, even
when it is invoked multiple times.

```ts
function renderNextFrame(
    node: VNode<any> | null,
    container: Element,
    context: Context = ROOT_CONTEXT,
): void;
```

Augment existing DOM tree with a Virtual DOM.

```ts
function augment(node: VNode<any> | null, container: Element, context: Context = ROOT_CONTEXT): void;
```