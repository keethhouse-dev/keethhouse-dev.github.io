"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Coffee, TreePine, Users, Hammer, Heart } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { useSimpleParallax } from "@/hooks/use-simple-parallax"
import { motion } from "framer-motion"

export default function TreeTopKafePage() {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const { y: parallaxY } = useSimpleParallax({ speed: 0.3 })

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo(0, 0)
  }, [])

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const galleryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-YoslXnN1ESGceZyd4bGz2Bwj31cStN.jpg",
      alt: "Tree Top Kafe coffee counter with espresso machine",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%284%29-YXudiOrNegRsoeBsC0J9KnuonB1NDQ.jpg",
      alt: "Tree Top Kafe exterior with menu board",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%283%29-dWx95Lm8ONxagAbQTB49V1wtei7liH.jpg",
      alt: "Wooden walkway bridge to the treehouse",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%282%29-EkfvCLujV4OCMG8UPtZte84qqhjgB6.jpg",
      alt: "Treehouse platform nestled in foliage",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%286%29-A6otNyohUthnHTaO7VCkyq4mFERrIV.jpg",
      alt: "The Mama Khaya tree with traditional decorations",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%288%29-KPYGLD1DddVuphQxHwRCe33NEnCWhB.jpg",
      alt: "Multi-level treehouse structure",
    },
  ]

  return (
    <div
      style={{ opacity: isMounted ? 1 : 0, transition: "opacity 0.5s" }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Background Image with Simple Parallax Effect */}
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxY}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%288%29-KPYGLD1DddVuphQxHwRCe33NEnCWhB.jpg"
            alt="Tree Top Kafe Treehouse Structure"
            fill
            priority
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"
            style={{ opacity: isMounted ? 1 : 0, transition: "opacity 1.5s" }}
          />

          {/* Simple dot overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.1) 0.4px, transparent 0.4px)",
              backgroundSize: "3px 3px",
              opacity: isMounted ? 1 : 0,
              transition: "opacity 1.5s",
            }}
          />
        </div>

        {/* Content with simplified animations */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div
            className="max-w-4xl mx-auto text-center"
            style={{
              opacity: isMounted ? 1 : 0,
              transform: isMounted ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s, transform 0.8s",
            }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Coffee className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">A Unique Experience</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Tree Top Kafe
            </h1>

            <div
              className="h-1 bg-primary mx-auto mb-8"
              style={{
                width: isMounted ? "100px" : "0",
                transition: "width 1s ease",
              }}
            />

            <p className="text-xl md:text-2xl text-primary mb-8">
              &quot;COFFEE AMONG THE CANOPY&quot;
            </p>

            <p className="text-lg text-white mb-10 max-w-2xl mx-auto">
              Experience coffee like never before, perched high above the ground in our handcrafted
              treehouse kafe, built with love by the Tree House Community.
            </p>

          </div>
        </div>

        {/* Simple scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="h-16 w-10 border border-white/50 rounded-full flex justify-center p-2 backdrop-blur-sm"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 0 4px rgba(255, 255, 255, 0.1)",
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                ],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
              }}
            >
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  height: ["20%", "40%", "20%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="bg-primary w-1 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About the Tree Top Kafe Section */}
      <section ref={aboutRef} className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <Coffee className="h-5 w-5 text-primary" />
                  <span className="text-primary text-sm font-medium">About the Kafe</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  A Kafe in the Sky
                </h2>
                <div className="h-1 bg-primary mx-auto mb-8 w-20" />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-YoslXnN1ESGceZyd4bGz2Bwj31cStN.jpg"
                    alt="Tree Top Kafe coffee counter"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to Tree Top Kafe, a one-of-a-kind coffee experience nestled high among the trees
                  at Keeth House. Our kafe is not just a place to grab a cup of coffee &ndash; it&apos;s a journey
                  into the canopy, where you can savor artisanal beverages while surrounded by the whispers
                  of leaves and birdsong.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Built entirely from sustainable materials &ndash; locally sourced wood, bamboo, and natural
                  fibers &ndash; the Tree Top Kafe embodies our commitment to eco-conscious living. Every beam,
                  every plank, and every nail tells a story of craftsmanship and dedication to preserving nature.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Elevation</h4>
                    <p className="text-gray-600">15+ feet above ground</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Capacity</h4>
                    <p className="text-gray-600">Intimate seating for 20</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">Specialty</h4>
                    <p className="text-gray-600">Artisanal coffee & gelato</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-semibold text-primary mb-1">View</h4>
                    <p className="text-gray-600">360-degree tree canopy</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Built It Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <Hammer className="h-5 w-5 text-primary" />
                  <span className="text-primary text-sm font-medium">The Build</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  How We Built It
                </h2>
                <div className="h-1 bg-primary mx-auto mb-8 w-20" />
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  The creation of Tree Top Kafe was a labor of love, combining traditional building
                  techniques with innovative design to create a structure that lives in harmony with its environment.
                </p>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TreePine,
                  title: "Foundation on Nature",
                  description:
                    "Built around living trees, our structure embraces the natural growth patterns, allowing the trees to continue thriving while supporting the kafe.",
                },
                {
                  icon: Hammer,
                  title: "Traditional Craftsmanship",
                  description:
                    "Local artisans used time-honored techniques passed down through generations, hand-shaping each piece of wood with precision and care.",
                },
                {
                  icon: Heart,
                  title: "Sustainable Materials",
                  description:
                    "Every material was carefully sourced &ndash; reclaimed wood, natural rope, and locally harvested bamboo &ndash; ensuring minimal environmental impact.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-16 grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%283%29-dWx95Lm8ONxagAbQTB49V1wtei7liH.jpg"
                  alt="Wooden walkway to the treehouse"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">The Journey Up</h3>
                <p className="text-gray-700 leading-relaxed">
                  Reaching the Tree Top Kafe is an experience in itself. A handcrafted wooden bridge
                  connects you to the main platform, swaying gently as you walk, surrounded by marigold
                  garlands and the rustling of leaves. The ascent builds anticipation, transforming a
                  simple coffee break into an adventure.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The entire construction took over six months, with every joint and connection designed
                  to flex naturally with the trees&apos; movement, ensuring both safety and longevity.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Gallery
                </h2>
                <div className="h-1 bg-primary mx-auto mb-8 w-20" />
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Explore the beauty of Tree Top Kafe through our collection of images
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tree House Community Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-primary text-sm font-medium">The Builders</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Tree House Community
                </h2>
                <div className="h-1 bg-primary mx-auto mb-8 w-20" />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="order-2 md:order-1 space-y-6"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Tree House Community is a passionate group of architects, carpenters, and nature
                  enthusiasts united by a shared vision &ndash; to create spaces that celebrate the harmony
                  between human habitation and the natural world.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Founded on the principles of sustainable construction and community collaboration,
                  this dedicated team has been building treehouse structures around Auroville for over
                  a decade. Their work goes beyond construction; it&apos;s about creating experiences that
                  reconnect people with nature.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every member of the community brings unique skills &ndash; from traditional Tamil carpentry
                  techniques to modern structural engineering &ndash; all working together to ensure each
                  creation is safe, beautiful, and environmentally responsible.
                </p>
                <div className="bg-primary/10 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-2">The Mama Khaya</h4>
                  <p className="text-gray-700">
                    Our kafe is built around &quot;The Mama Khaya&quot; &ndash; a magnificent tree that has stood
                    for over a century. The community honors this tree with traditional ceremonies,
                    symbolizing our respect for the land and its ancient inhabitants.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%20%286%29-A6otNyohUthnHTaO7VCkyq4mFERrIV.jpg"
                    alt="The Mama Khaya tree with traditional decorations"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              </motion.div>
            </div>

            {/* Community Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: "Years of Experience", value: "10+" },
                { label: "Treehouses Built", value: "25+" },
                { label: "Community Members", value: "40+" },
                { label: "Trees Preserved", value: "100+" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 rounded-2xl text-center shadow-sm"
                >
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Tree Top Kafe
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Open daily for guests of Keeth House. Experience artisanal coffee, fresh juices,
              and homemade gelato while immersed in the beauty of nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
              >
                <a href="/contact">Plan Your Visit</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg"
              >
                <a href="/">Explore Our Houses</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  )
}
