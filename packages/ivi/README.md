# [ivi](https://github.com/localvoid/ivi) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/localvoid/ivi/blob/master/LICENSE)

Lightweight Embeddable Web UI library.

- The core library size is just 2.5KB.
- `f(state) => UI`
- [Precompiled](#template-compilation) templates optimized for size and
performance.
- Small memory footprint.
- [Embeddable](#custom-scheduler)

## Basic Example

```js
import { component, invalidate } from "ivi";
import { createRoot, updateRoot } from "ivi/root";
import { htm } from "ivi/template";

const Counter = component((c) => {
  let i = 0;
  const inc = () => {
    i++;
    invalidate(c);
  };

  return () => htm`
    div.app
      div.counter ${i}
      button @click=${inc}
        'Increment'
  `;
});

updateRoot(
  createRoot(document.getElementById("app")),
  Counter(),
);
```

## Templates

`ivi/template` module provides an interface for creating templates with
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates):

- `htm` creates a template with [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) nodes.
- `svg` creates a template with [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/SVGElement) nodes.

```js
htm`
div :id='app'
  h1 'Template Example'
  div.content
    ${condition ? "true" : "false"}
`
```

In this example we are creating a root element `<div id="app">` with two
children: `<h1>TemplateExample</h1>` and `<div class="content">{..}</div>`.
In an HTML it could look something like that:

```html
<div id="app">
  <h1>Template Example</h1>
  <div class="content">
    {condition ? "true" : "false"}
  </div>
</div>
```

As we can see from this example, indentation level is used for children nesting.
Also, children can be nested by declaring them on the same line as their parent,
e.g.:

```js
htm`
div 'prefix' ${expr} 'suffix'
`
```

HTML:

```html
<div>prefix{expr}suffix</div>
```

### Text Nodes

Static text nodes are declared either with `'text'` or a `#'text'#` syntax to
remove ambiguity that we can often see in HTML-like template languages:

```html
<div>
  text
  <span></span>
</div>
```

Some template languages will create text nodes with a `"prefix "` text node and
some will create a `"prefix"` text node.

```js
htm`
div
  'text'
  span
`
```

In this example we can immediately see that there won't be any whitespaces
between text node and a span element.

### Class Names

Static class names are declared with a `.` character immediately after a tag
name:

```js
htm`
div.class-one.class-two
`
```

HTML:

```html
<div class="class-one class-two"></div>
```

Dynamic class names are declared with an expression immediately after a tag
name:

```js
htm`
div${condition ? "class-one" : "class-two"}
`
```

HTML:

```html
<div class={condition ? "class-one" : "class-two"}></div>
```

Static and dynamic class names cannot be mixed together.

### Attributes

DOM attributes are assigned with `Element.setAttribute(..)` method and support
several different forms:

- `div :name='value'` - attribute with a static value `<div name="value">`.
- `div :name` - static attribute without a value `<div name>`.
- `div :name=${expr}` - dynamic attribute.

When dynamic attribute has an `undefined` value, it will be removed from the
DOM element with `Element.removeAttribute(..)` method.

### Properties

Properties are assigned with an assignment operator `Element.name = value` and
support only dynamic values:

- `div .name=${expr}` - uses previous value for diffing.
- `div *name=${expr}` - uses DOM value for diffing.

Diffing with a DOM value is useful in use cases when we use `<input>` values to
avoid triggering unnecessary `change` events.

### Styles

Styles are assigned with a `CSSStyleDeclaration.setProperty(..)`
method.

- `div ~name=${expr}`

When style has an `undefined` value, it will be removed with a
`CSSStyleDeclaration.removeProperty(..)` method.

### Events

Events are assigned with an `EventTarget.addEventListener(..)` method.

- `div @name=${expr}`

When event has an `undefined` value, it will be removed with an
`EventTarget.removeEventListener(..)` method.

### Attribute Directives

- `$${directive}`

### Template Cloning

Template cloning is an optimization that is used for cloning HTML templates
with a
[Node.cloneNode()](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
method.

By default, template cloning is enabled for all templates. But sometimes it
would be wasteful to create a template for cloning and instantiate from it when
this template is rendered just once on the page.

To disable cloning, template should have a `-c` option at the beginning. E.g.

```js
htm`-c
h1.Title ${text}
`
```

## Stateful Components

```js
/**
 * Creates a factory that produces component nodes.
 *
 * @typeparam P Property type.
 * @param create Function that creates stateful render functions.
 * @param areEqual Function that checks `props` for equality.
 * @returns Factory that produces component nodes.
 */
function component<P>(
  create: (c: Component) => (props: P) => VAny,
  areEqual?: (prev: P, next: P) => boolean,
): (props: P) => VComponent<P>;

/**
 * Invalidates component.
 *
 * @param c Component instance.
 */
function invalidate(c: Component): void;
```

### Stateless Components

Basic stateless components can be implemented with simple functions. E.g.

```js
const Button = (text, onClick) => htm`button @click=${onClick} ${text}`;
```

Stateless components with custom `areEqual` hook can be implemented by hoisting
render function in a stateful component factory. E.g.

```js
const _Button = ([text, onClick]) => htm`button @click=${onClick} ${text}`;
const Button = component(
  () => _Button,
  (prev, next) => prev[0] === next[0] && prev[1] === next[1],
);
```

## Component State

`ivi/state` module provides simple abstractions for managing component state.

### Memoized Functions

```ts
/**
 * Creates a memoized function.
 *
 * @typeparam T Input type.
 * @typeparam U Output type.
 * @param fn
 * @param areEqual `areEqual` function.
 * @returns memoized function.
 */
function memo<T, U>(
  fn: (props: T) => U,
  areEqual: (prev: T, next: T) => boolean,
): (props: T) => U;
```

```js
const FullName = component((c) => {
  const fullName = memo(
    ([firstName, lastName]) => `${firstName} ${lastName}`,
    (prev, next) => prev[0] === next[0] && prev[1] === next[1],
  );

  return ({firstName, lastName}) => htm`
    div.fullName ${fullName([firstName, lastName])}
  `;
});
```

### Reactive State

```ts
/**
 * Creates a reactive state.
 *
 * @typeparam S State type.
 * @param component Component instance.
 * @param state Initial state value.
 * @returns A tuple with a getter and setter functions.
 */
function useState<S>(component: Component, state: S): [() => S, (s: S) => void];
```

```js
const Counter = component((c) => {
   const [getCounter, setCounter] = useState(c, 0);
   const inc = () => {
     setCounter(getCounter() + 1);
   };

   return () => htm`
     div.app
       div.counter ${getCounter()}
       button @click=${inc} 'Increment'
   `;
 });
```

### Reactive State Reducer

```ts
/**
 * Creates a reactive state reducer.
 *
 * @typeparam S State type.
 * @typeparam A Reducer action type.
 * @param component Component instance.
 * @param state Initial state.
 * @param reducer Reducer function.
 * @returns State reducer.
 */
function useReducer<S, A>(
  component: Component,
  state: S,
  reducer: (state: S, action: A) => S,
): (action?: A) => S;
```

```js
const Counter = component((c) => {
   const counter = useReducer(c, 0, (state, action) => {
     if (action === "inc") {
       return state + 1;
     }
     return state;
   });
   const inc = () => {
     counter("inc");
   };

   return () => htm`
     div.app
       div.counter ${counter()}
       button @click=${inc} 'Increment'
   `;
 });
```

## Component Hooks

### Unmount

```ts
/**
 * useUnmount creates an unmount hook.
 *
 * @param component Component instance.
 * @param hook Unmount hook.
 */
function useUnmount(component: Component, hook: () => void): void;
```

```js
const UnmountMe = component((c) => {
  useUnmount(c, () => {
    console.log("unmounted");
  });

  return () => null;
});
```

### Effect

```ts
/**
 * useEffect creates a side effect hook.
 *
 * @typeparam T Hook props type.
 * @param component Component instance.
 * @param hook Side effect function.
 * @param areEqual `areEqual` function.
 * @returns Side effect hook.
 */
function useEffect = <P>(
  component: Component,
  hook: (props?: P) => (() => void) | void,
  areEqual: (prev: P, next: P) => boolean,
): (props: P) => void;
```

```js
const Counter = component((c) => {
  let i = 0;
  const timer = useEffect(c,
    (delay) => {
      const tid = setInterval(() => {
        i++;
        invalidate(c);
      }, delay);
      return () => { clearInterval(tid); };
    },
    (prev, next) => prev !== next,
  );

  return (delay) => (
    timer(delay),
    htm`span.Counter ${i}`
  );
});
```

## Root Node

`ivi/root` module provides a basic root nodes implementation that uses
[`queueMicrotask()`](https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask) to schedule updates.

```ts
/**
 * Creates a new root.
 *
 * @param p Parent DOM Element.
 * @param n Next DOM Element.
 * @returns {@link SRoot} instance.
 */
function createRoot(p: Element, n: Node | null = null): SRoot<null>;

/**
 * Updates UI subtree.
 *
 * @param root {@link SRoot} instance.
 * @param v UI representation.
 * @param forceUpdate Forces update for all components in the subtree.
 */
function updateRoot(root: SRoot<null>, v: VAny, forceUpdate: boolean = false): void;

/**
 * Disposed UI subtree and triggers all unmount hooks.
 *
 * @param root {@link SRoot} instance.
 * @param detach Detach root nodes from the DOM.
 */
function disposeRoot(root: SRoot<null>, detach: boolean): void;
```

## Directives

`ivi/directives` module provides commonly used DOM element directives.

```ts
/**
 * Creates a directive that invokes a ref function when DOM element is
 * intantiated.
 *
 * @param ref Ref function.
 * @returns {@link Directive}.
 */
function domRef(ref: (element: Element) => void): Directive;
```

```js
const InnerElement = component((c) => {
  const onDOMNodeCreated = domRef((element) => {
    // ..
  });
  return () => htm`
    div.Outer
      div.Inner $${onDOMNodeCreated}
  `;
});
```

## Utils

## State Tree DOM Utils

```ts
/**
 * Finds the closest DOM node from the {@link SNode} instance.
 *
 * @typeparam T DOM node type.
 * @param sNode {@link SNode} instance.
 * @returns DOM node.
 */
function findDOMNode<T extends Node | Text>(sNode: SNode | null): T | null;

/**
 * Checks if {@link SNode} contains a DOM element.
 *
 * @param parent {@link SNode}.
 * @param element DOM element.
 * @returns true when parent contains an element.
 */
function containsDOMElement(parent: SNode, element: Element): boolean;

/**
 * Checks if {@link SNode} has a child DOM element.
 *
 * @param parent {@link SNode}.
 * @param child DOM element.
 * @returns true when parent has a DOM element child.
 */
function hasDOMElement = (parent: SNode, child: Element): boolean;
```

## Setup

### Rollup / Vite

`@ivi/rollup-plugin` package provides a plugin that can be used with a Vite or
Rollup toolchains.

```js
import { defineConfig } from "vite";
import { ivi } from "@ivi/rollup-plugin";

export default defineConfig({
  plugins: [ivi()],
});
```

### Babel Plugin

`@ivi/babel-plugin` package provides a babel plugins for precompiling and
optimizing templates.

- `ivi` plugin precompiles templates and should be applied in a module
transformation pass.
- `iviOptimizer` deduplicates shared data and should be applied in a chunk
transformation pass.

## Advanced

### Mental Model

...

- From scratch vs incremental algorithms
- Component invalidation / Dirty checking algorithm
- Right-to-Left DOM updates
- List Diffing
- Template call-site unique identity

### Template Compilation

`@ivi/babel-plugin` module contains a babel plugin with a template compiler and
optimizer that significantly improves start-up performance.

Template compiler doesn't just eliminate compilation step during runtime, it
also hoists static expressions and deduplicates OpCodes, static data and
template factory functions. E.g.

```js
import { className } from "styles.css";

const a = (id) => htm`
div${className} :id=${id}
`;
const b = (id) => htm`
div${className} :id=${id}
`;
```

Will generate two different templates with shared data structures:

```js
import { className } from "styles.css";
import { _h, _T, _t } from "ivi";

const EMPTY_ARRAY = [];
const SHARED_DATA = ["id"];
const ELEMENT_FACTORY_1 = _h('<div class="' + className + '"></div>');
const SHARED_OP_CODES_1 = [/*..*/];
const _tpl_a = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* data */SHARED_DATA,
);
const _tpl_b = _T(
  /* factory */ELEMENT_FACTORY_1,
  /* flags */0,
  /* propOpCodes */SHARED_OP_CODES_1,
  /* childOpCodes */EMPTY_ARRAY,
  /* stateOpCodes */EMPTY_ARRAY,
  /* data */SHARED_DATA,
);

const a = (id) => _t(_tpl_a, [id]);
const b = (id) => _t(_tpl_b, [id]);
```

Quite often, OpCodes that are used for different purposes (prop,child,state)
are going to have similar values, so when OpCodes are deduplicated they are
treated as simple arrays with integers that can be used for different purposes.

Shared data `SHARED_DATA` is deduplicated into one array that is shared between
all templates.

### Custom Scheduler

ivi is designed as an embeddable solution, so that it can be integrated into
existing frameworks or web components. The core module `ivi` doesn't provide
any schedulers. When ivi component is invalidated it will find a `SRoot` node
and invoke `OnRootInvalidated()` hook.

```ts
type OnRootInvalidated<S> = (root: SRoot<S>) => void;
```

As an example, there is a simple scheduler implemented in an `ivi/root`
module that uses microtasks to batch updates.

```ts
const _queueMicrotask = queueMicrotask;

const ROOT_DESCRIPTOR: RootDescriptor = {
  // Root Descriptor should always have a `Flags.Root` flag.
  f: Flags.Root,
  // OnRootInvalidated hook
  p1: (root: SRoot) => {
    _queueMicrotask(() => {
      // Retrieves DOM slot from VNode object.
      var domSlot = root.v.p;
      // Assign parent element and next node to the render context.
      RENDER_CONTEXT.p = domSlot.p;
      RENDER_CONTEXT.n = domSlot.n;
      // Updates invalidated components.
      dirtyCheck(root.c as SNode, 0);
      // Flags should always be reassigned to clear dirty flags.
      root.f = Flags.Root;
    });
  },
  // p2 should always be initialized with `null` value. This propery is
  // initialized so that all `Descriptor` objects will have the same object
  // shape and all call-sites that access Descriptor objects will be in a
  // monorphic state.
  p2: null,
};

/**
 * Creates a new root.
 *
 * @param p Parent DOM Element.
 * @param n Next DOM Element.
 * @returns {@link SRoot} instance.
 */
export const createRoot = (p: Element, n: Node | null = null): SRoot<null> => (
  createSNode(
    // SRoot node should always have a `Flags.Root` flag.
    Flags.Root,
    // VNode object.
    {
      // VNode descriptor should be initialized with `RootDescriptor`
      d: ROOT_DESCRIPTOR,
      // VNode props object contains the location in the DOM tree where subtree
      // should be rendered.
      p: {
        // Parent DOM Element.
        p,
        // Next DOM Node.
        n,
      },
    },
    // Children should always be initialized with `null` value.
    null,
    // State `SRoot<State>` that can be used to store any value.
    null,
    // Parent SNode should always have a `null` value.
    null,
  )
);

/**
 * Updates UI subtree.
 *
 * @param root {@link SRoot} instance.
 * @param v UI representation.
 * @param forceUpdate Forces update for all components in the subtree.
 */
export const updateRoot = (
  root: SRoot<null>,
  v: VAny,
  forceUpdate: boolean = false,
): void => {
  // Retrieves DOM slot from VNode object.
  var domSlot = root.v.p;
  // Assign parent element and next node to the render context.
  RENDER_CONTEXT.p = domSlot.p;
  RENDER_CONTEXT.n = domSlot.n;
  // Flags should always be reassigned on update to clear dirty flags.
  root.f = Flags.Root;
  root.c = (
    (root.c === null)
      ? mount(
        // Parent SNode should always be a root node.
        root,
        // UI Representation.
        v,
      )
      : update(
        // Parent SNode should always be a root node.
        root,
        // Previous UI state.
        root.c as SNode,
        // UI Representation.
        v,
        // Force update.
        forceUpdate === true
          ? Flags.ForceUpdate
          : 0,
      )
  );
};

/**
 * Disposed UI subtree and triggers all unmount hooks.
 *
 * @param root {@link SRoot} instance.
 * @param detach Detach root nodes from the DOM.
 */
export const disposeRoot = (root: SRoot<null>, detach: boolean): void => {
  if (root.c !== null) {
    // Assign parent element to the render context.
    RENDER_CONTEXT.p = root.v.p.p;
    // Unmounts a root subtree.
    unmount(
      // Previous UI state.
      root.c as SNode,
      // Detach root nodes.
      detach,
    );
  }
};
```

## License

[MIT](http://opensource.org/licenses/MIT)
