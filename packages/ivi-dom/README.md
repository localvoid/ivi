# DOM Helpers

## Browser Quirks

### InnerHTML

```ts
function setInnerHTML(element: Element, content: string, isSVG: boolean): void;
```

`setInnerHTML()` sets innerHTML property for HTML and SVG elements (IE doesn't have native innerHTML on SVG elements).

### KeyboardEvent

```ts
function getEventCharCode(ev: KeyboardEvent): number;
```

`getEventCharCode()` retrieves a normalized `charCode` from a KeyboardEvent.

```ts
function getEventKey(ev: KeyboardEvent): string;
```

`getEventKey()` retrieves a `key` from a KeybordEvent with a fallback for browsers that doesn't support `key` property.

```ts
function getMouseButtons(ev: MouseEvent): number;
```
`getMouseButtons()` retrieves a `buttons` property from a MouseEvent with a fallback implementation for Safari.
