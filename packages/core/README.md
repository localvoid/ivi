# Core Package

`ivi-core` package provides reusable code for browser and server environments.

## Data Types

```ts
type Context<T = {}> = T;
```

Context.

## Constants

### Key Codes

```ts
const enum KeyCode {
    WinKeyFFLinux = 0,
    MacEnter = 3,
    Backspace = 8,
    Tab = 9,
    Clear = 12,
    ...
}
```

KeyboardEvent `keyCode` values.

### Key Location

```ts
const enum KeyLocation {
    Standard = 0,
    Left = 1,
    Right = 2,
    NumPad = 3,
    Mobile = 4,
    Joystick = 5,
}
```

KeyboardEvent `keyLocation` values.

### Mouse Buttons

```ts
const enum MouseButtons {
    Left = 1,
    Right = 1 << 1,
    Middle = 1 << 2,
    Fourh = 1 << 3,
    Fifth = 1 << 4,
}
```

MouseEvent `buttons` flags.

## Data Structures

### Arrays

```ts
function unorderedArrayDelete<T>(array: T[], index: number): void;
```

`unorderedArrayDelete()` deletes element from an array with O(1) complexity.

### Repeatable Task List

```ts
interface RepeatableTaskList {
    readonly tasks: Array<() => boolean | undefined>;
}
```

`RepeatableTaskList` is a data structure for tasks that will be repeated until they return `true` value.


```ts
interface RepeatableTaskList {
    add(task: () => boolean | undefined): void;
}
```

Add function to the task list.

```ts
interface RepeatableTaskList {
    run(): void;
}
```

Run tasks.