"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  text: string;
  options?: string[];
}

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Bienvenue chez Mashal Equipment. Je suis votre consultant IA. Souhaitez-vous explorer notre catalogue de machines lourdes ou avez-vous besoin d'une étude de rentabilité (TCO) ?",
      options: ["Voir les machines", "Calculer mon TCO", "Logistique Export", "Contact Expert"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate Bot Response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let botResponse: Message;

      if (lowerText.includes("machine") || lowerText.includes("voir")) {
        botResponse = {
          role: "bot",
          text: "Excellent choix. Notre parc premium comprend des unités révisées et prêtes à l'export. Quel tonnage ciblez-vous ?",
          options: ["< 20 tonnes", "20t - 40t", "> 40 tonnes"],
        };
      } else if (lowerText.includes("tonnes") || lowerText.includes("20t") || lowerText.includes("40t")) {
        botResponse = {
          role: "bot",
          text: "Sous la direction de Mr Ithiel DOSSOU, nous avons structuré nos services pour garantir une continuité d'exploitation totale. Quel type de matériel recherchez-vous ?",
          options: ["Pelles hydrauliques", "Chargeuses", "Compacteurs", "Autre"],
        };
      } else if (lowerText.includes("pelle") || lowerText.includes("chargeuse") || lowerText.includes("compacteur") || lowerText.includes("autre")) {
        botResponse = {
          role: "bot",
          text: "Parfait. Nous avons du matériel disponible dans cette catégorie. Souhaitez-vous que je vous mette en contact direct avec notre équipe commerciale ?",
          options: ["Contacter un expert", "Retourner au menu"],
        };
      } else if (lowerText.includes("tco") || lowerText.includes("calculer")) {
        botResponse = {
          role: "bot",
          text: "Notre module TCO est en cours de développement, mais nos experts peuvent réaliser une étude personnalisée pour votre parc. Souhaitez-vous être rappelé ?",
          options: ["Oui, être rappelé", "Plus tard"],
        };
      } else if (lowerText.includes("expert") || lowerText.includes("contact") || lowerText.includes("oui") || lowerText.includes("rappel")) {
        botResponse = {
          role: "bot",
          text: "Un expert Mashal Equipment va vous contacter sous 24h. En attendant, n'hésitez pas à parcourir notre catalogue en ligne.",
        };
      } else {
        botResponse = {
          role: "bot",
          text: "Je peux vous renseigner sur nos équipements, nos services logistiques ou vous mettre en contact avec notre équipe de vente. Comment puis-je vous aider ?",
          options: ["Voir les machines", "Logistique Export", "Contact Expert"],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[150] md:bottom-8 md:right-8 max-md:bottom-20">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 20 }}
            onClick={() => setIsOpen(true)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[#0F172A] shadow-lg transition-opacity hover:opacity-90 active:scale-95 md:h-14 md:w-14"
          >
            <Bot className="h-7 w-7 md:h-8 md:w-8" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed inset-0 z-[160] flex flex-col overflow-hidden bg-background shadow-2xl md:relative md:inset-auto md:h-[600px] md:w-[400px] md:rounded-[2.5rem] md:border md:border-white/10 md:backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-6 text-background">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background/20">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black uppercase tracking-wider">Consultant Mashal</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-background animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Expertise Live</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-background/10 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex flex-col", msg.role === "user" ? "items-end" : "items-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-background font-bold shadow-lg shadow-primary/10" 
                      : "bg-white/5 border border-white/10 text-foreground"
                  )}>
                    {msg.text}
                  </div>
                  
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
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

            {/* Input */}
            <div className="border-t border-white/10 p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Posez votre question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-4 pr-14 text-sm focus:border-primary/50 focus:outline-none transition-all"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-center text-[10px] text-foreground/30 font-bold uppercase tracking-widest">
                Propulsé par Mashal Intelligence v2.1
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
