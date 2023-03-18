# [ivi](https://github.com/localvoid/ivi) Portals

**EXPERIMENTAL API**

## Example

```ts
import { component } from "ivi";
import { createRoot, updateRoot } from "ivi/root";
import { htm } from "ivi/template";
import { useState } from "ivi/state";
import { createPortal } from "@ivi/portal";

const [portalContainer, portal] = createPortal();

updateRoot(
  createRoot(document.getElementById("overlay")!),
  portalContainer,
);

const App = component((c) => {
  const [visible, setVisible] = useState(c, false);

  const onMouseEnter = () => { setVisible(true); };
  const onMouseLeave = () => { setVisible(false); };

  return () => (
    htm`
      div.App
        span
          @mouseenter=${onMouseEnter}
          @mouseleave=${onMouseLeave}
          'Portal Example'
        ${visible() ? portal(htm`span 'portal'`) : null}
    `
  );
});

updateRoot(
  createRoot(document.getElementById("root")!),
  App(),
);
```
