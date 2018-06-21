# Roadmap

## Decide What To Do With Element Factory Names

Right now there are some issues with element factory names:

- `i()` is conflicting with a common variable name `i`
- `map()` is conflicting with `map()` function that creates vnode collection
- `svgSwitch()` should be a `switch()` but `switch` is a reserved word

### Possible Solutions

#### CamelCase

`div()` => `Div()`.

It is the same naming convention that is used for components, so it can conflict with common component names like
`Button()` and `Link()`.

#### UPPERCASE

`div()` => `DIV()`.

#### i => italic

- `i()` => `italic()`
- `b()` => `bold()`

## Graceful App Crashing

When application is crashed, internal state should be frozen and all events should be disabled.

Almost all entry points already have `catchError()` wrappers. It just need some nice API to integrate with external
state management solutions.

## ivi-gestures

**EXPERIMENTAL** implementation is finished, core functionality is working.

There are still missing functionality and it requires refactoring to reduce code size.
