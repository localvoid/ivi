/**
 * isValidTag returns true when tag is valid.
 *
 * @param tag Tag name.
 * @returns `true` when tag name is valid.
 */
export function isValidTag(tag: string): boolean {
  if (DEBUG) {
    return /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/.test(tag);
  }
  return true;
}
