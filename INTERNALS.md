# ivi Internals

General overview of the project.

## Packages

### ivi-core

Shared code for browser and server implementations. It contains: basic types, data structures, helper functions,
client-side feature detection and user-agent detection.

### ivi-math

Math library for UI development.

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

### ivi-test

Test utilities.

### iko-ivi

Extension for [iko](https://github.com/localvoid/iko) assertion library.

### ivi-state

Basic global store implementation, useful for demo purposes.

### ivi-tslint-rules

TSLint rules.

### ivi-gestures

**EXPERIMENTAL** package with gesture recognition (+DnD)

## Development Environment

Bootstrap Development Environment (Do not use lerna to bootstrap)

```sh
$ yarn
```

Build packages

```sh
$ lerna run dist
```