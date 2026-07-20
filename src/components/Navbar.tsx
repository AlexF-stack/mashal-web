"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  FolderOpen,
  User,
  Settings,
  Calculator,
  MessageSquare,
  Cog,
  ShieldCheck,
  Globe,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useProject } from "@/context/ProjectContext";
import ProjectDrawer from "./ProjectDrawer";
import LanguageSwitcher from "./LanguageSwitcher";

const desktopLinks = [
  { label: "Machines", href: "/machines" },
  { label: "Pièces", href: "/pieces" },
  { label: "SAV", href: "/sav" },
  { label: "Logistique", href: "/logistique" },
  { label: "Articles", href: "/articles" },
  { label: "À propos", href: "/a-propos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const { items: projectItems } = useProject();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] px-4 transition-all duration-400 md:px-6",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-400 md:px-5",
            scrolled
              ? "glass py-2 pr-2 text-foreground"
              : "bg-black/30 py-2 pr-2 text-white backdrop-blur-md",
          )}
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden">
              <Image
                src="/images/LOGO.png"
                alt="Mashal Equipment"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden text-xl font-bold tracking-[0.08em] sm:block">
              MASHAL <span className="text-primary">EQUIPMENT</span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {desktopLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-2 text-sm font-semibold tracking-wide transition-colors hover:text-primary",
                    active ? "text-primary" : "opacity-85",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsProjectDrawerOpen(true)}
              className="relative rounded-full p-2 transition-colors hover:text-primary"
              aria-label="Voir mon projet"
            >
              <FolderOpen className="h-5 w-5" />
              {projectItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                  {projectItems.length}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <Link
              href="/sav?type=devis"
              className="rounded-full bg-primary px-4 py-2 text-xs font-bold tracking-wide text-background transition-opacity hover:opacity-90 md:px-5"
            >
              Devis
            </Link>

            <button
              className="rounded-full p-2 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="absolute right-0 h-full w-full max-w-sm bg-background text-foreground shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 p-6">
                  <span className="text-xl font-bold tracking-widest">MASHAL</span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-white/5 p-2"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid gap-1">
                    {[
                      { label: "Machines", href: "/machines", icon: Cog },
                      { label: "Pièces", href: "/pieces", icon: ShieldCheck },
                      { label: "SAV", href: "/sav", icon: Settings },
                      { label: "Logistique", href: "/logistique", icon: Globe },
                      { label: "Articles", href: "/articles", icon: MessageSquare },
                      { label: "À propos", href: "/a-propos", icon: User },
                      { label: "Outils", href: "/outils", icon: Calculator },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
                      >
                        <link.icon className="h-5 w-5 text-primary" />
                        <span className="font-semibold tracking-wide">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                      Langue
                    </p>
                    <LanguageSwitcher />
                  </div>
                  <Link
                    href="/sav?type=devis"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-background"
                  >
                    Demander un devis
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectDrawer
        isOpen={isProjectDrawerOpen}
        onClose={() => setIsProjectDrawerOpen(false)}
      />
    </>
  );
}
