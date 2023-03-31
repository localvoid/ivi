# Misc

## Type Casting

The current code base contains a lot of type casting. In idiomatic typescript
it should be implemented with type guards, and if javascript toolchains
supported inlining in some reliable way instead of relying on their
heuristics, the code could be way much cleaner with type guard functions.

## Root Entry Functions

Entry functions (update, dirtyCheck, unmount, etc) should save and restore
render context to avoid edge cases when they invoked synchronously in a
different root context.
