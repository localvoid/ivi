# Syncable Value

Syncable values are used to extend basic algorithm that synchronizes DOM attributes. Attribute synchronization
algorithm is quite simple, it compares values and assigns or removes attributes. But in some use cases it maybe
necessary to assign a property instead of attribute, and to solve this problem we can use syncable values.

```ts
export interface SyncableValue<P> {
  v: P | undefined;
  s: (element: Element, key: string, prev: P | undefined, next: P | undefined) => void;
}
```

#### Example

```ts
import { input, CHECKED } from "ivi-html";

const e = input("", { type: "checked", checked: CHECKED(true) });
```

In this example we are using special syncable value created with `CHECKED()` function that will assign a checked
property on the input element.

## Creating Custom Syncable Values

```ts
function syncCustomValue(element: Element, key: string, prev: number | undefined, next: number | undefined) {
  if (prev !== next) {
    (element as any)._custom = next;
  }
}
```

We will start by creating a synchronization function. Synchronization function has 4 arguments: `element` will contain a
DOM element, `key` is an attribute name that was used to assign this value, `prev` is a previous value and `next` is
the current value.

In this function we are just checking that the value is changed, and if it is changed, we are assigning it to the
`_custom` property.

```ts
export function CUSTOM_VALUE(v: number | undefined): SyncableValue<number> {
  return (v === undefined) ? SYNCABLE_VALUE_SKIP_UNDEFINED : { v, s: syncCustomValue };
}
```

Now we need to create a function that will be used to instantiate `SyncableValue` objects. In this function we are
using predefined `SYNCABLE_VALUE_SKIP_UNDEFINED` syncable value to ignore synchronization when the value is `undefined`,
otherwise we are creating a `SyncableValue` object with the value `v` and synchronization function `syncCustomValue`.

### Predefined Syncable Values

```ts
const SYNCABLE_VALUE_SKIP_UNDEFINED: SyncableValue<any>;
const SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED: SyncableValue<any>;
```

`SYNCABLE_VALUE_SKIP_UNDEFINED` has `undefined` value with `NOOP` synchronization function.

`SYNCABLE_VALUE_REMOVE_ATTR_UNDEFINED` has `undefined` value and it will remove `key` attribute from the DOM element.
