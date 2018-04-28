# Unsupported React Features

This is something that many Virtual DOM authors don't like to talk. Many Virtual DOM libraries, especially small ones
can't handle many edge cases that React supports. Here is a list of features that ivi library is intentionally ignoring.

## JSX

There is no JSX support.

## Immutable Virtual DOM

We are using mutable Virtual DOM to improve performance and reduce memory usage. When Virtual DOM is rendered into DOM
tree, instead of creating a special tree with references to DOM instances, we are mutating original Virtual DOM nodes.

The downside of using mutable Virtual DOM is that we cannot reuse the same Virtual DOM nodes to render different parts
of the DOM or hoist nodes to optimize performance.

It is a great feature, but nowadays many modern Virtual DOM implementations are using mutable Virtual DOM trees and it
seems that it doesn't cause too much problems in practice.

## Deep Nesting

React can handle deep nesting of children arrays, but at the same time it prints warnings when children nodes in nested
array doesn't have keys.

We aren't allowing to have deeply nested arrays to make it more consistent with the behavior that prevents users from
making a mistake because deeply nested arrays cannot have keys.

## Key Collisions in Nested Arrays

React won't have any key collisions when there are several nested arrays in the children list.

## Fragments

React components can return arrays of children nodes.
