"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBadge } from "@/components/ui/IconBadge";
import { useI18n } from "@/lib/i18n-context";
import { categoryLabel } from "@/lib/i18n";
import { companyLinks } from "@/lib/company";
import machinesData from "@/data/machines-catalogue";
import type { Machine } from "@/types/machine";
import {
  type ServiceKey,
  type ChatLink,
  type StepServiceKey,
  formatServiceSteps,
  formatMachineDetail,
  formatMachineList,
  findMachineByLabel,
  findMachineByCategoryLabel,
  getCatalogCategories,
  machineName,
  searchMachines,
} from "@/lib/chat-assistant";

type Message = {
  role: "bot" | "user";
  text: string;
  options?: string[];
  links?: ChatLink[];
};

type Flow =
  | { type: "menu" }
  | { type: "machines" }
  | { type: "category"; category: string; machines: Machine[] }
  | { type: "search"; machines: Machine[] };

const SERVICE_KEYS: ServiceKey[] = [
  "training",
  "consulting",
  "sav",
  "parts",
  "sites",
  "machines",
  "contact",
  "menu",
];

function matchService(text: string, labels: Record<ServiceKey, string>): ServiceKey | null {
  const trimmed = text.trim();
  for (const key of SERVICE_KEYS) {
    if (trimmed === labels[key]) return key;
  }

  const lower = trimmed.toLowerCase();
  if (/form|train|operateur|operator/.test(lower)) return "training";
  if (/consult|conseil|audit|assist|technique|technical/.test(lower)) return "consulting";
  if (/sav|maintenance|panne|repair|support/.test(lower)) return "sav";
  if (/pi[eè]ce|part|stock|filtre|filter/.test(lower)) return "parts";
  if (/chantier|site|btp|mine|mining|hydraul|project/.test(lower)) return "sites";
  if (/machine|engin|catalog|cat |volvo|pelle|chargeuse|excavator|loader/.test(lower))
    return "machines";
  if (/expert|contact|rappel|call|whatsapp|devis|quote/.test(lower)) return "contact";

  return null;
}

