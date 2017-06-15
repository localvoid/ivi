<p align="center">
  <a href="https://github.com/ivijs/ivi" title="ivi - javascript (TypeScript) web UI library"><img width="200" height="200" src="https://ivijs.github.io/ivi/logo.png"></a>
</p>

<p align="center">
  <a href="https://travis-ci.org/ivijs/ivi"><img src="https://img.shields.io/travis/ivijs/ivi.svg?style=flat-square" alt="Build Status"></a>
  <a href="https://codecov.io/github/ivijs/ivi?branch=master"><img src="https://img.shields.io/codecov/c/github/ivijs/ivi/master.svg?style=flat-square" alt="Coverage Status"></a>
  <a href="https://www.npmjs.com/package/ivi"><img src="https://img.shields.io/npm/dt/ivi.svg?style=flat-square" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/ivi"><img src="https://img.shields.io/npm/v/ivi.svg?style=flat-square" alt="Version"></a>
  <a href="https://www.npmjs.com/package/ivi"><img src="https://img.shields.io/npm/l/ivi.svg?style=flat-square" alt="License"></a>
  <a href="https://gitter.im/ivijs/ivi"><img src="https://img.shields.io/gitter/room/ivijs/ivi.svg?style=flat-square" alt="Gitter Chat"></a>
</p>

<p align="center">
  <a href="https://saucelabs.com/u/ivijs"><img src="https://saucelabs.com/browser-matrix/ivijs.svg" alt="Sauce Test Status"></a>
</p>

[ivi](http://github.com/localvoid/ivi) is a javascript (TypeScript) library for building web user interfaces.

## Features

- Declarative rendering with a Virtual DOM
- Components (stateless functions and stateful ES6 classes)
- Extensible synthetic event subsystem
- Synchronous and deterministic syncing algorithm
- Fast performance
- Server side rendering
- Advanced development mode

## Questions

For questions and support please use the [Gitter chat room](https://gitter.im/ivijs/ivi). The issue list of this repo is
exclusively for bug reports and feature requests.

## Documentation

### General

- [Virtual DOM](https://github.com/ivijs/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/ivijs/ivi/blob/master/documentation/general/components.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/general/synthetic-events.md)
- [Build Configuration](https://github.com/ivijs/ivi/blob/master/documentation/general/build-configuration.md)

### Advanced

- [External State](https://github.com/ivijs/ivi/blob/master/documentation/advanced/external-state.md)
- [Context](https://github.com/ivijs/ivi/blob/master/documentation/advanced/context.md)
- [Optimization Hints](https://github.com/ivijs/ivi/blob/master/documentation/advanced/optimization-hints.md)
- [Partially Static Elements](https://github.com/ivijs/ivi/blob/master/documentation/advanced/partially-static-elements.md)
- [Keep Alive](https://github.com/ivijs/ivi/blob/master/documentation/advanced/keep-alive.md)
- [Scheduler](https://github.com/ivijs/ivi/blob/master/documentation/advanced/scheduler.md)
- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/advanced/dev-mode.md)
- [TypeScript Enums](https://github.com/ivijs/ivi/blob/master/documentation/advanced/typescript-enums.md)
- [Security](https://github.com/ivijs/ivi/blob/master/documentation/advanced/security.md)
- [Known Issues](https://github.com/ivijs/ivi/blob/master/documentation/advanced/issues.md)

### Extensions

- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/extensions/dev-mode.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/extensions/synthetic-events.md)

### Future Ideas

- [Custom Renderers](https://github.com/ivijs/ivi/blob/master/documentation/future/custom-renderers.md)

### Installation

#### NPM

Npm package `ivi` provides es6 module and TypeScript typings.

```sh
$ npm install ivi
```

or with [Yarn](https://github.com/yarnpkg/yarn)

```sh
$ yarn add ivi
```

When building an application with an NPM module, make sure that you properly
[configure](https://github.com/ivijs/ivi/blob/master/documentation/general/build-configuration.md) your bundler and
specify all configuration variables.

#### Boilerplate

Basic boilerplate configured with:

- [TypeScript 2.3](https://www.typescriptlang.org)
- [Webpack](https://webpack.js.org)

```sh
$ git clone https://github.com/ivijs/boilerplate
```

### Declarative Rendering with Virtual DOM

Declarative rendering in ivi is based on the Virtual DOM. Each time you want to update DOM, just create a new Virtual
DOM tree and syncing algorithm will efficiently update DOM tree.

```ts
import { $h, render } from "ivi";

render(
    $h("div").children("Hello world!"),
    document.getElementById("app")!,
);
```

Now lets make it alive:

```ts
import { $h, render } from "ivi";

let counter = 0;

function update() {
    render(
        $h("div").children(`Counter: ${counter}`),
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
import { $h, $c, render } from "ivi";

function StatelessComponent(text: string) {
    return $h("div").children(text);
}

render(
    $c(StatelessComponent, "Hello Stateless Component!"),
    document.getElementById("app")!,
);
```

#### Stateful Components

Stateful components are implemented with ES6 classes and should be extended from the base component class
`Component<P>`. Base class has a parametric type `P` that specifies props type.

```ts
import { Component, $h, $c, render } from "ivi";

class StatefulComponent extends Component<null> {
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
        return $h("div").children(`Time: ${this.time}`);
    }
}

render(
    $c(StatefulComponent),
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
