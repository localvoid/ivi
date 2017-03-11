# Virtual DOM

Virtual DOM API is using method chaining to set properties.

For example, to assign an event and id attribute on a div element:

```ts
const node = $h("div")
    .events({ click: onClick })
    .props({ id: "unique-id" });
```

## Why Method Chaining?

Method chaining API allows to create efficient and flexible APIs.

For example, instead of wrapping everything into components, it is perfectly fine to create factory functions that
return virtual dom nodes:

```ts
function $Link(title: string, href: string) {
    return $h("a", "link").props({ href, title }).children(title);
}

render(
    $Link("example", "http://example.com")
        .key("unique-key")
        .mergeProps({
            target: "_blank",
        }),
    document.getElementById("container")!,
);
```

## Creating Virtual Nodes

```ts
function $h(tagName: string, className?: string): VNode<P>;
function $c<P>(component: ComponentFunction<P> | ComponentClass<P>, props: P): VNode<P>;
```

This is the two most common factory functions, one creates nodes for HTML elements and another one creates nodes for
components.

`$h` function creates nodes for HTML elements. `tagName` parameter specifies HTML tag name, and optional `className`
parameter specifies a class name.

`$c` function creates nodes for Components. `component` parameter specifies a component, it can be a simple function,
or a component class. `props` parameter is an object with component properties.

### Other Virtual Node types

```ts
function $s(tagName: string, className?: string): VNode<P>;
function $i(type: string, className?: string): VNode<P>;
function $m(tagName: string, className?: string): VNode<P>;
function $t(content: string): VNode<P>;
```

`$s` function creates nodes for SVG elements.

`$i` function creates nodes for HTML input elements. `type` parameter specifies an input type attribute, with an
exception for `textarea` type, input element with `textarea` type will be created as a `<textarea>` element.

`$m` function creates nodes for HTML media elements: `<audio>` and `<video>`.

`$t` function creates nodes for Text nodes. `content` parameter specifies text node contents.

## Chained Methods

### All Nodes

```ts
interface VNode<P> {
    key(key: any): VNode<P>;
}
```

`key` property is used to uniquely identify Virtual Node among its siblings. It is used by children syncing algorithm to
find how to rearrange nodes when they are moved, removed or inserted.

### HTML, SVG, Input and Media elements

```ts
interface VNode<P> {
    props(props: P): VNode<P>;
    style(style: CSSStyleProps | null): VNode<P>;
    events(events: EventHandlerList | null): VNode<P>;
    mergeProps<U extends P>(props: P): VNode<P>;
    mergeStyle<U extends CSSStyleProps>(style: U | null): VNode<P>;
    mergeEvents(events: EventHandlerList | null): VNode<P>;
}
```

### HTML and SVG elements (nodes that can contain children nodes)

```ts
interface VNode<P> {
    children(children: VNodeArray | VNode<any> | string | number | null): VNode<P>;
    unsafeHTML(html: string): VNode<P>
}
```

Children property can be any basic object like string or number, single VNode or an array of VNodes, basic objects, null
values and arrays of VNodes with explicit keys. It will automatically normalize arrays by flattening nested arrays,
removing null values and replacing basic objects with text nodes.

Children normalization process is also implicitly assigns positional keys for all nodes that doesn't have keys.
Positional keys are used to support code patterns like this:

```ts
$h("div").children([
    isVisible ? $h(ComponentA) : null,
    $c(ComponentB),
]);
```

When `ComponentA` goes from visible to invisible state and removed from the list, `ComponentB` won't be destroyed and
reinstantiated because it has the same implicit positional key.

`unsafeHTML` is used to specify `innerHTML`, it is named unsafe because it doesn't provide any XSS protection, HTML
string specified in `html` parameter will be directly injected into the element.

### Input Elements

Input Value and Checked properties.

```ts
interface VNode<P> {
    value(value: string | null): VNode<P>;
    checked(checked: boolean | null): VNode<P>;
}
```

### Focusable Elements

```ts
interface VNode<P> {
    autofocus(focus: boolean): VNode<P>;
}
```

Autofocused elements will receive a focus when element is instantiated.

## Rendering and Augmentation

Render Virtual DOM into container.

```ts
function render<T extends Node>(
    node: VNode<any> | null,
    container: Element,
    syncFlags: SyncFlags = 0,
): void;
```

Render Virtual DOM into container asynchronously. This function will update DOM tree once per animation frame, even
when it is invoked multiple times per frame.

```ts
function renderNextFrame(
    node: VNode<any> | null,
    container: Element,
    syncFlags: SyncFlags = 0,
): void;
```

Update dirty components.

```ts
function update(syncFlags: SyncFlags = 0);
function updateNextFrame(syncFlags: SyncFlags = 0);
```

Augment existing DOM tree with a Virtual DOM.

```ts
function augment(
    node: VNode<any> | null,
    container: Element,
): void;
```

### Sync Flags

```ts
const enum SyncFlags {
    /**
     * Update dirty components.
     */
    DirtyComponent = 1,
    /**
     * Force update for all components.
     */
    ForceUpdate = 1 << 1,
    /**
     * Context is dirty.
     */
    DirtyContext = 1 << 2,
}
```