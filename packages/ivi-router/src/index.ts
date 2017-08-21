import { EventSourceClick, SyntheticEventFlags, getEventTarget } from "ivi-events";
import { RouteNode, ResolveResult, resolve } from "routekit-resolver";

export function initRouter<T>(
  baseURL: string,
  routes: RouteNode<T>,
  mergeData: (a: T | undefined, b: T | undefined, node: RouteNode<T>) => T,
  onChange: (result: ResolveResult<T> | null) => void,
): void {
  const location = window.location;
  const history = window.history;

  let path = location.pathname;

  const goTo = function (nextPath: string): void {
    if (path !== nextPath) {
      path = nextPath;
      onChange(resolve(routes, nextPath, mergeData));
    }
  };

  window.addEventListener("popstate", function (ev) {
    goTo(location.pathname);
  });

  EventSourceClick.addAfterListener(function (ev) {
    if ((ev.flags & (SyntheticEventFlags.PreventedDefault | SyntheticEventFlags.StoppedPropagation)) === 0) {
      const anchor = findAnchorNode(getEventTarget(ev.target) as Element);
      if (anchor !== null) {
        const href = anchor.href;
        if (href.startsWith(baseURL)) {
          history.pushState(null, "", href);
          goTo(anchor.pathname);
        }
      }
    }
  });

  onChange(resolve(routes, path, mergeData));
}

function findAnchorNode(element: Element): HTMLAnchorElement | null {
  do {
    if (element.tagName === "A") {
      return element as HTMLAnchorElement;
    }
    element = element.parentNode as Element;
  } while (element !== null);

  return null;
}
