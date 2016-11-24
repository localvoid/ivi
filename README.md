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

[ivi](http://github.com/localvoid/ivi) is a javascript (TypeScript) library for building web user interfaces with a
focus on developer productivity.

The recommended way to build large applications with ivi is to use [TypeScript](https://www.typescriptlang.org). ivi
has great type coverage and its API is designed to work nicely with TypeScript and IDEs. Also, one of the upcoming
features will be an optimizing pass for TypeScript compiler that will use type information to optimize Virtual DOM
instantiation, combined with a [tsickle](https://github.com/angular/tsickle) annotator and
[Google Closure Compiler](https://github.com/google/closure-compiler) it will be possible to generate very efficient
javascript bundles.

## Features

- Declarative rendering with a Virtual DOM
- Components (stateless functions and stateful ES6 classes)
- Extensible synthetic event subsystem
- Fast performance
- Server side rendering
- Context that doesn't have any issues with updates
- Development Mode with improved stack traces

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

### Advanced

- [Optimization Hints](https://github.com/ivijs/ivi/blob/master/documentation/advanced/optimization-hints.md)
- [Partially Static Elements](https://github.com/ivijs/ivi/blob/master/documentation/advanced/partially-static-elements.md)
- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/advanced/dev-mode.md)
- [Known Issues](https://github.com/ivijs/ivi/blob/master/documentation/advanced/issues.md)

### Extensions

- [Development Mode](https://github.com/ivijs/ivi/blob/master/documentation/extensions/dev-mode.md)
- [Synthetic Events](https://github.com/ivijs/ivi/blob/master/documentation/extensions/synthetic-events.md)

## Getting Started

The easiest way to get started with ivi is to use this this Hello World example on:
[CodePen](http://codepen.io/localvoid/pen/LbZmMX) or [JSFiddle](https://jsfiddle.net/localvoid/zmxnn0eq/).

### Installation

#### Standalone

Just include with a `<script>` tag. `ivi` will be registered as a global variable.

There are several versions of standalone packages:

- [Dev Mode](https://unpkg.com/ivi@^0.2.0/dist/cdn/ivi.dev.js)
- [Production](https://unpkg.com/ivi@^0.2.0/dist/cdn/ivi.js)
- [Production (minified)](https://unpkg.com/ivi@^0.2.0/dist/cdn/ivi.min.js)

Standalone packages are distributed via [unpkg](https://unpkg.com) CDN.

Standalone package is quite big, it is ~50kb minified. The recommended way for building large applications with ivi
is to use NPM packages with advanced javascript compilers that will remove unused code, ivi API and internals are
designed specifically to make it easier for compilers to remove unused code.

#### NPM

Npm package `ivi` provides umd module, es6 module and TypeScript typings.

```sh
$ npm install ivi
```

or with [Yarn](https://github.com/yarnpkg/yarn)

```sh
$ yarn add ivi
```

#### Boilerplate

Basic boilerplate configured with:

- [TypeScript 2.1](https://www.typescriptlang.org)
- [gulp 4](http://gulpjs.com/)
- [rollup](http://rollupjs.org/)
- [Google Closure Compiler](https://github.com/google/closure-compiler)
- [Browsersync](https://www.browsersync.io/)

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

    didMount() {
        this.timeoutId = setInterval(() => {
            this.time++;
            this.invalidate();
        }, 1000);
    }

    didUnmount() {
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

- [Introduction](https://ivijs.github.io/examples/01_introduction/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/01_introduction)]
- [Stateful Component](https://ivijs.github.io/examples/02_stateful_component/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/02_stateful_component)]
- [Events](https://ivijs.github.io/examples/03_events/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/03_events)]
- [Forms](https://ivijs.github.io/examples/04_forms/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/04_forms)]
- [Collapsable](https://ivijs.github.io/examples/05_collapsable/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/05_collapsable)]

#### Apps

- [TodoMVC](https://ivijs.github.io/examples/todomvc/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/todomvc)]

#### Games

- [Snake](https://ivijs.github.io/examples/games/snake/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/games/snake)]

#### Benchmarks

- [UIBench](https://ivijs.github.io/examples/benchmarks/uibench/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/uibench)]
- [DBMon](https://ivijs.github.io/examples/benchmarks/dbmon/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/dbmon)]
- [10k Components](https://ivijs.github.io/examples/benchmarks/10k/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/benchmarks/10k)]

#### Test Playground

- [Pointer Events](https://ivijs.github.io/examples/playground/pointer-events/)
  [[Source Code](https://github.com/ivijs/examples/tree/master/src/playground/pointer-events)]

## Why not JSX?

JSX has a great feature that it is easy to implement codemod tools, so you can perform code transformations that involve
jsx on the large javascript code bases. The recommended way for building large applications in ivi is to use TypeScript,
and TypeScript in general doesn't have such problems, it is quite easy to implement any code transformation tools for
TypeScript that doesn't need any additional JSX-like syntax.

JSX is also easier for newcomers who already familiar with HTML when they start playing with jsx, but it also creates
a problem that there are still many developers who thinks thas JSX is a some kind of template, and not just a syntax
sugar for creating javascript values, and because of it they are still don't fully understand why it is much more
flexible than templates.

It is possible to implement a JSX transformer that will create ivi `VNode` instances from jsx. The current API just
works way much better with TypeScript type checking and autocompletion, and there are no plans for JSX support for ivi
in the near future.

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

## License

[MIT](http://opensource.org/licenses/MIT)
