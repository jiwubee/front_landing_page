import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "My awesome landing page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
