import { type Component } from "./core.js";

/**
 * Dispatch Event options.
 */
export interface DispatchEventOptions {
  /**
   * Option indicating whether the event bubbles. The default is `true`.
   */
  bubbles?: boolean;
  /**
   * Option indicating whether the event can be cancelled. The default is
   * `false`.
   */
  cancelable?: boolean;
  /**
   * Option indicating whether the event will trigger listeners outside of a
   * shadow root. The default is `false`.
   */
  composed?: boolean;
}

export type EventDispatcher = {
  (component: Component): boolean;
  <T>(component: Component, value: T): boolean;
};

export const eventDispatcher = (
  eventType: string,
  options?: DispatchEventOptions,
): EventDispatcher => _eventDispatcher;

export const _eventDispatcher = () => {
  throw Error("event dispatcher function isn't available during Server-Side Rendering.");
};

export const findDOMNode = () => {
  throw Error("`findDOMNode` function isn't available during Server-Side Rendering.");
};

export const containsDOMElement = () => {
  throw Error("`containsDOMElement` function isn't available during Server-Side Rendering.");
};

export const hasDOMElement = () => {
  throw Error("`hasDOMElement` function isn't available during Server-Side Rendering.");
};
