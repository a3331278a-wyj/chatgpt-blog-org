import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { categories, type CategorySlug } from '@config/site';

export type GuideEntry = CollectionEntry<'guides'>;
export type ToolEntry = CollectionEntry<'tools'>;

/** 获取已发布文章（按日期倒序） */
export async function getPublishedGuides(): Promise<GuideEntry[]> {
  const guides = await getCollection('guides', (entry: GuideEntry) => !entry.data.draft);
  return guides.sort(
    (a: GuideEntry, b: GuideEntry) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** 获取精选文章 */
export async function getFeaturedGuides(limit = 3): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  const featured = guides.filter((g) => g.data.featured);
  return (featured.length >= limit ? featured : guides).slice(0, limit);
}

/** 按模型专栏筛选 */
export async function getGuidesByModel(
  model: 'chatgpt' | 'claude' | 'gemini' | 'grok',
): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  return guides.filter((g) => g.data.model === model);
}

/** 按分类筛选 */
export async function getGuidesByCategory(category: CategorySlug): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  return guides.filter((g) => g.data.category === category);
}

/** 获取所有标签及计数 */
export async function getTagCloud(): Promise<{ tag: string; count: number }[]> {
  const guides = await getPublishedGuides();
  const map = new Map<string, number>();
  for (const guide of guides) {
    for (const tag of guide.data.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));
}

/** 按标签筛选 */
export async function getGuidesByTag(tag: string): Promise<GuideEntry[]> {
  const guides = await getPublishedGuides();
  return guides.filter((g) => g.data.tags.includes(tag));
}

/** 标签路径片段（静态路由直接使用原标签） */
export function tagToParam(tag: string): string {
  return tag;
}

export function paramToTag(param: string): string {
  try {
    return decodeURIComponent(param);
  } catch {
    return param;
  }
}

/** 相关文章（同分类或同标签） */
export function getRelatedGuides(
  current: GuideEntry,
  all: GuideEntry[],
  limit = 3,
): GuideEntry[] {
  return all
    .filter((g) => g.id !== current.id)
    .map((g) => {
      let score = 0;
      if (g.data.category === current.data.category) score += 3;
      score += g.data.tags.filter((t: string) => current.data.tags.includes(t)).length;
      return { guide: g, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.guide);
}

/** 上一篇 / 下一篇（按发布时间） */
export function getAdjacentGuides(
  current: GuideEntry,
  all: GuideEntry[],
): { prev: GuideEntry | undefined; next: GuideEntry | undefined } {
  const index = all.findIndex((g) => g.id === current.id);
  return {
    prev: index < all.length - 1 ? all[index + 1] : undefined,
    next: index > 0 ? all[index - 1] : undefined,
  };
}

/** 估算阅读时长（中文约 400 字/分钟） */
export function estimateReadingMinutes(content: string): number {
  const text = content.replace(/```[\s\S]*?```/g, '').replace(/[#>*`_\-\[\]()]/g, '');
  const chinese = (text.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const english = (text.match(/[a-zA-Z]+/g) ?? []).length;
  const minutes = Math.ceil((chinese + english * 5) / 400);
  return Math.max(1, minutes);
}

/** 分类中文名 */
export function getCategoryName(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

/** 格式化日期 */
export function formatDate(date: Date, locale = 'zh-CN'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/** 分页 */
export function paginate<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    current,
    totalPages,
    total: items.length,
    hasPrev: current > 1,
    hasNext: current < totalPages,
  };
}
