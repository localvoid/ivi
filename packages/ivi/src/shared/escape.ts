export const escapeHTMLAttribute = (s: string): string => {
  if (s.length === 0) {
    return s;
  }

  if (!ESCAPE_ATTR_SYMBOLS.test(s)) {
    return s;
  }

  let last = 0;
  let i = 0;
  let out = "";
  let escape = "";

  for (; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 34) {
      escape = "&quot;";
    } else if (c === 38) {
      escape = "&amp;";
    } else {
      continue;
    }

    if (i !== last) {
      out += s.slice(last, i);
    }
    out += escape;
    last = i + 1;
  }
  if (i !== last) {
    out += s.slice(last, i);
  }
  return out;
};

export const escapeHTMLText = (s: string): string => {
  if (s.length === 0) {
    return s;
  }

  if (!ESCAPE_TEXT_SYMBOLS.test(s)) {
    return s;
  }

  let last = 0;
  let i = 0;
  let out = "";
  let escape = "";

  for (; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 60) {
      escape = "&lt;";
    } else if (c === 38) {
      escape = "&amp;";
    } else {
      continue;
    }

    if (i !== last) {
      out += s.slice(last, i);
    }
    out += escape;
    last = i + 1;
  }
  if (i !== last) {
    out += s.slice(last, i);
  }
  return out;
};

const ESCAPE_ATTR_SYMBOLS = /["&]/;
const ESCAPE_TEXT_SYMBOLS = /[<&]/;
