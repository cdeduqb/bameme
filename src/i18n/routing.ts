import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // 支持的语言列表 (英语、西班牙语、德语、法语、日语、简体中文、意大利语、韩语、葡萄牙语、俄语、阿拉伯语)
  locales: ['en', 'es', 'de', 'fr', 'ja', 'zh', 'it', 'ko', 'pt', 'ru', 'ar'],
  
  // 默认语言
  defaultLocale: 'en'
});

// 包装原生的 Navigation 方法以自动注入 locale 前缀
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
