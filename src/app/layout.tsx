import type { Metadata } from "next";
import Link from "next/link";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "@/app/globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mano Bharathi M | Portfolio",
  description: "Portfolio of Mano Bharathi M, a software engineer focused on backend services, distributed systems, observability, and AI-agent workflows.",
  metadataBase: new URL("https://manobharathi93.github.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mano Bharathi M | Portfolio",
    description: "Portfolio of Mano Bharathi M, featuring backend systems, distributed-systems projects, technical skills, experience, research, and awards.",
    url: "https://manobharathi93.github.io/",
    siteName: "Mano Bharathi Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://manobharathi93.github.io/preview.png",
        width: 1200,
        height: 627,
        alt: "Mano Bharathi M - Software Engineering Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mano Bharathi M | Portfolio",
    description: "Portfolio of Mano Bharathi M, featuring backend systems, distributed-systems projects, technical skills, and experience.",
    images: ["https://manobharathi93.github.io/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {/* Main Navigation Header */}
          <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-sm">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/" className="font-mono font-bold tracking-tight text-sm hover:text-[var(--accent)] transition-colors">
                  MB_CORE_LOG
                </Link>
                <span className="hidden sm:inline text-xs font-mono text-[var(--muted)] border-l border-[var(--border)] pl-3">
                  Bengaluru, IN
                </span>
              </div>

              <nav className="flex items-center gap-5 text-sm font-medium">
                <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
                <Link href="/#experience" className="hidden md:inline hover:text-[var(--accent)] transition-colors">Experience</Link>
                <Link href="/projects" className="hover:text-[var(--accent)] transition-colors">Projects</Link>
                <Link href="/architecture" className="hover:text-[var(--accent)] transition-colors">Architecture</Link>
                <Link href="/#awards" className="hover:text-[var(--accent)] transition-colors">Awards</Link>
                <Link href="/resume" className="hover:text-[var(--accent)] transition-colors">Resume</Link>
                <a href="https://github.com/ManoBharathi93" target="_blank" rel="noopener noreferrer" className="hidden sm:inline hover:text-[var(--accent)] transition-colors">GitHub</a>
                <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          {/* Main Viewport Content */}
          <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-[var(--border)] bg-[var(--muted-background)] py-8 mt-12">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
              <div>
                © 2026 Mano Bharathi M. Backend, Distributed Systems & AI.
              </div>
              <div className="flex gap-6">
                <a href="/sitemap.xml" className="hover:underline">Sitemap</a>
                <a href="/robots.txt" className="hover:underline">Robots</a>
                <a href="https://github.com/ManoBharathi93" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                <a href="https://linkedin.com/in/manobharathi-m" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
