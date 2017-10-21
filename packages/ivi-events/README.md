# Synthetic Events

`ivi-events` package provides synthetic events subsystem for the DOM. It can be used completely independently from the
Virtual DOM.

One of the main benefits of synthetic events is that it is possible create your own events like Drag and Drop
events, gestures etc. `ivi-events` API was designed with gestures in mind, so event handlers can be stateful and
it is possible to disambiguate between concurrent gestures.

Another useful feature is that it has less overhead than standard DOM api for attaching event listeners. And when it is
used in combination with Server-Side rendering, all event handler allocations will be completely removed by Dead Code
Elimination pass.

## Architecture

### Attaching and Detaching EventHandler objects

Event handlers are attached through special `EventHandler` objects, they contain information about the type of event and
some additional information, so when attaching event handler to the DOM node there is no need to specify what type it
has.

All Event handler objects are instantiated from special factories, they automatically assign all neccessary information
about the type of event. For example, to create "click" event, we can use
`onClick((ev) => { ev.preventDefault(); })` factory.

When `EventHandler` is attached to the DOM node, it will invoke `addListener(handler: EventHandler): void` callback
in the `EventSource` object that were assigned by event handler factory. And when it is detached, it will invoke
`removeListener(handler: EventHandler): void` callback.

### Dispatching SyntheticEvents objects

Synthetic events are dispatched by Event Sources, they keep track of registered event handlers and can use different
strategies for dispatching events.

For example, native event sources are using two-phase dispatching, that is almost exactly the same as native
[DOM events flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow).

`ivi-events` API is flexible enough, so that it is possible to implement different strategies for dispatching events:

- Simulating capture target behavior for mouse events, so it can behave in the same way as touch events.
- Use disambiguation algorithm when several gesture handlers are detected on the events path.
- Dispatch "click outside" events to event handlers that aren't on the current events path.

## API

### Synthetic Event

```ts
class SyntheticEvent {
  flags: SyntheticEventFlags;
  readonly timestamp: number;

  constructor(flags: SyntheticEventFlags, timestamp: number);

  stopPropagation();
  preventDefault();
}
```

`SyntheticEvent` is a base class for all synthetic events.

### Event Handler

```ts
interface EventHandler<E extends SyntheticEvent = SyntheticEvent, P = any, S = any> {
  /**
   * Event Handler function call interface.
   */
  (ev: E): void;
  /**
   * Event Source.
   */
  source: EventSource;
  /**
   * See `EventHandlerFlags` for details.
   */
  flags: EventHandlerFlags;
  /**
   * Number of active listeners.
   */
  listeners: number;
  /**
   * Event Handler props.
   */
  props: P;
  /**
   * Event Handler state.
   *
   * Internal state that can be used to store gesture recognizers state.
   */
  state: S | null;
}
```

### Event Source

```ts
interface EventSource {
  addListener(handler: EventHandler): void;
  removeListener(handler: EventHandler): void;
}
```