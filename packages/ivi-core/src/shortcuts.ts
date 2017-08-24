const _objectHasOwnProperty = Object.prototype.hasOwnProperty;

export const objectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

export function objectHasOwnProperty(o: object, property: string): boolean {
  return _objectHasOwnProperty.call(o, property);
}
