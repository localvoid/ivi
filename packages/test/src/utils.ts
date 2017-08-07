import { EventHandler, EventSource } from "ivi-events";
import { VNode, VNodeFlags } from "ivi";

export function containsClassName(classNames: string, className: string): boolean {
  return classNames
    .split(" ")
    .map((c) => c.trim())
    .some((c) => c === className);
}

export function matchValues(
  props: { [key: string]: any } | null,
  match: { [key: string]: any } | null,
): boolean {
  if (match !== null) {
    const keys = Object.keys(match);
    if (keys.length > 0) {
      if (props === null) {
        return false;
      }
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (props.hasOwnProperty(key) === false || props[key] !== match[key]) {
          return false;
        }
      }
    }
  }
  return true;
}

export function matchKeys(
  props: { [key: string]: any } | null,
  match: { [key: string]: boolean },
): boolean {
  const keys = Object.keys(match);
  if (keys.length > 0) {
    if (props === null) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (match[key] !== props.hasOwnProperty(key)) {
        return false;
      }
    }
  }
  return true;
}

export function containsEventHandler(
  eventHandlers: Array<EventHandler | null> | EventHandler | null,
  eventSource: EventSource,
): boolean {
  if (eventHandlers !== null) {
    if (Array.isArray(eventHandlers)) {
      for (let i = 0; i < eventHandlers.length; i++) {
        const h = eventHandlers[i];
        if (h !== null && h.source === eventSource) {
          return true;
        }
      }
    } else {
      return (eventHandlers.source === eventSource);
    }
  }
  return false;
}

const VNodeLooseMatchFlags = 0
  | VNodeFlags.Text
  | VNodeFlags.Element
  | VNodeFlags.ComponentFunction
  | VNodeFlags.ComponentClass
  | VNodeFlags.InputElement
  | VNodeFlags.TextAreaElement
  | VNodeFlags.MediaElement
  | VNodeFlags.SvgElement
  | VNodeFlags.Connect
  | VNodeFlags.UpdateContext
  | VNodeFlags.KeepAlive
  | VNodeFlags.VoidElement;

export function isVNodeLooseMatch(a: VNode<any>, b: VNode<any>): boolean {
  const bFlags = b._flags;
  if (((a._flags ^ bFlags) & VNodeLooseMatchFlags) !== 0) {
    return false;
  }

  if (a._tag !== b._tag) {
    return false;
  }

  if ((bFlags & VNodeFlags.Element) !== 0) {
    if (b._props !== null) {
      if (a._props === null) {
        return false;
      }

      if (matchValues(a._props.attrs, b._props.attrs) === false) {
        return false;
      }
      if (matchValues(a._props.syle, b._props.style) === false) {
        return false;
      }

    }
  }
  return true;
}
