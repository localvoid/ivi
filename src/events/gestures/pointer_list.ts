import { GesturePointerEvent } from "./pointer_event";

export function pointerListSet(pointers: GesturePointerEvent[], pointer: GesturePointerEvent) {
    for (let i = 0; i < pointers.length; i++) {
        const item = pointers[i];
        if (item.id === pointer.id) {
            pointers[i] = pointer;
            return;
        }
    }
    pointers.push(pointer);
}

export function pointerListGet(pointers: GesturePointerEvent[], id: number): GesturePointerEvent | undefined {
    for (let i = 0; i < pointers.length; i++) {
        const item = pointers[i];
        if (item.id === id) {
            return item;
        }
    }
    return undefined;
}

export function pointerListDelete(pointers: GesturePointerEvent[], id: number): void {
    for (let i = 0; i < pointers.length; i++) {
        const item = pointers[i];
        if (item.id === id) {
            if (i === pointers.length - 1) {
                pointers.pop()!;
            } else {
                pointers[i] = pointers.pop()!;
            }
            return;
        }
    }
}
