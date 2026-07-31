---
title: 'Gemini + Google Workspace：文档与表格协作指南'
description: '把 Gemini 接到 Docs/Sheets 工作流：会议纪要、表格清洗、资料整理的提示词与分工建议，适合 Google 生态用户。'
pubDate: 2026-07-19
author: 'ChatGPT博客编辑部'
category: advanced
model: gemini
tags: ['Gemini', 'Workspace', '办公', '文档']
featured: true
cover: '/images/covers/gemini.svg'
coverAlt: 'Gemini + Google Workspace：文档与表格协作指南 封面'
---

Gemini 的差异化，很多时候体现在 **Google 办公链路**：你已经在用 Docs、Sheets、Gmail，就不需要把内容在多个工具间来回复制。

## 典型工作流

### 1. 会议记录 → 待办

```text
请整理为：决议 / 待办(负责人+日期) / 未决问题。
不要补充未出现信息。
```

### 2. 表格清洗

```text
这是一份原始表格字段说明。请：
1) 指出空值与异常
2) 给出清洗规则
3) 输出可用于 Sheets 的步骤清单
```

### 3. 资料综述

先让 Gemini 帮忙搜集与归纳公开资料，再把成稿交给 Claude 做语气与逻辑精修。

## 什么时候不要只用 Gemini

- 需要极强长文结构控制：转 Claude  
- 需要图像生成/更丰富插件生态：转 ChatGPT  
- 涉及敏感商业数据：评估企业合规方案，避免随意粘贴到消费级对话产品  

## 相关阅读

- [Gemini 入门](/guides/gemini-beginner-guide/)
- [Gemini 专栏](/guides/gemini/)
- [访问与使用说明](/access/)
