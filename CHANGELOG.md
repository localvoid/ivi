<a name="0.14.0"></a>
# [0.14.0](https://github.com/localvoid/ivi/compare/0.13.0...0.14.0) (2018-06-16)


### Bug Fixes

* **events:** fix incorrect imports `ivi-events` => `events` ([368c387](https://github.com/localvoid/ivi/commit/368c387))
* **gestures:** fixes browser quirk with TouchMove events ([9fedf9e](https://github.com/localvoid/ivi/commit/9fedf9e))
* **test:** fix rendering attrs to snapshot (syncable values) ([9f1de27](https://github.com/localvoid/ivi/commit/9f1de27))
* **types:** support number types for css property "bottom" ([4ff9486](https://github.com/localvoid/ivi/commit/4ff9486))
* **vdom:** remove obsoleted checks in DEBUG mode ([4274d57](https://github.com/localvoid/ivi/commit/4274d57))


### Code Refactoring

* **vdom:** rename `newPropsReceived()` to `propsChanged()` ([6434f5a](https://github.com/localvoid/ivi/commit/6434f5a))


### Features

* **core:** add underscore `_` as an alias to `undefined` ([35834f4](https://github.com/localvoid/ivi/commit/35834f4))
* **debug:** add DEBUG pubsub to expose internal state ([466aba2](https://github.com/localvoid/ivi/commit/466aba2))
* **gestures:** add multitouch transform gesture recognizer ([28991fe](https://github.com/localvoid/ivi/commit/28991fe))
* **gestures:** change gesture recognizers lifecycle ([af2b86a](https://github.com/localvoid/ivi/commit/af2b86a))
* **gestures:** fix bugs, add more gesture recognizers ([a63b27f](https://github.com/localvoid/ivi/commit/a63b27f))
* **gestures:** fully working gesture events prototype ([b310dcf](https://github.com/localvoid/ivi/commit/b310dcf))
* **scheduler:** add `beforeUpdate` / `afterUpdate` repeatable tasks ([f599405](https://github.com/localvoid/ivi/commit/f599405))
* **scheduler:** remove frame task queue `after` ([d3c4f72](https://github.com/localvoid/ivi/commit/d3c4f72))
* **scheduler:** remove visibility observers ([d816fda](https://github.com/localvoid/ivi/commit/d816fda))
* **types:** add types for specialized properties in attribute lists ([69cc9a2](https://github.com/localvoid/ivi/commit/69cc9a2))
* **vdom:** add `mapIterable()` to support iterable objects ([c09c5cb](https://github.com/localvoid/ivi/commit/c09c5cb))
* improve dev mode checks ([4e7db28](https://github.com/localvoid/ivi/commit/4e7db28))
* **vdom:** add universal syncable value `PROPERTY()` ([111c309](https://github.com/localvoid/ivi/commit/111c309))
* **vdom:** don't trigger `updated()` for all parents ([5c75401](https://github.com/localvoid/ivi/commit/5c75401))
* **vdom:** new attribute syncing algorithm ([564957d](https://github.com/localvoid/ivi/commit/564957d))
* **vdom:** remove support for null nodes returned from `mapIterable()` ([e3c88a5](https://github.com/localvoid/ivi/commit/e3c88a5))
* **vdom:** rename instance getters ([bbcf255](https://github.com/localvoid/ivi/commit/bbcf255))
* **vdom:** replace VNode methods `a()` and `s()` with factory args ([4f00a52](https://github.com/localvoid/ivi/commit/4f00a52))
* remove factories for obsolete elements, improve types for attrs ([c2b9173](https://github.com/localvoid/ivi/commit/c2b9173))
* rename INPUT_VALUE() and INPUT_CHECKED() to VALUE() and CHECKED() ([943a414](https://github.com/localvoid/ivi/commit/943a414))


### Performance Improvements

* **events:** improve event dispatcher algorithm ([352287a](https://github.com/localvoid/ivi/commit/352287a))


### BREAKING CHANGES

* **vdom:** `getDOMInstanceFromVNode()` and `getComponentInstanceFromVNode()` were renamed to `getDOMNode()` and
`getComponent()`
* **vdom:** `VNode` methods `value()` and `unsafeHTML()` were removed.

Before:

```ts
input("", { type: "checked" }).value(true);
use("", { "xlink:href": "sprite.svg#a" });
div().unsafeHTML("abc");
```

After:

```ts
input("", { type: "checked", checked: CHECKED(true) });
use("", { "xlink:href": XLINK_ATTR("sprite.svg#a") });
div("", { unsafeHTML: UNSAFE_HTML("abc") });
```

* **scheduler:** `currentFrameAfter()` and `nextFrameAfter()` functions were removed.
* **scheduler:** DOM reader and animation tasks were replaced with `beforeUpdate()` and `afterUpdate()` task lists.
* **vdom:** Component lifecycle method `newPropsReceived()` renamed to `propsChanged()`.
* **vdom:** VNode methods `a()` and `s()` were replaced with optional arguments for all element factory functions.

Before:

```ts
div("className").a({ id: "ID" }).s({ color: "red" });
```

After:

```ts
div("className", { id: "ID" }, { color: "red" });
```

* **vdom:** `updated()` lifecycle is now triggered only for components that were updated. Parent components won't be
receiving any information that their children were updated.

Initially it was implemented to solve use cases with jumping scroll
positions when children layout is modified. But there is a better way,
scheduler allows to register repeatable tasks that will be invoked
before any rendering to read from the DOM, and after all rendering is
done, this hooks solve this use case perfectly. And since I don't know
about any use cases that would require such behavior, it would be better
to reduce API surface. All major frameworks doesn't support such
behavior.



<a name="0.13.0"></a>
# [0.13.0](https://github.com/localvoid/ivi/compare/0.12.0...0.13.0) (2018-05-29)


### Bug Fixes

* **events:** use correct options for active events ([c25e3eb](https://github.com/localvoid/ivi/commit/c25e3eb))


### Features

* **events:** add checks in DEBUG mode when removing event listeners ([a28cde2](https://github.com/localvoid/ivi/commit/a28cde2))
* **events:** completely redesigned synthetic events ([a0ad90d](https://github.com/localvoid/ivi/commit/a0ad90d))


### BREAKING CHANGES

* **events:** `ivi-events` package were removed, event handler factories should be imported from `ivi` package.



<a name="0.12.0"></a>
# [0.12.0](https://github.com/localvoid/ivi/compare/0.11.1...0.12.0) (2018-05-24)


### Code Refactoring

* **events:** remove methods from synthetic events ([e6d3f1e](https://github.com/localvoid/ivi/commit/e6d3f1e))


### Features

* **events:** check returned event flags in DEBUG mode ([2fc17db](https://github.com/localvoid/ivi/commit/2fc17db))


### Performance Improvements

* **gestures:** optimize velocity tracker ([aeba6bd](https://github.com/localvoid/ivi/commit/aeba6bd))


### BREAKING CHANGES

* **events:** Synthetic event methods `preventDefault()` and `stopPropagation()` were removed.

Before:

```ts
onClick((ev) => {
  ev.preventDefault();
  ev.stopPropagation();
});
```

After:

```ts
onClick(() => EventFlags.PreventDefault | EventFlags.StopPropagation);
```



<a name="0.11.1"></a>
## [0.11.1](https://github.com/localvoid/ivi/compare/0.11.0...0.11.1) (2018-05-15)


### Bug Fixes

* **vdom:** setup scheduler when `_update()` is invoked ([0cdf978](https://github.com/localvoid/ivi/commit/0cdf978))



<a name="0.11.0"></a>
# 0.11.0 (2018-05-14)


### Bug Fixes

* **gestures:** replace `FEATURES` with `TOUCH_EVENTS` ([30f154e](https://github.com/localvoid/ivi/commit/30f154e))
* **scheduler:** ignore autofocusing on text nodes ([71b45ae](https://github.com/localvoid/ivi/commit/71b45ae))


### Code Refactoring

* **core:** split feature detection flags into several constants ([23bb7d2](https://github.com/localvoid/ivi/commit/23bb7d2))
* remove specialized input and button factories ([6ec699e](https://github.com/localvoid/ivi/commit/6ec699e))
* **vdom:** change `shouldUpdate` API for stateless components ([e4daf4c](https://github.com/localvoid/ivi/commit/e4daf4c))
* **vdom:** rename `children()` to `fragment()` ([b832e67](https://github.com/localvoid/ivi/commit/b832e67))
* **vdom:** rename function `component()` to `statefulComponent()` ([b591819](https://github.com/localvoid/ivi/commit/b591819))
* **vdom:** rename function `elementFactory()` to `element()` ([6324a91](https://github.com/localvoid/ivi/commit/6324a91))


### Features

* **debug:** enable HTML nesting rules violation checker ([2695a8b](https://github.com/localvoid/ivi/commit/2695a8b))
* **test:** add `hasFactory()` predicate ([8abbdce](https://github.com/localvoid/ivi/commit/8abbdce))
* **test:** add `hasNextSibling()` predicate ([5d10979](https://github.com/localvoid/ivi/commit/5d10979))
* **test:** add support for `<stopDirtyChecking />` nodes to snapshots ([cdfa1fd](https://github.com/localvoid/ivi/commit/cdfa1fd))
* **vdom:** check context child node type in dev mode ([8c8f97f](https://github.com/localvoid/ivi/commit/8c8f97f))
* **vdom:** check return type for render functions in dev mode ([c479ca4](https://github.com/localvoid/ivi/commit/c479ca4))
* **vdom:** replace `autofocus()` method with function ([acf3bf4](https://github.com/localvoid/ivi/commit/acf3bf4))
* **vdom:** use `value()` method to assign checked value for inputs ([39c8b40](https://github.com/localvoid/ivi/commit/39c8b40))


### BREAKING CHANGES

* **vdom:** function `children()` is renamed to `fragment()`.
* **vdom:** `shouldUpdate` for stateless components is now assigned with a `withShouldUpdate()` function.

Before:

```js
const C = statelessComponent(
  (props) => h.div().c(props.title),
  (prev, next) => (prev.title !== next.title),
);
```

After:

```js
const C = withShouldUpdate(
  (prev, next) => (prev.title !== next.title),
  statelessComponent(
    (props) => h.div().c(props.title),
  ),
);
```

* specialized input and button factories were removed.

Before:

```js
h.inputCheckbox();
h.buttonReset();
```

After:

```js
h.input().a({ type: "checkbox" });
h.button().a({ type: "reset" });
```

* **vdom:** `elementFactory()` function renamed to `element()`
* **vdom:** `component()` function renamed to `statefulComponent()`
* **vdom:** VNode method `checked()` is removed.

Before:

```js
h.inputCheckbox().checked(true);
```

After:

```js
h.inputCheckbox().value(true);
```

* **vdom:** `VNode` method `autofocus()` is replaced with `autofocus()` function.

Before:

```js
h.div().autofocus(true);
```

After:

```js
autofocus(h.div());
```

* **core:** `FEATURE` constant and `FeatureFlags` enum are replaced with:

- `PASSIVE_EVENTS`
- `KEYBOARD_EVENT_KEY`
- `MOUSE_EVENT_BUTTONS`
- `TOUCH_EVENTS`
- `POINTER_EVENTS`
- `INPUT_DEVICE_CAPABILITIES`
