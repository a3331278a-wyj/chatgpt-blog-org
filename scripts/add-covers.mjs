import fs from 'node:fs';
import path from 'node:path';

const dir = 'src/content/guides';
const map = {
  chatgpt: '/images/covers/chatgpt.svg',
  claude: '/images/covers/claude.svg',
  gemini: '/images/covers/gemini.svg',
  grok: '/images/covers/grok.svg',
  general: '/images/covers/general.svg',
};

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const p = path.join(dir, file);
  let text = fs.readFileSync(p, 'utf8');
  if (/^cover:/m.test(text)) {
    console.log('skip', file);
    continue;
  }

  const model = (text.match(/^model:\s*(\w+)/m) || [])[1] || 'general';
  const category = (text.match(/^category:\s*(\w+)/m) || [])[1] || 'beginner';
  let cover = map[model] || map.general;
  if (category === 'api') cover = '/images/covers/api.svg';
  if (category === 'tools') cover = '/images/covers/tools.svg';

  const title = (text.match(/^title:\s*'([^']+)'/m) || [])[1] || '教程';
  const coverAlt = `${title} 封面`;

  text = text.replace(/^---\n([\s\S]*?)\n---/, (_m, body) => {
    return `---\n${body.trimEnd()}\ncover: '${cover}'\ncoverAlt: '${coverAlt}'\n---`;
  });

  fs.writeFileSync(p, text);
  console.log('updated', file, cover);
}
