/**
 * 各模型「立即体验」产品入口
 */
import { modelHubs } from '@config/site';

export type ProductKey = 'chatgpt' | 'claude' | 'gemini' | 'grok';

export interface ProductLink {
  key: ProductKey;
  name: string;
  url: string;
  label: string;
}

const productMap = Object.fromEntries(
  modelHubs
    .filter((hub): hub is (typeof hub) & { productUrl: string } => 'productUrl' in hub && Boolean(hub.productUrl))
    .map((hub) => [
      hub.slug,
      {
        key: hub.slug as ProductKey,
        name: hub.name,
        url: hub.productUrl,
        label: `立即体验 ${hub.name}`,
      } satisfies ProductLink,
    ]),
) as Record<ProductKey, ProductLink>;

/** 按文章 ID 指定应展示的模型入口（对比文、通用教程等） */
const guideProductOverrides: Record<string, ProductKey[]> = {
  'chatgpt-vs-claude-vs-gemini': ['chatgpt', 'claude', 'gemini'],
  'claude-vs-chatgpt-deep-compare': ['claude', 'chatgpt'],
  'prompt-templates-library': ['chatgpt', 'claude', 'gemini'],
  'prompt-engineering-advanced': ['chatgpt', 'claude', 'gemini'],
  'china-ai-alternatives-guide': ['chatgpt', 'claude', 'gemini', 'grok'],
  'ai-image-tools-comparison': ['chatgpt'],
  'cursor-ai-coding-guide': ['chatgpt', 'claude'],
  'chatgpt-china-usage-guide-2026': ['chatgpt', 'claude', 'gemini'],
};

export function getProduct(key: ProductKey): ProductLink {
  return productMap[key];
}

export function getProducts(keys: ProductKey[]): ProductLink[] {
  return keys.map((key) => productMap[key]).filter(Boolean);
}

/** 根据教程 ID 与 frontmatter.model 解析应展示的体验入口 */
export function getProductsForGuide(
  guideId: string,
  model: string,
): ProductLink[] {
  if (guideProductOverrides[guideId]) {
    return getProducts(guideProductOverrides[guideId]);
  }
  if (model === 'chatgpt' || model === 'claude' || model === 'gemini' || model === 'grok') {
    return getProducts([model]);
  }
  return getProducts(['chatgpt', 'claude', 'gemini']);
}
