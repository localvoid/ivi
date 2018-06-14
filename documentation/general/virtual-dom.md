# Virtual DOM

Virtual DOM API is using factory functions to instantiate nodes and method chaining to assign different properties.

```ts
import { onClick } from "ivi";
import { div } from "ivi-html";

const node = div("node-class", { id: "unique-id" })
  .e(onClick((ev) => { console.log("click"); }));
```

In this example, virtual DOM node is created with a `div()` function, this node will represent a `<div />` element.
Method `e()` is used to assign events.

All factory functions that create DOM elements have an interface:

```ts
type VNodeElementFactory<T, N extends Element> = (className?: string, attrs?: T, style?: CSSStyleProps) => VNode<T, N>;
```

## Chained Methods

### Key

```ts
interface VNode<P> {
  k(key: any): this;
}
```

Method `k()` is used to assign keys, they are used to uniquely identify virtual nodes among its siblings.

### Events

```ts
interface VNode<P> {
  e(events: Array<EventHandler | null> | EventHandler | null): this;
}
```

Method `e()` is used to assign events.

### Children

```ts
interface VNode<P> {
  c(...children: Array<VNode<any> | string | number | null>): this;
}
```

Method `c()` is a variadic method and accepts variable number of children. Children argument can be a string, number,
virtual dom node or a collection of virtual dom nodes created with functions like `map()`, `mapRange()`, `mapIterable()`
or `fragment()`.

## Children collections

```ts
function fragment(...args: Array<VNode | string | number | null>): VNode | null;
```

`fragment()` is a variadic function that creates a fragment children collection.

```ts
const Button = statelessComponent((slot) => div("button").c(slot));

render(
  Button(
    fragment(
      span().c("Click"),
      " ",
      span().c("Me"),
    ),
  ),
  DOMContainer,
);
```

### Dynamic lists

`map()`, `mapRange()` and `mapIterable()` functions are used to generate dynamic lists with keyed elements.

```ts
function map<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U> | null): VNode<U> | null;
function mapRange<T>(start: number, end: number, fn: (idx: number) => VNode<T> | null): VNode<T> | null;
function mapIterable<T>(iterable: IterableIterator<VNode<T>>): VNode<T> | null;
```

`map()` creates a children collection with the results of calling a provided function on every element in the calling
array.

```ts
render(
  div().c(
    map([1, 2, 3], (item) => div().k(item)),
  ),
  DOMContainer,
);
```

`mapRange()` creates a children collection with the results of calling a provided function on every number in the
provided range.

```ts
const items = [1, 2, 3];

render(
  div().c(
    mapRange(0, items.length, (i) => div().k(items[i])),
  ),
  DOMContainer,
);
```

`mapIterable()` creates a children collection from an `IterableIterator` object.

```ts
const items = [1, 2, 3];

render(
  div().c(mapIterable(function* () {
    for (const item of items) {
      yield div().k(item);
    }
  }())),
  DOMContainer,
);
```

## Syncable Values

By default, syncing algorithm assigns all attributes with `setAttribute()` and removes them with `removeAttribute()`,
but sometimes we need to assign properties or assign attributes from different namespaces. To solve this problems, ivi
introduces the concept of [Syncable Values](../advanced/syncable-value.md), this values can extend the default behavior
of the attribute syncing algorithm. It significantly reduces complexity, because we no longer need to bake in all this
edge cases into syncing algorithm, also it gives an additional escape hatch to manipulate DOM elements directly.

There are several syncable values defined in ivi packages:

```ts
// ivi
function PROPERTY<T>(v: T | undefined): SyncableValue<T>;
function UNSAFE_HTML(v: string | undefined): SyncableValue<string>;

// ivi-html
function INPUT_VALUE(v: string | number | undefined): SyncableValue<string | number>;
function INPUT_CHECKED(v: boolean | undefined): SyncableValue<boolean>;
function TEXTAREA_VALUE(v: string | number | undefined): SyncableValue<string | number>;

// ivi-svg
function XML_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean>;
function XLINK_ATTR(v: string | number | boolean | undefined): SyncableValue<string | number | boolean>;
```

`PROPERTY()` function creates a {@link SyncableValue} that assigns a property to a property name derived from the `key`
of the attribute.

`UNSAFE_HTML()` function creates a {@link SyncableValue} that assigns an `innerHTML` property to an Element.

`INPUT_VALUE()` function creates a {@link SyncableValue} that assigns a `value` property to an HTMLInputElement.

`INPUT_CHECKED()` function creates a {@link SyncableValue} that assigns a `checked` property to an HTMLInputElement.

`TEXTAREA_VALUE()` function creates a {@link SyncableValue} that assigns a `value` property to an HTMLTextAreaElement.

`XML_ATTR()` function creates a {@link SyncableValue} that assigns an attribute from XML namespace, attribute name is
derived from the `key`.

`XLINK_ATTR()` function creates a {@link SyncableValue} that assigns an attribute from XLINK namespace, attribute name
is derived from the `key`.

## Additional functions

### Autofocus

```ts
function autofocus(vnode: VNode): void;
```

Autofocused node will receive a focus when element is instantiated. `autofocus()` is working with any node type except
text nodes.

### Retrieve DOM instance

```ts
function getDOMInstanceFromVNode<T extends Node>(node: VNode<any, T>): T | null;
```

`getDOMInstanceFromVNode()` retrieves a closest DOM node from a virtual DOM node. This method works with any node type.

### Retrieve Component instance

```ts
function getComponentInstanceFromVNode<T extends Component<any>>(node: VNode): T | null;
```

`getComponentInstanceFromVNode()` retrieves a stateful component instance from a virtual DOM node.

## Rendering virtual DOM into a document

```ts
function render(node: VNode<any> | null, container: Element): void;
function renderNextFrame(node: VNode<any> | null, container: Element): void;
```

`render()` and `renderNextFrame()` functions are used to render virtual DOM nodes into the document.

When rendering virtual DOM nodes, `container` element should be always attached to the document.

## Dirty checking

```ts
function update();
function updateNextFrame();
```

`update()` and `updateNextFrame()` triggers a dirty checking. Dirty checking algorithm will check all connectors for
changes and update all invalidated components.
