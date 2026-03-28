import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScrollStopper — AI Hook Templates for Instagram Reels",
  description:
    "Generate scroll-stopping reel hook templates with AI-powered creative direction. Get reference images, scripts, and director briefs tailored to your niche.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
