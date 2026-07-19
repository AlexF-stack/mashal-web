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
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function readInitialLanguage(): Language {
  if (typeof window === "undefined") return defaultLanguage;
  const stored = window.localStorage.getItem("language");
  if (stored && supportedLanguages.includes(stored as Language)) {
    return stored as Language;
  }
  const browserLang = window.navigator.language.split("-")[0];
  if (supportedLanguages.includes(browserLang as Language)) {
    return browserLang as Language;
  }
  return defaultLanguage;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem("language", lang);
  };

  const t = getTranslation(language);

  return (
    <I18nContext.Provider value={{ language, t, setLanguage }}>
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
