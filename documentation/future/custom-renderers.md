# Custom Renderers

## Use Cases

- Seamless integration with canvas

## API

```ts
interface Renderer {
    render: (vnode: VNode) => void,
    augment: (vnode: VNode) => void,
    sync: (a: VNode, b: VNode) => void,
    remove: (vnode: VNode) => void,
}

function $customRenderer(
    renderer: Renderer,
    child: VNode,
): VNode;
```

`Renderer` interface provides entry points that will be used to change the behavior of the current renderer.

## Example

```ts
function $canvas(child: VNode) {
    return $customRenderer(CanvasRenderer, child);
}

render(
    $h("div").children(
        $canvas(
            $collisionBox()
                .events(CanvasEvents.onClick(() => console.log("click")))
                .children(
                    $text("Hello Canvas"),
                ),
        ),
    ),
    document.getElementById("main"),
);
```
