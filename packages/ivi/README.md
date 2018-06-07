# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE) [![codecov](https://codecov.io/gh/localvoid/ivi/branch/master/graph/badge.svg)](https://codecov.io/gh/localvoid/ivi) [![CircleCI Status](https://circleci.com/gh/localvoid/ivi.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/localvoid/ivi) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/localvoid/ivi)

ivi is a javascript (TypeScript) library for building web user interfaces.

|Package      |NPM version                                                                                                  |
|-------------|-------------------------------------------------------------------------------------------------------------|
|ivi          |[![npm version](https://img.shields.io/npm/v/ivi.svg)](https://www.npmjs.com/package/ivi)                    |
|ivi-core     |[![npm version](https://img.shields.io/npm/v/ivi-core.svg)](https://www.npmjs.com/package/ivi-core)          |
|ivi-scheduler|[![npm version](https://img.shields.io/npm/v/ivi-scheduler.svg)](https://www.npmjs.com/package/ivi-scheduler)|
|ivi-html     |[![npm version](https://img.shields.io/npm/v/ivi-html.svg)](https://www.npmjs.com/package/ivi-html)          |
|ivi-svg      |[![npm version](https://img.shields.io/npm/v/ivi-svg.svg)](https://www.npmjs.com/package/ivi-svg)            |

## Features

- Declarative rendering with ["Virtual DOM"](https://github.com/localvoid/ivi/blob/master/documentation/general/virtual-dom.md)
- [Components](https://github.com/localvoid/ivi/blob/master/documentation/general/components.md) (stateless functions and stateful ES2015 classes)
- [Connectors](https://github.com/localvoid/ivi/blob/master/documentation/general/connect.md) for sideways data loading
- Implicit data propagation with [contexts](https://github.com/localvoid/ivi/blob/master/documentation/general/context.md)
- Extensible [synthetic event subsystem](https://github.com/localvoid/ivi/blob/master/documentation/general/synthetic-events.md)
- Attaching DOM events to component nodes
- Synchronous and deterministic syncing algorithm
- Children reconciliation with [minimum number of DOM operations](https://github.com/localvoid/ivi/blob/master/documentation/misc/children-reconciliation.md)
- Fast performance
- Test utilities
- **EXPERIMENTAL** [gesture events](https://github.com/localvoid/ivi/tree/master/packages/ivi-gestures)

## Library Size

Size of the [basic example](https://github.com/localvoid/ivi-examples/tree/master/packages/tutorial/01_introduction)
bundled with [webpack](https://webpack.js.org/) and minified with [uglify](https://github.com/mishoo/UglifyJS2) is just
a **3.7KB** (minified+compressed).

## Performance

Designing UI library with a focus on performance is quite hard, there are many different optimization goals and you need
to find a balanced solution that should produce the best possible outcome for a complex application. Simple applications
usually doesn't suffer from performance problems, so the focus should be on the architecture of complex applications.

Here is a list of different optimization goals (in random order) that we should be focusing on:

- Application code size
- Library code size
- Time to render first interactive page
- Rendering performance
- Updating performance
- Memory usage
- Garbage collection
- Reduce [impact of polymorphism](http://benediktmeurer.de/2018/03/23/impact-of-polymorphism-on-component-based-frameworks-like-react/)
- Increase probability that executed code will be JITed (usually depends on the application code size)

### Performance Benchmarks

Unfortunately there are no good benchmarks and all benchmarks are biased towards some type of libraries. So we need to
understand how to read numbers from this biased benchmarks.

To demonstate how to read numbers from benchmarks I'll use [the most popular benchmark](https://github.com/krausest/js-framework-benchmark).

We need to look at several key characteristics and compare them with numbers from complex web applications. As an
example of a complex application I'll use Google Mail.

#### DOM Elements per Component

```
Benchmark: +Infinity
Google Mail: ~3 (rough estimate, guessed by looking at DOM nodes in the document)
```

There are no strict requirements and everyone is free to choose how to structure their benchmark implementation, so if
we look at many implementations that competing at the lowest numbers, almost all of them are implemented without any
components.

Good luck guessing how such libraries will behave in a real application.

#### Event Handlers per DOM Element

```
Benchmark: ~0.25 without event delegation
Google Mail: ~0.25
```

There are no strict requirements how to respond to user actions, and some implementations are using event
delegation technique to reduce number of event handlers to 2 per 8000-80000 DOM Elements (0.00025 - 0.000025).

Libraries like ivi are using synthetic events with a custom event dispatcher, so behind the scenes they are registering
one native event handler per each event type, but it is an internal implementation detail and the key difference is that
it doesn't break component encapsulation, components aren't leaking any information about their DOM structure.

Synthetic events is another design decision that was made to improve performance of real applications by sacrificing
performance of some other cases. But when library demonstrates good numbers in benchmarks only by breaking
encapsulation guarantees with event delegation, is it even worth to consider such libraries for complex applications.

#### Data Bindings per DOM Element

```
Benchmark: ~0.5
Google Mail: ~2 (rough estimate, guessed by looking at DOM nodes in the document)
```

Such low number of data bindings is a huge indicator that benchmark is biased toward libraries with fine-grained direct
data bindings.

Virtual DOM libraries by design are trying to optimize for use cases when the ratio of data bindings per DOM element is
greater or equal than 1.

#### Components per Component Types

It is hard to guess how many different component types are used in Google Mail, but if it is like any other complex
application, the ratio of components per component type shouldn't be too high.

Benchmark implementations with zero components are obviously have zero component types. And when you don't have
components, you can just analyze template and generate the most optimal code for all benchmarking test cases. It is a
perfect situation if you are building library to win in benchmarks, but in complex application the amount of the
generated code will have a huge impact on the application code size, time to render first page and the probabilty that
executed code will be JITed.

Is it worth to generate the most optimal code to gain couple of microseconds that only noticeable in a microbenchmark?
If you don't care about microbenchmarks, then it is much better to think how to reduce the amount of the generated code
and the amount of different code paths.

#### Complex data transformations

Since there are no complex data transformation in the benchmark, it is an ideal situation for libraries with
fine-grained direct data bindings, how hard it could be to just bind an observer to some variable and respond by
mutating DOM nodes directly.

Perfect solution for a benchmark, but in real applcations there are complex data transformation that lose all
information about data changes, data snapshots from the server doesn't contain any information how nodes should be
rearranged, etc.

So the question is how hard it will be for libraries that unable to handle such scenarios, are they going with an easy
solution by rerendering everything and losing all internal state, or maybe reimplement the most complex part of the
virtual dom libraries that diffs tree structures and apply it to the data.

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
