# Roadmap

## External Scheduler

Break dependency with `ivi-scheduler`.

Many simple use cases can work perfectly without complicated scheduling, so instead of depending on a scheduler, we
should introduce some API to setup scheduler.

```ts
setupScheduler(
  () => { dirtyCheck() }, // update handler
  () => { dirtyCheck() }, // Component invalidation handler
);

render(div(), CONTAINER); // should invalidate `CONTAINER` root node and invoke update handler
```

It will bring code size even lower, perfect solution for embeddable widgets.

## Graceful App Crashing

When application is crashed, internal state should be frozen and all events should be disabled.

Almost all entry points already have `catchError()` wrappers. It just need some nice API to integrate with external
state management solutions.

## ivi-gestures

**EXPERIMENTAL** implementation is finished, core functionality is working.

There are still missing functionality and it requires refactoring to reduce code size.
