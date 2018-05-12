# Performance Tips

## Interned Strings

Prefer [interned strings](https://en.wikipedia.org/wiki/String_interning) over creating new strings on each render.

#### Bad

```ts
const Button = statelessComponent((active: boolean) => {
  let className = "button";
  if (active) {
    className += " active";
  }
  return h.div(className);
});
```

#### Good

```ts
const Button = statelessComponent((active: boolean) => h.div(active ? "button active" : "button"));
```
