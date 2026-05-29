import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径，除了静态资源和 _next 内部路由
  matcher: ['/', '/(de|es|fr|ja|zh|en)/:path*']
};
