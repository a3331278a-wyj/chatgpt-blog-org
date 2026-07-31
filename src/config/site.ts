/**
 * 站点全局配置
 * chatgpt-blog.org - AI 大模型学习与实践指南
 */

export const siteConfig = {
  name: 'ChatGPT博客',
  title: 'ChatGPT博客 - AI大模型教程、评测与使用指南',
  description:
    '深度解析 ChatGPT、Claude、Gemini：国内使用说明、新手教程、模型对比、API 开发与 AI 工具推荐，帮你选对模型并真正用起来。',
  url: 'https://chatgpt-blog.org',
  locale: 'zh_CN',
  language: 'zh-CN',
  author: 'ChatGPT博客编辑部',
  email: 'contact@chatgpt-blog.org',
  twitter: '@chatgptblogorg',
  defaultOgImage: '/images/og-default.svg',
  postsPerPage: 10,
  disclaimer:
    '本站与 OpenAI、Anthropic、Google 等无关联或授权关系，仅为第三方学习资讯平台。内容仅供参考，请遵守当地法律法规与各平台服务条款。',
} as const;

/** 主导航 */
export const navLinks = [
  { label: '首页', href: '/' },
  { label: '教程指南', href: '/guides/' },
  { label: '模型评测', href: '/compare/' },
  { label: '快讯', href: '/news/' },
  { label: 'AI工具', href: '/tools/' },
  { label: '常见问题', href: '/faq/' },
  { label: '关于', href: '/about/' },
] as const;

/** 首页三大入口 */
export const homePillars = [
  {
    title: '模型深度解析',
    description: '全面了解 GPT、Claude、Gemini 的能力边界、适用场景与上手路径。',
    href: '/guides/chatgpt/',
    cta: '开始阅读',
    icon: 'book',
  },
  {
    title: '专业评测对比',
    description: '按写作、编程、长文本、多模态等场景客观对比，帮你选对工具。',
    href: '/compare/',
    cta: '查看对比',
    icon: 'sparkles',
  },
  {
    title: '实用教程指南',
    description: '从注册入门、国内使用说明到 API 开发，手把手带你落地实践。',
    href: '/guides/',
    cta: '学习教程',
    icon: 'rocket',
  },
] as const;

/** 模型专栏 */
export const modelHubs = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    href: '/guides/chatgpt/',
    productUrl: 'https://babawuai.com/products/ai-chat/gpt-5-6-sol/',
    tagline: '综合能力强，生态完善，适合日常对话、写作与多模态任务',
    description:
      'OpenAI ChatGPT 教程中心：注册入门、国内使用说明、免费版与 Plus 对比、提示词与 API 实战。',
    strengths: ['综合能力均衡', '插件与生态成熟', '多模态与图像能力强'],
    bestFor: ['日常问答', '内容创作', '编程辅助', '图像生成'],
  },
  {
    slug: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    href: '/guides/claude/',
    productUrl: 'https://babawuai.com/products/ai-chat/claude-opus-4-8/',
    tagline: '长文本理解出色，文风稳健，适合严谨写作与复杂文档分析',
    description:
      'Anthropic Claude 教程中心：入门指南、长文本场景、与 ChatGPT 对比及 API 起步。',
    strengths: ['长上下文', '写作与改写质量高', '安全对齐投入多'],
    bestFor: ['长文档精读', '论文润色', '代码审查', '结构化输出'],
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    vendor: 'Google',
    href: '/guides/gemini/',
    productUrl: 'https://babawuai.com/products/ai-chat/gemini-3-5-flash/',
    tagline: '原生多模态，深度整合 Google 搜索与 Workspace 办公场景',
    description:
      'Google Gemini 教程中心：入门使用、多模态能力、办公协作与选型建议。',
    strengths: ['多模态原生', '检索与搜索整合', 'Workspace 协作'],
    bestFor: ['资料调研', '办公文档', '图像理解', '学习辅导'],
  },
  {
    slug: 'grok',
    name: 'Grok',
    vendor: 'xAI',
    href: '/guides/grok/',
    productUrl: 'https://babawuai.com/products/ai-chat/grok-4-5/',
    tagline: '强调实时信息与对话风格，适合跟进热点与开放性讨论',
    description: 'xAI Grok 速览：定位、适用场景、与 ChatGPT/Claude/Gemini 的差异。',
    strengths: ['实时信息取向', '对话风格鲜明', '与 X 生态关联'],
    bestFor: ['热点追踪', '开放讨论', '快速头脑风暴'],
  },
] as const;

/** 文章分类 */
export const categories = [
  {
    slug: 'beginner',
    name: '入门教程',
    description: '从零开始学习 ChatGPT 与主流大模型',
    icon: 'book',
  },
  {
    slug: 'advanced',
    name: '进阶技巧',
    description: '提示词工程、工作流与效率提升',
    icon: 'rocket',
  },
  {
    slug: 'api',
    name: 'API开发',
    description: 'OpenAI / Claude / Gemini API 实战',
    icon: 'code',
  },
  {
    slug: 'tools',
    name: 'AI工具',
    description: '精选实用 AI 工具评测与推荐',
    icon: 'puzzle',
  },
] as const;

