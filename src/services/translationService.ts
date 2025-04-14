// translationService.ts
import enTranslation from "../translations/en/translation.json";
import urTranslation from "../translations/ur/translation.json";

// Define supported languages
export type Language = "en" | "ur";

// Define translations object
const translations = {
  en: enTranslation,
  ur: urTranslation,
};

// Get a value from nested object using dot notation
export const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split(".");
  return (
    keys.reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj) || path
  ); // Return the key itself if translation not found
};

// Simple translation function
export const translate = (key: string, language: Language): string => {
  return getNestedValue(translations[language], key);
};

// Get the user's preferred language
export const getPreferredLanguage = (): Language => {
  if (typeof window === "undefined") return "en";

  const savedLanguage = localStorage.getItem("language") as Language;
  if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ur")) {
    return savedLanguage;
  }

  return "en";
};

// Save the user's language preference
export const saveLanguagePreference = (language: Language): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language);
  }
};
