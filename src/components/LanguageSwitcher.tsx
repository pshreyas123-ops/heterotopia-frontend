"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageSwitcherProps {
  variant?: 'select' | 'dropdown';
  className?: string;
}

export function LanguageSwitcher({ variant = 'select', className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  // Ensure we have a valid locale before rendering
  if (!locale || !locales.includes(locale) || locale === '') {
    return (
      <div className={`w-32 h-10 bg-gray-100 animate-pulse rounded ${className}`} />
    );
  }

  if (variant === 'select') {
    return (
      <Select value={locale || 'en'} onValueChange={(value: Locale) => setLocale(value)}>
        <SelectTrigger className={`w-32 ${className}`}>
          <SelectValue>
            <div className="flex items-center space-x-2">
              <span>{localeFlags[locale]}</span>
              <span className="text-sm">{localeNames[locale]}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {locales.map((loc) => (
            <SelectItem key={loc} value={loc}>
              <div className="flex items-center space-x-2">
                <span>{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="text-sm border rounded px-2 py-1 bg-white"
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeFlags[loc]} {localeNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}