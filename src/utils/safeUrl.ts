/** Returns undefined if href uses a dangerous URL scheme, otherwise returns href unchanged. */
export function sanitizeHref(href: string | undefined): string | undefined {
  if (!href) return href;
  const normalized = href.trim().toLowerCase();
  if (normalized.startsWith("javascript:") || normalized.startsWith("data:") || normalized.startsWith("vbscript:")) {
    return undefined;
  }
  return href;
}
