## Upcoming Release

### `shouldUpdate`

All `shouldUpdate` functions are replaced with their inverse function `areEqual`.

APIs affected by this change:

- `component(_, shouldUpdate)`
- `statelessComponent(_, shouldUpdate)`
- `useSelect(_, shouldUpdate)`
- `useEffect(_, shouldUpdate)`
- `useLayoutEffect(_, shouldUpdate)`
- `useMutationEffect(_, shouldUpdate)`
- `memo(_, shouldUpdate)`
- `selector(_, shouldUpdate)`

### Tests

New package `ivi-jest` adds a collection of useful tools for testing with jest library. All ivi tests were completely
rewritten using a new `ivi-jest` library.

### Scheduler

`ivi-scheduler` and `ivi-test-scheduler` packages were removed. Old unit tests were using package aliasing to mock
scheduler behavior and now it is not needed anymore.

### Events

Removed optional bubbling, all events are now always bubble.

### Bug Fixes

- Fast path for `TrackByKey` hasn't been executed correctly when nodes doesn't change their positions. It is hard to
test because it is still works correctly even when this fast path doesn't execute.
- Prevent `VALUE()` and `CONTENT()` attribute directives from accepting numbers, they should work only with string
values.
- `shouldUpdate` functions hasn't been executed correctly in component hooks and caused more updates than it was
necessary.

## v0.23.0

### Synthetic Events

Synthetic event internals were heavily redesigned to reduce overall complexity and improve API flexibility for custom
synthetic events.

Custom synthetic events can now inject their own behavior into event flow of native events. It should significantly
improve performance when there are many custom synthetic events as it won't be necessary to traverse virtual dom to
collect dispatch targets for each custom synthetic event.

API for creating custom synthetic events is still an unstable API and it is most likely that there will be changes in
the future, but it is an extremely useful API that solves alot of problems with UI applications.

#### Native events are no longer wrapped in a `SyntheticNativeEvent` object

BEFORE

```js
onClick((ev) => {
  console.log(ev.native.target); // target
});
```

AFTER:

```js
onClick((ev) => {
  console.log(ev.target);
});
```

#### `EventFlags` is removed

To stop event propagation event handler should return `true` value.

BEFORE:

```js
onClick((ev) => {
  return EventFlags.PreventDefault | EventFlags.StopPropagation;
});
```

AFTER:

```js
onClick((ev) => {
  ev.preventDefault();
  return true;
});
```

#### `currentTarget` is now accessible as a second argument

BEFORE

```js
onClick((ev) => {
  console.log(ev.node); // currentTarget
});
```

AFTER:

```js
onClick((ev, currentTarget) => {
  console.log(currentTarget);
});
```

#### `SyntheticEvent` interface is removed

`SyntheticEvent` interface had two properties: `node` and `timestamp`. `node` were used to assign current target, it is
replaced with an additional argument in all event handler functions. `timestamp` is a leftover from an old synthetic
events implementation that tried to fix cross-browser quirks. For many custom synthetic events this property doesn't
have any value and it custom event implementor should decide when `timestamp` value is necessary.

#### `beforeNativeEvent()` and `afterNativeEvent()` are removed

It is replaced with an `addNativeEventMiddleware()`.

```js
addNativeEventMiddleware(MOUSE_DOWN, (event, next) => {
  // beforeNativeEvent...
  next(event);
  // afterNativeEvent...
});
```

### Portals

Portals were completely redesigned and moved to `ivi-portal` package. Portals now correctly propagate context through
portal entries.

```js
import { _, render, component, invalidate, Events, onClick, } from "ivi";
import { div, button } from "ivi-html";
import { portal } from "ivi-portal";

const MODAL = portal();

const App = component((c) => {
  let showModal = false;
  const showEvent = onClick(() => { showModal = true; invalidate(c); });

  return () => (
    [
      showModal ? MODAL.entry(div("modal", _, "This is being rendered inside the #modal-root div.")) : null,
      Events(showEvent,
        button(_, _, "Show modal"),
      ),
    ]
  );
});

render(App(), document.getElementById("app"));
render(MODAL.root, document.getElementById("modal-root"));
```

### Error Handling

Unhandled exceptions raised inside of a `catchError()` block are now considered as userspace bugs and will change
application state to "error". When application state is "error", all entry points wrapped in `catchError()` will be
blocked to prevent potential security issues because it is impossible to infer which part of an application state
caused a bug.

All ivi entry points like `render()`, synthetic event handlers, etc are wrapped with a `catchError()` block.

#### Creating custom functions wrapped with a `catchError()`

```js
const entryFn = catchError((arg1, arg2) => {
  // ...
});

entryFn(arg1, arg2);
```

### Reconciler

- Fixed bug when direct child node of a `Context()` node triggers replace operation.
- Fixed bug when strictly equal direct child node of an HTML/SVG element doesn't trigger deep dirty checking.
- Fixed bug when `useUnmount()` hook hasn't been receiving an undocumented `true` value as a first argument. It is an
unstable feature that can be used for micro optimizations in custom hooks.
- Added shortcuts for DOM property accesors that should reduce megamorphic call-sites.

### Misc

- Replaced `containsRelatedTarget()` with a generic function `containsDOMElement()`.
- Added `hasDOMElementChild()` function.
- Removed autofix for [Mouse Event bubbling in iOS](https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html)
- Added `VisitNodesDirective` to get a better control over `visitNodes()` algorithm.
- Added `onTransitionRun()` and `onTransitionStart()` events.

## v0.22.0

### Synthetic Events

Added support for native events:

- `onBeforeInput()`
- `onTransitionCancel()`
- `onTransitionEnd()`

## Global Variables replaced with Environment Variables

`__IVI_DEBUG__` and `__IVI_TARGET__` were replaced with `process.env.NODE_ENV !== "production"` and
`process.env.IVI_TARGET` to support parcel bundler [Issue #10](https://github.com/localvoid/ivi/issues/10).

## v0.21.0

- Full support for server-side rendering `renderToString()`
- Reduced code size

### Global Variables

`DEBUG` and `TARGET` were renamed to `__IVI_DEBUG__` and `__IVI_TARGET__` to prevent name conflicts with variables that
can be used in different packages.

### `useSelect()`

Context argument is removed from selectors, `context()` function should be used to access current context.

```ts
function useSelect<T>(
  c: StateNode,
  selector: (props?: undefined, prev?: T | undefined) => T,
): () => T;
function useSelect<T, P>(
  c: StateNode,
  selector: (props: P, prev?: T | undefined) => T,
  shouldUpdate?: undefined extends P ? undefined : (prev: P, next: P) => boolean,
): undefined extends P ? () => T : (props: P) => T;
```

### Attribute Directives

Attribute directives were changed to support server-side rendering:

```ts
interface AttributeDirective<P> {
  v: P;
  u?: (element: Element, key: string, prev: P | undefined, next: P | undefined) => void;
  s?: (key: string, next: P) => void;
}
```

`s()` method can be used to alter `renderToString()` behavior.

#### `VALUE()` directive

`VALUE()` directive now works only with `HTMLInputElement` elements. New `CONTENT()` directive should be used to assign
value for `HTMLTextArea` elements.

`VALUE()` directive emits `value="${v}"` attribute when rendered to string.

`CONTENT()` directive emits children string `<textarea>${v}</textarea>` when rendered to string.
