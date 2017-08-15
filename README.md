[ivi](http://github.com/localvoid/ivi) is a javascript (TypeScript) library for building web user interfaces.

## Features

- Declarative rendering with Virtual DOM
- Components (stateless functions and stateful ES6 classes)
- Connectors for sideways data loading
- Extensible synthetic event subsystem
- Synchronous and deterministic syncing algorithm
- Children reconciliation with minimum number of DOM operations
- Fast performance
- Server side rendering
- Advanced development mode
- Test utilities
- Compatible with [Google Closure Compiler](https://github.com/google/closure-compiler) `ADVANCED` mode.

## Library Size

It seems that nowadays many people in javascript community were brainwashed that small library size is a synonym to
fast performance and simple implementation. In reality it usually means that library is using different tricks to reduce
code size by using inappropriate data structures (slower performance), initializing data structures at runtime (slower
bootstrap performance), reusing code for many different data types (slower performance), etc.

Library size in ivi library is at the bottom on the list of priorities:

- Correctness
- Consistency / Predictable Behavior
- Performance / Developer Experience
- Library Size

The minimal "hello world" application that is built with ivi library weights **~13kB** (~5kB gzipped).

## Performance / Developer Experience

Performance in ivi library is not about being just fast, it is a feature that improves Developer Experience by a lot. It
is possible to build a fast UI application with any modern web UI library, but the difference is how much complexity it
would require from an application developer to build a fast UI application.

With a fast UI library we can completely ignore any complexities for majority of UI applications and rerender entire
view from scratch when something is changed.

ivi is optimized for idiomatic code without any weird "advanced" optimizations that are used by many UI libraries to get
better results in benchmarks. And even without any "advanced" optimizations it is still
[faster than all other libraries](https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html)
with a similar feature set. It is even
[faster than popular string-based template renderers](https://medium.com/@localvoid/virtual-dom-ssr-performance-5c292d4961a0)
for server-side rendering.

But performance is also isn't a top priority for ivi, and that is why it provides many useful features that are lacking
in many virtual dom libraries:

- [Predictable reconciliation behaviour](https://github.com/ivijs/ivi/blob/master/documentation/misc/children-reconciliation.md)
- Updatable contexts
- Implicit keys to support patterns like this `condition ? h.div() : null`
- `attached` lifecycle is invoked from top to bottom after instantiating all instances
- `updated` lifecycle is always invoked for all parents when descendant is updated

## Questions

For questions and support please use the [Gitter chat room](https://gitter.im/ivijs/ivi). The issue list of this repo is
exclusively for bug reports and feature requests.

## Documentation

### General

- [Virtual DOM](https://github.com/ivijs/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/ivijs/ivi/blob/master/documentation/general/components.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/general/synthetic-events.md)
- [External State](https://github.com/ivijs/ivi/blob/master/documentation/general/external-state.md)
- [Context](https://github.com/ivijs/ivi/blob/master/documentation/general/context.md)
- [Build Configuration](https://github.com/ivijs/ivi/blob/master/documentation/general/build-configuration.md)

### Advanced

- [Optimization Hints](https://github.com/ivijs/ivi/blob/master/documentation/advanced/optimization-hints.md)
- [Keep Alive](https://github.com/ivijs/ivi/blob/master/documentation/advanced/keep-alive.md)
- [Scheduler](https://github.com/ivijs/ivi/blob/master/documentation/advanced/scheduler.md)
- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/advanced/dev-mode.md)
- [TypeScript Enums](https://github.com/ivijs/ivi/blob/master/documentation/advanced/typescript-enums.md)
- [Security](https://github.com/ivijs/ivi/blob/master/documentation/advanced/security.md)
- [Known Issues](https://github.com/ivijs/ivi/blob/master/documentation/advanced/issues.md)

### Misc

- [Performance Tips](https://github.com/ivijs/ivi/blob/master/documentation/misc/perf-tips.md)
- [Children Reconciliation](https://github.com/ivijs/ivi/blob/master/documentation/misc/children-reconciliation.md)
- [Unsupported React Features](https://github.com/ivijs/ivi/blob/master/documentation/misc/unsupported-react-features.md)

### Installation

#### NPM

ivi npm packages provide es6 modules and TypeScript typings.

```sh
$ npm install ivi-core ivi-dom ivi-scheduler ivi-events ivi-html ivi
```

When building an application with an NPM module, make sure that you properly
[configure](https://github.com/ivijs/ivi/blob/master/documentation/general/build-configuration.md) your bundler and
specify all configuration variables.

#### Boilerplate

Basic boilerplate configured with:

- [TypeScript 2.4](https://www.typescriptlang.org)
- [Webpack 3.1](https://webpack.js.org)

```sh
$ git clone https://github.com/ivijs/boilerplate
```

### Declarative Rendering with Virtual DOM

Declarative rendering in ivi is based on the Virtual DOM. Each time you want to update DOM, just create a new Virtual
DOM tree and syncing algorithm will efficiently update DOM tree.

```ts
import { render } from "ivi";
import * as h from "ivi-html";

render(
  h.div().children("Hello world!"),
  document.getElementById("app")!,
);
```

Now lets make it alive:

```ts
import { render } from "ivi";
import * as h from "ivi-html";

let counter = 0;

function update() {
  render(
    h.div().children(`Counter: ${counter}`),
    document.getElementById("app")!,
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
import { componentFactory, render } from "ivi";
import * as h from "ivi-html";

function StatelessComponent(text: string) {
  return h.div().children(text);
}
const statelessComponent = componentFactory(StatelessComponent);

render(
  statelessComponent("Hello Stateless Component!"),
  document.getElementById("app")!,
);
```

#### Stateful Components

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
import { Component, componentFactory, render } from "ivi";
import * as h from "ivi-html";

class StatefulComponent extends Component {
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
    return h.div().children(`Time: ${this.time}`);
  }
}
const statefulComponent = componentFactory(StatefulComponent);

render(
  statefulComponent(),
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
