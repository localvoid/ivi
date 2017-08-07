import { escapeJavascript } from "./escape";

/**
 * serializeState serializes javascript state into string and performs escaping to prevent from XSS attacks.
 *
 * @param data State.
 * @returns Serialized state.
 */
export function serializeState(data: any): string {
  return escapeJavascript(JSON.stringify(data));
}
