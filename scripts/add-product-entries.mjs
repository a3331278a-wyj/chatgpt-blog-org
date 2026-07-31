import fs from 'node:fs';
import path from 'node:path';

const GPT = 'https://babawuai.com/products/ai-chat/gpt-5-6-sol/';
const CLAUDE = 'https://babawuai.com/products/ai-chat/claude-opus-4-8/';
const GEMINI = 'https://babawuai.com/products/ai-chat/gemini-3-5-flash/';
const GROK = 'https://babawuai.com/products/ai-chat/grok-4-5/';

const urls = { chatgpt: GPT, claude: CLAUDE, gemini: GEMINI, grok: GROK };
const names = { chatgpt: 'ChatGPT', claude: 'Claude', gemini: 'Gemini', grok: 'Grok' };

const map = {
  'what-is-chatgpt-beginner-guide.md': ['chatgpt'],
  'chatgpt-register-guide.md': ['chatgpt'],
  'chatgpt-china-usage-guide-2026.md': ['chatgpt', 'claude', 'gemini'],
  'chatgpt-free-vs-plus.md': ['chatgpt'],
  'chatgpt-access-troubleshooting.md': ['chatgpt'],
  'openai-api-nodejs-guide.md': ['chatgpt'],
  'openai-api-streaming-cost.md': ['chatgpt'],
  'claude-beginner-guide.md': ['claude'],
  'claude-vs-chatgpt-deep-compare.md': ['claude', 'chatgpt'],
  'gemini-beginner-guide.md': ['gemini'],
  'gemini-workspace-guide.md': ['gemini'],
  'grok-overview.md': ['grok', 'chatgpt', 'claude', 'gemini'],
  'chatgpt-vs-claude-vs-gemini.md': ['chatgpt', 'claude', 'gemini'],
  'prompt-templates-library.md': ['chatgpt', 'claude', 'gemini'],
  'prompt-engineering-advanced.md': ['chatgpt', 'claude', 'gemini'],
  'china-ai-alternatives-guide.md': ['chatgpt', 'claude', 'gemini', 'grok'],
  'ai-image-tools-comparison.md': ['chatgpt'],
  'cursor-ai-coding-guide.md': ['chatgpt', 'claude'],
};

const midHints = {
  'what-is-chatgpt-beginner-guide.md': [
    '## 10 分钟上手流程',
    `读到这里就可以边练边学了：打开 [ChatGPT 使用入口](${GPT})，按下面步骤完成第一轮对话。`,
  ],
  'chatgpt-register-guide.md': [
    '## 注册前准备',
    `准备就绪后，可直接前往 [ChatGPT 使用入口](${GPT}) 开始注册。`,
  ],
  'chatgpt-china-usage-guide-2026.md': [
    '## 三条合规路径（按推荐顺序）',
    `如果你已有可用方式，也可以先从这些入口体验：[ChatGPT](${GPT})、[Claude](${CLAUDE})、[Gemini](${GEMINI})。`,
  ],
  'chatgpt-free-vs-plus.md': [
    '## 怎么选更划算',
    `不确定要不要付费？先用 [ChatGPT 使用入口](${GPT}) 体验免费能力，再决定是否升级。`,
  ],
  'chatgpt-access-troubleshooting.md': [
    '## 先做这 5 个快速检查',
    `页面可访问时，可直接从 [ChatGPT 使用入口](${GPT}) 重新登录验证。`,
  ],
  'openai-api-nodejs-guide.md': [
    '## 你将完成什么',
    `对话产品可先用 [ChatGPT 使用入口](${GPT}) 验证提示词；确认效果后再接入 API。`,
  ],
  'openai-api-streaming-cost.md': [
    '## 什么时候需要流式输出',
    `调试提示词时，可先在 [ChatGPT 使用入口](${GPT}) 验证输出质量，再落到 API。`,
  ],
  'claude-beginner-guide.md': [
    '## 5 分钟开始',
    `直接打开 [Claude 使用入口](${CLAUDE})，用下面的首问模板开始第一轮。`,
  ],
  'claude-vs-chatgpt-deep-compare.md': [
    '## 写作场景怎么选',
    `建议同一任务分别在 [Claude](${CLAUDE}) 与 [ChatGPT](${GPT}) 各跑一遍，对比返工成本。`,
  ],
  'gemini-beginner-guide.md': [
    '## 5 分钟上手',
    `打开 [Gemini 使用入口](${GEMINI})，先用一个真实学习问题完成首轮对话。`,
  ],
  'gemini-workspace-guide.md': [
    '## 典型工作流',
    `可先在 [Gemini 使用入口](${GEMINI}) 试用文档总结与表格整理能力。`,
  ],
  'grok-overview.md': [
    '## 更适合',
    `想感受风格差异，可打开 [Grok 使用入口](${GROK})；需要严谨长文时再切到 Claude / ChatGPT。`,
  ],
  'chatgpt-vs-claude-vs-gemini.md': [
    '## 快速结论',
    `选定方向后直接体验：[ChatGPT](${GPT}) · [Claude](${CLAUDE}) · [Gemini](${GEMINI})。`,
  ],
  'prompt-templates-library.md': [
    '## 使用方法',
    `复制模板后，可分别在 [ChatGPT](${GPT})、[Claude](${CLAUDE})、[Gemini](${GEMINI}) 中试跑同一任务。`,
  ],
  'prompt-engineering-advanced.md': [
    '## 先建立评价标准',
    `同一提示词建议在 [ChatGPT](${GPT})、[Claude](${CLAUDE})、[Gemini](${GEMINI}) 各测一轮，记录稳定性。`,
  ],
  'china-ai-alternatives-guide.md': [
    '## 先选场景，再选产品',
    `若你仍想对比海外模型体验，可从 [ChatGPT](${GPT})、[Claude](${CLAUDE})、[Gemini](${GEMINI})、[Grok](${GROK}) 入口尝试。`,
  ],
  'ai-image-tools-comparison.md': [
    '## 对比总览',
    `想先看对话式出图，可从 [ChatGPT 使用入口](${GPT}) 开始。`,
  ],
  'cursor-ai-coding-guide.md': [
    '## 安装与第一次对话改码',
    `写提示词时可先在 [ChatGPT](${GPT}) 或 [Claude](${CLAUDE}) 里打磨需求描述，再贴回 Cursor。`,
  ],
};

const dir = 'src/content/guides';
let updated = 0;

for (const [file, keys] of Object.entries(map)) {
  const fp = path.join(dir, file);
  let text = fs.readFileSync(fp, 'utf8');
  if (text.includes('babawuai.com')) {
    console.log('skip existing', file);
    continue;
  }

  const hint = midHints[file];
  if (hint) {
    const [heading, block] = hint;
    if (text.includes(heading)) {
      text = text.replace(heading, `${heading}\n\n${block}\n`);
    }
  }

  if (!text.includes('## 使用入口')) {
    const links = keys.map((k) => `- [立即体验 ${names[k]}](${urls[k]})`).join('\n');
    const section = `\n## 使用入口\n\n${links}\n`;
    const anchors = ['## 相关阅读', '## 延伸阅读', '## 下一步学习建议'];
    let placed = false;
    for (const a of anchors) {
      if (text.includes(`\n${a}`)) {
        text = text.replace(`\n${a}`, `${section}\n${a}`);
        placed = true;
        break;
      }
    }
    if (!placed) text = `${text.trimEnd()}\n${section}`;
  }

  fs.writeFileSync(fp, text);
  updated += 1;
  console.log('updated', file);
}

console.log('done', updated);
