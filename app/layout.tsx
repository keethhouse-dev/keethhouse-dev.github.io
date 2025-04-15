import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export const metadata: Metadata = {
  title: "Keeth House - Experience Natural Living",
  description: "FROM UNIQUE HOUSES TO TREE HOUSE.\n\nEach of our houses tells a unique story, blending traditional craftsmanship with thoughtful amenities. Discover the perfect retreat for your natural living experience",
  openGraph: {
    type: "website",
    url: "https://www.keethhouse.com",
    title: "Keeth House - Experience Natural Living",
    description:
      "FROM UNIQUE HOUSES TO TREE HOUSE.\n\nEach of our houses tells a unique story, blending traditional craftsmanship with thoughtful amenities. Discover the perfect retreat for your natural living experience",
    images: [
      {
        url: "/meta-tag.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keeth House - Experience Natural Living",
    description:
      "FROM UNIQUE HOUSES TO TREE HOUSE.\n\nEach of our houses tells a unique story, blending traditional craftsmanship with thoughtful amenities. Discover the perfect retreat for your natural living experience",
    images: ["/meta-tag.png"],
  },
}

export const viewport = {
  width: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <meta name="theme-color" content="#f1b04c" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="h-full no-overflow-x">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider enabled={false}>
            <Header />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'
