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
    "menu.title": "Nasze Menu",
    "menu.description": "Odkryj naszego autentycznego ramena i przystawki",
    "menu.loading": "Ładowanie menu...",
    "menu.error": "Nie udało się załadować menu",
    "menu.categories.all": "Wszystkie",
    "menu.categories.ramen": "Ramen",
    "menu.categories.przystawki": "Przystawki",
  },
  en: {
    "nav.about": "About",
    "nav.menu": "Menu",
    "nav.gallery": "Gallery",
    "nav.reservations": "Reservations",
    "nav.contact": "Contact",
    "header.slogan": "Best ramen in town",
    "menu.title": "Our Menu",
    "menu.description": "Discover our authentic ramen and appetizers",
    "menu.loading": "Loading menu...",
    "menu.error": "Failed to load menu",
    "menu.categories.all": "All",
    "menu.categories.ramen": "Ramen",
    "menu.categories.przystawki": "Appetizers",
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
