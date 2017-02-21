# Keep Alive

## Potential Use Cases

- Preserving internal state when switching between pages/tabs/etc.
- Improving performance by reusing DOM subtrees with similar shape (recycling).

## API

```ts
function $keepAlive<P>(
    props: P,
    ctrl: (removed: VNode<any> | undefined, props?: P) => boolean | VNode<any> | null,
    render: (props?: P) => VNode<any>,
): VNode<P>;
```

`$keepAlive` function creates a virtual node for stateless component that has a special behavior that is controlled
by a `ctrl` function.

When `ctrl` function receives `removed` vnode, it means that component is destroyed and removed vnode can be
saved, so it can be reused later. When vnode is saved, `ctrl` function should return `true` value, otherwise vnode will
be destroyed. When `removed` parameter is `undefined`, it means that keepAlive component tries to retrieve existing
vnode to reuse.

## Examples

### Show/Hide child

```ts
class ShowHide extends Component<{ show: boolean }> {
    keepAliveChild: VNode<any> = null;

    render() {
        return $h("div").children(
            this.props.show ?
                $keepAlive((props, removed) => {
                    if (removed) {
                        this.keepAliveChild = removed;
                        return true;
                    }
                    return this.keepAliveChild;
                }, () => $h("div").children("Hide Me!")) :
                null
        );
    }
}
```

### Page Switching

```ts
class PageManager extends Component<{ pageID: string }> {
    keepAliveLRUCache = new LRUCache({ maxItems: 5 });

    render() {
        return $h("div").children(
            $keepAlive({
                id: this.props.pageID,
            }, (removed, props) => {
                if (removed) {
                    this.keepAliveLRUCache.push(removed, props.id);
                    return true;
                }
                return this.keepAliveLRUCache.pop(props.id);
            }, (props) => $h("div").children(props.id)).key(pageId)
        );
    }
}
```

### Recycling

```ts
class ItemList extends Component<{ items: string[] }> {
    keepAlivePool = new ObjectPool({ maxItems: 10 });

    render() {
        return $h("div").children(
            this.props.items.map((i) => $keepAlive({
                    content: i,
                }, (removed, props) => {
                    if (removed) {
                        return this.keepAlivePool.push(removed);
                    }
                    return this.keepAlivePool.pop(props.id);
                }, (props) => $h("div").children(props.content)).key(i))
        );
    }
}
```
