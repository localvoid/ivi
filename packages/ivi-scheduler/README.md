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

1. Execute `beforeUpdate` tasks once per frame.
2. Execute `read` tasks until read task queue is empty.
3. Execute `write` tasks until write task queue is empty.
4. Perform dirty checking
5. Check that `write` tasks queue is empty, otherwise go to step 3.
6. Check that `read` tasks queue is empty, otherwise go to step 2.
7. Execute `afterUpdate` tasks once per frame.

There are two functions to add tasks into different task queues for the current frame:

```ts
function currentFrameRead(task: () => void): void;
function currentFrameWrite(task: () => void): void;
```

And two functions for the next frame:

```ts
function nextFrameRead(task: () => void): void;
function nextFrameWrite(task: () => void): void;
```
