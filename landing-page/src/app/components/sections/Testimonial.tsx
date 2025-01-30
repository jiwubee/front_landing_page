"use client";
import React from "react";

interface Testimonial {
  content: string;
  author: string;
  rating: number;
  date: string;
  visitType: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      content:
        "Najlepszy ramen jaki jadłam w życiu! Bulion jest niesamowicie bogaty w smaku, a mięso rozpływa się w ustach. Obsługa jest bardzo przyjazna i pomocna w wyborze dania.",
      author: "Karolina Wiśniewska",
      rating: 5,
      date: "Luty 2024",
      visitType: "Obiad z rodziną",
      image: "/placeholder.jpg",
    },
    {
      content:
        "Jestem pod wrażeniem autentyczności smaków. Każdy składnik jest perfekcyjnie przygotowany. Szczególnie polecam Tonkotsu Ramen - to prawdziwa eksplozja smaku!",
      author: "Michał Nowicki",
      rating: 5,
      date: "Marzec 2024",
      visitType: "Kolacja biznesowa",
      image: "/placeholder.jpg",
    },
    {
      content:
        "Świetna atmosfera, prawdziwie japoński klimat. Makaron własnej roboty robi ogromną różnicę. Warto przyjść nawet z daleka, na pewno tu wrócę!",
      author: "Anna Kowalczyk",
      rating: 5,
      date: "Styczeń 2024",
      visitType: "Spotkanie ze znajomymi",
      image: "/placeholder.jpg",
    },
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Opinie naszych gości
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Zobacz, co sądzą o nas osoby, które już spróbowały naszego ramenu i
            doświadczyły japońskiej gościnności.
          </p>
        </div>

        {/* Grid z opiniami */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-lg hover:shadow-lg transition-all border border-gray-700">
              {/* Gwiazdki */}
              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              {/* Treść opinii */}
              <p className="text-gray-300 mb-6">{testimonial.content}</p>

              {/* Autor opinii */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-700 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-400">
                    {testimonial.visitType} • {testimonial.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <a
            href="#reservations"
            className="inline-block px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Zarezerwuj stolik
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
