import { NextResponse } from "next/server";

export async function GET() {
  const menu = {
    ramen: [
      {
        id: 1,
        name: "Tonkotsu Ramen",
        price: 32,
        description: "Tradycyjny ramen na bazie bulionu wieprzowego",
        ingredients: ["Chashu", "Jajko", "Nori", "Szczypiorek"],
      },
      {
        id: 2,
        name: "Miso Ramen",
        price: 34,
        description: "Ramen z pastą miso",
        ingredients: ["Miso", "Kukurydza", "Kiełki bambusa", "Grzyby"],
      },
    ],
    przystawki: [
      {
        id: 3,
        name: "Gyoza",
        price: 22,
        description: "Pierożki z wieprzowiną",
        ingredients: ["Wieprzowina", "Kapusta", "Imbir"],
      },
      {
        id: 4,
        name: "Karaage",
        price: 26,
        description: "Kurczak w tempurze",
        ingredients: ["Kurczak", "Sos sojowy", "Imbir"],
      },
    ],
  };

  return NextResponse.json(menu);
}
