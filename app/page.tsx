"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  MapPin,
  Utensils,
  ArrowDown,
  Users,
  Home,
  ChefHat,
  Car,
  Sun,
  Navigation,
} from "lucide-react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { phaseData } from "@/lib/house-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { HouseRules } from "@/components/house-rules";
import AboutVideo from "@/components/about-video";

// Replace the PhaseSection component with this enhanced version:
const PhaseSection = React.memo(
  ({ phase, index }: { phase: any; index: number }) => {
    return (
      <section
        id={phase.id}
        className={`py-16 md:py-24 ${
          index % 2 === 0
            ? "[background-color:var(--story-paper)]"
            : "bg-white"
        } scroll-mt-20`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-12 md:mb-16 text-center">
            <p
              className="uppercase text-[var(--story-ink)]/85 mb-4"
              style={{
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {phase.id === "phase-1"
                ? "Phase 01"
                : phase.id === "phase-2"
                ? "Phase 02"
                : "Phase 03"}
            </p>
            <h2
              className="text-[var(--story-ink)] mb-4"
              style={{
                fontSize: "clamp(1.45rem, 2.2vw, 1.9rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.15,
              }}
            >
              {phase.title}
            </h2>
            <div
              aria-hidden
              className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-5"
            />
            <p
              className="uppercase text-[var(--story-ink)]/70 flex items-start justify-center mb-5 max-w-md mx-auto"
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              <MapPin className="h-3 w-3 mr-1.5 mt-[3px] flex-shrink-0" />
              <span className="text-left">
                {phase.id === "phase-1" && "Lakshya Township, Near Auroville"}
                {phase.id === "phase-2" &&
                  "Edayanchavady Cross Road, Near Red Earth Horse Riding School"}
                {phase.id === "phase-3" &&
                  "Edayanchavady Cross Road, Near Keeth House Phase II"}
              </span>
            </p>
            <p className="text-[13px] leading-[1.65] text-[var(--story-ink)]/90 max-w-xl mx-auto">
              {phase.description}
            </p>
          </div>

          {/* Display houses in a grid with smooth staggered animations */}
          {phase?.houses && phase?.houses?.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px 0px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
                hidden: {},
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {phase?.houses?.map((house: any, idx: number) => (
                <HouseCard
                  key={house.id}
                  house={house}
                  phase={phase}
                  priority={index === 0 && idx < 3}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    );
  }
);

// Enhanced HouseCard component with smoother animations:
const HouseCard = React.memo(
  ({
    house,
    phase,
    priority = false,
  }: {
    house: any;
    phase: any;
    priority?: boolean;
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Get image URL
    const imageUrl =
      house.images && house.images[0] ? house.images[0] : "/placeholder.svg";

    // Simple blur data URL for placeholder
    const blurDataURL =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDQwIDMwIiBmaWxsPSJub25lIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iMzAiIGZpbGw9IiNmMWIwNGMyMCIvPjwvc3ZnPg==";

    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              mass: 0.5,
            },
          },
        }}
        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 will-change-transform hardware-accelerated"
      >
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
          {/* Shimmer effect while image loads */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
          ></div>

          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={house.name ? `${house.name} — ${phase.title} at Keeth House, Auroville` : "Keeth House accommodation"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } ${
               house.id === "keeth-house-10"
                ? "blur-sm"
                : ""
            } group-hover:scale-110 transition-transform duration-700`}
            placeholder="blur"
            blurDataURL={blurDataURL}
            onLoad={() => setImageLoaded(true)}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
          />

          <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium z-10">
            {phase.title}
          </div>

          {/* Smooth overlay transition on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-10"></div>
        </div>

        <div className="p-4 md:p-6">
          <h3
            className="text-[var(--story-ink)] mb-2 group-hover:text-primary transition-colors duration-300"
            style={{
              fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)",
              fontWeight: 500,
              letterSpacing: "0.005em",
              lineHeight: 1.25,
            }}
          >
            {house.name}
          </h3>
          <p className="text-[13px] leading-[1.65] text-[var(--story-ink)]/90 mb-4 line-clamp-3">
            {house.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {house.specializations &&
              house.specializations.length > 0 &&
              house.specializations.slice(0, 4).map((spec: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center bg-primary/10 px-2 py-1 rounded-full hover:bg-primary/20 transition-colors duration-300"
                  title={spec.name}
                >
                  {spec.icon && (
                    <spec.icon className="h-3 w-3 text-primary mr-1" />
                  )}
                  <span className="text-xs font-medium">{spec.name}</span>
                </div>
              ))}
          </div>

          <div className="flex items-center justify-between">
            <div
              className="flex items-center uppercase text-[var(--story-ink)]/70"
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                fontWeight: 500,
              }}
            >
              <Users className="h-3.5 w-3.5 mr-1.5" />
              <span>{house.guests} Guests</span>
            </div>

            {house.comingSoon ? (
              <Button
                disabled
                className="bg-gray-300 text-gray-600 cursor-not-allowed text-xs py-1 h-8 px-3"
              >
                Coming Soon
              </Button>
            ) : (
              <Link
                href={`/stays/${house.id}`}
                prefetch={false}
                aria-label={`Explore ${house.name}${phase?.title ? ` in ${phase.title}` : ""} at Keeth House`}
              >
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs py-1 h-8 px-3 transition-all duration-300 hover:translate-x-0.5">
                  <span className="flex items-center">
                    Explore
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

export default function StaysPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const phasesRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Parallax scroll effects - optimized
  const { scrollY } = useScroll({
    container: containerRef,
  });

  // Hero section parallax - optimized with lower values
  const heroY = useTransform(scrollY, [0, 800], [0, 150]); // Reduced parallax effect
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Check for reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setIsReducedMotion(prefersReducedMotion);
    }
    setMounted(true);
  }, []);

  // Optimized mouse movement handler with debounce
  useEffect(() => {
    if (!mounted) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      // Clear the previous timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Set a new timeout to update the state after 10ms
      timeoutId = setTimeout(() => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate mouse position as percentage of window with smoother values
        const xPercent = (clientX / windowWidth - 0.5) * 2; // -1 to 1
        const yPercent = (clientY / windowHeight - 0.5) * 2; // -1 to 1

        setMousePosition({
          x: xPercent,
          y: yPercent,
        });
      }, 10);
    };

    // Only add the event listener if reduced motion is not preferred
    if (!isReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mounted, isReducedMotion]);

  const scrollToPhases = () => {
    if (!phasesRef.current) return;

    // Add a smooth scroll effect with a slight delay
    phasesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Memoize the hero background to prevent unnecessary re-renders
  const heroBackground = useMemo(() => {
    return (
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: heroY,
          opacity: heroOpacity,
          willChange: "transform, opacity",
        }}
      >
        <Image
          src="/images/keethhouse-hero.webp"
          alt="Thatched-roof tree house at Keeth House eco-stay near Auroville, Tamil Nadu"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM3NzU1MzMiLz48L3N2Zz4="
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" /> */}

        {/* Dynamic dot overlay with mouse interaction - only render if mounted and not reduced motion */}
        {mounted && !isReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-black/45"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.03) 0.4px, transparent 0.4px)",
              backgroundSize: "3px 3px",
              x: mousePosition.x * 10, // Reduced movement for better performance
              y: mousePosition.y * 10,
              willChange: "transform",
            }}
            transition={{
              type: "tween", // Changed from spring to tween for better performance
              duration: 0.2,
            }}
          />
        )}
      </motion.div>
    );
  }, [
    heroY,
    heroOpacity,
    mounted,
    mousePosition.x,
    mousePosition.y,
    isReducedMotion,
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Enhanced with parallax and animations */}
      <section
        ref={containerRef}
        className="relative min-h-[100svh] flex items-center overflow-hidden no-overflow-x"
      >
        {/* Background Image with Enhanced Parallax Effect */}
        {heroBackground}

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-56 mobile-spacing">
          <div className="max-w-4xl mx-auto text-center mt-[180px]">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="text-[3.5rem] font-normal text-white leading-tight mb-2 md:mb-3 mx-auto"
            >
              <motion.span className="inline-block">
                Experience Natural Living
              </motion.span>
            </motion.h1>
          </div>
        </div>

        {/* Enhanced scroll indicator with bounce effect - only show if not reduced motion */}
        {!isReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="flex flex-col items-center">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="text-white text-sm font-medium mb-2 tracking-wider"
              >
                Explore our Houses
              </motion.span>
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
        )}
      </section>

      {/* About Keeth House — cinematic custom video, editorial layout */}
      <AnimatedSection className="py-20 md:py-28 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Film */}
            <div className="lg:col-span-8">
              <AboutVideo videoId="ByeQq9gv0Ts" alt="Keeth House — a quiet film" />
            </div>

            {/* Editorial copy */}
            <div className="lg:col-span-4 text-center">
              <p
                className="uppercase text-[var(--story-ink)]/85 mb-5"
                style={{
                  letterSpacing: "0.32em",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                About
              </p>
              <h2
                className="text-[var(--story-ink)] mb-4"
                style={{
                  fontSize: "clamp(1.35rem, 1.9vw, 1.7rem)",
                  fontWeight: 500,
                  letterSpacing: "0.005em",
                  lineHeight: 1.15,
                }}
              >
                A house that remembers
              </h2>
              <div
                aria-hidden
                className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-5"
              />
              <div className="space-y-3.5 text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                <p>
                  Every so often, we yearn to escape the busy life and noisy
                  cities that never sleep. If a peaceful retreat amidst nature
                  is what you&apos;re seeking, then look no further.
                </p>
                <p>
                  Keeth House is an organically built eco-stay situated near
                  the town of Auroville. The word <em>Keeth</em> denotes the
                  thatch roof used in the construction of our houses —
                  inspired by the traditional huts still seen across Indian
                  villages, the thatched-roof bamboo cottages are built with
                  locally sourced materials.
                </p>
                <p>
                  Surrounded by a forest of lush green trees, the houses
                  retain a natural coolness and fresh atmosphere. The tranquil
                  location — with exposed brick walls and a rustic aesthetic
                  — is meant to rejuvenate, quietly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Phase Sections - Reference for lazy loading */}
      <div ref={phasesRef}>
        {phaseData.map((phase, index) => (
          <PhaseSection key={phase.id} phase={phase} index={index} />
        ))}
      </div>

      {/* Before You Arrive — matches /before-you-arrive editorial grid */}
      <AnimatedSection className="py-20 md:py-28 relative bg-white">
        <div
          className="container mx-auto px-4 md:px-8 relative z-10"
          id="before-arrival"
        >
          <div className="text-center mb-14 md:mb-20">
            <p
              className="uppercase text-[var(--story-ink)]/85 mb-5"
              style={{
                letterSpacing: "0.32em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Guest Guide
            </p>
            <h2
              className="text-[var(--story-ink)] mb-5"
              style={{
                fontSize: "clamp(1.45rem, 2.2vw, 1.9rem)",
                fontWeight: 500,
                letterSpacing: "0.005em",
                lineHeight: 1.15,
              }}
            >
              Before You Arrive
            </h2>
            <div
              aria-hidden
              className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto"
            />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-y-6 md:gap-y-12 gap-x-12 md:gap-x-20">
              {[
                {
                  title: "Meet Our Team",
                  paragraphs: [
                    "At Keeth House, we are a small team comprised of our friends and families from local villages near Auroville. While we may not operate like a traditional hotel with 24/7 reception and services, we strive to offer a tranquil and delightful experience. Our availability is from 8 am to 10 pm daily, and our security guard is also present throughout the night for added peace of mind.",
                    "If you desire daily cleaning, kindly inform us upon check-in or in the morning. Your privacy is paramount to us; we respect your space but remain eager to assist whenever needed.",
                  ],
                },
                {
                  title: "Your First Keeth House Experience",
                  paragraphs: [
                    "Step into Keeth House, nestled within the embrace of local nature. While our commitment to cleanliness is unwavering, our rustic setting invites occasional guests like insects, furry caterpillars (best admired from a distance), frogs, snakes, and mice. Kindly bear this in mind before booking, as we coexist harmoniously with these creatures.",
                    "There are venomous snakes in this region, thus we urge you to turn on your lights when moving around in the night. Snakes would never attack you — you just need to make sure not to step on them. Please, don\u2019t touch furry caterpillars; they can bruise your skin and bring a rash. Despite our diligent efforts, encounters with spiders, bugs, and mosquitoes are part of our natural surroundings.",
                    "If these encounters make you uncomfortable, perhaps an alternative accommodation might better suit your preferences. Embrace the off-the-grid experience with us at Keeth House.",
                  ],
                },
                {
                  title: "In-House Kitchen",
                  paragraphs: [
                    "We\u2019re delighted to offer South Indian Breakfast which is included, and the Lunch charges are 700 INR for a couple. Kindly inform us in advance. We have the Tree Top Kafe in Phase III — an exclusive café set atop a tree, offering a truly unique experience. Do take some time to visit and unwind with the views, sounds, and stillness around you. We provide RO water and kindly request our guests to refill their bottles at the designated refill station.",
                    "Additionally, we\u2019d be glad to suggest some cafés in Auroville and Pondicherry for you to explore during your stay at Keeth House. Swiggy and Zomato deliveries are not permitted, to help us reduce plastic containers and packaging entering the premises.",
                    "Moreover, you have the option to use our self-help kitchenette in all the houses except The Khaya Nest. We look forward to enhancing your experience at Keeth House.",
                  ],
                },
                {
                  title: "Transportation and Arrival / Departure Support",
                  paragraphs: [
                    "We kindly ask guests to check in between 12 pm and 7 pm to avoid any inconvenience. Kindly aim to avoid arriving later than 8 pm, as it can pose challenges and may not be feasible in some cases. Check-out time is by 10 am.",
                    "For those interested in transportation assistance, we can provide contacts for our trusted drivers once your reservation is confirmed. Our recommended drivers offer pickup services from various city locations. For late-night arrivals due to flights, we recommend our verified drivers for a safe and fair-priced journey to Keeth House.",
                    "You could also rent a scooter from us at the property for your commute to cafes and beaches. Please check with the property manager for the rental charges.",
                    "Your early check-in request is important to us, and we would love to accommodate it based on the availability. However, note that if we have a booking scheduled prior to your arrival, we can only provide you with access to the house by 12 pm. We kindly request your understanding and cooperation in planning your arrival accordingly.",
                  ],
                },
                {
                  title: "Weather at Keeth House",
                  paragraphs: [
                    "Keeth House is designed with eco-friendliness in mind, ensuring your comfort even in hot weather.",
                    "While days might be a bit warm, evenings are incredibly pleasant. Surrounded by trees, the natural environment creates a cooling effect. You\u2019ll experience a noticeable temperature drop, providing a refreshing and chilly night ambiance.",
                    "We\u2019re committed to making your stay enjoyable and relaxing, regardless of the weather.",
                  ],
                },
                {
                  title: "Location",
                  paragraphs: [
                    "Keeth House is located in Edayanchavadi, just a short 5–10 minute drive from the cafés and places to explore in Auroville, while Pondicherry town is about 20–30 minutes away. Pondicherry Airport is a convenient 25-minute drive, and Chennai International Airport is around 3 hours away. For getting around comfortably, we recommend renting a scooter.",
                  ],
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="px-2 md:px-4 py-6 md:py-8 text-center"
                >
                  <h3
                    className="text-[var(--story-ink)] mb-4"
                    style={{
                      fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                      fontWeight: 500,
                      letterSpacing: "0.005em",
                      lineHeight: 1.25,
                    }}
                  >
                    {s.title}
                  </h3>
                  <div
                    aria-hidden
                    className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-5"
                  />
                  <div className="space-y-3.5 text-[13px] leading-[1.65] text-[var(--story-ink)]/90">
                    {s.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

       {/* House Rules Section */}
       <HouseRules />

      {mounted && <ScrollToTop />}
    </div>
  );
}
