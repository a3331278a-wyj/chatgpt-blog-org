/**
 * RSS 2.0：教程 + 快讯
 */
import type { APIRoute } from 'astro';
import { siteConfig } from '@config/site';
import { getPublishedGuides } from '@utils/guides';
import { getPublishedNews } from '@utils/news';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = async () => {
  const guides = await getPublishedGuides();
  const news = await getPublishedNews();

  const items = [
    ...guides.map((g) => ({
      title: g.data.title,
      description: g.data.description,
      link: `${siteConfig.url}/guides/${g.id}/`,
      pubDate: g.data.pubDate,
    })),
    ...news.map((n) => ({
      title: `[快讯] ${n.data.title}`,
      description: n.data.description,
      link: `${siteConfig.url}/news/${n.id}/`,
      pubDate: n.data.pubDate,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}/</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>${siteConfig.language}</language>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
      )
      .join('\n    ')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
};
