# Children Reconciliation

Children reconciliation algorithm in ivi works in almost exactly the same way as [React Reconciliation](https://facebook.github.io/react/docs/reconciliation.html).

The key difference is that ivi algorithm tries to find a minimum number of DOM operations when rearranging children
nodes.

Finding a minimum number of DOM operations is not just about performance, it is also about preserving internal state
of DOM nodes. Moving DOM nodes isn't always a side-effect free operation, it may restart animations, drop focus, reset
scrollbar positions, stop video playback, etc.

## Defined behaviour

This is the behaviour that you can rely on when thinking how syncing algorithm will update children lists.

- Inserted nodes won't cause any nodes to move.
- Removed nodes won't cause any nodes to move.
- Moved nodes will be rearranged in a correct positions with a minimum number of DOM operations.

## Undefined behaviour

Moved nodes can be rearranged in any way. `[ab] => [ba]` transformation can move node `a` or node `b`. Applications
shouldn't rely on this behaviour.
