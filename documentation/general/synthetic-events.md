# Synthetic Events

Synthetic events subsystem is using its own two-phase event dispatching algorithm.

Its own event subsystem has the cost of slightly larger javascript code size, but it immediately pays off when user
visits the page, because it significantly improves rendering performance.

## Event Handler

Event Handler is an object that contains information about `EventDispatcher` that will be used for an event handler
and function that will be executed when dispatcher fires an event for a target that registered an event handler.

`ivi-events` module provides a collection of event handler factories for all native events. Event handler function
factories are using camel case for their names, and all names are starting with "on" prefix.

```ts
import * as Events from "ivi-events";

const click = Events.onClick((ev) => {
  console.log("clicked");
});

const keyDown = Events.onKeyDown((ev) => {
  console.log("Key Down");
});
```

### Event Handler registration

Event Handlers are declaratively registered with a Virtual DOM API. Virtual DOM nodes that represent HTML and SVG
elements can have an `EventHandlerList` assigned with `events` method.

`EventHandlerList` is an array of `EventHandler` objects that describe which events should be attached to the DOM node
at this point in time.

There are no restrictions in number of attached event handlers with the same type, it is possible to attach multiple
`onClick` event handlers.

```ts
interface VNode {
  events(events: EventHandlerList | EventHandler | null): VNode<P>;
  // ...
}
```

```ts
import { Component, componentFactory, render } from "ivi";
import * as Events from "ivi-events";
import * as h from "ivi-html";

const StatefulComponent = componentFactory(class extends Component {
  private counter = 0;

  private onClick = Events.onClick((ev) => {
    this.counter++;
    this.invalidate();
  });

  render() {
    return h.div()
      .e([
        this.onClick,
        this.onClick,
      ])
      .c(`Clicks: ${this.counter}`);
  }
});
```
