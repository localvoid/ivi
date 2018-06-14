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

Designing UI library with a focus on performance is quite hard, there are many different optimization goals and we need
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
- Increase probability that executed code is JITed (usually depends on the application code size)

Virtual DOM is not the best possible solution if we were trying to find a solution that focuses on direct update
performance, but small updates doesn't have any significant impact on performance, even 2x speedup that reduces time
from 0.1ms to 0.05ms will be hardly noticeable. Virtual DOM trades update performance to improve performance in many
other areas.

### Performance Benchmarks

There are no good ways how to compare performance of different libraries, and there are no good benchmarks since all
benchmarks are biased towards some type of libraries. So we need to understand how to read numbers from this biased
benchmarks.

To explain why benchmarks are biased I'll use [the most popular benchmark](https://github.com/krausest/js-framework-benchmark).
It contains implementations for many different libraries and ivi is among the fastest libraries in this benchmark, even
when benchmark is biased towards libraries that use direct data bindings to connect observable data with DOM elements.

There are several key characteristics and we need to compare them with numbers from complex web applications:

- Number of DOM Elements
- Ratio of DOM Elements per Component
- Ratio of Event Handlers per DOM Element
- Ratio of Data Bindings per DOM Element
- Ratio of Components per Component Type
- Complex data transformations

As an example of a complex application I'll use Google Mail.

#### Number of DOM Elements

```
Benchmark: 8000-80000
Google Mail: ~4000
```

In some test cases of this benchmark there is an insane amount of DOM elements. Usually when there are so many DOM
elements is involved, recalc style, reflow, etc will be so slow, so it doesn't matter how fast is UI library,
application will be completely unusable.

Libraries that are using algorithms and data structures that can easily scale to any number of DOM elements will
obviously benefit from such insane numbers of DOM elements.

#### Ratio of DOM Elements per Component

```
Benchmark: +Infinity
Google Mail: ~3 (rough estimate, guessed by looking at DOM nodes in the document)
```

Since benchmark doesn't impose any strict requirements how to structure benchmark implementation, many implementations
just choosing to go with the simplest solution and implement it without any components.

Good luck figuring out how library will perform in a scenario when components are involved. And for some libraries,
components has a huge impact on performance, since they were optimized just to deal with low-level primitives.

#### Event Handlers per DOM Element

```
Benchmark: ~0.25 without event delegation
Google Mail: ~0.25
```

There also no strict requirements how to handle user interactions, some libraries are attaching event handlers to
DOM nodes and some implementations are using event delegation technique to reduce number of event handlers to 1 per
8000-80000 DOM Elements (0.000125 - 0.0000125).

Libraries like React and ivi are using synthetic events with custom event dispatcher, so behind the scenes they are
registering one native event handler per each event type, but it is an internal implementation detail and the key
difference between event delegation and synthetic events is that synthetic events doesn't break component encapsulation,
components aren't leaking any information about their DOM structure.

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

Benchmark implementations with zero components are obviously have zero component types. When there are no components,
libraries that generate "optimal" code and don't care about the size of the generated code, and the amount of different
code paths will have an advantage in a microbenchmark like this.

But in a complex application it maybe worthwile to reduce the amount of the generated code instead of trying to optimize
micro updates by a couple of microseconds. Virtual DOM libraries are usually have a compact code, because they are using
a single code path for creating and updating DOM nodes, with no additional code for destroying DOM nodes. Single code
path has an additional advantage that it has a higher chances that this code path will be JITed earlier.

#### Complex data transformations

Since there are no complex data transformation in the benchmark, it is an ideal situation for libraries with
fine-grained direct data bindings. Just bind an observable with DOM nodes directly and all problems solved.

But in real applcations there are complex data transformation that lose all information about data changes, servers are
sending data snapshots that doesn't contain any information how nodes should be rearranged and many other use cases.

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
- [Syncable Value](https://github.com/localvoid/ivi/blob/master/documentation/advanced/syncable-value.md)
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
