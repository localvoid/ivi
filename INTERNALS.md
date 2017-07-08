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

### core

Shared code for browser and server implementations. It contains: basic types, data structures, helper functions,
client-side feature detection and user-agent detection.

### dom

Fixes for browser quirks and DOM-related helper functions.

### events

Synthetic Events subsystem with native event sources (completely separated from Virtual DOM).

### html

Virtual DOM node factories for HTML and SVG nodes.

### scheduler

Client-side scheduler.

### ivi

Client-side Virtual DOM implementation with public API. It also re-exports some types and functions from `ivi-core`
package.

### ssr

Server-side implementation for `ivi-events`, `ivi-scheduler` and `ivi` packages.

### ssr-html

Server-side implementation for `ivi-html` package.

### state

Basic global store implementation, useful for demo purposes.

## Virtual DOM

### Node Factories

Virtual DOM Node internal datastructure are considered as a semi-private API. It can be used by tools that can
correctly handle client-side and server-side differences.

Because internal datastructure is semi-private, we need to create factory functions for all HTML and SVG elements and
expose them as a public API, this way we can easily substitute this factory functions and get specialized
implementation for client and server platforms.

## Global Variables

`__IVI_DEV__` is used for development builds.

`__IVI_BROWSER__` is used for client-side builds.

It is probably will be changed in the future, when google closure compiler adds support for defining variables in es6
modules, we will try to match their conventions.

## Development Environment

Install all development dependencies at the root of the repository

```sh
$ npm install
```

Select a package that you want to change, and enter into its directory.

Build ES6 module with

```sh
$ npm run dist
```

Build commonjs module with

```sh
$ npm run dist:cjs
```

Create a link with

```sh
$ npm link
```

Install linked package at the root of the repository. For example, to link `ivi-core` package:

```sh
$ npm link ivi-core
```
