"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

type Props = {
  variant?: "light" | "dark";
};

export default function ThemeToggle({ variant = "light" }: Props) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const onDark = variant === "dark";

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer le thème clair / sombre"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        onDark
          ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
          : "border-[color:var(--border)] bg-foreground/5 text-foreground hover:bg-foreground/10",
      )}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
