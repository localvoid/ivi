/**
 * isValidTag returns true when tag is valid.
 *
 * @param tag Tag name.
 * @returns `true` when tag name is valid.
 */
export function isValidTag(tag: string): boolean {
  return /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/.test(tag);
}

/**
 * isVoidElement returns true when element is void.
 *
 * @param tag Tag name.
 * @returns `true` when element is void.
 */
export function isVoidElement(tag: string): boolean {
  if (tag.length > 4) {
    switch (tag) {
      case "audio":
      case "video":
      case "embed":
      case "input":
      case "param":
      case "source":
      case "textarea":
      case "track":
        return true;
    }
  } else if (tag.length > 3) {
    switch (tag) {
      case "area":
      case "base":
      case "link":
      case "meta":
        return true;
    }
  } else {
    switch (tag) {
      case "br":
      case "col":
      case "hr":
      case "img":
      case "wbr":
        return true;
    }
  }
  return false;
}
