"use client";

import { useProject } from "@/context/ProjectContext";
import { X, Trash2, FolderOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDrawer({ isOpen, onClose }: ProjectDrawerProps) {
  const { items, removeItem, clearProject } = useProject();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[120] h-full w-full max-w-md bg-background shadow-2xl p-6 md:p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-wider">Votre Projet</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 h-20 w-20 rounded-full bg-white/5 flex items-center justify-center">
                  <FolderOpen className="h-10 w-10 text-foreground/20" />
                </div>
                <p className="text-foreground/40 text-lg mb-8">Votre liste est vide.</p>
                <Link
                  href="/machines"
                  onClick={onClose}
                  className="btn-premium btn-gold"
                >
                  Explorer le catalogue
                </Link>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 transition-all hover:border-primary/30"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                          {item.category}
                        </p>
                        <p className="text-sm font-bold">{item.name}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-foreground/60 text-sm">{items.length} machine(s) sélectionnée(s)</p>
                    <button
                      onClick={clearProject}
                      className="text-xs font-bold text-red-500 hover:underline uppercase tracking-widest"
                    >
                      Vider tout
                    </button>
                  </div>

                  <Link
                    href="/sav?project=true"
                    onClick={onClose}
                    className="btn-premium btn-gold w-full justify-center group"
                  >
                    Demander un devis groupé
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
