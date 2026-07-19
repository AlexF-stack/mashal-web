"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { supportedLanguages, Language } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const label = language === "fr" ? "Changer de langue" : "Change language";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 top-full mt-2 rounded-lg border border-white/10 bg-background shadow-lg z-50 overflow-hidden min-w-[120px]"
          role="menu"
        >
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              role="menuitem"
              className={`block w-full px-4 py-2 text-left text-sm transition-colors focus:outline-none focus:bg-white/10 ${
                language === lang
                  ? "bg-primary text-background font-bold"
                  : "text-foreground hover:bg-white/5"
              }`}
            >
              {lang === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
