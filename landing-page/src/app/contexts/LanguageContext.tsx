"use client";
import React, { createContext, useContext, useState } from "react";

type Language = "pl" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pl: {
    "nav.about": "O nas",
    "nav.menu": "Menu",
    "nav.gallery": "Galeria",
    "nav.reservations": "Rezerwacje",
    "nav.contact": "Kontakt",
    "header.slogan": "Najlepszy ramen w mieście",
  },
  en: {
    "nav.about": "About",
    "nav.menu": "Menu",
    "nav.gallery": "Gallery",
    "nav.reservations": "Reservations",
    "nav.contact": "Contact",
    "header.slogan": "Best ramen in town",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<Language>("pl");

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
