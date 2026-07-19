"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  image?: string;
}

interface ProjectContextType {
  items: ProjectItem[];
  addItem: (item: ProjectItem) => void;
  removeItem: (id: string) => void;
  clearProject: () => void;
  isInProject: (id: string) => boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

function readStoredProject(): ProjectItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem("marshal_project");
    return stored ? (JSON.parse(stored) as ProjectItem[]) : [];
  } catch {
    return [];
  }
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ProjectItem[]>(readStoredProject);

  useEffect(() => {
    window.localStorage.setItem("marshal_project", JSON.stringify(items));
  }, [items]);

  const addItem = (item: ProjectItem) => {
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearProject = () => {
    setItems([]);
  };

  const isInProject = (id: string) => items.some((i) => i.id === id);

  return (
    <ProjectContext.Provider value={{ items, addItem, removeItem, clearProject, isInProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
