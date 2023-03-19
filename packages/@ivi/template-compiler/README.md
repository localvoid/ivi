# [ivi](https://github.com/localvoid/ivi) Template Compiler

Template compiler is implemented as a throwaway optimized code, it was designed
precisely for the current set of features. Please, don't try to shoehorn some
feature without considering entire implementation, maybe it would be better to
rewrite everything to support this feature if it adds a lot of complexity to
this implementation.

## Strings

The main reason why `'` character is used for strings is because
implementation for escaping '"' is slightly simpler and the original idea
for this template language were that even without precompilation it should
be small, simple and performant.

## Markers

Comment markers `<!>` should be inserted into template to delineate a slot
position for an expression when it is inserted between two text nodes. E.g.

    div 'prefix' ${expr} 'suffix'

Should produce the following HTML template:

    <div>prefix<!>suffix</div>

## Compilation

In the first pass we assign a flag `AssignSlot` in state opCodes indicating
that current node should be stored in a state. Children opCodes are storing
an index to a state opCode instead of an index to a state. When first pass is
finished, we just go through state opCodes and assign state indexes in
incremental order for all nodes with `AssignSlot` flag, then we just need to
update children opCodes by taking state indexes from state opCodes.

## OpCodes

When properties `PropOpCode` are starting to update:

- currentNode is assigned to template root node
- properties are updated starting from the root node

Because of this invariants we can avoid adding SetNode opCode for root nodes.

When children `ChildOpCode` are starting to update:

- parentNode is assigned to root node
- nextNode is assigned to null

Because of this invariants we can avoid generating state and children opcodes
in cases like:

```txt
div
  span
  ${expr}
```

Here we don't need to traverse DOM tree when mounting, because we already know
its root node and dynamic child is positioned in the end. So, `stateOpCodes`
should be empty, and `childOpCodes` should have only `UpdateChild` opCode.

## SMI Arrays vs Strings for OpCodes

It is possible to encode OpCodes as strings and get deduplication via string
interning. OpCodes encoded as strings should also have smaller size and faster
to parse. But overall it is probably not worth it.

## Custom class name handlers

There should be an option for overriding class name parsing. I am using it for
class name minification, but not so sure if this feature will be useful in
popular toolchains.

## Optimize PropOpCode encoding to reduce code size

In majority of templates, the size of expressions array, state array, etc
is lower than 16. So instead of storing indexes in a contiguous set of bits,
we can store lowest bits in the first 4 bits and the rest in the highest
bits, e.g.:

```txt
PropOpCode {
  type:3,
  expr_lo:4,
  data_lo:4,
  expr_hi:6,
  data_hi:..,
}

expr = ((op >> 3) & Mask4) | ((op >> 11) & Mask6);
data = ((op >> 7) & Mask4) | (op >> 17);
```

And since we are deduplicating all data and storing it in a shared array,
we can sort it by the number of occurences in templates, so that indexes for
the 16 most common keys will be able to fit into 4 bits.
