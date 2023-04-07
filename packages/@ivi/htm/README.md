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

## Elements can be closed with a `/>` syntax

```js
htm`
  <div
    class="a"
  />
`;
```

## Element Attributes Syntax

HTML Template Language supports additional syntax to work with DOM properties,
events, etc.

- `<div name="value" />` - Static attribute.
- `<div name />` - Static attribute.
- `<div name=${expr} />` - Dynamic attribute `element.setAttribute(name, expr)`.
- `<div .name=${expr} />` - Property `element[name] = expr`.
- `<div *name=${expr} />` - Property `element[name] = expr`, diffs against a DOM value.
- `<div ~name="value" />` - Static style `<div style="value">`.
- `<div ~name=${expr} />` - Dynamic style `element.style.setProperty(name, expr)`.
- `<div @name=${expr} />` - Event `element.addEventListener(name, expr)`.
- `<div ${directive} />` - Client-Side Directive `directive(element)`.
- `<div &=${directive} />` - Client-Side Directive `directive(element)`.
- `<div &:ssr=${directive} />` - Server-Side Directive `directive(element, hydrate)`.

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
