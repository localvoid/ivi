# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi) [![CircleCI Status](https://circleci.com/gh/localvoid/ivi.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/localvoid/ivi) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

|Package      |NPM version                                                                                                  |
|-------------|-------------------------------------------------------------------------------------------------------------|
|ivi          |[![npm version](https://img.shields.io/npm/v/ivi.svg)](https://www.npmjs.com/package/ivi)                    |
|ivi-core     |[![npm version](https://img.shields.io/npm/v/ivi-core.svg)](https://www.npmjs.com/package/ivi-core)          |
|ivi-scheduler|[![npm version](https://img.shields.io/npm/v/ivi-scheduler.svg)](https://www.npmjs.com/package/ivi-scheduler)|
|ivi-events   |[![npm version](https://img.shields.io/npm/v/ivi-events.svg)](https://www.npmjs.com/package/ivi-events)      |
|ivi-html     |[![npm version](https://img.shields.io/npm/v/ivi-html.svg)](https://www.npmjs.com/package/ivi-html)          |
|ivi-svg      |[![npm version](https://img.shields.io/npm/v/ivi-svg.svg)](https://www.npmjs.com/package/ivi-svg)            |

## Features

- Declarative rendering with ["Virtual DOM"](https://github.com/localvoid/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/localvoid/ivi/blob/master/documentation/general/components.md) (stateless functions and stateful ES2015 classes)
- [Connectors](https://github.com/localvoid/ivi/blob/master/documentation/general/connect.md) for sideways data loading
- Implicit data propagation with [contexts](https://github.com/localvoid/ivi/blob/master/documentation/general/context.md)
- Extensible [synthetic event subsystem](https://github.com/localvoid/ivi/blob/master/documentation/general/synthetic-events.md)
- Synchronous and deterministic syncing algorithm
- Children reconciliation with [minimum number of DOM operations](https://github.com/localvoid/ivi/blob/master/documentation/misc/children-reconciliation.md)
- Fast performance
- Test utilities

## Library Size

Size of the [basic example](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction)
bundled with [webpack](https://webpack.js.org/) and minified with [uglify](https://github.com/mishoo/UglifyJS2) is just
a **4KB** (minified+compressed).

Also, ivi library has full support for compilation with [Google Closure Compiler](https://github.com/google/closure-compiler)
in `ADVANCED` mode. Basic example compiled with Google Closure Compiler is **3.6KB** (minified+compressed).

## Performance

ivi is one of the fastest libraries in the [js-framework-benchmark](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html).

It is quite easy to get good results in this benchmark by focusing on optimizations of low-level primitives.
But the primary goal of the ivi architecture is to reduce overhead of abstractions, and that is why it is still one of
the fastest implementations in this benchmark even when benchmark implementation for ivi library is using stateful components and
connectors.

## Quick Start

The easiest way to get started with ivi is to use [this basic example code on CodePen](https://codepen.io/localvoid/pen/yjqrgj)
or [this one on CodeSandbox](https://codesandbox.io/s/qlypwvz6o6).

The smallest ivi example looks like this:

```js
import { render } from "ivi";
import { h1 } from "ivi-html";

render(
  h1().c("Hello World!"),
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
- [ndx search demo](https://github.com/localvoid/ndx-demo/)
- [Snake Game](https://github.com/localvoid/ivi-examples/tree/master/packages/apps/snake/)

#### Benchmarks

- [UIBench](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/uibench/)
- [DBMon](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/dbmon/)
- [10k Components](https://github.com/localvoid/ivi-examples/tree/master/packages/benchmarks/10k/)

## License

[MIT](http://opensource.org/licenses/MIT)
