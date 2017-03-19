# Virtual DOM

Virtual DOM API is using method chaining to set properties.

For example, to assign an event and id attribute on a div element:

```ts
const node = $h("div")
    .events(Events.onClick((ev) => { console.log("click"); }))
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
    events(events: EventHandlerList | EventHandler | null): VNode<P>;
    mergeProps<U extends P>(props: P): VNode<P>;
    mergeStyle<U extends CSSStyleProps>(style: U | null): VNode<P>;
}
```

### HTML and SVG elements (nodes that can contain children nodes)

```ts
interface VNode<P> {
    children(...children: Array<VNode<any> | string | number | null>): VNode<P>;
    unsafeHTML(html: string): VNode<P>
}
```

#### Children

Children method is a variadic function that accepts variable number of children. Children objects can be any basic
objects like string or number, VNode or VNode lists and null values. When children are assigned, they will be
automatically normalized into a circular linked list form. All null values will be ignored, and basic objects will be
converted into VNodes.

Children normalization process also implicitly assigns positional keys for all nodes that doesn't have keys.
Positional keys are necessary to support code patterns like this:

```ts
$h("div").children(
    isVisible ? $h(ComponentA) : null,
    $c(ComponentB),
);
```

When `ComponentA` goes from visible to invisible state and removed from the list, `ComponentB` won't be reinstantiated
because it has the same implicit positional key.

##### Nested Children lists

There are several functions that helps with building nested children lists in a normalized form, so you don't need to
think about possibilities that you can optimize your code even further by preallocating arrays, etc (old ivi versions
had support for nested arrays).

Because one of the most common mistakes when working with dynamic children lists is that developers forgetting to add
keys, all nodes in the nested lists should have explicit keys.

```ts
function $list(...children: Array<VNode<any> | null>): VNode<any> | null;
function $map<T>(array: Array<T>, fn: (item: T, index: number) => VNode<any>): VNode<T> | null;
function $filter<T>(array: Array<T>, fn: (item: T, index: number) => VNode<any> | null): VNode<T> | null;
function $range<T>(n: number, fn: (index: number) => VNode<any>): VNode<T> | null {
```

Example:

```ts
const data = [
    "Two",
    "Three",
];

render(
    $h("div").children(
        "One",
        $map(data, (item) => $h("span").key(item).children(item)),
        "Four",
    ),
);
```

#### UnsafeHTML

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
    syncFlags?: SyncFlags,
): void;
```

Render Virtual DOM into container asynchronously. This function will update DOM tree once per animation frame, even
when it is invoked multiple times per frame.

```ts
function renderNextFrame(
    node: VNode<any> | null,
    container: Element,
    syncFlags?: SyncFlags,
): void;
```

Update dirty components.

```ts
function update(syncFlags?: SyncFlags);
function updateNextFrame(syncFlags?: SyncFlags);
```

Augment existing DOM tree with a Virtual DOM.

```ts
function augment(
    node: VNode<any> | null,
    container: Element,
): void;
```