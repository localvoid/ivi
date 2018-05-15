ivi is a javascript (TypeScript) library for building web user interfaces.

## Features

- Declarative rendering with "Virtual DOM"
- Components (stateless functions and stateful ES6 classes)
- Connectors for sideways data loading
- Implicit data propagation with contexts
- Extensible synthetic event subsystem
- Synchronous and deterministic syncing algorithm
- Children reconciliation with minimum number of DOM operations
- Fast performance
- Test utilities

## Library Size

Size of the [basic example](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction)
bundled with [webpack](https://webpack.js.org/) and minified with [uglify](https://github.com/mishoo/UglifyJS2) is just
a **4.4Kb**.

It is possible to get size even lower with [Google Closure Compiler](https://github.com/google/closure-compiler). ivi
library has full support for compilation with Google Closure Compiler in `ADVANCED` mode.

## Performance

ivi is one of the fastest libraries in the [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html).

It is quite easy to get incredible results in this benchmark just by focusing on optimizations of low-level primitives.
But the primary goal of the ivi architecture is to reduce overhead of abstractions, and that is why it is still one of
the fastest implementations in this benchmark even when benchmark implementation is using stateful components and
connectors.

## Quick Start

The easiest way to get started with ivi is to use [this basic example code on CodePen](https://codepen.io/localvoid/pen/yjqrgj)
or [this one on CodeSandbox](https://codesandbox.io/s/qlypwvz6o6).

The smallest ivi example looks like this:

```js
import { render } from "ivi";
import * as h from "ivi-html";

render(
  h.h1().c("Hello World!"),
  document.getElementById("app"),
);
```

## Documentation

### General

- [Virtual DOM](https://github.com/localvoid/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/localvoid/ivi/blob/master/documentation/general/components.md)
- [Synthetic Events](https://github.com/localvoid/ivi/blob/master/documentation/general/synthetic-events.md)
- [Connectors](https://github.com/localvoid/ivi/blob/master/documentation/general/connect.md)
- [Context](https://github.com/localvoid/ivi/blob/master/documentation/general/context.md)

### Advanced

- [Scheduler](https://github.com/localvoid/ivi/blob/master/documentation/advanced/scheduler.md)
- [TypeScript Enums](https://github.com/localvoid/ivi/blob/master/documentation/advanced/typescript-enums.md)
- [Security](https://github.com/localvoid/ivi/blob/master/documentation/advanced/security.md)

### Misc

- [Performance Tips](https://github.com/localvoid/ivi/blob/master/documentation/misc/perf-tips.md)
- [Children Reconciliation](https://github.com/localvoid/ivi/blob/master/documentation/misc/children-reconciliation.md)

### Examples and demo applications

#### Boilerplate

- [Basic Boilerplate](https://github.com/localvoid/ivi-boilerplate/)

#### Basic

- [Introduction](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction/)
- [Stateful Component](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/02_stateful_component/)
- [Events](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/03_events/)
- [Forms](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/04_forms/)
- [Collapsable](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/05_collapsable/)

#### Apps

- [TodoMVC](https://github.com/localvoid/ivi-todomvc/)
- [Snake Game](https://github.com/localvoid/ivi-examples/tree/master/packages/apps/snake/)

#### Benchmarks

- [UIBench](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/uibench/)
- [DBMon](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/dbmon/)
- [10k Components](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/10k/)

## License

[MIT](http://opensource.org/licenses/MIT)
