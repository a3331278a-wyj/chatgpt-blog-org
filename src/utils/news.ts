import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';

export type NewsEntry = CollectionEntry<'news'>;

/** 获取已发布快讯（按日期倒序） */
export async function getPublishedNews(): Promise<NewsEntry[]> {
  const items = await getCollection('news', (entry: NewsEntry) => !entry.data.draft);
  return items.sort(
    (a: NewsEntry, b: NewsEntry) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatNewsDate(date: Date, locale = 'zh-CN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
