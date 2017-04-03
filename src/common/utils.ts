export function unorderedArrayDelete(array: any[], index: number): void {
    const length = array.length - 1;
    const last = array.pop();
    if (index !== length) {
        array[index] = last;
    }
}
