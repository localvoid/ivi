# Partially Static Elements

Partially static elements are elements with predefined tag name, class names, styles and attributes. They are quite
useful for widget libraries. With partially static elements it will be easy to make global changes in elements without
breaking an API.

## Creating Partially Static Elements

There are several different factory functions that create `ElementDescriptor` objects:

```ts
function createElementDescriptor(tagName: string, clone?: Boolean): ElementDescriptor<HTMLElementProps | null>;
function createSVGElementDescriptor(tagName: string, clone?: Boolean): ElementDescriptor<SVGElementProps | null>;
function createInputElementDescriptor(type: InputType, clone?: Boolean): ElementDescriptor<HTMLInputElementProps | null>;
function createMediaElementDescriptor(tagName: "audio" | "video", clone?: Boolean): ElementDescriptor<HTMLMediaElementProps | null>;
```

They work in a similar way as factory functions for virtual nodes, but instead of virtual nodes, they create
`ElementDescriptor` instances. This instances also use method chaining to set properties.

```ts
const PartialDiv = createElementDescriptor("div")
    .className("PartialDiv")
    .props({
        "id": "unique-id",
    });
```

## Property Methods

```ts
interface ElementDescriptor<P> {
    props(props: P | null, protected?: boolean | { [key: string]: boolean }): ElementDescriptor<P>;
    className(className: string | null, protected?: boolean): ElementDescriptor<P>;
    style(style: CSSStyleProps | null, protected?: boolean | { [key: string]: boolean }): ElementDescriptor<P>;
    // ...
}
```

## Protecting From Collisions

Each partial static element can be configured to avoid collisions with overriding class name, styles or attributes.

Protection is configured with a second parameter `protected` on property methods. When this paramater is `true`, it
will protect property from overriding.

```ts
const ProtectedDiv = createElementDescriptor("div")
    .className("ProtectedDiv", true);
```

When user tries to override a class name of the `ProtectedDiv` element, exception will be thrown.

```ts
$e(ProtectedDiv, "override class");
// Exception
```

Props protection is working in a similar way, but instead of complete protection from reassigning props object, it will
protect from collisions only for props with identical keys.

```ts
const ProtectedDiv = createElementDescriptor("div")
    .props({ "id": "protected-div" }, true);

$e(ProtectedDiv)
    .props({ "id": "override-id" });
// Exception

$e(ProtectedDiv)
    .props({ "title": "Dynamic title" });
// No Exception
```

It is also possible to protect some part of properties instead of protecting all of them. To do so, pass an inline
object with keys that should be protected:

```ts
const ProtectedDiv = createElementDescriptor("div")
    .props({
        "id": "protected-div",
        "title": "Default Title",
    }, {
        "id": true,
    });

$e(ProtectedDiv)
    .props({ "id": "override-id" });
// Exception

$e(ProtectedDiv)
    .props({ "title": "Dynamic title" });
// No Exception
```

## Performance

Partially static elements will reduce syncing overhead, but reduction will be insignificant. There is no reason to use
them as an optimization technique, but as usual it doesn't apply for some extremely rare situations when they can give
a noticeable improvements in performance.

### DOM Node Cloning

When element has a dozen of different attributes and there are many instances of this element, it maybe useful to enable
DOM Node cloning. This optimization can slightly reduce overhead with DOM nodes instantiation.

DOM Node cloning can be enabled with a second parameter `clone` in all factory functions.
