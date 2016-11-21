# Development Mode

The biggest chunk of the code base is an implementation of different features and runtime checks for Development Mode.
All Development Mode features are carefully implemented to make sure that everything will be removed from
production build.

## Configuration

### Flags

There is a set of different flags that are used to configure Development Mode. `setDevModeFlags` function is used to
assign this flags.

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

### Query Parameters

Development Mode is also configurable via query parameters. For example, `http://example.com?_perf=true` will
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

Some HTML Elements have restrictions on which nodes can be nested, for example `<table>` element can only have
`<tbody>`, `<thead>`, etc as its children. Browsers are handling such cases in a way that they automatically inject
missing elements or close existing elements, to prevent such behaviour we will throw errors in Dev Mode when
HTML nesting rules are violated.

## Stack Trace Augmentation

When syncing algorithm is updating components tree, call stack doesn't have any information about components and
sometimes it is hard to debug when there is no information about components stack. Stack Trace Augmentation adds
additional information about current stack of components.

Here is how it will look like when exception is thrown.

```
Error message
    default stack trace...

Components stack trace:
    [C]BrokenComponent #2
    [F]FunctionalComponentB
    [F]FunctionalComponentA
 => [C]Application #1
```

`=>` symbol indicates an entry point. Entry point is where synchronization process is started, most of the time it will
be a root component.

`[C]` and `[F]` symbols are showing a type of components, F is a functional component and C is an ES6 class component.

`#1` shows a unique id for component instance. When Development Mode is enabled, it is easy to find component
instances by their unique ids with a simple function from the console `ivi.$(id)`.

## Screen Of Death

Screen of Death will be displayed when unhandled exception is thrown. It shows an error message and the current stack
trace for an exception.

By default, Screen of Death will be displayed for all unhandled exceptions. `DisableScreenOfDeathGlobalErrorHandling`
flag disables global error handler. When this flag is enabled, Screen of Death will be displayed only when exception is
thrown inside the boundaries of a syncing algorithm.

## Component Performance Profiling

Component performance profiling will add marks on the dev tools so that you can easily see entire stack of components,
instead of just names of internal functions.

When component performance profiling is enabled, syncing algorithm will work significantly slower, but it is still
very useful because you can look at a relative performance of your components.

## Global API

In Development Mode, parts of the ivi API will be available globally. By default, Dev Mode API is available in global
variable `ivi`.

### Find Component by Debug ID

When stack augmentation is enabled and exception is thrown, stack trace will contain debug ids for all component
instances in the current components stack.

There are two functions that can find component instance by their unique debug id:

```ts
findComponentByDebugId(debugId: number): Component<any>;
$(debugId: any): Component<any>;
```

`$` is a shortcut for `findComponentByDebugId` that also automatically converts all objects to numbers.

### Changing global variable

Global variable can be dynamically changed via query parameter `_export=<name>`.

```
http://127.0.0.1/?_export=devMode
```
