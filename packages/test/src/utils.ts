export function containsClassName(classNames: string, className: string): boolean {
  return classNames
    .split(" ")
    .map((c) => c.trim())
    .some((c) => c === className);
}

export function matchProperties(
  props: { [key: string]: any } | null,
  match: { [key: string]: any } | null,
): boolean {
  if (match !== null) {
    const matchKeys = Object.keys(match);
    if (matchKeys.length > 0) {
      if (props === null) {
        return false;
      }
      for (let i = 0; i < matchKeys.length; i++) {
        const key = matchKeys[i];
        if (props.hasOwnProperty(key) === false || props[key] !== match[key]) {
          return false;
        }
      }
    }
  }
  return true;
}
