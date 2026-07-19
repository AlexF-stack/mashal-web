"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { 
  ChevronDown, 
  Cog, 
  Globe, 
  Menu, 
  X,
  ArrowRight, 
  ShieldCheck, 
  FolderOpen,
  User,
  Settings,
  Calculator,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import { useProject } from "@/context/ProjectContext";
import ProjectDrawer from "./ProjectDrawer";
import LanguageSwitcher from "./LanguageSwitcher";

type NavItemProps = {
  title: string;
  href?: string;
  isMega?: boolean;
  items?: { label: string; href: string; description?: string; icon?: LucideIcon }[];
};

function NavItem({ title, href, items, isMega }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!href?.startsWith("#")) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById(href.replace("#", ""));
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [href]);

  const active =
    (href && pathname === href) ||
    (href?.startsWith("#") && activeSection === href.replace("#", "")) ||
    items?.some((item) => pathname === item.href);

  const labelClass = cn(
    "flex items-center gap-1 py-4 text-sm font-bold transition-all hover:text-primary tracking-wide",
    active ? "text-primary scale-105" : "text-foreground/70",
  );

  if (!items && href) {
    return (
      <Link href={href} className={labelClass}>
        {title}
        {active && <motion.div layoutId="nav-underline" className="absolute bottom-2 left-0 right-0 h-0.5 bg-primary" />}
      </Link>
    );
  }

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className={labelClass}>
        {title}
        {items && <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")} />}
      </button>

      <AnimatePresence>
        {isOpen && items && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute top-full left-0 z-50 rounded-3xl p-6 shadow-2xl glass-card",
              isMega ? "w-[600px] -left-48" : "w-72"
            )}
          >
            <div className={cn("grid gap-6", isMega ? "grid-cols-2" : "grid-cols-1")}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/item flex flex-col gap-1 rounded-xl p-3 transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4 text-primary" />}
                    <span className="text-sm font-bold group-hover/item:text-primary">{item.label}</span>
                  </div>
                  {item.description && (
                    <span className="text-xs text-foreground/40">{item.description}</span>
                  )}
                </Link>
              ))}
            </div>
            {isMega && (
              <div className="mt-6 border-t border-white/10 pt-4">
                <Link href="/machines" className="flex items-center justify-between text-xs font-bold text-primary hover:underline">
                  Voir tout le catalogue <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProjectDrawerOpen, setIsProjectDrawerOpen] = useState(false);
  const { items: projectItems } = useProject();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 right-0 left-0 z-[100] px-4 transition-all duration-500 md:px-6",
          scrolled ? "py-4" : "py-7",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 transition-all duration-500 md:px-6",
            scrolled ? "py-2 pr-2 glass" : "bg-transparent py-0 pr-0",
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 overflow-hidden transition-transform group-hover:scale-110">
              <Image
                src="/images/LOGO.png"
                alt="Mashal Equipment Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden text-2xl font-bebas tracking-[0.1em] sm:block group-hover:text-primary transition-colors">
              MASHAL <span className="text-primary">EQUIPMENT</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <NavItem
              title="MACHINES"
              href="/machines"
              isMega
              items={[
                { 
                  label: "Terrassement", 
                  href: "/machines?cat=terrassement", 
                  description: "Excavatrices, chargeuses, bulldozers",
                  icon: Cog
                },
                { 
                  label: "Compactage", 
                  href: "/machines?cat=compactage", 
                  description: "Rouleaux vibrants, compacteurs",
                  icon: ShieldCheck
                },
                { 
                  label: "Pièces détachées", 
                  href: "/pieces", 
                  description: "Composants critiques & maintenance",
                  icon: Globe
                },
                { 
                  label: "Logistique Export", 
                  href: "/logistique", 
                  description: "Accompagnement international",
                  icon: ArrowRight
                },
              ]}
            />
            <NavItem title="PIÈCES" href="/pieces" />
            <NavItem title="SAV" href="/sav" />
            <NavItem title="LOGISTIQUE" href="/logistique" />
            <NavItem title="ARTICLES" href="/articles" />
            <NavItem title="À PROPOS" href="/a-propos" />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Project Cart Button */}
            <button
              onClick={() => setIsProjectDrawerOpen(true)}
              className="relative p-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label="Voir mon projet"
            >
              <FolderOpen className="h-5 w-5" />
              {projectItems.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
                  {projectItems.length}
                </span>
              )}
            </button>

            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <ThemeToggle />

            <Link href="/sav" className="btn-premium btn-gold px-5 py-2.5 text-xs md:px-6">
              DEVIS
            </Link>

            <button className="text-foreground lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 h-full w-full max-w-sm bg-background p-0 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex h-full flex-col">
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                      <Cog className="h-6 w-6 text-background" />
                    </div>
                    <span className="text-xl font-bebas tracking-widest">MASHAL</span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} className="rounded-full bg-white/5 p-2">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid gap-2">
                    {[
                      { label: "MACHINES", href: "/machines", icon: Cog },
                      { label: "PIÈCES", href: "/pieces", icon: ShieldCheck },
                      { label: "SAV", href: "/sav", icon: Settings },
                      { label: "LOGISTIQUE", href: "/logistique", icon: Globe },
                      { label: "ARTICLES", href: "/articles", icon: MessageSquare },
                      { label: "À PROPOS", href: "/a-propos", icon: User },
                      { label: "OUTILS", href: "/outils", icon: Calculator },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-4 rounded-2xl border border-transparent p-4 transition-all hover:border-primary/20 hover:bg-white/5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-primary">
                          <link.icon className="h-5 w-5" />
                        </div>
                        <span className="font-bold tracking-wider">{link.label}</span>
                        <ChevronDown className="ml-auto h-4 w-4 -rotate-90 opacity-20" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="border-t border-white/5 p-6 bg-white/2">
                  <div className="mb-6 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Langue</p>
                    <LanguageSwitcher />
                  </div>
                  <Link
                    href="/sav"
                    onClick={() => setMobileOpen(false)}
                    className="btn-premium btn-gold w-full justify-center"
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
