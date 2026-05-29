import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { Outfit, Playfair_Display } from 'next/font/google';
import "../globals.css";

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
});

export const viewport = {
  themeColor: '#faf9f6',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  // 确保传入的语言是受支持的
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // 静态生成优化
  setRequestLocale(locale);

  // 获取翻译文件
  const messages = await getMessages();

  return (
    <html lang={locale} className={`h-full scroll-smooth ${outfit.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head />
      <body className="h-full antialiased bg-stone-50 text-stone-900 selection:bg-amber-600 selection:text-white" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
