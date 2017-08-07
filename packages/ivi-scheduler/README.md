# Scheduler

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

1. Execute `DOMReader` tasks once per frame.
2. Execute `read` tasks until read task queue is empty.
3. Execute `write` tasks until write task queue is empty.
4. Update dirty components.
5. Check that `write` tasks queue is empty, otherwise go to step 3.
6. Check that `read` tasks queue is empty, otherwise go to step 2.
7. Execute `after` tasks until after task queue is empty.

There are three functions to add tasks into different task queues in the current frame:

```ts
function currentFrameRead(task: () => void): void;
function currentFrameWrite(task: () => void): void;
function currentFrameAfter(task: () => void): void;
```

And three functions for the next frame:

```ts
function nextFrameRead(task: () => void): void;
function nextFrameWrite(task: () => void): void;
function nextFrameAfter(task: () => void): void;
```

## DOM Reader

`DOMReader` tasks executed on each frame, and they are always executed before any other tasks. One of the most common
use cases for DOM reader tasks is preserving scroll positions. It is usually solved in components lifecycle methods,
but solving it in lifecycle methods has a huge downside that it triggers a reflow during write DOM phase. With DOM
reader tasks we just registering it when component is attached to the document, and reading from DOM in the read DOM
phase, and when component is updated we just need to register `after` task that will update scroll position.

DOM reader tasks are registered with `addDOMReader` function.

```ts
function addDOMReader(reader: () => boolean): void;
```

`reader` return value indicates when reader should be canceled.

## Animations

### Animation Tasks

Animation tasks will be executed just once per each animation frame when all "read" and "write" tasks are finished, but
before "after" tasks.

```ts
function addAnimation(animation: () => boolean) void;
```

`animation` return value indicates when animation should be canceled.
