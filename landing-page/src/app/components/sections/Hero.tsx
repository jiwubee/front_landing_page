"use client";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between">
        {/* Tekst i CTA */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            Autentyczny
            <span className="text-red-500"> Japoński Ramen</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Odkryj bogactwo smaków prawdziwego ramenu, przygotowanego według
            tradycyjnych receptur. Nasz bulion gotowany jest przez 18 godzin, a
            makaron wyrabiamy ręcznie każdego dnia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Zamów Online
            </button>
            <button className="px-8 py-3 border border-red-600 text-red-400 rounded-lg hover:bg-red-900/30 transition-colors">
              Zobacz Menu
            </button>
          </div>
        </div>
        {/* Obraz/Ilustracja */}
        <div className="lg:w-1/2">
          <div className="relative">
            {/* Placeholder dla obrazu - zastąp src właściwym obrazem */}
            <div className="w-full h-[400px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
              Zdjęcie miski ramenu
            </div>
            {/* Dekoracyjne elementy stylizowane na japoński motyw */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-red-900/20 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-red-800/20 rounded-full -z-10" />
            {/* Dodatkowy element dekoracyjny przypominający falę */}
            <div className="absolute -bottom-8 left-0 right-0 h-24 bg-gray-800">
              <svg
                className="w-full h-full"
                viewBox="0 0 100 20"
                preserveAspectRatio="none">
                <path
                  d="M0 10 Q 25 20 50 10 Q 75 0 100 10 L 100 20 L 0 20 Z"
                  fill="rgb(31, 41, 55)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
