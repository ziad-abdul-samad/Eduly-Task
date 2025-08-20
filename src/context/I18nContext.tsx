"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Translations = Record<string, string>;

const translations: Record<string, Translations> = {
  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    edulyDashboard: "Eduly Dashboard",
  },
};

type I18nContextType = {
  t: (key: string) => string;
  lang: string;
  setLang: (lang: string) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState("en");

  const t = (key: string) => translations[lang]?.[key] || key;

  return (
    <I18nContext.Provider value={{ t, lang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};
