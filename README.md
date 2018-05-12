# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/ivi.svg)](https://www.npmjs.com/package/ivi) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi) [![CircleCI Status](https://circleci.com/gh/localvoid/ivi.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/localvoid/ivi) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

## Features

- Declarative rendering with "Virtual DOM"
- Components (stateless functions and stateful ES6 classes)
- Connectors for sideways data loading
- Extensible synthetic event subsystem
- Synchronous and deterministic syncing algorithm
- Children reconciliation with minimum number of DOM operations
- Fast performance
- Test utilities
- Compatible with [Google Closure Compiler](https://github.com/google/closure-compiler) `ADVANCED` mode.

## Example

```js
import { render } from "ivi";
import * as h from "ivi-html";

const container = document.getElementById("app");

render(
  h.div().c("Hello World!"),
  container,
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

- [Basic Boilerplate](https://github.com/ivijs/boilerplate/)

#### Basic

- [Introduction](https://github.com/ivijs/examples/tree/master/src/01_introduction/)
- [Stateful Component](https://github.com/ivijs/examples/tree/master/src/02_stateful_component/)
- [Events](https://github.com/ivijs/examples/tree/master/src/03_events/)
- [Forms](https://github.com/ivijs/examples/tree/master/src/04_forms/)
- [Collapsable](https://github.com/ivijs/examples/tree/master/src/05_collapsable/)

#### Apps

- [TodoMVC](https://github.com/ivijs/todomvc/)

#### Games

- [Snake](https://github.com/ivijs/examples/tree/master/src/games/snake/)

#### Benchmarks

- [UIBench](https://github.com/ivijs/examples/tree/master/src/benchmarks/uibench/)
- [DBMon](https://github.com/ivijs/examples/tree/master/src/benchmarks/dbmon/)
- [10k Components](https://github.com/ivijs/examples/tree/master/src/benchmarks/10k/)

## License

[MIT](http://opensource.org/licenses/MIT)
