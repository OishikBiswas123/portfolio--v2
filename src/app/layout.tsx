import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oishik Biswas | Python Developer & AI Enthusiast Portfolio",
  description: "Oishik Biswas - Portfolio website showcasing Python programming, AI tools expertise, and web development projects. View my skills, hobbies, and get in touch.",
  keywords: ["Oishik Biswas", "Python Developer", "AI Enthusiast", "Portfolio", "Web Developer", "Kolkata", "India"],
  authors: [{ name: "Oishik Biswas" }],
  creator: "Oishik Biswas",
  publisher: "Oishik Biswas",
  metadataBase: new URL("https://portfolio--v2.vercel.app"),
  openGraph: {
    title: "Oishik Biswas - Portfolio",
    description: "Python Developer & AI Enthusiast | View my portfolio and projects",
    url: "https://portfolio--v2.vercel.app",
    siteName: "Oishik Biswas Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oishik Biswas - Portfolio",
    description: "Python Developer & AI Enthusiast",
    creator: "@oishikbiswas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
