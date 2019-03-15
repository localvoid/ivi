import { EVENT_DISPATCHER_CLICK, SyntheticEventFlags, afterNativeEvent } from "ivi";
import { RouteMap, resolve } from "routekit-resolver";

export interface Router<T> {
  state: T;
  vars: string[];
  nav(path: string): void;
}

export function setupRouter<T>(
  baseURL: string,
  map: RouteMap<T>,
  notFoundState: T,
  onChange: (router: Router<T>) => void,
): Router<T> {
  const location = window.location;
  const history = window.history;
  let router: Router<T>;
  let path = "";

  const update = (nextPath: string) => {
    path = nextPath;
    const result = resolve(map, path);
    if (result === null) {
      router.state = notFoundState;
      router.vars = [];
    } else {
      router.state = result.state;
      router.vars = result.vars;
    }
  };

  const nav = (nextPath: string) => {
    if (path !== nextPath) {
      // iOS Safari limits to 100 pushState calls
      try {
        history.pushState(null, "", nextPath);
      } catch (e) { /**/ }
      update(nextPath);
      onChange(router);
    }
  };

  router = { state: notFoundState, vars: [], nav };
  update(location.pathname);

  window.addEventListener("popstate", () => {
    update(location.pathname);
    onChange(router);
  });

  afterNativeEvent(EVENT_DISPATCHER_CLICK!, (ev) => {
    const native = ev.native;
    if (
      ((ev.flags & (SyntheticEventFlags.PreventedDefault | SyntheticEventFlags.StoppedPropagation)) === 0) &&
      native.button === 0 &&
      !(native.metaKey || native.altKey || native.ctrlKey || native.shiftKey)
    ) {
      const anchor = findAnchorNode(ev.native.target as Element);
      if (anchor !== null) {
        const href = anchor.href;
        if (href.startsWith(baseURL)) {
          ev.flags |= SyntheticEventFlags.PreventedDefault;
          history.pushState(null, "", href);
          nav(anchor.pathname);
        }
      }
    }
  });

  return router;
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

export function setupHashRouter<T>(
  map: RouteMap<T>,
  notFoundState: T,
  onChange: (router: Router<T>) => void,
): Router<T> {
  const location = window.location;
  let router: Router<T>;
  let path = "";

  const update = () => {
    path = decodeURIComponent(location.hash);
    path = (path.length > 1) ? path.slice(1) : "/";
    const result = resolve(map, path);
    if (result === null) {
      router.state = notFoundState;
      router.vars = [];
    } else {
      router.state = result.state;
      router.vars = result.vars;
    }
  };

  const nav = (nextPath: string) => {
    if (path !== nextPath) {
      location.hash = nextPath;
    }
  };

  router = { state: notFoundState, vars: [], nav };
  update();

  window.addEventListener("hashchange", () => {
    update();
    onChange(router);
  });

  return router;
}
