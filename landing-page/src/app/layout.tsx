import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "./contexts/LanguageContext";
import { MenuProvider } from "./contexts/MenuContext";

export const metadata: Metadata = {
  title: "Ramen House",
  description: "Najlepszy ramen w mieście - autentyczna japońska kuchnia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <MenuProvider>{children}</MenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
