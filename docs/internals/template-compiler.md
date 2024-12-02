# Template Compiler

## Markers

Comment markers `<!>` should be inserted into template to delineate a slot
position for an expression when it is inserted between two text nodes. E.g.

    <div>prefix${expr}suffix</div>

Should produce the following HTML template:

    <div>prefix<!>suffix</div>

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

```html
<div>
  <span>${expr}</span>
</div>
```

Here we don't need to traverse DOM tree when mounting, because we already know
its root node and dynamic child is positioned in the end. So, `stateOpCodes`
should be empty, and `childOpCodes` should have only `UpdateChild` opCode.

## Ideas

### SMI Arrays vs Strings for OpCodes

It is possible to encode OpCodes as strings and get deduplication via string
interning. OpCodes encoded as strings should also have smaller size and faster
to parse. But overall it is probably not worth it.

### Optimize PropOpCode encoding to reduce code size

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
we can sort it by the number of occurences in templates, so that indices for
the 16 most common keys will be able to fit into 4 bits.

### Store string length in StateOpCodes to separate static text nodes

It is possible to avoid injecting `<!>` comment nodes to separate static
strings by replacing remove opCode with split opCode that is going to store
string length.
