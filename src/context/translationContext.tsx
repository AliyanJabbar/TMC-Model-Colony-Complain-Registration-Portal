"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Language,
  translate,
  getPreferredLanguage,
  saveLanguagePreference,
} from "../services/translationService";

interface TranslationContextType {
  translate: (key: string) => string;
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
}

// Create a default context value
const defaultContextValue: TranslationContextType = {
  translate: (key: string) => key, // Return the key itself as fallback
  currentLanguage: "en",
  changeLanguage: () => {}, // No-op function
};

const TranslationContext = createContext<TranslationContextType>(defaultContextValue);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");
  const [isClient, setIsClient] = useState(false);

  // Initialize on client-side only
  useEffect(() => {
    setIsClient(true);
    const savedLanguage = getPreferredLanguage();
    setCurrentLanguage(savedLanguage);
  }, []);

  const translateText = (key: string): string => {
    return translate(key, currentLanguage);
  };

  const changeLanguage = (newLanguage: Language) => {
    setCurrentLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
  };

  const value = {
    translate: translateText,
    currentLanguage,
    changeLanguage,
  };

  // Always provide a context value, even during SSR
  return (
    <TranslationContext.Provider value={isClient ? value : defaultContextValue}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  // No need to check for undefined since we provide a default value
  return context;
}
