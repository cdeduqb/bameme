import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 用户后期可以将此 URL 替换为自己绑定的域名
  const baseUrl = 'https://www.bameme.com'; 

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot'],
        allow: '/',
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
