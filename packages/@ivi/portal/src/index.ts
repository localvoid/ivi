import type { VComponent, VAny, Component } from "ivi";
import { component, useUnmount, invalidate, LIST_DESCRIPTOR } from "ivi";

export interface PortalEntry {
  v: VAny;
}

const invalidatePortalContainers = (containers: Component[]) => {
  for (let i = 0; i < containers.length; i++) {
    invalidate(containers[i]);
  }
};

const renderPortalEntry = (entry: PortalEntry) => entry.v;

/**
 * Creates a stateless node for a portal container and component factory that
 * renders into a portal container.
 */
export const createPortal = (): [VComponent, (v: VAny) => VComponent] => {
  // Can't imagine any use case when there are many entries rendered into a
  // portal, so we can use an array, and remove from it with an O(n) operation.
  var _entries: PortalEntry[] = [];
  // Completely useless feature, but to make the current API sound, it is
  // necessary to allow attaching multiple containers into different places.
  // It is going to duplicate everything that is rendered in this portal into
  // multiple places.
  var _containers: Component[] = [];

  return [
    // Portal container.
    component((c) => {
      // Add container to a containers registry.
      _containers.push(c);
      useUnmount(c, () => {
        // Remove container from a containers registry.
        _containers.splice(_containers.indexOf(c), 1);
      });
      // Manually create stateless node for dynamic lists, so that we can use
      // object identity as keys without creating additional arrays.
      return () => ({
        d: LIST_DESCRIPTOR,
        p: {
          // Keys
          k: _entries,
          // Stateless Nodes
          v: _entries.map(renderPortalEntry),
        }
      });
    })(),
    // Portal component factory.
    component<VAny>((c) => {
      // Object that contains stateless node that is rendered into a portal.
      // It is wrapped, so that we can use it to uniquely identify it among
      // different entries.
      var entry: PortalEntry = { v: null };
      _entries.push(entry);
      useUnmount(c, () => {
        _entries.splice(_entries.indexOf(entry), 1);
        invalidatePortalContainers(_containers);
      });
      return (v) => {
        entry.v = v;
        invalidatePortalContainers(_containers);
        return null;
      };
    }),
  ];
};
