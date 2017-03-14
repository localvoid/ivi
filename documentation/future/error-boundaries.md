# Error Boundaries

Error boundaries can be used to catch errors during render/update.

## API

```ts
$catchError(
    child: VNode<any>,
    errorHandler: (e: Error) => VNode<any>,
): VNode<any>;
```

`$catchError` function creates a virtual node with a special behavior, so it can catch render and update errors from
children.

`errorHandler` function should return virtual node that will be used as a replacement of a child when error is raised.

## Example

```ts
function ErrorComponent() {
    throw Error("error");
}

render(
    $catchError(
        $c(ErrorComponent),
        function(e: Error) {
            return $t(e.toString());
        },
    ),
    document.getElementById("main")!,
);
```
