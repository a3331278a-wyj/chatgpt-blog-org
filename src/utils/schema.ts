import { siteConfig } from '@config/site';
import type { GuideEntry } from '@utils/guides';
import { getCategoryName } from '@utils/guides';

/** 首页 WebSite Schema */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
  };
}

/** 文章 Article Schema */
export function buildArticleSchema(guide: GuideEntry, contentUrl: string, wordCount?: number) {
  const imagePath = guide.data.cover ?? siteConfig.defaultOgImage;
  const imageURL = imagePath.startsWith('http')
    ? imagePath
    : `${siteConfig.url}${imagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.data.title,
    description: guide.data.description,
    datePublished: guide.data.pubDate.toISOString(),
    dateModified: (guide.data.updatedDate ?? guide.data.pubDate).toISOString(),
    author: {
      '@type': 'Person',
      name: guide.data.author,
      url: `${siteConfig.url}/authors/`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': contentUrl,
    },
    image: [imageURL],
    articleSection: getCategoryName(guide.data.category),
    keywords: guide.data.tags.join(', '),
    inLanguage: siteConfig.language,
    ...(wordCount ? { wordCount } : {}),
  };
}

/** 面包屑 BreadcrumbList Schema */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** 工具页 ItemList Schema */
export function buildItemListSchema(
  tools: { name: string; description: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI 工具推荐',
    description: '精选 ChatGPT、Claude、Gemini 相关实用 AI 工具',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        description: tool.description,
        url: tool.url,
        applicationCategory: 'WebApplication',
      },
    })),
  };
}

/** FAQPage Schema */
export function buildFaqSchema(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** HowTo Schema（教程步骤） */
export function buildHowToSchema(
  guide: GuideEntry,
  contentUrl: string,
  steps: { name: string; text: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: guide.data.title,
    description: guide.data.description,
    url: contentUrl,
    inLanguage: siteConfig.language,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${contentUrl}#step-${index + 1}`,
    })),
  };
}
