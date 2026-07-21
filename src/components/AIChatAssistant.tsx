"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconBadge } from "@/components/ui/IconBadge";
import { useI18n } from "@/lib/i18n-context";
import { companyLinks } from "@/lib/company";

type Message = {
  role: "bot" | "user";
  text: string;
  options?: string[];
};

type ServiceKey =
  | "training"
  | "consulting"
  | "sav"
  | "parts"
  | "sites"
  | "machines"
  | "contact"
  | "menu";

function matchService(text: string, labels: Record<ServiceKey, string>): ServiceKey | null {
  const lower = text.toLowerCase();
  const entries: [ServiceKey, string][] = [
    ["training", labels.training],
    ["consulting", labels.consulting],
    ["sav", labels.sav],
    ["parts", labels.parts],
    ["sites", labels.sites],
    ["machines", labels.machines],
    ["contact", labels.contact],
    ["menu", labels.menu],
  ];

  for (const [key, label] of entries) {
    if (lower.includes(label.toLowerCase()) || lower.includes(key)) {
      return key;
    }
  }

  if (/form|train|operateur|operator/.test(lower)) return "training";
  if (/consult|conseil|audit|assist|technique|technical/.test(lower)) return "consulting";
  if (/sav|maintenance|panne|repair|support|service/.test(lower)) return "sav";
  if (/pi[eè]ce|part|stock|filtre|filter/.test(lower)) return "parts";
  if (/chantier|site|btp|mine|mining|hydraul|project/.test(lower)) return "sites";
  if (/machine|engin|catalog|cat |volvo|pelle|chargeuse/.test(lower)) return "machines";
  if (/expert|contact|rappel|call|whatsapp/.test(lower)) return "contact";

  return null;
}

export default function AIChatAssistant() {
  const { t, language } = useI18n();
  const c = t.chat;

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

  useEffect(() => {
    setMessages([welcomeMessage]);
  }, [language, welcomeMessage]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const replyFor = (key: ServiceKey): Message => {
    if (key === "menu") {
      return welcomeMessage;
    }

    if (key === "contact") {
      return {
        role: "bot",
        text: c.replies.contact,
        options: [c.options.menu],
      };
    }

    return {
      role: "bot",
      text: c.replies[key],
      options: [c.options.contact, c.options.menu],
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const optionLabels = c.options as Record<ServiceKey, string>;
    const service = matchService(text, optionLabels);

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputValue("");

    window.setTimeout(() => {
      if (service) {
        setMessages((prev) => [...prev, replyFor(service)]);
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: c.replies.fallback,
          options: mainOptions,
        },
      ]);
    }, 600);
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
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary font-semibold text-background shadow-lg shadow-primary/10"
                        : "border border-[color:var(--border)] bg-[color:var(--surface)] text-foreground",
                    )}
                  >
                    {msg.text}
                  </div>

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
