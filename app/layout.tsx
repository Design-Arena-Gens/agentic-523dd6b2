import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChatPT Atlas",
  description: "Discover, search, and use curated prompts across categories.",
  metadataBase: new URL("https://agentic-523dd6b2.vercel.app"),
  openGraph: {
    title: "ChatPT Atlas",
    description: "Discover, search, and use curated prompts across categories.",
    url: "https://agentic-523dd6b2.vercel.app",
    siteName: "ChatPT Atlas",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-white/10">
          <div className="mx-auto container-max px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-accent/80" />
              <span className="text-lg font-semibold tracking-tight">ChatPT Atlas</span>
            </Link>
            <nav className="text-sm text-muted">
              <a className="hover:text-fg" href="https://agentic-523dd6b2.vercel.app">Live</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto container-max px-4 py-8">{children}</main>
        <footer className="mt-16 border-t border-white/10">
          <div className="mx-auto container-max px-4 py-8 text-center text-sm text-muted">
            ? {new Date().getFullYear()} ChatPT Atlas ? Built for the web
          </div>
        </footer>
      </body>
    </html>
  );
}
