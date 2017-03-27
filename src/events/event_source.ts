import { SyntheticEvent } from "./synthetic_event";

export interface EventSource {
    addListener(handler: (ev: SyntheticEvent<any>) => void): void;
    removeListener(handler: (ev: SyntheticEvent<any>) => void): void;
}
