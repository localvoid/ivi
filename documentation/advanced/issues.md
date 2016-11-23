# Known Issues

## Input Values

When input value is changing, it doesn't provide any information how its been changed, and the only way to get the
latest value is to retrieve it from input element. Now imagine this situation:

- Input Event is fired when value has been changed.
- Saving the latest value in external store.
- Submit Event is fired when user is pressed `enter` button.
- Clearing the latest value in the external store (input element value is still the same, we've changed just value in
 the store).
- Another Input Event is fired because user entered one more letter.
- Because we don't have enough information about text transformations, we just took the latest value from input element
and updated external store. And this value will be `oldValue + newValue`.
- Animation Frame is fired.
- View is updated and now input element has `oldValue + newValue`.

That is the reason why many UI libraries doesn't use `requestAnimationFrame`, but it solves this issue only for simple
apps. In many existing apps the issue is still exist because it is quite common that async behaviour is added when
action is processed with some new cool library that manages app state.

Most of the time nobody will notice such behavior and thousands "broken" apps are actually working fine. There are no
ideal solutions at this time, all existing solutions has its own pros and cons.

In the future, it will be possible to solve this issue with new [input events](https://w3c.github.io/input-events/).
