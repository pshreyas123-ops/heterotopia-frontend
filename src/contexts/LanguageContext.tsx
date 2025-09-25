"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, isValidLocale, getBrowserLocale } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isValidLocale: (locale: string) => boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'heterotopia-locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize locale from storage or browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(STORAGE_KEY);
      const initialLocale = savedLocale && isValidLocale(savedLocale) 
        ? savedLocale as Locale 
        : getBrowserLocale();
      
      setLocaleState(initialLocale);
      setIsInitialized(true);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  };

  // Don't render children until locale is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return null;
  }

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