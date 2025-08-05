export const normalizeNewlines = process.platform == "win32"
  ? (s: string) => s.replaceAll("\r\n", "\n")
  : (s: string) => s;
