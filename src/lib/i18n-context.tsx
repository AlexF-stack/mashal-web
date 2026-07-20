"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Language,
  Translation,
  defaultLanguage,
  getTranslation,
  supportedLanguages,
} from "@/lib/i18n";

interface I18nContextType {
  language: Language;
  t: Translation;
  setLanguage: (lang: Language) => void;
  ready: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Toujours FR au premier render (SSR + hydratation) pour éviter le mismatch
  const [language, setLanguageState] = useState<Language>(defaultLanguage);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    if (stored && supportedLanguages.includes(stored as Language)) {
      setLanguageState(stored as Language);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem("language", lang);
  };

  const t = getTranslation(language);

  return (
    <I18nContext.Provider value={{ language, t, setLanguage, ready }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
