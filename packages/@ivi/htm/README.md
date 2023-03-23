# [ivi](https://github.com/localvoid/ivi) HTML Template Language

`@ivi/htm` module provides an interface for creating templates with
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates):

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
`
```

## Element Attributes Syntax

HTML Template Language supports additional syntax to work with DOM properties,
events, etc.

- `<div name="value" />` - Static attribute.
- `<div name />` - Static attribute.
- `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.
- `<div .name=${expr} />` - Property `element[name] = expr`.
- `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.
- `<div ~name=${expr} />` - Style `element.style.setProperty(name, expr)`
- `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`
- `<div ${directive} />` - Directive `directive(element)`

```js
const Example = htm`
  <div
    attribute="name"
    @event=${onEvent}
    .property=${value}
    ~style=${value}
  >
    ${expr}
  </div>
`;
```
