# Synthetic Events

One of the main benefits of synthetic events is that it is possible create your own events like Drag and Drop
events, gestures etc. Synthetic events API was designed with gestures in mind, so event handlers can be stateful and
it is possible to disambiguate between concurrent gestures.

Another useful feature is that it has less overhead than standard DOM api for attaching event listeners.

## Architecture

### Attaching and Detaching EventHandler objects

Event handlers are attached through special `EventHandler` objects, they contain information about the type of an event
and some additional information, so when attaching event handler there is no need to specify what type it has, all
information is automatically populated by a event handler factory functions.

### Dispatching SyntheticEvents objects

Synthetic events are dispatched by event dispatcher,  they keep track of registered event handlers and can use different
strategies for dispatching events.

For example, native event dispatcher are using two-phase dispatching, that is almost exactly the same as native
[DOM events flow](https://www.w3.org/TR/DOM-Level-3-Events/#event-flow). The major difference is that it will traverse
through a virtual DOM tree, and will be able to dispatch events not just to DOM nodes, but also to components.

Synthetic events API is flexible, so that it is possible to implement different strategies for dispatching events:

- Simulating capture target behavior for mouse events, so it can behave in the same way as touch events.
- Use disambiguation algorithm when several gesture handlers are detected on the events path.
- Dispatch "click outside" events to event handlers that aren't on the current events path.

## API

### Synthetic Event

```ts
class SyntheticEvent {
  constructor(
    public flags: SyntheticEventFlags,
    public readonly timestamp: number,
  );
}
```

`SyntheticEvent` is a base class for all synthetic events.

### Event Handler

```ts
interface EventHandler<E extends SyntheticEvent = SyntheticEvent, P = any, S = any> {
  /**
   * Reference to the event source that will dispatch events for this event handler.
   */
  src: EventDispatcher;
  /**
   * See {@link EventHandlerFlags} for details.
   */
  flags: EventHandlerFlags;
  /**
   * Event Handler function.
   */
  handler(ev: E): EventFlags | void;
  /**
   * Number of active listeners.
   */
  listeners: number;
  /**
   * Event Handler props.
   *
   * Gestures are using it to store factory function that instantiates gesture recognizer.
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

### Event Dispatcher

```ts
interface EventDispatcher {
  add(handler: EventHandler): void;
  remove(handler: EventHandler): void;
}
```
