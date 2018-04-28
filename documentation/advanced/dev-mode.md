# Development Mode

The biggest chunk of the code base is an implementation of different features and runtime checks for Development Mode.
All Development Mode features are carefully implemented to make sure that everything will be removed from
production build.

## Nesting Validation

Some HTML Elements have restrictions on which nodes can be nested, for example `<table>` element can only have
`<tbody>`, `<thead>`, etc as its children. Browsers are handling such cases in a way that they automatically inject
missing elements or close existing elements, to prevent such behaviour we will throw errors in Dev Mode when
HTML nesting rules are violated.

## Stack Trace Augmentation

When syncing algorithm is updating components tree, call stack doesn't have any information about components and
sometimes it is hard to debug when there is no information about components stack. Stack Trace Augmentation adds
additional information about current stack of components.

Here is how it will look like when exception is thrown.

```txt
Error message
    default stack trace...

Components stack trace:
  [C]BrokenComponent
  [F]StatelessComponentB
  [F]StatelessComponentA
  [C]Application
```

Symbol definitions:

- `[C]` - Stateful Component
- `[F]` - Stateless Component
- `[+]` - Connect
- `[^]` - Update Context

## Typo Checking

When typo checking is enabled, DOM attribute and styles will be checked for typos. So when you make a typo in attribute
name, like `autoFocus`, it will suggest you to replace it with `autofocus`.

All typos that can be covered with a static analysis in TypeScript won't be checked in runtime. If you don't want to
spend countless hours because of some small typos, consider switching to TypeScript.

## Unsupported Features Warnings

When unsupported features warnings is enabled, warnings will be printed to the console when you try to use some feature
that isn't properly supported by all major browsers.

Obviously we can't cover all features, but in some cases it will save you a huge amount of time when you are aware
about potential problems in other browsers.
