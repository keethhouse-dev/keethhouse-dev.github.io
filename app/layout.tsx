import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import SocialRail from "@/components/social-rail"

const SITE_URL = "https://www.keethhouse.in"
const SITE_TITLE = "Keeth House — Experience Natural Living"
const SITE_DESCRIPTION =
  "Book your stay at Keeth House — eco-friendly thatched-roof cottages and tree houses near Auroville, Tamil Nadu. Escape the city for a natural living retreat."
const SITE_OG_IMAGE = "/images/khaya-nest/26.jpg"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Keeth House",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Keeth House — thatched-roof cottages near Auroville",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
  },
}

export const viewport = {
  width: "width=device-width, initial-scale=1, viewport-fit=cover",
  themeColor: "#f1b04c",
}

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: "Keeth House",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}${SITE_OG_IMAGE}`,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Auroville",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Thatched-roof bamboo cottages" },
    { "@type": "LocationFeatureSpecification", name: "Tree house accommodation" },
    { "@type": "LocationFeatureSpecification", name: "South Indian breakfast" },
    { "@type": "LocationFeatureSpecification", name: "Farm-fresh organic lunch" },
    { "@type": "LocationFeatureSpecification", name: "Forest surroundings" },
  ],
  checkinTime: "12:00",
  checkoutTime: "10:00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      </head>
      <body className="h-full no-overflow-x" data-new-gr-c-s-check-loaded="14.1231.0" data-gr-ext-installed="">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <SmoothScrollProvider enabled={false}>
            <Header />
            <main>{children}</main>
            <Footer />
            <SocialRail />
            <ScrollToTop />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html >
  )
}
