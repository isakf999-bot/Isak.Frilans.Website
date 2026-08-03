/** Publik kanonisk origin — använd överallt för SEO/sitemap. */
export const SITE_URL = "https://www.isakweb.se";

export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
