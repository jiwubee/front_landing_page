// components/LanguageSwitcher.tsx
"use client";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
      className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
      {language.toUpperCase()}
    </button>
  );
};
