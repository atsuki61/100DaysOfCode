"use client";

import { createContext, useContext } from "react";

export type Locale = "ja" | "en";

export type TranslationKeys = {
  common: {
    welcome: string;
    description: string;
    switchLanguage: string;
  };
  greeting: {
    hello: string;
    goodMorning: string;
    goodEvening: string;
  };
  features: {
    title: string;
    item1: string;
    item2: string;
    item3: string;
  };
};

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
};

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

