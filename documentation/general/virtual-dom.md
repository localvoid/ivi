# Virtual DOM

Virtual DOM API is using factory functions to instantiate nodes and method chaining to assign properties.

```ts
import * as h from "ivi-html";
import * as Events from "ivi-events";

const node = h.div()
  .e(Events.onClick((ev) => { console.log("click"); }))
  .a({ id: "unique-id" });
```

In this example, virtual DOM node is created with a `div()` function, this node will represent a `<div />` element.
Events are assigned with a method `e()` and attributes with a method `a()`.

## Chained Methods

### Methods available on all nodes

```ts
interface VNode<P> {
  k(key: any): this;
}
```

Method `k()` is used to assign keys, they are used to uniquely identify virtual nodes among its siblings.

### Methods available on HTML, SVG, Input and Media elements

```ts
interface VNode<P> {
  a(attrs: P): this;
  s(style: CSSStyleProps | null): this;
  e(events: Array<EventHandler | null> | EventHandler | null): this;
}
```

Method `a()` is used to assign DOM attributes.

Method `s()` is used to assign styles.

Method `e()` is used to assign events.

### Methods available on non-void HTML and SVG elements

[Void element](https://developer.mozilla.org/en-US/docs/Glossary/Empty_element) is an element that **cannot** have any
children.

```ts
interface VNode<P> {
  c(...children: Array<VNode<any> | string | number | null>): this;
  unsafeHTML(html: string): this;
}
```

#### Children

Method `c()` is a variadic method and accepts variable number of children. Children can be any basic object like string
or number, virtual dom node or a collection of virtual dom nodes created with functions like `map()`, `mapRange()` or
`fragment()`.

Each child that doesn't have a key will be automatically assigned with an implicit key that reflects its position.

Implicit keys are used to support code patterns like this:

```ts
h.div().c(
  isVisible ?
    map(entries, (entry) => A().k(entry.id)) :
    null,
  B(),
);
```

In this example, when `isVisible` state is changed, syncing algorithm will not touch component `B` because it have the
same position relative to other root nodes.

#### unsafeHTML

Method `unsafeHTML()` is used to specify `innerHTML`, it is named unsafe because it doesn't provide any XSS protection,
`unsafeHTML()` value will be directly injected into an element.

### Methods available on input elements

`<textarea />` element works as an input element that can have a text value.

```ts
interface VNode<P> {
  value(value: string | boolean | null): this;
}
```

Method `value()` is used to assign a value and checked values for input elements. When value has a `string` type it is
assigned an input `value` property, otherwise it is assigned as a `checked` property.

## Children collections

```ts
function fragment(...args: Array<VNode | string | number | null>): VNode | null;
```

`fragment()` is a variadic function that creates a fragment children collection.

```ts
const Button = statelessComponent((slot) => h.div("button").c(slot));

render(
  Button(
    fragment(
      h.span().c("Click"),
      " ",
      h.span().c("Me"),
    ),
  ),
  DOMContainer,
);
```

### Dynamic lists

`map()` and `mapRange()` functions are used to generate dynamic lists with keyed elements.

```ts
function map<T, U>(array: Array<T>, fn: (item: T, index: number) => VNode<U> | null): VNode<U> | null;
function mapRange<T>(start: number, end: number, fn: (idx: number) => VNode<T> | null): VNode<T> | null;
```

`map()` creates a children collection with the results of calling a provided function on every element in the calling
array.

```ts
render(
  h.div().c(
    map([1, 2, 3], (item) => h.div().k(item)),
  ),
  DOMContainer,
);
```

`mapRange()` creates a children collection with the results of calling a provided function on every number in the
provided range.

```ts
const items = [1, 2, 3];

render(
  h.div().c(
    mapRange(0, items.length, (i) => h.div().k(items[i])),
  ),
  DOMContainer,
);
```

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
