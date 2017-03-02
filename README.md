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

It is based on the ideas from the [React](https://facebook.github.io/react/) library, but tries to solve some
long-standing issues, like completely broken
[Contexts](https://facebook.github.io/react/docs/context.html#updating-context),
[incorrect componentDidMount order](https://github.com/facebook/react/issues/2763), etc. Many of this issues aren't
possible to solve efficiently without breaking changes.

## Current Status

This library is in alpha state, and I wouldn't recommend to use it unless you have time on experiments. I also don't
have any plans on building community and ecosystem around it, I am primarily focused on solving my own problems with
this library.

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
- [Context](https://github.com/ivijs/ivi/blob/master/documentation/general/context.md)
- [Scheduler](https://github.com/ivijs/ivi/blob/master/documentation/general/scheduler.md)
- [Build Configuration](https://github.com/ivijs/ivi/blob/master/documentation/general/build-configuration.md)

### Advanced

- [Optimization Hints](https://github.com/ivijs/ivi/blob/master/documentation/advanced/optimization-hints.md)
- [Partially Static Elements](https://github.com/ivijs/ivi/blob/master/documentation/advanced/partially-static-elements.md)
- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/advanced/dev-mode.md)
- [TypeScript Enums](https://github.com/ivijs/ivi/blob/master/documentation/advanced/typescript-enums.md)
- [Security](https://github.com/ivijs/ivi/blob/master/documentation/advanced/security.md)
- [Known Issues](https://github.com/ivijs/ivi/blob/master/documentation/advanced/issues.md)

### Extensions

- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/extensions/dev-mode.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/extensions/synthetic-events.md)

### Future Ideas

- [Keep Alive](https://github.com/ivijs/ivi/blob/master/documentation/future/keep-alive.md)
- [Connect](https://github.com/ivijs/ivi/blob/master/documentation/future/connect.md)
- [New Context API](https://github.com/ivijs/ivi/blob/master/documentation/future/context.md)

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

Stateless components are implemented with simple functions. Component functions has two parameters: `props` parameter
for component properties and optional parameter `context` with current Context.

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

Bundles for all examples are including polyfills for ES6 features like Map, WeakMap, Promise, etc. Minified size of the
polyfills is 7.5kb, so for example size of the "Introduction" bundle without polyfills will be just 12kb.

#### Basic

- [Introduction](https://ivijs.github.io/examples/01_introduction/) (19kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/01_introduction)]
- [Stateful Component](https://ivijs.github.io/examples/02_stateful_component/) (20kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/02_stateful_component)]
- [Events](https://ivijs.github.io/examples/03_events/) (26kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/03_events)]
- [Forms](https://ivijs.github.io/examples/04_forms/) (24kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/04_forms)]
- [Collapsable](https://ivijs.github.io/examples/05_collapsable/) (26kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/05_collapsable)]

#### Apps

- [TodoMVC](https://ivijs.github.io/examples/todomvc/) (34kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/todomvc)]

#### Games

- [Snake](https://ivijs.github.io/examples/games/snake/) (28kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/games/snake)]

#### Benchmarks

- [UIBench](https://ivijs.github.io/examples/benchmarks/uibench/) (28kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/uibench)]
- [DBMon](https://ivijs.github.io/examples/benchmarks/dbmon/) (26kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/dbmon)]
- [10k Components](https://ivijs.github.io/examples/benchmarks/10k/) (25kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/10k)]

#### Test Playground

- [Pointer Events](https://ivijs.github.io/examples/playground/pointer-events/) (27kb)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/playground/pointer-events)]

## Notes on Performance Benchmarks

I've been involved in most popular web UI benchmarks in one way or another. I even created a couple of them:
[vdom-benchmark](https://vdom-benchmark.github.io/vdom-benchmark/) and [uibench](https://localvoid.github.io/uibench)
and the truth about this benchmark games is that to stay on top of them you need to build a library with many
"optimizations" that aren't useful in real applications and create benchmark implementations with a ridiculous code that
nobody would ever write in production. Long time ago I've created a [kivi](http://github.com/localvoid/kivi) library,
it is a great example of a library that was created to push performance as much as possible just to win benchmarks,
it has a ridiculous API, and every decision about its API was about how to push performance even further. It is pretty
hard to beat its performance in benchmarks without obvious "cheating".

ivi just took the best parts of the kivi library. Its syncing algorithm is significantly simpler, and it is still one of
the fastest web UI libraries without any weird "optimizations".

Even without any benchmark specific optimizations, simple and idiomatic ivi
[uibench](https://localvoid.github.io/uibench) implementation is still one of the fastest, in some use cases it is even
faster than kivi.

You can read more about that in the article I wrote on
[How to win in Web Framework Benchmarks](https://medium.com/@localvoid/how-to-win-in-web-framework-benchmarks-8bc31af76ce7).

## Inspired by Other Libraries

- [React](https://facebook.github.io/react/) - key ideas, dev experience, synthetic events, browser quirks.
- [Bobril](https://github.com/Bobris/Bobril) - single pass reconciliation, prefix/suffix optimization.
- [Vidom](https://github.com/dfilatov/vidom) - method chaining API for Virtual DOM construction.
- [Vue](https://github.com/vuejs/vue) - browser quirks.
- [Polymer](https://www.polymer-project.org/2.0/) - gesture events.
- [AMP](https://www.ampproject.org/) - animations, browser quirks.

## License

[MIT](http://opensource.org/licenses/MIT)
