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
