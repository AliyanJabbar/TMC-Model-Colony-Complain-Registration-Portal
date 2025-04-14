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
type TranslationObject = Record<string, string | Record<string, string>>;
export const getNestedValue = (
  obj: TranslationObject,
  path: string
): string => {
  const keys = path.split(".");
  const result = keys.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);

  return typeof result === "string" ? result : path;
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
