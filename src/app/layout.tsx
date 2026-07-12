import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Oishik Biswas — Full-Stack Developer",
  description:
    "Portfolio of Oishik Biswas, a full-stack developer specializing in modern web technologies.",
  keywords: [
    "Oishik Biswas",
    "full-stack developer",
    "web developer",
    "portfolio",
  ],
  openGraph: {
    title: "Oishik Biswas — Full-Stack Developer",
    description:
      "Portfolio of Oishik Biswas, a full-stack developer specializing in modern web technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oishik Biswas — Full-Stack Developer",
    description:
      "Portfolio of Oishik Biswas, a full-stack developer specializing in modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} theme-day`}>
      <body className="min-h-screen font-sans antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
