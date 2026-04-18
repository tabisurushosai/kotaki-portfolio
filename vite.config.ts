import fs from "node:fs";
import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { SITE_DESCRIPTION, SITE_TITLE } from "./src/config/site-meta";

function resolveSiteUrl(env: Record<string, string>): string {
  const explicit = env.VITE_SITE_URL?.trim();
  if (explicit && /^https?:\/\//i.test(explicit))
    return explicit.replace(/\/$/, "");
  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod && /^https?:\/\//i.test(prod)) return prod.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  return "https://example.com";
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = resolveSiteUrl(env);

  const replaceSeo = (html: string) =>
    html
      .replaceAll("%SITE_URL%", siteUrl)
      .replaceAll("%SITE_TITLE%", SITE_TITLE)
      .replaceAll("%SITE_DESCRIPTION%", SITE_DESCRIPTION);

  return {
    plugins: [
      react(),
      {
        name: "html-seo-and-sitemap",
        transformIndexHtml(html) {
          return replaceSeo(html);
        },
        closeBundle() {
          const outDir = path.resolve("dist");
          if (!fs.existsSync(outDir)) return;
          const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
          const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
          fs.writeFileSync(path.join(outDir, "robots.txt"), robots);
          fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
