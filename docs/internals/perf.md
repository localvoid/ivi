# Perf

## `var` vs `let`

In some places variables are declared with `var` instead of `let`, it is a
micro optimization that propably won't have any significant impact on
performance, especially when the JIT kicks in.

```js
function __var(i) {
  var j = i;
  return function _var() {
    return j;
  }
}

function __let(i) {
  let j = i;
  return function _let() {
    return j;
  };
}
```

In the example above, `_var` function will have the following bytecode in V8:

```txt
LdaImmutableCurrentContextSlot [2]
Return
```

And `_let` function:

```txt
LdaImmutableCurrentContextSlot [2]
ThrowReferenceErrorIfHole[0];
Return
```

## `if (a === true) {}` vs `if (a) {}`

In a lot of places there are explicit strict equality checks to avoid
`toBool()` coercion. Sometimes we can avoid explicit checks when JIT compiler
is going to inline functions and will be able to eliminate `toBool()`
coercion. For example, `_isArray()` calls doesn't use strict equality checks.
`(a === true)`

```txt
0x738b024    24  488b5518             REX.W movq rdx, [rbp + 0x18];
0x738b028    28  493995b0000000       REX.W cmpq[r13 + 0xb0](root(true_value)), rdx;
0x738b02f    2f  0f8424000000         jz 0x738b059 < +0x59 >
0x738b035    35  48b80000000014000000 REX.W movq rax, 0x1400000000;
0x738b03f    3f  488b4de8             REX.W movq rcx, [rbp - 0x18];
0x738b043    43  488be5               REX.W movq rsp, rbp;
0x738b046    46  5d                   pop rbp;
0x738b047    47  4883f902             REX.W cmpq rcx, 0x2;
0x738b04b    4b  7f03                 jg 0x738b050 < +0x50 >
0x738b04d    4d  c21000               ret 0x10;
`(a)`, inlines `toBool()`
0x618b024    24  488b5518             REX.W movq rdx, [rbp + 0x18];
0x618b028    28  f6c201               testb rdx, 0x1;
0x618b02b    2b  0f84a7000000         jz 0x618b0d8 < +0xd8 >
0x618b031    31  493995b8000000       REX.W cmpq[r13 + 0xb8](root(false_value)), rdx;
0x618b038    38  0f8459000000         jz 0x618b097 < +0x97 >
0x618b03e    3e  493995c0000000       REX.W cmpq[r13 + 0xc0](root(empty_string)), rdx;
0x618b045    45  0f844c000000         jz 0x618b097 < +0x97 >
0x618b04b    4b  488b4aff             REX.W movq rcx, [rdx - 0x1];
0x618b04f    4f  f6410d10             testb[rcx + 0xd], 0x10;
0x618b053    53  0f853e000000         jnz 0x618b097 < +0x97 >
0x618b059    59  49398d38010000       REX.W cmpq[r13 + 0x138](root(heap_number_map)), rcx;
0x618b060    60  0f8484000000         jz 0x618b0ea < +0xea >
0x618b066    66  49398db8010000       REX.W cmpq[r13 + 0x1b8](root(bigint_map)), rcx;
0x618b06d    6d  0f846c000000         jz 0x618b0df < +0xdf >
0x618b073    73  48b8000000000a000000 REX.W movq rax, 0xa00000000;
0x618b07d    7d  488b4de8             REX.W movq rcx, [rbp - 0x18];
0x618b081    81  488be5               REX.W movq rsp, rbp;
0x618b084    84  5d                   pop rbp;
0x618b085    85  4883f902             REX.W cmpq rcx, 0x2;
0x618b089    89  7f03                 jg 0x618b08e < +0x8e >
0x618b08b    8b  c21000               ret 0x10;
```

## Polymorphic Call-Sites

It is not always a good idea to optimize for monomorphic call-sites. If there
is a low degree polymorphism, it can be better to use different shapes.
In some cases compiler can optimize several polymorphic call-sites and
perform just one shape check. To understand how to reorganize code, so that
compiler could better optimize it, it is necessary to understand aliasing:
https://en.wikipedia.org/wiki/Aliasing_(computing)

## Additional Resources

- https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
- https://benediktmeurer.de/2017/06/29/javascript-optimization-patterns-part2/
