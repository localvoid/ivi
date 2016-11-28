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
4. Update components in lowest depth first order until all components are updated.
5. Check that `write` tasks queue is empty, otherwise go to step 3.
6. Check that `read` tasks queue is empty, otherwise go to step 2.
7. Execute `after` tasks until after task queue is empty.

There are two functions to access frame tasks: one to get current frame tasks group and another for the next frame tasks
group.

```ts
function currentFrame(): FrameTasksGroup;
function nextFrame(): FrameTasksGroup;
```

`FrameTasksGroup` object provides different task queues for components, read, write tasks, and tasks that will be
executed when all other tasks are finished:

```ts
interface FrameTasksGroup {
    updateComponent(c: Component<any>): void;
    read(task: () => void): void;
    write(task: () => void): void;
    after(task: () => void): void;
}
```

For example, when `render` function is invoked, it adds a write task to the next frame, and immediately triggers a
synchronous update with a `syncFrameUpdate` function.

```ts
function syncFrameUpdate(): void;
```

`renderNextFrame` function is used to batch many render invocations until animation frame is fired by a browser. It will
update DOM tree just once per animation frame using the most recent virtual dom tree.

## DOM Reader

`DOMReader` tasks executed on each frame, and they are always executed before any other tasks. One of the most common
use cases for DOM reader tasks is preserving scroll positions. It is usually solved in components lifecycle methods,
but solving it in lifecycle methods has a huge downside that it triggers a reflow during write DOM phase. With DOM
reader tasks we just registering it when component is attached to the document, and reading from DOM in the read DOM
phase, and when component is updated we just need to register `after` task that will update scroll position.

DOM reader tasks are registered with `registerDOMReader` function.

```ts
function addDOMReader(task: () => void): DOMReader;
```

Each `DOMReader` instance provides a `cancel` method that will unregister it.

```ts
interface DOMReader {
    cancel();
}
```

## Animations

There are several special task queues for animations. The biggest difference between animation tasks and other tasks is
that animation tasks won't be executed when window isn't visible.

### Animated Components

```ts
function startComponentAnimation(component: Component<any>): void;
function stopComponentAnimation(component: Component<any>): void;
```

When component is added to the animated component list with `startComponentAnimation` function, it will be updated on
each animation frame. When component is detached from the document it will be automatically removed from the animated
component list, so there is no need to call `stopComponentAnimation`.

### Animation Tasks

Animation tasks will be executed just once per each animation frame when all "read" and "write" tasks are finished, but
before "after" tasks.

```ts
function addAnimation(task: () => void): Animation;
```

Each `Animation` instance provides a `cancel` method that will remove it from the animation list.

```ts
interface Animation {
    cancel(): void;
}
```

## Monotonically increasing clock

Each time scheduler finishes executing tasks from one of the groups, it increments internal clock.

```ts
function clock(): number;
```

This clock can be used to detect when property has been changed since the last update.

```ts
class Data {
  value: number;
  mtime = clock();

  constructor(public value: number) { }

  setValue(newValue: number) {
    if (this.value !== newValue) {
      this.value = newValue;
      this.mtime = clock();
    }
  }
}

class StatefulComponent extends Component<Data> {
    mtime = clock();

    isPropsChanged(oldProps: Data, newProps: Data): boolean {
        return this.mtime < newProps.mtime;
    }

    updated() {
        this.mtime = clock();
    }

    render() {
        return $h("div").children(this.props.value);
    }
}
```
