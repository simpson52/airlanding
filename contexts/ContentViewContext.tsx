"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ContentView = "landing" | "miso";

interface ContentViewContextType {
  currentView: ContentView;
  setCurrentView: (view: ContentView) => void;
}

const ContentViewContext = createContext<ContentViewContextType | undefined>(
  undefined
);

export function ContentViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<ContentView>("landing");

  return (
    <ContentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ContentViewContext.Provider>
  );
}

export function useContentView() {
  const context = useContext(ContentViewContext);
  if (context === undefined) {
    throw new Error("useContentView must be used within a ContentViewProvider");
  }
  return context;
}
