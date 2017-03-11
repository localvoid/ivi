# Known Issues

## Input Values

When input value is changing, it doesn't provide any information how its been changed, and the only thing we can do is
to retrieve the latest value from input element. This information isn't enough when our applications are
nondetermenistic.

Imagine this situation:

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

### Simple solution with locks

```ts
class Form extends Component<null> {
    private lock = false;
    private value = "";

    private onInput = Event.onInput((ev) => {
        if (!this.lock) {
            this.value = (ev.target as HTMLInputElement).value;
        }
    });

    private onSubmit = Events.onSubmit((ev) => {
        ev.preventDefault();

        if (this.value) {
            this.value = "";
            this.lock = true;
            this.invalidate();
        }
    });

    render() {
        return $h("form").children([
            $i("text")
                .events({ input: this.onInput })
                .value(this.value);
        ]);
    }

    updated() {
        this.lock = false;
    }
}
```

## Returning multiple nodes from render

There is no support for fragments, components can return just one node.

## Web Components

There are no proper support for Web Components right now, and there are no plans to add it until they will start getting
widespread adoption.

It is still possible to use Web Components, ivi just doesn't have a nice API to work with them.

## Multiple ivi instances in one document

Application will work when there is only one ivi instance. Building application that depends on several different
versions of ivi is not supported.

## Rendering into external documents

There are many issues with rendering into external documents, so instead of fixing all this issues by significantly
overcomplicating code base, ivi just doesn't work with this use cases.

This use cases are usually has way much better solutions than direct manipulation of external documents. For example,
by communicating between different documents with a
[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) API.

## UIWebView

There are several issues with iOS `UIWebView`. If you are using Cordova to build an application, switch to a modern
`WKWebView` API.
