# Scheduler

## Microtasks and Macrotasks

Scheduler provides functions to add callbacks to different
[Browser Task Queues](https://html.spec.whatwg.org/multipage/webappapis.html#task-queue): microtasks and macrotasks.

```ts
function scheduleMicrotask(cb: () => void): void;
function scheduleMacrotask(cb: () => void): void;
```

## Frame tasks

Frame tasks are executed when
[requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) is fired. Frame
tasks are executed in batches, starting with updating components sorted by their depth in components tree, and then
switching between read and write tasks until there are no frame tasks left.

There are two functions to access frame tasks: one to get current frame tasks and another for the next frame tasks.

```ts
function currentFrame(): FrameTasksGroup;
function nextFrame(): FrameTasksGroup;
```

`FrameTasksGroup` object provides task queues for Components, read, write tasks, and tasks that will be executed when
all other tasks are finished:

```ts
currentFrame().updateComponent(c: Component<any>): void;
currentFrame().read(task: () => void): void;
currentFrame().write(task: () => void): void;
currentFrame().after(task: () => void): void;
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

    didUpdate() {
        this.mtime = clock();
    }

    render() {
        return $h("div").children(this.props.value);
    }
}
```
