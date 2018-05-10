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
`children()`.

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

Method `unsafeHTML()` method is used to specify `innerHTML`, it is named unsafe because it doesn't provide any XSS protection,
`unsafeHTML()` value will be directly injected into an element.

### Methods available on input elements

`<textarea />` element works as an input element that can have a text value.

```ts
interface VNode<P> {
  value(value: string | null): this;
  checked(checked: boolean | null): this;
}
```

Method `value()` is used to assign a value for input elements that can have a text value.

Method `checked()` is used to assign a checked value for input element that can have a checked value.

### Methods available on focusable elements

```ts
interface VNode<P> {
  autofocus(focus: boolean): this;
}
```

Autofocused element will receive a focus when element is instantiated.

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
