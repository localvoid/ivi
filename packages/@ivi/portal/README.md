# [ivi](https://github.com/localvoid/ivi) Portals

**EXPERIMENTAL API**

## Example

```ts
import { createRoot, update, component, useState, html } from "ivi";
import { createPortal } from "@ivi/portal";

const [portalContainer, portal] = createPortal();

update(
  createRoot(document.getElementById("overlay")!),
  portalContainer,
);

const App = component((c) => {
  const [visible, setVisible] = useState(c, false);

  const onMouseEnter = () => { setVisible(true); };
  const onMouseLeave = () => { setVisible(false); };

  return () => (
    html`
    <div class="App">
      <span
        @mouseenter=${onMouseEnter}
        @mouseleave=${onMouseLeave}
      >
        Portal Example
      </span>
      ${visible() && portal(html`<span>rendered inside of a portal</span>`)}
    </div>
    `
  );
});

update(
  createRoot(document.getElementById("root")!),
  App(),
);
```
