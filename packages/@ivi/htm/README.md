# [ivi](https://github.com/localvoid/ivi) HTML Template Language

`@ivi/htm` module provides an interface for creating ivi templates with
[template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates):

- `htm` creates a template with [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) nodes.
- `svg` creates a template with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement) nodes.

```js
htm`
  <div id="app">
    <h1>Template Example</h1>
    <div class="content">
      ${condition ? "true" : "false"}
    </div>
  </div>
`;
```

## Multiple Root Nodes

```js
htm`
  <div></div>
  ${expr}
  text
  <div></div>
`
```

## Childless elements can be self closed with a `/>` syntax

```js
htm`
  <div
    class="a"
  />
`;
```

## Whitespaces

1. Whitespaces around newlines are removed:

```htm
<div>
  <p></p>
  ab
  <p></p>
</div>
```

```htm
<div><p></p>ab<p></p></div>
```

2. Inline whitespaces are collapsed into one whitespace:

```htm
<div>  <span>  a  b  </span>  </div>
```

```htm
<div> <span> a b </span> </div>
```

3. Whitespaces around newlines in text nodes are collapsed into one whitespace:

```htm
<div>
  ab
  cd
</div>
```

```htm
<div>ab cd</div>
```

4. Vertical tab `\v` character prevents from removing all whitespaces around
newlines:

```htm
<div>
  <b>1</b>
  \v item left
<div>
```

```htm
<div><b>1</b> item left</div>
```

## Element Attributes Syntax

HTML Template Language supports additional syntax to work with DOM properties,
events, etc.

- [`<div name="value" />`](#attributes) - Static attribute.
- [`<div name />`](#attributes) - Static attribute.
- [`<div name=${expr} />`](#attributes) - Dynamic attribute `element.setAttribute(name, expr)`.
- [`<div .name=${expr} />`](#properties) - Property `element[name] = expr`.
- [`<div *name=${expr} />`](#properties) - Property `element[name] = expr`, diffs against a DOM value.
- [`<div ~name="value" />`](#styles) - Static style `<div style="name:value;">`.
- [`<div ~name=${expr} />`](#styles) - Dynamic style `element.style.setProperty(name, expr)`.
- [`<div @name=${expr} />`](#events) - Event `element.addEventListener(name, expr)`.
- [`<div ${directive} />`](#directives) - Client-Side Element Directive `directive(element)`.
- [`<div &=${directive} />`](#directives) - Client-Side Element Directive `directive(element)`.
- [`<div &:ssr=${directive} />`](#directives) - Element Directive that works during Client-Side and Server-Side Rendering `directive(element, hydrate)`.
- [`<div .textContent=${expr} />`](#text-content) - Text content.

### Attributes

- `<div name="value" />` - Static attribute with a value `<div name="value">`.
- `<div name />` - Static attribute without a value `<div name>`.
- `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.

DOM attributes are assigned with `Element.setAttribute(..)`.

When dynamic attribute has an `undefined`, `null` or `false` value, it will be removed from the DOM element with `Element.removeAttribute(..)` method.

### Properties

- `<div .name=${expr} />` - Property `element[name] = expr`.
- `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.

Properties are assigned with an assignment operator `Element.name = value`.

Diffing with a DOM value is useful in use cases when we use `<input>` values to avoid triggering unnecessary `input` events.

### Styles

- `<div ~name="value" />` - Static style `<div style="value">`.
- `<div ~name=${expr} />` - Dynamic style `element.style.setProperty(name, expr)`.

Static styles are automatically merged with `:style="value"` attribute.

Dynamic styles are assigned with a `CSSStyleDeclaration.setProperty(..)` method.

When style has an `undefined`, `null` or `false` value, it will be removed with `CSSStyleDeclaration.removeProperty(..)` method.

### Events

- `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`.

Events are assigned with an `EventTarget.addEventListener(..)` method.

When event has an `undefined`, `null` or `false` value, it will be removed with `EventTarget.removeEventListener(..)` method.

### Directives

- `<div ${directive} />` - Client-Side Element Directive `directive(element)`.
- `<div &=${directive} />` - Client-Side Element Directive `directive(element)`.
- `<div &:ssr=${directive} />` - Element Directive that works during Client-Side and Server-Side Rendering `directive(element, hydrate)`.

Directive is a function that is invoked each time template is updated and
receives a DOM element associated with a directive:

```ts
type ElementDirective = <E extends Element>(
  element: E,
  hydrate?: boolean,
) => void | string | { a?: string, c?: string; };
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
    <div>
      <div class="Inner" ${onCreated} />
    </div>
  `;
});
```

Directives can be used not just as a simple DOM created callbacks, but also as stateful directives. E.g.

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
    <div ${directive(i)} />
  `;
});
```

### Text Content

- `<div .textContent=${expr} />` - Text Content `element.textContent = expr`.

Text content property can be used as an optimization that slightly reduces memory consumption for elements with a text child. It will create a text node with a [`Node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) property and won't have any stateful nodes associated with a text node.

Text content value should have an `undefined`, `null`, `false`, `string` or a `number` type.
