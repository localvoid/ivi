# Scheduler

`isi-scheduler` is an optional dependency that provides useful utilities to work with an event loop.

## Setting Up Scheduler

```ts
import { setupScheduler } from "ivi";
import { invalidateHandlerNextFrame } from "ivi-scheduler";

setupScheduler(invalidateHandlerNextFrame);
```

By default, `ivi` is using a simple invalidate handler that synchronously performs a dirty checking when `invalidate()`
function is invoked. `ivi-scheduler` has a much more advanced invalidate handler that uses frame tasks groups to execute
different tasks.

## Microtasks and Tasks

Scheduler provides functions to add callbacks to different
[Browser Task Queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue): microtasks and tasks.

```ts
function scheduleMicrotask(cb: () => void): void;
function scheduleTask(cb: () => void): void;
```

## Frame Tasks Group

All DOM related tasks are executed in frame tasks group. Tasks are executed in batches, algorithm for executing tasks
is looking like this:

1. Execute `beforeUpdate` tasks once per frame.
2. Execute `read` tasks until read task queue is empty.
3. Execute `write` tasks until write task queue is empty.
4. Run dirty checking.
5. Check that `write` tasks queue is empty, otherwise go to step 3.
6. Check that `read` tasks queue is empty, otherwise go to step 2.
7. Execute `afterUpdate` tasks once per frame.

There are three functions to add tasks into different task queues in the current frame:

```ts
function currentFrameRead(task: () => void): void;
function currentFrameWrite(task: () => void): void;
```

And three functions for the next frame:

```ts
function nextFrameRead(task: () => void): void;
function nextFrameWrite(task: () => void): void;
```

## beforeUpdate / afterUpdate

`beforeUpdate` tasks are executed on each frame before any other tasks. One of the most common use cases for
`beforeUpdate` tasks is preserving scroll positions. It is usually solved in components lifecycle methods, but solving
it in lifecycle methods has a huge downside that it triggers a reflow during write DOM phase. With DOM reader tasks we
just registering it when component is attached to the document, and reading from DOM in the read DOM phase, and when
component is updated we just need to register `after` task that will update scroll position.

```ts
function beforeUpdate(task: () => boolean | undefined): void;
function afterUpdate(task: () => boolean | undefined): void;
```

When `task` returns a `false` value, it will be automatically canceled.
