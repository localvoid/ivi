# DOM Abstractions

## Browser Quirks

### InnerHTML

```ts
function setInnerHTML(element: Element, content: string, isSVG: boolean): void;
```

`setInnerHTML()` sets innerHTML propert for HTML and SVG elements in all supported browsers. IE doesn't support
innerHTML on SVG elements.

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

## Scheduler
