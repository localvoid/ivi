# ivi Internals

General overview of the project.

## Packages

Project is separated into many different packages because of the following reasons:

- reduce TypeScript type conflicts between server-side and client-side implementations.
- server-side renderer has completely different implementation for most public APIs, so we are using `ivi-core` package
to make it easier to share code between client and server implementations.
- HTML VNode and Synthetic Event factories are separated into its own packages, so it will be possible to import them
into its own namespace and prevent name collisions.
- Improved tree shaking by simple bundlers (Google closure compiler can handle much more complicated scenarios).

### ivi-vars

This package contains different modules with predefined global variables that control behavior of ivi libraries.

```
ivi-vars/browser.js
ivi-vars/browser-dev.js
ivi-vars/ssr.js
ivi-vars/ssr-dev.js
ivi-vars/cjs/index.js
```

By default, ES6 module is pointing to `browser-dev.js` module and commonjs modules is pointing to `cjs/index.js`.

### ivi-core

Shared code for browser and server implementations. It contains: basic types, data structures, helper functions,
client-side feature detection and user-agent detection.

### ivi-dom

Fixes for browser quirks and DOM-related helper functions.

### ivi-events

Synthetic Events subsystem with native event sources (completely separated from Virtual DOM).

### ivi-html

Virtual DOM node factories for HTML and SVG nodes.

### ivi-scheduler

Client-side scheduler.

### ivi

Client-side Virtual DOM implementation with public API. It also re-exports some types and functions from `ivi-core`
package.

### ivi-ssr

Server-side implementation for `ivi-events`, `ivi-scheduler` and `ivi` packages.

### ivi-ssr-html

Server-side implementation for `ivi-html` package.

### ivi-test

Test utilities.

### iko-ivi

Extension for [iko](https://github.com/localvoid/iko) assertion library.

### ivi-state

Basic global store implementation, useful for demo purposes.

### ivi-tslint-rules

TSLint rules.

## Virtual DOM

### Node Factories

Virtual DOM Node internal datastructure are considered as a semi-private API. It can be used by tools that can
correctly handle client-side and server-side differences.

Because internal datastructure is semi-private, we need to create factory functions for all HTML and SVG elements and
expose them as a public API, this way we can easily substitute this factory functions and get specialized
implementation for client and server platforms.

## Development Environment

Bootstrap Development Environment (Do not use lerna to bootstrap)

```sh
$ yarn
```

Build packages

```sh
$ lerna run dist
```