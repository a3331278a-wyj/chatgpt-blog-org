/**
 * robots.txt
 * https://chatgpt-blog.org/robots.txt
 */
import type { APIRoute } from 'astro';

const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://chatgpt-blog.org/sitemap.xml
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
