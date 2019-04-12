# ivi-portal

```ts
import { _, render, component, invalidate, Events, onClick, } from "ivi";
import { div, button } from "ivi-html";
import { portal } from "ivi-portal";

const MODAL = portal();

const App = component((c) => {
  let showModal = false;
  const showEvent = onClick(() => { showModal = true; invalidate(c); });
  const hideEvent = onClick(() => { showModal = false; invalidate(c); });

  return () => (
    [
      showModal ?
        MODAL.entry(
          div("modal", _, [
            div(_, _,
              "With a portal we can render content into a different part of the DOM, as if it were any other child.",
            ),
            "This is being rendered inside the #modal-root div.",
            Events(hideEvent,
              button(_, _, "Hide modal"),
            ),
          ]),
        ) :
        null,
      "This div has overflow: hidden.",
      Events(showEvent,
        button(_, _, "Show modal"),
      ),
    ]
  );
});

render(App(), document.getElementById("app")!);
render(MODAL.root, document.getElementById("modal-root")!);
```
