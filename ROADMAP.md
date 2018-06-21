# Roadmap

## Graceful App Crashing

When application is crashed, internal state should be frozen and all events should be disabled.

Almost all entry points already have `catchError()` wrappers. It just need some nice API to integrate with external
state management solutions.

## ivi-gestures

**EXPERIMENTAL** implementation is finished, core functionality is working.

There are still missing functionality and it requires refactoring to reduce code size.
