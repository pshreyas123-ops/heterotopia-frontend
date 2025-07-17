"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, locales } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isValidLocale: (locale: string) => locale is Locale;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem('heterotopia-locale');
    if (savedLocale && isValidLocale(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (isValidLocale(browserLang)) {
        setLocaleState(browserLang);
      }
    }
  }, []);

  const isValidLocale = (locale: string): locale is Locale => {
    return locales.includes(locale as Locale);
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('heterotopia-locale', newLocale);
    // Update document language
    document.documentElement.lang = newLocale;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isValidLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { locale } = useLanguage();
  return (key: string) => {
    const keys = key.split('.');
    const translations = require('@/lib/i18n').translations;
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}