# TypeScript Enums

ivi provides a different constant enums to make code much more readable when working with DOM events.

## KeyboardEvent keyCode

```ts
const enum KeyCode {
    WinKeyFFLinux = 0,
    MacEnter = 3,
    Backspace = 8,
    Tab = 9,
    // long list of key codes ...
}
```

## KeyboardEvent location

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

## MouseEvent buttons

```ts
const enum MouseButtons {
    Left = 1,
    Right = 1 << 1,
    Middle = 1 << 2,
    Fourh = 1 << 3,
    Fifth = 1 << 4,
}
```