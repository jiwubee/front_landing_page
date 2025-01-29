"use client";
import React from "react";

const About: React.FC = () => {
  const values = [
    {
      title: "Tradycja",
      description:
        "Łączymy autentyczne japońskie techniki z nowoczesnymi metodami, tworząc wyjątkowe doświadczenie kulinarne w każdej misce ramenu.",
    },
    {
      title: "Jakość",
      description:
        "Używamy tylko najświeższych składników, własnoręcznie robimy makaron i bulion, który gotujemy przez 18 godzin dla uzyskania idealnego smaku.",
    },
    {
      title: "Pasja",
      description:
        "Nasza miłość do kuchni japońskiej i ciągłe doskonalenie umiejętności pozwalają nam serwować najlepszy ramen w mieście.",
    },
  ];

  const team = [
    {
      name: "Kamil Tanaka",
      role: "Główny szef kuchni",
    },
    {
      name: "Michał Yamamoto",
      role: "Specjalista od ramenu",
    },
    {
      name: "Anna Suzuki",
      role: "Szef kuchni",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Nagłówek sekcji */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O nas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tworzymy autentyczny japoński ramen, łącząc tradycyjne receptury z
            nowoczesnymi technikami kulinarnymi. Każda miska to starannie
            skomponowana harmonia smaków.
          </p>
        </div>

        {/* Wartości restauracji */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Zespół */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Nasz zespół</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
