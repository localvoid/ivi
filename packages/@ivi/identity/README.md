# [ivi](https://github.com/localvoid/ivi) Identity

Identity component is used to reset internal state.

## Example

```ts
import { component, useEffect } from "ivi";
import { createRoot, updateRoot } from "ivi/root";
import { htm } from "ivi/template";
import { useState } from "ivi/state";
import { Identity } from "@ivi/identity";

const Timer = component((c) => {
  const [time, setTime] = useState(c, 0);

  useEffect(c, () => {
    let t = setInterval(() => {
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
    htm`
      div.App
        button @click=${onClick} 'Next'
        ${Identity({ key: key(), children: Timer() })}
    `
  );
});

updateRoot(
  createRoot(document.body),
  App(),
);
```
