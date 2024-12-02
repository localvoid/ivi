# [ivi](https://github.com/localvoid/ivi) Identity

Identity component is used to reset internal state.

## Example

```ts
import { createRoot, update, component, useState, useEffect, html } from "ivi";
import { Identity } from "@ivi/identity";

const Timer = component((c) => {
  const [time, setTime] = useState(c, 0);

  useEffect(c, () => {
    const t = setInterval(() => {
      setTime(time() + 100);
    }, 100);
    return () => { clearInterval(t); };
  })();

  return () => time();
});

const App = component((c) => {
  const [key, setKey] = useState(c, 0);

  const onClick = () => { setKey(key() + 1); };

  return () => (
    html`
    <div class="App">
      <button @click=${onClick}>Next</button>
      ${Identity({ key: key(), children: Timer() })}
    </div>
    `
  );
});

update(
  createRoot(document.body),
  App(),
);
```
