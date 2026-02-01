import { MetadataRoute } from 'next';

// 定义支持的语言
const locales = ['en', 'zh'] as const;
type Locale = (typeof locales)[number];

// 热词页面列表 - 添加新热词时只需在这里添加
// 格式: { slug: 'url-slug', lastModified: Date }
const hotKeywordPages: Array<{
  slug: string;
  lastModified: Date;
  priority: number;
}> = [
  // 示例热词页面 - 取消注释并添加你的热词页面
  // { slug: 'web-scraping-guide', lastModified: new Date(), priority: 0.9 },
  // { slug: 'data-extraction-tutorial', lastModified: new Date(), priority: 0.9 },
  // { slug: 'no-code-tools', lastModified: new Date(), priority: 0.8 },
];

// 基础 URL
const BASE_URL = 'https://openclaw-ai.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // 首页（带语言前缀）
    ...locales.map((locale) => ({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE_URL}/${l}`])
        ),
      },
    })),
  ];

  // 热词页面（支持多语言）
  const keywordPages: MetadataRoute.Sitemap = hotKeywordPages.flatMap(
    (page) =>
      locales.map((locale) => ({
        url: `${BASE_URL}/${locale}/${page.slug}`,
        lastModified: page.lastModified,
        changeFrequency: 'weekly' as const,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/${page.slug}`])
          ),
        },
      }))
  );

  return [...staticPages, ...keywordPages];
}
