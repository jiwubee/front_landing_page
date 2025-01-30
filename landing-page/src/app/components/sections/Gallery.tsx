"use client";
import React, { useState, useMemo } from "react";

interface GalleryItem {
  title: string;
  category: string;
  description: string;
  image: string;
  ingredients?: string[];
  price?: string;
}

const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const galleryItems: GalleryItem[] = useMemo(
    () => [
      {
        title: "Tonkotsu Ramen",
        category: "ramen",
        description:
          "Tradycyjny ramen na bazie bulionu wieprzowego, gotowanego przez 18 godzin",
        image: "/images/gallery/ramen/tonkotsu.jpg",
        ingredients: [
          "Wieprzowina Chashu",
          "Jajko Ajitsuke",
          "Nori",
          "Szczypiorek",
        ],
        price: "32 zł",
      },
      {
        title: "Miso Ramen",
        category: "ramen",
        description: "Aromatyczny ramen z pastą miso i pikantnym olejem chili",
        image: "/images/gallery/ramen/miso.jpg",
        ingredients: [
          "Pasta Miso",
          "Kukurydza",
          "Kiełki bambusa",
          "Grzyby Shimeji",
        ],
        price: "34 zł",
      },
      {
        title: "Sala główna",
        category: "wnętrze",
        description: "Przestronna sala z tradycyjnym japońskim wystrojem",
        image: "/images/gallery/interior/main-hall.jpg",
      },
      {
        title: "Gyoza",
        category: "przystawki",
        description: "Pierożki z wieprzowiną i warzywami",
        image: "/images/gallery/appetizers/gyoza.jpg",
        ingredients: ["Wieprzowina", "Kapusta", "Imbir", "Czosnek"],
        price: "22 zł",
      },
      {
        title: "Bar",
        category: "wnętrze",
        description: "Tradycyjny bar z widokiem na otwartą kuchnię",
        image: "/images/gallery/interior/bar.jpg",
      },
      {
        title: "Karaage",
        category: "przystawki",
        description: "Chrupiący kurczak w japońskim stylu",
        image: "/images/gallery/appetizers/karaage.jpg",
        ingredients: ["Kurczak", "Sos sojowy", "Imbir", "Czosnek"],
        price: "26 zł",
      },
    ],
    []
  );

  const categories = useMemo(() => {
    const uniqueCategories = new Set(galleryItems.map((item) => item.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [galleryItems]);

  const filteredItems = useMemo(() => {
    return activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const categoryStats = useMemo(() => {
    return galleryItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [galleryItems]);

  const getCategoryName = (category: string): string => {
    const categoryNames: Record<string, string> = {
      all: "Wszystko",
      ramen: "Ramen",
      przystawki: "Przystawki",
      wnętrze: "Wnętrze",
    };
    return categoryNames[category] || category;
  };

  return (
    <section id="gallery" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Galeria
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Zobacz nasze wyjątkowe dania i klimatyczne wnętrze restauracji.
          </p>

          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors
                  ${
                    activeCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }
                  ${category !== "all" ? "relative" : ""}`}>
                {getCategoryName(category)}
                {category !== "all" && categoryStats[category] && (
                  <span className="ml-2 text-sm opacity-75">
                    ({categoryStats[category]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition-all">
              <div className="relative h-64 bg-gray-700">
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-center mb-4">
                    {item.description}
                  </p>
                  {item.ingredients && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.ingredients.map((ingredient, ingredientIndex) => (
                        <span
                          key={ingredientIndex}
                          className="px-2 py-1 bg-red-600/30 rounded-full text-white text-sm">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {item.price && (
                    <span className="text-red-400 font-semibold">
                      {item.price}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 capitalize">
                  {getCategoryName(item.category)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