export default function AIChatAssistant() {
  const { t, language } = useI18n();
  const c = t.chat;
  const flowRef = useRef<Flow>({ type: "menu" });

  const mainOptions = useMemo(
    () => [
      c.options.training,
      c.options.consulting,
      c.options.sav,
      c.options.parts,
      c.options.sites,
      c.options.machines,
      c.options.contact,
    ],
    [c.options],
  );

  const categoryOptions = useMemo(
    () => getCatalogCategories(machinesData).map((cat) => categoryLabel(t, cat)),
    [t],
  );

  const welcomeMessage = useMemo(
    (): Message => ({
      role: "bot",
      text: c.welcome,
      options: mainOptions,
    }),
    [c.welcome, mainOptions],
  );

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const resetFlow = useCallback(() => {
    flowRef.current = { type: "menu" };
  }, []);

  useEffect(() => {
    resetFlow();
    setMessages([welcomeMessage]);
  }, [language, welcomeMessage, resetFlow]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const serviceStepsReply = useCallback(
    (key: StepServiceKey): Message => ({
      role: "bot",
      text: formatServiceSteps(key, t),
      options: [c.options.requestQuote, c.options.contact, c.options.menu],
      links: [{ label: c.options.requestQuote, href: "/sav?type=devis" }],
    }),
    [c.options, t],
  );

  const machinesIntroReply = useCallback((): Message => {
    flowRef.current = { type: "machines" };
    return {
      role: "bot",
      text: `${c.product.intro}\n\n${c.product.chooseCategory}`,
      options: [...categoryOptions, c.options.viewCatalog, c.options.menu],
      links: [{ label: c.options.viewCatalog, href: "/machines" }],
    };
  }, [c.options, c.product, categoryOptions]);

  const categoryListReply = useCallback(
    (category: string): Message => {
      const list = machinesData.filter((m) => m.category === category);
      flowRef.current = { type: "category", category, machines: list };
      const names = list.slice(0, 8).map((m) => machineName(m, language));
      return {
        role: "bot",
        text: formatMachineList(list, language, t, category),
        options: [...names, c.options.viewCatalog, c.options.browseCategories, c.options.menu],
        links: [{ label: c.options.viewCatalog, href: "/machines" }],
      };
    },
    [c.options, language, t],
  );

  const machineDetailReply = useCallback(
    (machine: Machine): Message => ({
      role: "bot",
      text: formatMachineDetail(machine, language, t),
      options: [c.options.requestQuote, c.options.browseCategories, c.options.menu],
      links: [
        { label: c.product.viewSheet, href: `/machines/${machine.id}` },
        { label: c.options.requestQuote, href: "/sav?type=devis" },
      ],
    }),
    [c.options, c.product.viewSheet, language, t],
  );

  const searchResultsReply = useCallback(
    (results: Machine[]): Message => {
      flowRef.current = { type: "search", machines: results };
      if (results.length === 1) {
        return machineDetailReply(results[0]!);
      }
      const names = results.slice(0, 8).map((m) => machineName(m, language));
      return {
        role: "bot",
        text: formatMachineList(results, language, t),
        options: [...names, c.options.browseCategories, c.options.menu],
      };
    },
    [c.options, language, machineDetailReply, t],
  );

  const resolveInput = useCallback(
    (text: string): Message => {
      const labels = c.options as Record<ServiceKey, string>;
      const trimmed = text.trim();

      if (trimmed === labels.menu) {
        resetFlow();
        return welcomeMessage;
      }

      if (trimmed === c.options.browseCategories) {
        flowRef.current = { type: "machines" };
        return {
          role: "bot",
          text: c.product.chooseCategory,
          options: [...categoryOptions, c.options.menu],
        };
      }

      if (trimmed === c.options.requestQuote) {
        return {
          role: "bot",
          text: c.replies.contact,
          options: [c.options.menu],
          links: [{ label: c.options.requestQuote, href: "/sav?type=devis" }],
        };
      }

      if (trimmed === c.options.viewCatalog) {
        return {
          role: "bot",
          text: c.product.intro,
          options: [c.options.menu],
          links: [{ label: c.options.viewCatalog, href: "/machines" }],
        };
      }

      const service = matchService(trimmed, labels);
      if (service === "contact") {
        resetFlow();
        return {
          role: "bot",
          text: c.replies.contact,
          options: [c.options.menu],
          links: [{ label: "WhatsApp", href: companyLinks.whatsapp }],
        };
      }
      if (service === "menu") {
        resetFlow();
        return welcomeMessage;
      }
      if (service === "machines") {
        return machinesIntroReply();
      }
      if (
        service === "training" ||
        service === "consulting" ||
        service === "sav" ||
        service === "parts" ||
        service === "sites"
      ) {
        resetFlow();
        return serviceStepsReply(service);
      }

      const categoryKey = findMachineByCategoryLabel(machinesData, trimmed, t);
      if (categoryKey) {
        return categoryListReply(categoryKey);
      }

      const flow = flowRef.current;
      const pool =
        flow.type === "category"
          ? flow.machines
          : flow.type === "search"
            ? flow.machines
            : machinesData;

      const fromList = findMachineByLabel(pool, trimmed, language);
      if (fromList) {
        return machineDetailReply(fromList);
      }

      const searchResults = searchMachines(machinesData, trimmed, language);
      if (searchResults.length > 0) {
        return searchResultsReply(searchResults);
      }

      if (trimmed.length >= 2) {
        return {
          role: "bot",
          text: c.product.notFound,
          options: [c.options.browseCategories, c.options.machines, c.options.menu],
        };
      }

      resetFlow();
      return {
        role: "bot",
        text: c.replies.fallback,
        options: mainOptions,
      };
    },
    [
      c,
      categoryListReply,
      categoryOptions,
      language,
      machineDetailReply,
      machinesIntroReply,
      mainOptions,
      resetFlow,
      searchResultsReply,
      serviceStepsReply,
      t,
      welcomeMessage,
    ],
  );

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputValue("");

    window.setTimeout(() => {
      setMessages((prev) => [...prev, resolveInput(text)]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[150] max-md:bottom-20 md:bottom-8 md:right-8">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            onClick={() => setIsOpen(true)}
            aria-label={c.title}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[#0F172A] shadow-lg transition-opacity hover:opacity-90 active:scale-95 md:h-14 md:w-14"
          >
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 z-[160] flex flex-col overflow-hidden bg-background shadow-2xl md:relative md:inset-auto md:h-[600px] md:w-[400px] md:rounded-[2.5rem] md:border md:border-[color:var(--border)]"
          >
            <div className="flex items-center justify-between bg-primary p-6 text-background">
              <div className="flex items-center gap-3">
                <IconBadge icon={MessageCircle} variant="dark" size="sm" />
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider">{c.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-background" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                      {c.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-colors hover:bg-background/10"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {messages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}`}
                  className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary font-semibold text-background shadow-lg shadow-primary/10"
                        : "border border-[color:var(--border)] bg-[color:var(--surface)] text-foreground",
                    )}
                  >
                    {msg.text}
                  </div>

                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-background transition-opacity hover:opacity-90"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}

                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSend(opt)}
                          className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-background"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-[color:var(--border)] p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={c.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                  className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] py-4 pl-4 pr-14 text-sm transition-all focus:border-primary/50 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                  aria-label="Envoyer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-widest text-foreground/35">
                {c.footer}
              </p>
              <Link
                href={companyLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-xs font-semibold text-primary hover:underline"
              >
                WhatsApp · réponse humaine
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
