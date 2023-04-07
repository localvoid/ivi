# [ivi](https://github.com/localvoid/ivi) Template Language

`@ivi/tpl` module provides an interface for creating templates with
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates):

- `htm` creates a template with [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) nodes.
- `svg` creates a template with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement) nodes.

```js
htm`
div :id='app'
  h1 'Template Example'
  div.content
    ${condition ? "true" : "false"}
`
```

In this example we are creating a root element `<div id="app">` with two
children: `<h1>TemplateExample</h1>` and `<div class="content">{..}</div>`.
In an HTML it could look something like that:

```html
<div id="app">
  <h1>Template Example</h1>
  <div class="content">
    {condition ? "true" : "false"}
  </div>
</div>
```

As we can see from this example, indentation level is used for children nesting.
Also, children node can be nested by declaring them on the same line as their
parent. E.g.

```js
htm`div a ${expr}`
```

HTML:

```html
<div><a>{expr}</a></div>
```

Or in a mixed form:

```js
htm`
div a ${0}
  ${1}
`
```

HTML:

```html
<div><a>{0}</a>{1}</div>
```

Inline nodes that can't have any children will be rendered as siblings:

```js
htm`div 'prefix' ${expr} 'suffix'`
```

HTML:

```html
<div>prefix{expr}suffix</div>
```

## Text Nodes

Static text nodes are declared either with `'text'`, `"text"` or a `#'text'#`
syntax.

Text nodes are escaped automatically:

```js
htm`div 'escape & <'`
```

HTML:

```htm
<div>escape &amp; &lt;</div>
```

## Multiple Root Nodes

```js
htm`
  div 'a'
  ${expr}
  text'
  div 'b'
`
```

## Element Properties Syntax

- [`div.classA.classB`](#class-names) - Static class names `<div class="classA classB">`
- [`div${expr}`](#class-names) - Dynamic class names `element.className = expr`
- [`div :name='value'`](#attributes) - Static attribute with a value `<div name="value">`.
- [`div :name`](#attributes) - Static attribute without a value `<div name>`.
- [`div :name=${expr}`](#attributes) - Dynamic attribute `element.setAttribute(name, expr)`.
- [`div .name=${expr}`](#properties) - Property `element[name] = expr`.
- [`div *name=${expr}`](#properties) - Property `element[name] = expr`, diffs against a DOM value.
- [`div ~name='value'`](#styles) - Static style `<div style="value">`.
- [`div ~name=${expr}`](#styles) - Dynamic style `element.style.setProperty(name, expr)`.
- [`div @name=${expr}`](#events) - Event `element.addEventListener(name, expr)`.
- [`div =${expr}`](#text-content) - Text Content `element.textContent = expr`.
- [`div &=${directive}`](#directives) - Client-Side Directive `directive(element)`.
- [`div &:ssr=${directive}`](#directives) - Server-Side Directive `directive(element, hydrate)`.

Element properties can be declared on the same line as element or with an
indentation level.

```js
htm`
div :inline-attr1 :inline-attr2
  :indented-attr
    :can-be-indented-with-any-amount-of-spaces
  child-element
`
```

### Class Names

Static class names are declared with a `.` character immediately after a tag
name:

```js
htm`div.class-one.class-two ${expr}`
```

HTML:

```html
<div class="class-one class-two"></div>
```

Dynamic class names are declared with an expression immediately after a tag
name:

```js
htm`div${condition ? "class-one" : "class-two"}`
```

HTML:

```html
<div class={condition ? "class-one" : "class-two"}></div>
```

Static and dynamic class names cannot be mixed together.

### Attributes

- `div :name='value'` - Static attribute with a value `<div name="value">`.
- `div :name` - Static attribute without a value `<div name>`.
- `div :name=${expr}` - Dynamic attribute `element.setAttribute(name, expr)`.

DOM attributes are assigned with `Element.setAttribute(..)`.

When dynamic attribute has an `undefined` value, it will be removed from the
DOM element with `Element.removeAttribute(..)` method.

Attribute values are escaped automatically:

```js
htm`div :name='escape & "'`
```

HTML:

```htm
<div name="escape &amp; &quot;"></div>
```

### Properties

- `div .name=${expr}` - Property `element[name] = expr`.
- `div *name=${expr}` - Property `element[name] = expr`, diffs against a DOM value.

Properties are assigned with an assignment operator `Element.name = value`.

Diffing with a DOM value is useful in use cases when we use `<input>` values to
avoid triggering unnecessary `change` events.

### Styles

- `div ~name='value'` - Static style `<div style="value">`.
- `div ~name=${expr}` - Dynamic style `element.style.setProperty(name, expr)`

Static styles are automatically merged with `:style="value"` attribute.

Dynamic styles are assigned with a `CSSStyleDeclaration.setProperty(..)`
method.

When style has an `undefined` value, it will be removed with a
`CSSStyleDeclaration.removeProperty(..)` method.

### Events

- `div @name=${expr}` - Event `element.addEventListener(name, expr)`

Events are assigned with an `EventTarget.addEventListener(..)` method.

When event has an `undefined` value, it will be removed with an
`EventTarget.removeEventListener(..)` method.

### Text Content

- `div =${expr}` - Text Content `element.textContent = expr`

Text content property can be used as an optimization that slightly reduces
[memory overhead](#ui-tree-data-structures) for elements with a text child. It
will create a text node with a [`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
property and won't have any stateful nodes associated with a text node.

Text content value should have a string or a number type.

### Directives

- `div &=${directive}` - Client-Side Directive `directive(element)`
- `div &:ssr=${directive}` - Server-Side Directive `directive(element, hydrate)`

Directive is a function that is invoked each time template is updated and
receives a DOM element associated with a directive:

```ts
type ElementDirective = <E extends Element>(element: E, hydrate?: true) => void;
```

Directive function is invoked only when template is created with a
different function, so if we are going to reuse the same function, it can be
used as a DOM element created callback:

```js
const Example = component((c) => {
  const onCreated = (innerElement) => {
    // ..
  };
  return () => htm`
    div.outer
      div.inner &=${onCreated}
  `;
});
```

Directives can be used not just as a simple DOM created callbacks, but also as
a stateful directives. E.g.

```js
function createStatefulDirective() {
  // Internal state that stores previous value.
  let prev;
  // Returns a factory that creates directive functions.
  return (next) => (element) => {
    // Check if previous value has been changed.
    if (prev !== next) {
      prev = next;
      // Updates textContent only when input value is changed.
      element.textContent = next;
    }
  };
}

const Example = component((c) => {
  const directive = createStatefulDirective();
  return (i) => htm`
    div &=${directive(i)}
  `;
});
```
