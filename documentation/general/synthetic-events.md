# Synthetic Events

Synthetic events subsystem is using its own two-phase event dispatching algorithm. With custom event dispatching
algorithm it is possible to create new events like "click outside", gestures and DnD events.

## Event Handler

Event Handler is an object that contains information about `EventDispatcher` that is used for dispatching events
and a handler function that will be executed when dispatcher fires an event.

`ivi` package provides event handler factories for all native events.

```ts
import { onClick, onKeyDown } from "ivi-events";

const click = onClick((ev) => {
  console.log("clicked");
});

const keyDown = onKeyDown((ev) => {
  console.log("Key Down");
});
```

### Event Handler registration

Event handlers are declaratively attached to virtual DOM nodes with a method `e()`. Event handlers can be attached
to all nodes except text nodes.

```ts
interface VNode {
  e(events: Array<EventHandler | null> | EventHandler | null): this;
  // ...
}
```

```ts
import { Component, component, render, onClick } from "ivi";
import { div } from "ivi-html";

const StatefulComponent = component(class extends Component {
  private counter1 = 0;
  private counter2 = 0;

  // There are no restrictions in number of attached event handlers with the same type, it is possible to attach
  // multiple `onClick` event handlers.
  private events = [
    onClick((ev) => {
      this.counter1++;
      this.invalidate();
    }),
    onClick((ev) => {
      this.counter2++;
      this.invalidate();
    }),
  ]);

  render() {
    return div()
      .e(this.events)
      .c(`Clicks: [${this.counter1}] [${this.counter2}]`);
  }
});

render(
  StatefulComponent()
    .e(onClick(() => { console.log("event handler attached to component"); })),
  document.getElementById("app"),
);
```
