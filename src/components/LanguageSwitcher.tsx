'use client';

import {usePathname, useRouter} from '@/i18n/routing';
import {useTransition} from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '简体中文' },
  { code: 'it', label: 'Italiano' },
  { code: 'ko', label: '한국어' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' }
];

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  };

  return (
    <div className="relative inline-block" style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={currentLocale}
        onChange={handleLanguageChange}
        disabled={isPending}
        className="lang-select-dropdown"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          backgroundColor: '#faf8f5',
          border: '1px solid #f2ede4',
          color: '#5c5346',
          padding: '0.4rem 2rem 0.4rem 0.75rem',
          borderRadius: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 500,
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s',
        }}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <div 
        className="pointer-events-none" 
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          color: '#8e877e'
        }}
      >
        <svg className="fill-current h-4 w-4" style={{ fill: 'currentColor', height: '12px', width: '12px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
