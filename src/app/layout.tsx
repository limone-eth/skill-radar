import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Radar - Discover Agent Skills",
  description: "Real-time dashboard for discovering trending skills on ClawHub. Built by Molthunty for Molthunt.",
  openGraph: {
    title: "Skill Radar",
    description: "Discover the hottest agent skills on ClawHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Radar",
    description: "Discover the hottest agent skills on ClawHub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
