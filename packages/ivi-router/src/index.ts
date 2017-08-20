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

  const goTo = function (url: string): void {
    history.pushState(null, "", url);
  };

  let path = location.pathname;
  onChange(resolve(routes, path, mergeData));

  window.addEventListener("popstate", function (ev) {
    const nextPath = location.pathname;
    if (path !== nextPath) {
      path = nextPath;
      onChange(resolve(routes, nextPath, mergeData));
    }
  });

  EventSourceClick.addAfterListener(function (ev) {
    if ((ev.flags & (SyntheticEventFlags.PreventedDefault | SyntheticEventFlags.StoppedPropagation)) === 0) {
      const anchor = findAnchorNode(getEventTarget(ev.target) as Element);
      if (anchor !== null) {
        const href = anchor.href;
        if (href.startsWith(baseURL)) {
          goTo(href);
        }
      }
    }
  });
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
