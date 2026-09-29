import type { Metadata } from "next";
import "./globals.css";
import "./global.css";

export const metadata: Metadata = {
  title: "HomeFix",
  description:
    "Find trusted local professionals for your home service projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}