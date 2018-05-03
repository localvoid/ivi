[ivi](http://github.com/localvoid/ivi) is a javascript (TypeScript) library for building web user interfaces.

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

## Questions

For questions and support please use the [Gitter chat room](https://gitter.im/ivijs/ivi). The issue list of this repo is
exclusively for bug reports and feature requests.

## Documentation

### General

- [Virtual DOM](https://github.com/ivijs/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/ivijs/ivi/blob/master/documentation/general/components.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/general/synthetic-events.md)
- [Connectors](https://github.com/ivijs/ivi/blob/master/documentation/general/connect.md)
- [Context](https://github.com/ivijs/ivi/blob/master/documentation/general/context.md)

### Advanced

- [Scheduler](https://github.com/ivijs/ivi/blob/master/documentation/advanced/scheduler.md)
- [TypeScript Enums](https://github.com/ivijs/ivi/blob/master/documentation/advanced/typescript-enums.md)
- [Security](https://github.com/ivijs/ivi/blob/master/documentation/advanced/security.md)

### Misc

- [Performance Tips](https://github.com/ivijs/ivi/blob/master/documentation/misc/perf-tips.md)
- [Children Reconciliation](https://github.com/ivijs/ivi/blob/master/documentation/misc/children-reconciliation.md)

### Installation

#### NPM

ivi npm packages provide es2015, commonjs modules and TypeScript typings.

```sh
$ npm install ivi-core ivi-dom ivi-scheduler ivi-events ivi-html ivi
```

#### Boilerplate

Basic boilerplate configured with:

- [TypeScript 2.4](https://www.typescriptlang.org)
- [Webpack 3.1](https://webpack.js.org)

```sh
$ git clone https://github.com/ivijs/boilerplate
```

### Basic Example

```js
import { render } from "ivi";
import * as h from "ivi-html";

const container = document.getElementById("app");
let counter = 0;

function update() {
  render(
    h.div().c(`Counter: ${counter}`),
    container,
  );

  setTimeout(update, 100);
}
update();
```

### Components

Components are the basic building blocks for your applications, they will help you encapsulate reusable code.

#### Stateless Components

Stateless components are implemented with simple functions.

```ts
import { statelessComponentFactory, render } from "ivi";
import * as h from "ivi-html";

const HelloComponent = statelessComponent<string>((text) => (
  h.div().c(text)
));

render(
  HelloComponent("Hello Stateless Component!"),
  document.getElementById("app")!,
);
```

#### Stateful Components

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
import { Component, componentFactory, render } from "ivi";
import * as h from "ivi-html";

const StatefulComponent = component(class extends Component {
  private time = 0;
  private timeoutId = 0;

  attached() {
    this.timeoutId = setInterval(() => {
      this.time++;
      this.invalidate();
    }, 1000);
  }

  detached() {
    clearInterval(this.timeoutId);
  }

  render() {
    return h.div().c(`Time: ${this.time}`);
  }
});

render(
  StatefulComponent(),
  document.getElementById("app")!,
);
```

### Examples and demo applications

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
