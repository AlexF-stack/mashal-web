"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { supportedLanguages, Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "light" | "dark";
};

export default function LanguageSwitcher({ variant = "light" }: Props) {
  const { language, setLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const label = language === "fr" ? "Changer de langue" : "Change language";
  const onDark = variant === "dark";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          onDark
            ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
            : "border-[color:var(--border)] bg-foreground/5 text-foreground hover:bg-foreground/10",
        )}
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-50 mt-2 min-w-[140px] overflow-hidden rounded-xl border border-[color:var(--border)] bg-background text-foreground shadow-xl"
          role="menu"
        >
          {supportedLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              role="menuitem"
              className={cn(
                "block w-full px-4 py-2.5 text-left text-sm transition-colors",
                language === lang
                  ? "bg-primary font-bold text-background"
                  : "hover:bg-foreground/5",
              )}
            >
              {lang === "fr" ? "Français" : "English"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
