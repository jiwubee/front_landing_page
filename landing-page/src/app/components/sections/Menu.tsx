"use client";
import React, { useEffect } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { useMenu } from "@/app/contexts/MenuContext";
import { useMenuData } from "@/app/hooks/useMenuData";

const Menu: React.FC = () => {
  const { t } = useLanguage();
  const {
    menu: globalMenu,
    setMenu,
    activeCategory,
    setActiveCategory,
  } = useMenu();
  const { menu: fetchedMenu, isLoading, isError } = useMenuData();

  useEffect(() => {
    if (fetchedMenu) {
      setMenu(fetchedMenu);
    }
  }, [fetchedMenu, setMenu]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Ładowanie menu...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500">
          Wystąpił błąd podczas ładowania menu. Spróbuj ponownie później.
        </div>
      </div>
    );
  }

  const categories = [
    "all",
    ...new Set(globalMenu.map((item) => item.category)),
  ];

  const filteredMenu =
    activeCategory === "all"
      ? globalMenu
      : globalMenu.filter((item) => item.category === activeCategory);

  const getCategoryName = (category: string): string => {
    const categoryNames: Record<string, string> = {
      all: t("menu.categories.all"),
      ramen: t("menu.categories.ramen"),
      przystawki: t("menu.categories.appetizers"),
    };
    return categoryNames[category] || category;
  };

  return (
    <section id="menu" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {t("menu.title")}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            {t("menu.description")}
          </p>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors
                  ${
                    activeCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}>
                {getCategoryName(category)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
                <span className="text-red-400 font-semibold">
                  {item.price} zł
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
