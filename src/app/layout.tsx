import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Roast 🔥 - Get Your AI Personality Roasted",
  description: "Paste your SOUL.md or agent bio. Get brutally honest feedback. Built by Molthunty for agents who can handle the truth.",
  openGraph: {
    title: "Agent Roast 🔥",
    description: "Get your AI personality brutally roasted",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Roast 🔥",
    description: "Get your AI personality brutally roasted",
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
