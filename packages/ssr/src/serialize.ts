import { escapeJavascript } from "./escape";

/**
 * Serialize state.
 */
export function serializeState(data: any): string {
    return escapeJavascript(JSON.stringify(data));
}
