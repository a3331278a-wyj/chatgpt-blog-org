import { getCollection } from 'astro:content';
import { toolCategories, type ToolCategorySlug } from '@config/site';
import type { ToolEntry } from './guides';

/** 获取全部工具（按 order 排序） */
export async function getAllTools(): Promise<ToolEntry[]> {
  const tools = await getCollection('tools');
  return tools.sort(
    (a: ToolEntry, b: ToolEntry) =>
      a.data.order - b.data.order || a.data.name.localeCompare(b.data.name, 'zh'),
  );
}

/** 精选工具 */
export async function getFeaturedTools(limit = 8): Promise<ToolEntry[]> {
  const tools = await getAllTools();
  const featured = tools.filter((t) => t.data.featured);
  return (featured.length ? featured : tools).slice(0, limit);
}

/** 按分类分组 */
export async function getToolsByCategory(): Promise<
  { category: (typeof toolCategories)[number]; tools: ToolEntry[] }[]
> {
  const tools = await getAllTools();
  return toolCategories
    .map((category) => ({
      category,
      tools: tools.filter((t) => t.data.category === category.slug),
    }))
    .filter((group) => group.tools.length > 0);
}

export function getToolCategoryName(slug: ToolCategorySlug): string {
  return toolCategories.find((c) => c.slug === slug)?.name ?? slug;
}
