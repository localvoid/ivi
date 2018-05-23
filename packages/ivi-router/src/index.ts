import { EVENT_SOURCE_CLICK, SyntheticEventFlags, addAfterListener } from "ivi-events";
import { RouteMap, ResolveResult, resolve } from "routekit-resolver";

export function initRouter<A, T>(
  baseURL: string,
  routes: RouteMap<T>,
  reducer: (a: A, b: T) => A,
  data: A,
  onChange: (result: ResolveResult<A> | null) => void,
): void {
  const location = window.location;
  const history = window.history;

  let path = location.pathname;

  const goTo = function (nextPath: string): void {
    if (path !== nextPath) {
      path = nextPath;
      onChange(resolve(routes, reducer, nextPath, data));
    }
  };

  window.addEventListener("popstate", function (ev) {
    goTo(location.pathname);
  });

  addAfterListener(EVENT_SOURCE_CLICK, (ev) => {
    if ((ev.flags & (SyntheticEventFlags.PreventedDefault | SyntheticEventFlags.StoppedPropagation)) === 0) {
      const anchor = findAnchorNode(ev.target as Element);
      if (anchor !== null) {
        const href = anchor.href;
        if (href.startsWith(baseURL)) {
          history.pushState(null, "", href);
          goTo(anchor.pathname);
        }
      }
    }
  });

  onChange(resolve(routes, reducer, path, data));
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
