`ivi-jest` provides a collection of useful tools for testing with [Jest](https://jestjs.io/).

## Motivation

Jest resets global state for every test module, but all tests in a test module share the same global state. This package
provides a set of tools to make it easier to write isolated unit tests.

## API

### DOM

`useResetDOMGlobalEventListeners()` tracks event handlers for a window and document objects and removes them after
each test.

`useResetDOM()` enables following resets:

- `useResetDOMGlobalEventListeners()`

`useDOMElement()` creates a DOM element and optionally mounts it to the document body.

`useRequestAnimationFrame()` mocks `requestAnimationFrame()` and `cancelAnimationFrame()`.

### Modules

`useResetModules()` resets modules before each test.

`useModule()` imports module before each test.

### Mock

`useMockFn()` creates a mock function and resets it after each test.

`useSpyOn()` creates a spy object and resets it after each test.

### Environment

`useEnv()` overrides `process.env` before each tests and restores to the original value after each test.

### Promise

`usePromiseQueue()` adds support for waiting until promise tasks are executed.

### Timers

`useTimers()` mocks timers.

### Computed Value

`useComputedValue()` creates a value that will be recomputed before each test.
