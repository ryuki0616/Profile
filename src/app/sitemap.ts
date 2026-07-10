import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// ビルド毎に更新日が変わるのを避けるため、コンテンツ更新時に手動で更新する固定日付
const LAST_MODIFIED = "2026-07-09";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kyarameru.jp/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://kyarameru.jp/privacy/",
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
