import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('ChatGPT博客编辑部'),
    category: z.enum(['beginner', 'advanced', 'api', 'tools']),
    model: z.enum(['chatgpt', 'claude', 'gemini', 'grok', 'general']).default('general'),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    howToSteps: z
      .array(
        z.object({
          name: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(80),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    model: z.enum(['chatgpt', 'claude', 'gemini', 'grok', 'general']).default('general'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.json' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(['writing', 'image', 'coding', 'translate', 'video']),
    url: z.string(),
    tags: z.array(z.string()).default([]),
    icon: z.string().default('sparkles'),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    pricing: z.string().default('视套餐而定'),
    platform: z.string().default('Web'),
    audience: z.string().default('通用用户'),
    freeTier: z.boolean().default(false),
  }),
});

export const collections = { guides, news, tools };
