# Dynamic Lists

Just some reminders:

## Lazy rendering

It may seem like a good idea to render dynamic lists lazily and even avoid
storing keys in memory, but it may lead to some subtle bugs with mutable
entries.

## Dynamic Lists with Immutable Entries

It is possible to create stateless node for immutable lists by storing
entries, key function and render function in a stateless node. On initial
mount we will need to invoke render function for each entry and keys can be
completely ignored. And when dynamic list is updated, we can lazily recover
old keys from previous entries.

Don't think that it is worth it in most real-world scenarios, and we can
always just memoize stateless node with dynamic list in a component state.
