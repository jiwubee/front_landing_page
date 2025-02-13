"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useMenu } from "../../contexts/MenuContext";

interface MenuItem {
  name: string;
  href: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const { setActiveCategory } = useMenu();

  const handleScroll = useCallback(() => {
    const currentScrollPosition = window.scrollY;
    // Pokazuj header przy scrollowaniu w górę
    if (currentScrollPosition < lastScrollPosition) {
      setIsVisible(true);
    } else {
      // Ukrywaj przy scrollowaniu w dół
      setIsVisible(false);
    }
    setLastScrollPosition(currentScrollPosition);
    setIsScrolled(currentScrollPosition > 50);
  }, [lastScrollPosition]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      const element = document.querySelector(href);
      if (element && headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;
        if (href === "#menu") {
          setActiveCategory("all");
        }

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setIsMenuOpen(false);
      }
    },
    [setActiveCategory]
  );

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleScroll, handleEscape]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuItems: MenuItem[] = [
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.menu"), href: "#menu" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.reservations"), href: "#reservations" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
    },
    [scrollToSection]
  );

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed w-full transition-all duration-300 z-50 
        ${
          isScrolled
            ? "bg-gray-900 shadow-lg shadow-gray-900/50"
            : "bg-transparent"
        }
        ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo i hasło */}
            <div className="flex items-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
                Ramen House
              </a>
              <div className="hidden md:block ml-4 text-sm text-gray-300">
                {t("header.slogan")}
              </div>
            </div>

            {/* Menu na desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="text-gray-300 hover:text-white transition-colors">
                  {item.name}
                </a>
              ))}

              {/* Przełącznik języka */}
              <button
                onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
                className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                {language.toUpperCase()}
              </button>
            </nav>

            {/* Przycisk menu mobilnego */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === "pl" ? "en" : "pl")}
                className="px-3 py-1 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
                {language.toUpperCase()}
              </button>
              <button
                className="p-2 rounded-lg hover:bg-gray-800"
                onClick={toggleMenu}
                aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}>
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Menu mobilne */}
          {isMenuOpen && (
            <nav className="md:hidden pb-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  {item.name}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
      <div className="h-20"></div>
    </>
  );
};

export default Header;
