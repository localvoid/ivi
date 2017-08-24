# Performance Tips

## Interned Strings

Prefer [interned strings](https://en.wikipedia.org/wiki/String_interning) over creating new strings on each render.

### Bad

```ts
function Button(props: { active: boolean }) {
  let className = "button";
  if (props.active === true) {
    className += " active";
  }
  return h.div(className);
}
```

### Good

```ts
function Button(props: { active: boolean }) {
  return h.div(props.active === true ? "button active" : "button");
}
```

## Hoist Static Values

Syncing algorithm always performs identity checks before diffing, by hoisting static values we can reduce diffing
overhead.

SSR blueprint diffing doesn't use any complicated diffing algorithms and performs only basic identity checks.

### Bad

```ts
function Menu() {
  return h.div()
    .attrs({ id: "menu" })
    .children(...);
}
```

### Good

```ts
const MenuProps = { id: "menu" };

function Menu() {
  return h.div()
    .attrs(MenuProps)
    .children(...);
}
```

## Array.prototype.map

Prefer simple `map` implementation over `Array.prototype.map` when rendering children lists.

### Bad

```ts
function Menu(menuItems: { title: string }) {
  return h.div()
    .children(menuItems.map((item) => menuItem(item)));
}
```

### Good

```ts
import { map } from "ivi";

function Menu(menuItems: { title: string }) {
  return h.div()
    .children(map(menuItems, (item) => menuItem(item)));
}
```
