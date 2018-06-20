const SUBSCRIBERS = /*#__PURE__*/new Map<string, Array<(s: any) => void>>();

/**
 * Subscribe to a topic.
 *
 * @param topic - Topic
 * @param sub - Subscriber
 */
export function debugSub<S>(topic: string, sub: (s: S) => void): void {
  let ss = SUBSCRIBERS.get(topic);
  if (ss === void 0) {
    SUBSCRIBERS.set(topic, ss = []);
  }
  ss.push(sub);
}

/**
 * Publish state.
 *
 * @param topic - Topic
 * @param s - State
 */
export function debugPub<S>(topic: string, s: S): void {
  const ss = SUBSCRIBERS.get(topic);
  if (ss !== void 0) {
    for (const sub of ss) {
      sub(s);
    }
  }
}
