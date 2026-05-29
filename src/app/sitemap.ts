import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es', 'de', 'fr', 'ja', 'zh', 'it', 'ko', 'pt', 'ru', 'ar'];
  // 用户后期可以将此 URL 替换为自己绑定的域名
  const baseUrl = 'https://www.bameme.com'; 

  const routes = [
    '',
    '/customize',
    '/industries/jewelry',
    '/industries/cosmetics',
    '/industries/gifts',
    '/industries/tech',
    '/industries/watches'
  ];

  const urls: MetadataRoute.Sitemap = [];
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      urls.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });
  });

  return urls;
}
