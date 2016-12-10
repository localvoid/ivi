# Virtual DOM

Virtual DOM API is using method chaining to set properties.

For example, to assign an event and id attribute on a div element:

```ts
const node = $h("div")
    .events({ click: onClick })
    .props({ id: "unique-id" });
```

## Creating Virtual Nodes

```ts
function $h(tagName: string, className?: string): VNode<P>;
function $c<P>(component: ComponentFunction<P> | ComponentClass<P>, props: P): VNode<P>;
```

This is the two most common factory function that will be used, one creates nodes for HTML element another one creates
nodes for components.

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
    ref(ref: (ref: Node | Component<P> | null) => void): VNode<P>;
}
```

`key` property is used to uniquely identify Virtual Node among its siblings. It is used by children syncing algorithm to
find how to rearrange nodes when they are moved, removed or inserted.

`ref` callback is used to get reference for an actual DOM Node or a Component instance. When VNode is instantiated, ref
callback will be invoked with a node value for a node or a component instance for components. When VNode is detached,
ref callback will be invoked with a `null` value.

### HTML, SVG, Input and Media elements

```ts
interface VNode<P> {
    style(style: CSSStyleProps | null): VNode<P>;
    events(events: EventHandlerList | null): VNode<P>;
    props(props: P): VNode<P>;
}
```

`style` is a an object with styles.

`events` is an object with event handlers.

`props` is an object with DOM attributes.

### HTML and SVG elements (nodes that can contain children nodes)

```ts
interface VNode<P> {
    children(children: VNodeRecursiveArray | VNode<any> | string | number | boolean | null): VNode<P>;
    unsafeHTML(html: string): VNode<P>
}
```

Children property can be any basic object like string or number, single VNode or a recursive array of VNodes with
basic objects and null values. It will automatically normalize recursive lists by flattening, filtering out null values
and replacing basic objects with text nodes.

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
    context: Context = ROOT_CONTEXT,
): void;
```

Render Virtual DOM into container asynchronously. This function will update DOM tree once per animation frame, even
when it is invoked multiple times per frame.

```ts
function renderNextFrame(
    node: VNode<any> | null,
    container: Element,
    syncFlags: SyncFlags = 0,
    context: Context = ROOT_CONTEXT,
): void;
```

Augment existing DOM tree with a Virtual DOM.

```ts
function augment(node: VNode<any> | null, container: Element, context: Context = ROOT_CONTEXT): void;
```

### Sync Flags

```ts
const enum SyncFlags {
    /**
     * Force update for all components.
     */
    ForceUpdate = 1 << 1,
}
```