import {
  CINII_URL,
  SCHOLAR_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "./site-meta";

export { CINII_URL, SCHOLAR_URL, SITE_DESCRIPTION, SITE_TITLE };

/** 公開サイトの絶対URL（OGP・JSON-LD・sitemap 用）。ビルド時は VITE_SITE_URL を設定してください。 */
export function getSiteUrl(): string {
  const u = import.meta.env.VITE_SITE_URL as string | undefined;
  if (u && /^https?:\/\//i.test(u)) return u.replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin)
    return window.location.origin;
  return "";
}
