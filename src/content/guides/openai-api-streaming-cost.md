---
title: 'OpenAI API 进阶：流式输出与成本控制'
description: '在 Node.js 中实现 Chat Completions 流式输出，并给出限流重试、token 预算与缓存等可落地的成本控制清单。'
pubDate: 2026-07-24
author: 'ChatGPT博客编辑部'
category: api
model: chatgpt
tags: ['OpenAI', 'API', '流式输出', '成本', 'Node.js']
featured: true
cover: '/images/covers/api.svg'
coverAlt: 'OpenAI API 进阶：流式输出与成本控制 封面'
---

完成第一次 API 调用后，生产环境最常见的两个诉求是：**更快的首字响应**（streaming）和**可控成本**。

## 流式输出最小示例

调试提示词时，可先在 [ChatGPT 使用入口](https://babawuai.com/products/ai-chat/gpt-5-6-sol/) 验证输出质量，再落到 API。

```ts
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const stream = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  stream: true,
  messages: [
    { role: 'system', content: '你是简洁的中文助手。' },
    { role: 'user', content: '用三点概括向量数据库。' },
  ],
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (delta) process.stdout.write(delta);
}
```

前端可用 Server-Sent Events 或 ReadableStream 把增量文本推给用户，显著改善「等待感」。

## 成本控制清单

1. **默认小模型**：能用 `gpt-4o-mini` 就不要默认上最贵模型  
2. **限制输出**：设置合理 `max_tokens`  
3. **裁剪历史**：只保留最近 N 轮或摘要后的上下文  
4. **输入限额**：对用户消息做长度校验  
5. **缓存**：对高频相似问题做结果缓存  
6. **分功能计量**：按接口/租户记录 token，便于发现异常  

## 限流与重试

遇到 `429` 时使用指数退避：

```ts
async function withRetry<T>(fn: () => Promise<T>, times = 3): Promise<T> {
  let delay = 500;
  for (let i = 0; i < times; i += 1) {
    try {
      return await fn();
    } catch (error: any) {
      if (error?.status !== 429 || i === times - 1) throw error;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
  throw new Error('unreachable');
}
```

## 安全提醒

- API Key 只放服务端  
- 记录日志时避免落盘完整隐私内容  
- 对用户输入做基础注入与敏感信息过滤  

入门请先看：[OpenAI API 入门实战](/guides/openai-api-nodejs-guide/)。

## 使用入口

- [立即体验 ChatGPT](https://babawuai.com/products/ai-chat/gpt-5-6-sol/)
