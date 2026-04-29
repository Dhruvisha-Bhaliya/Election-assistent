'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function useTranslation() {
  const { t, locale, setLocale } = useLanguage();

  const switchLocale = (newLocale: string) => {
    // @ts-ignore
    setLocale(newLocale);
  };

  return { t, locale, switchLocale };
}
