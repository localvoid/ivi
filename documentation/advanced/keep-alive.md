# Keep Alive

## Status

Experimental

## Use Cases

- Preserving internal state when switching between pages/tabs/etc.
- Improving performance by reusing DOM subtrees with similar shape (recycling).

## API

```ts
function keepAlive<P>(
    handler: (disposed: IVNode<any> | null, props: P) => IVNode<any> | null,
    child: VNode<any>,
    props: P,
): VNode<P>;
function keepAlive(
    handler: (disposed: IVNode<any> | null) => IVNode<any> | null,
    child: VNode<any>,
): VNode<null>;
```

`keepAlive` function creates a virtual node with a special keep alive behavior that is controlled by a
`handler` function.

When `handler` function receives `disposed` vnode, it means that vnode is disposed and it can be saved, so it can be
reused later. When vnode is saved, `handler` function should return `disposed` value, otherwise vnode
will be disposed. When `disposed` parameter is `null`, it means that keepAlive component tries to retrieve existing
vnode to reuse.

## Examples

### Show/Hide child

```ts
class ShowHide extends Component<{ show: boolean }> {
    keepAliveChild: VNode<any> | null = null;
    keepAlive = (disposed) => {
        if (disposed) {
            return this.keepAliveChild = disposed;
        }
        return this.keepAliveChild;
    };

    render() {
        return h.div().children(
            this.props.show ?
                keepAlive(this.keepAlive, h.div().children("Hide Me!")) :
                null,
        );
    }
}
```

### Page Switching

```ts
class PageManager extends Component<{ pageID: string }> {
    keepAliveLRUCache = new LRUCache<VNode<any>>({ maxItems: 5 });
    keepAlive = (removed, id) => {
        if (removed) {
            return this.keepAliveLRUCache.push(removed, id);
        }
        return this.keepAliveLRUCache.pop(id);
    }

    render() {
        const pageID = this.props.pageID;

        return h.div().children(
            keepAlive(this.keepAlive, h.div().children(pageID), pageId)
                .key(pageID),
        );
    }
}
```

### Recycling

```ts
class ItemList extends Component<{ items: string[] }> {
    keepAlivePool = new ObjectPool<VNode<any>>({ maxItems: 10 });
    keepAlive = (removed, id) => {
        if (removed) {
            return this.keepAlivePool.push(removed);
        }
        return this.keepAlivePool.pop();
    }

    render() {
        return h.div().children(
            this.props.items.map((i) => keepAlive(this.keepAlive, h.div().children(i), i).key(i)),
        );
    }
}
```
