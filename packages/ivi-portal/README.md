# ivi-portal

```ts
export interface Portal {
  readonly root: Op;
  readonly entry: (children: Op) => Op;
}
function portal(rootDecorator?: (children: Op) => Op): Portal;
```

`portal()` function creates a `Portal` instance that has a `root` node and an `entry()` function. `root` node is used to
render a portal root and `entry()` function renders elements inside of a portal.

`rootDecorator` argument can be used to provide a decorator for a root node, by default it is a simple identity function
`(v) => v`.

## Example

```ts
import { _, render, component, invalidate, Events, onClick, } from "ivi";
import { div, button } from "ivi-html";
import { portal } from "ivi-portal";

const MODAL = portal();

const App = component((c) => {
  let showModal = false;
  const showEvent = onClick(() => { showModal = true; invalidate(c); });

  return () => ([
    showModal ? MODAL.entry(div("modal", _, "This is being rendered inside the #modal-root div.")) : null,
    Events(showEvent, button(_, _, "Show modal")),
  ]);
});

render(App(), document.getElementById("app"));
render(MODAL.root, document.getElementById("modal-root"));
```
