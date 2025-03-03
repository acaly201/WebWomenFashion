'use client';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
export default function HomePage() {
  const t = useTranslations('header');
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}