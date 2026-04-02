import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScrollStopper — AI Hook Templates for Instagram Reels",
  description:
    "Generate scroll-stopping reel hook templates with AI-powered creative direction. Get reference images, scripts, and director briefs tailored to your niche.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <ClerkProvider appearance={{ baseTheme: dark }}>
          {/* Top bar with auth */}
          <nav className="fixed top-0 right-0 z-50 p-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all">
                  Sign In
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                    userButtonPopoverActionButton__manageAccount: {
                      display: "none",
                    },
                  },
                }}
              />
            </Show>
          </nav>

          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