/** 工具分类 */
export const toolCategories = [
  { slug: 'writing', name: '写作助手' },
  { slug: 'image', name: 'AI绘图' },
  { slug: 'coding', name: '代码助手' },
  { slug: 'translate', name: 'AI翻译' },
  { slug: 'video', name: '视频生成' },
] as const;

/** 模型横评数据（评测中心） */
export const modelComparison = [
  {
    name: 'ChatGPT',
    writing: '优秀',
    coding: '优秀',
    longContext: '良好',
    multimodal: '优秀',
    pricing: '免费 + Plus 约 $20/月',
    bestScene: '综合日常与多模态',
    href: '/guides/chatgpt/',
  },
  {
    name: 'Claude',
    writing: '优秀',
    coding: '优秀',
    longContext: '优秀',
    multimodal: '良好',
    pricing: '免费额度 + Pro 订阅',
    bestScene: '长文分析与严谨写作',
    href: '/guides/claude/',
  },
  {
    name: 'Gemini',
    writing: '良好',
    coding: '良好',
    longContext: '良好',
    multimodal: '优秀',
    pricing: '免费 + Google AI 订阅',
    bestScene: '检索调研与办公协作',
    href: '/guides/gemini/',
  },
  {
    name: 'Grok',
    writing: '良好',
    coding: '良好',
    longContext: '中等',
    multimodal: '中等',
    pricing: '视 X/xAI 套餐',
    bestScene: '热点与开放讨论',
    href: '/guides/grok/',
  },
] as const;

/** 首页 / FAQ 页问题 */
export const faqs = [
  {
    question: 'ChatGPT 如何注册账号？',
    answer:
      '访问 chatgpt.com 或 chat.openai.com，使用邮箱或 Google / Apple / Microsoft 账号注册。部分地区可能需要完成额外验证。注册后即可体验免费模型额度。详细步骤见《ChatGPT 注册与入门》教程。',
  },
  {
    question: 'ChatGPT Plus 值得付费吗？价格多少？',
    answer:
      'ChatGPT Plus 通常约为每月 20 美元，可获得更新模型优先权、更快响应与更多高级功能。高频写作、编程或工作流依赖 AI 时更划算；轻度体验可先用免费版。详见《免费版 vs Plus》对比文。',
  },
  {
    question: '国内如何了解与使用 ChatGPT？',
    answer:
      'OpenAI 服务对部分地区有访问限制。请优先了解官方可用地区政策；也可评估官方 API、企业方案，或使用国内合规可用的大模型（如通义千问、文心一言、Kimi、豆包等）。本站只提供信息参考，请遵守当地法律法规。详见《ChatGPT 国内使用完整指南》。',
  },
  {
    question: 'ChatGPT、Claude、Gemini 该怎么选？',
    answer:
      '没有绝对最强，只有更适合当前任务的模型：综合日常与多模态可优先 ChatGPT；长文档与严谨写作可优先 Claude；检索与 Google 办公协作可优先 Gemini。完整对比见「模型评测」页面。',
  },
  {
    question: '使用 AI 大模型需要注意哪些隐私与安全问题？',
    answer:
      '不要上传身份证、银行卡、未公开商业机密等敏感信息；企业场景建议使用官方企业版或合规 API，并签署数据处理协议；对医疗、法律、财务等建议务必人工复核。更多见隐私政策页。',
  },
  {
    question: '如何写出更好的提示词（Prompt）？',
    answer:
      '清晰说明角色、目标、约束与输出格式；提供必要上下文与示例；复杂任务拆成多步；根据结果迭代优化。可参考本站提示词工程进阶教程。',
  },
  {
    question: '本站与 ChatGPT 官方有关系吗？',
    answer:
      '没有。本站是独立的第三方教程与资讯博客，与 OpenAI、Anthropic、Google 等均无关联、授权或从属关系。商标归各自所有者所有。',
  },
  {
    question: '文章会持续更新吗？',
    answer:
      '会。大模型版本与功能变化很快，我们会持续更新教程、评测与工具推荐，并在文章中标注更新日期。欢迎通过邮箱反馈纠错与选题建议。',
  },
  {
    question: '页面打不开或登录失败怎么办？',
    answer:
      '先尝试无痕模式、更换浏览器、清理 Cookie，并确认系统时间正确。若所在地区访问受限，请阅读「访问与使用说明」与「常见访问问题排查」教程，优先考虑官方 API 或国内合规替代产品，不要使用来路不明的第三方站点。',
  },
] as const;

/** 友情链接 */
export const friendLinks = [
  { name: 'OpenAI', href: 'https://openai.com' },
  { name: 'Anthropic', href: 'https://www.anthropic.com' },
  { name: 'Google AI', href: 'https://ai.google' },
  { name: 'Hugging Face', href: 'https://huggingface.co' },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
export type ToolCategorySlug = (typeof toolCategories)[number]['slug'];
export type ModelSlug = (typeof modelHubs)[number]['slug'];
