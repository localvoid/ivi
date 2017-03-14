# Keep Alive

## Status

Experimental

## Use Cases

- Preserving internal state when switching between pages/tabs/etc.
- Improving performance by reusing DOM subtrees with similar shape (recycling).

## API

```ts
function $keepAlive<P = null>(
    handler: (removed: VNode<any> | undefined, props?: P) => boolean | VNode<any> | null,
    child: VNode<any>,
    props?: P,
): VNode<P>;
```

`$keepAlive` function creates a virtual node with a special behavior that is controlled by a `ctrl` function.

When `handler` function receives `removed` vnode, it means that component is destroyed and removed vnode can be
saved, so it can be reused later. When vnode is saved, `handler` function should return `true` value, otherwise vnode
will be destroyed. When `removed` parameter is `undefined`, it means that keepAlive component tries to retrieve existing
vnode to reuse.

## Examples

### Show/Hide child

```ts
class ShowHide extends Component<{ show: boolean }> {
    keepAliveChild: VNode<any> | null = null;

    render() {
        return $h("div").children(
            this.props.show ?
                $keepAlive(
                    (removed) => {
                        if (removed) {
                            this.keepAliveChild = removed;
                            return true;
                        }
                        return this.keepAliveChild;
                    },
                    $h("div").children("Hide Me!"),
                ) : null,
        );
    }
}
```

### Page Switching

```ts
class PageManager extends Component<{ pageID: string }> {
    keepAliveLRUCache = new LRUCache<VNode<any>>({ maxItems: 5 });

    render() {
        const pageID = this.props.pageID;

        return $h("div").children(
            $keepAlive(
                (removed, id) => {
                    if (removed) {
                        this.keepAliveLRUCache.push(removed, id);
                        return true;
                    }
                    return this.keepAliveLRUCache.pop(id);
                },
                $h("div").children(pageID),
                pageId,
            ).key(pageID),
        );
    }
}
```

### Recycling

```ts
class ItemList extends Component<{ items: string[] }> {
    keepAlivePool = new ObjectPool<VNode<any>>({ maxItems: 10 });

    render() {
        return $h("div").children(
            this.props.items.map((i) => $keepAlive(
                (removed, id) => {
                    if (removed) {
                        return this.keepAlivePool.push(removed);
                    }
                    return this.keepAlivePool.pop();
                },
                $h("div").children(i),
                i,
            ).key(i)),
        );
    }
}
```
