let _autofocusedElement: Element | null = null;

export function autofocus(element: Element): void {
    _autofocusedElement = element;
}

export function autofocusedElement(): Element | null {
    const ret = _autofocusedElement;
    _autofocusedElement = null;
    return ret;
}
