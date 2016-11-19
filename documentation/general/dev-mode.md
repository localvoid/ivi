# Development Mode

To improve developer experience, ivi provides many different features and runtime checks that will be enabled when
Development Mode is active.

The biggest chunk of the code base is implementing different features and runtime checks for Development Mode. When
application is build for production, all this code will be removed and generated javascript bundle will be relatively
small.

## Flags

Flags are used to control Development Mode behaviour. By default, Development Mode flags will have `0` value.
`setDevModeFlags` function is used to assign flags.

```ts
const enum DevModeFlags {
    DisableNestingValidation = 1,
    DisableStackTraceAugmentation = 1 << 1,
    DisableScreenOfDeath = 1 << 2,
    DisableScreenOfDeathGlobalErrorHandling = 1 << 3,
    EnableComponentPerformanceProfiling = 1 << 4,
}

function setDevModeFlags(flags: DevModeFlags): void;
```

Development Mode Flags are also configurable via query parameters. For example, `http://example.com?_perf=true` will
enable component performance profiling.

Full list of query parameters:

```
_nv=false  Disable Nesting Validation.
_st=false  Disable Stack Trace Augmentation.
_sod=false Disable Screen of Death.
_geh=false Disable Screen of Death Global Event Handler.
_perf=true Enable Component Performance Profiling.
```

## Nesting Validation

Some HTML Elements have restrictions on which nodes can be nested, for example `<table>` Element can only have
`<tbody>`, `<thead>`, etc as its children. Browsers are handling such cases in a way that they automatically inject
missing elements or close existing elements, to prevent such behaviour we are just throwing errors in Dev Mode when
HTML nesting rules are violated.

## Stack Trace Augmentation

When syncing algorithm is updating components tree, call stack doesn't have any information about components and
sometimes it is hard to debug when there is no information about components stack. Stack Trace Augmentation adds
additional information about current components stack to stack traces.

## Screen Of Death

Screen of Death will be displayed when unhandled exception is thrown while ivi is running. It shows an error message and
the current stack trace for an exception.

By default, Screen of Death will be displayed for all unhandled exceptions. `DisableScreenOfDeathGlobalErrorHandling`
flag disables global error handler. when this flag is enabled, Screen of Death will be displayed only when exception is
thrown inside an ivi boundaries.

## Component Performance Profiling

Component performance profiling will add marks on the dev tools timeline. They can help you get additional information
about components performance.
