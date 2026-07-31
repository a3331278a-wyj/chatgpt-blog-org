---
title: 'OpenAI API 入门实战：用 Node.js 调用 Chat Completions'
description: '从创建 API Key、发起第一次请求到错误处理与成本控制，带你用 Node.js 快速接入 OpenAI Chat Completions API。'
pubDate: 2026-07-28
author: 'ChatGPT博客编辑部'
category: api
model: chatgpt
tags: ['OpenAI', 'API', 'Node.js', '开发']
featured: true
cover: '/images/covers/api.svg'
coverAlt: 'OpenAI API 入门实战：用 Node.js 调用 Chat Completions 封面'
---

如果你已经会用 ChatGPT 网页版，下一步很自然就是通过 API 把大模型能力接到自己的产品里。本文以 Node.js 为例，演示最小可用接入流程。对话效果可先在 [ChatGPT 使用入口](https://babawuai.com/products/ai-chat/gpt-5-6-sol/) 验证提示词，再落到 API。

## 你将学到什么

- 如何创建并安全保存 API Key
- 如何调用 Chat Completions 接口
- 如何处理超时、限流与基础成本控制

## 前置条件

- 已安装 Node.js 18+
- 具备基础 JavaScript / TypeScript 知识
- 拥有 OpenAI 平台账号与可用额度

## 安装 SDK

```bash
npm install openai
```

## 配置环境变量

切勿把密钥写进代码仓库。在 `.env` 中保存：

```bash
OPENAI_API_KEY=sk-xxxxxxxx
```

本地读取时可使用 `process.env.OPENAI_API_KEY`（记得把 `.env` 加入 `.gitignore`）。

## 最小可运行示例

```ts
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: '你是简洁的中文技术助手。' },
      { role: 'user', content: '用三句话解释什么是向量数据库。' },
    ],
    temperature: 0.3,
  });

  console.log(completion.choices[0]?.message?.content);
}

main().catch(console.error);
```

## 关键参数说明

| 参数 | 作用 | 建议 |
| --- | --- | --- |
| `model` | 选择模型 | 入门可用 `gpt-4o-mini` |
| `messages` | 对话上下文 | system 定规则，user 提需求 |
| `temperature` | 随机性 | 事实类偏低，创意类适中 |
| `max_tokens` | 最大输出长度 | 按业务上限设置，避免浪费 |

## 错误处理建议

生产环境至少覆盖这些情况：

```ts
try {
  // 调用 API
} catch (error: any) {
  const status = error?.status;
  if (status === 429) {
    // 限流：指数退避重试
  } else if (status === 401) {
    // 密钥无效
  } else if (status >= 500) {
    // 服务端异常：稍后重试
  } else {
    throw error;
  }
}
```

## 成本控制清单

1. 能用小模型就不要默认上最贵模型
2. 给 system / 历史消息做裁剪，避免无意义超长上下文
3. 对用户输入做长度限制
4. 缓存高频相似问题的答案
5. 为每个功能单独统计 token 消耗

## 安全注意事项

- API Key 只放服务端，不要暴露到前端
- 对用户输入做注入与敏感信息过滤
- 记录审计日志，但避免把完整隐私内容明文落盘

## 下一步

- 把单轮对话扩展为带会话记忆的多轮聊天
- 接入流式输出（streaming）提升体验
- 结合向量检索实现简易 RAG 知识库问答

当你完成第一次成功调用后，真正的产品工作才刚开始：权限、稳定性、成本与评估体系，会决定 API 能否长期跑在业务里。

## 使用入口

- [立即体验 ChatGPT](https://babawuai.com/products/ai-chat/gpt-5-6-sol/)
