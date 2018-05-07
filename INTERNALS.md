# ivi Internals

General overview of the project.

## Packages

### ivi-core

Core library.

### ivi-math

Math library for UI development.

### ivi-events

Synthetic Events subsystem with native event sources (completely separated from Virtual DOM).

### ivi-html

Virtual DOM node factories for HTML nodes.

### ivi-svg

Virtual DOM node factories for SVG nodes.

### ivi-scheduler

Scheduler.

### ivi

Virtual DOM implementation with public API. It also re-exports some types and functions from `ivi-core`
package.

### ivi-test

Test utilities.

### ivi-test-scheduler

Scheduler for test environments.

### ivi-state

Basic global store implementation, useful for demo purposes.

### ivi-tslint-rules

TSLint rules.

### ivi-gestures

**EXPERIMENTAL** package with DnD+gesture recognition

## Development Environment

Bootstrap Development Environment

```sh
$ yarn
```

Build packages

```sh
$ lerna run dist
```
