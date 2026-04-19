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
} from "lucide-react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { phaseData } from "@/lib/house-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/animated-section";
import { HouseRules } from "@/components/house-rules";

// Replace the PhaseSection component with this enhanced version:
const PhaseSection = React.memo(
  ({ phase, index }: { phase: any; index: number }) => {
    return (
      <section
        id={phase.id}
        className={`py-12 md:py-20 ${
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        } scroll-mt-20`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8 md:mb-12 text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 relative inline-block">
              {phase.title}
              <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary"></div>
            </h2>
            <p className="text-primary text-xs md:text-sm flex items-center justify-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span>
                {phase.id === "phase-1" && "Lakshya Township, Near Auroville"}
                {phase.id === "phase-2" &&
                  "Edayanchavady Cross Road, Near Red Earth Horse Riding School"}
                {phase.id === "phase-3" &&
                  "Edayanchavady Cross Road, Near Keeth House Phase Il"}
              </span>
            </p>
            <p className="text-base md:text-lg text-foreground/80 mt-4 mx-auto">
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
            alt={house.name || "House image"}
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
          <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            {house.name}
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">
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
            <div className="flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              <span>
                {house.guests} Guests
              </span>
            </div>

            {house.comingSoon ? (
              <Button
                disabled
                className="bg-gray-300 text-gray-600 cursor-not-allowed text-xs py-1 h-8 px-3"
              >
                Coming Soon
              </Button>
            ) : (
              <Link href={`/stays/${house.id}`} prefetch={false}>
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
          src="/images/keethhouse-hero.png"
          alt="Keeth House Tree House"
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

            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="text-center mx-auto text-lg md:text-2xl text-primary mb-4 md:mb-8"
            >
              FROM UNIQUE HOUSES TO TREE HOUSE
            </motion.p> */}

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="text-center mx-auto text-[14px] font-normal text-white mb-6 md:mb-10 max-w-xl leading-relaxed"
            >
              Keeth House is a memory of the land and it’s people.
            </motion.p>
          
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

      {/* About Keeth House Section with YouTube Video - Optimized */}
      <AnimatedSection className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              About Keeth House
            </h2>
            <div className="h-1 bg-primary mx-auto mb-6 w-20" />
            <p className="max-w-2xl mx-auto text-foreground/80">
              Discover the story behind our unique eco-friendly accommodations
              and our commitment to sustainable living.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center max-w-6xl mx-auto">
            {/* YouTube Video - Optimized with loading attribute */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/ByeQq9gv0Ts?rel=0"
                title="Keeth House Video"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>

            {/* Content */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl font-semibold text-primary">
                Natural Living Experience
              </h3>
              <p className="text-foreground/80">
                Every so often, we yearn to escape the busy life and noisy
                cities that never sleep. If a peaceful retreat amidst nature is
                what you're seeking, then look no further.
              </p>
              <p className="text-foreground/80">
                Keeth House is an organically built eco-stay situated near the
                beautiful town of Auroville. The word 'Keeth' denotes the thatch
                roof that is used in the construction of our houses. Inspired by
                the traditional huts that are still seen across Indian villages,
                the thatched-roof bamboo cottages are built with locally sourced
                materials.
              </p>

              <p className="text-foreground/80">
                Surrounded by a forest of lush green trees, the houses retain a
                natural coolness and fresh atmosphere. The tranquil location
                combined with the exposed brick walls and rustic aesthetic is
                assured to rejuvenate your soul.
              </p>
            </div>
          </div>
        </div>

        {/* Simplified decorative elements for better performance */}
        {!isReducedMotion && (
          <>
            <div
              className="absolute top-40 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl -z-10"
              style={{
                animation: "pulse 8s infinite alternate",
              }}
            />

            <div
              className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-primary/10 -z-10"
              style={{
                animation: "spin 20s linear infinite",
              }}
            />
          </>
        )}
      </AnimatedSection>

      {/* Phase Sections - Reference for lazy loading */}
      <div ref={phasesRef}>
        {phaseData.map((phase, index) => (
          <PhaseSection key={phase.id} phase={phase} index={index} />
        ))}
      </div>

      {/* Before You Arrive Section - Optimized with simplified animations */}
      <AnimatedSection className="py-16 md:py-20 bg-gray-50 relative">
        <div
          className="container mx-auto px-4 relative z-10"
          id="before-arrival"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Before You Arrive
            </h2>
            <div className="h-1 bg-primary mx-auto mb-6 w-20" />
            <p className="max-w-2xl mx-auto text-foreground/80">
              Experience the charm of staying at Keeth House with us. Learn more
              about our location, in-house kitchen, and transportation options
              through our frequently asked questions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">
              Essential Information
            </h3>

            {/* Optimized grid with fewer animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2 p-3 md:p-4">
                  <CardTitle className="flex items-center text-base md:text-lg ">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />{" "}
                    Check-In & Check-Out
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 pt-0">
                  <p className="text-xs md:text-sm text-foreground/80">
                    Check-In: 12:00 PM
                    <br />
                    Check-Out: 10:00 AM
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 p-3 md:p-4">
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />{" "}
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 pt-0">
                  <p className="text-xs md:text-sm text-foreground/80">
                    Near Auroville, Tamil Nadu
                    <br />
                    Detailed directions will be provided after the
                    reservation is confirmed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2 p-3 md:p-4">
                  <CardTitle className="flex items-center text-base md:text-lg">
                    <Utensils className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />{" "}
                    Dining
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 md:p-4 pt-0">
                  <p className="text-xs md:text-sm text-foreground/80">
                    Authentic South Indian Breakfast: ₹400 per couple
                    <br />
                    Farm-Fresh Organic Lunch: ₹700 per couple
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Simplified content sections with fewer animations */}
            <div className="space-y-6 md:space-y-8">
              {/* Meet Our Team Section */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" /> Meet Our Team
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-foreground/80">
                    At Keeth House, we are a small team comprised of our friends
                    and families from local villages near Auroville. While we
                    may not operate like a traditional hotel with 24/7 reception
                    and services, we strive to offer a tranquil and delightful
                    experience. Our availability is from 8 am to 10 pm daily,
                    and if you desire daily cleaning, kindly inform us upon
                    check-in or in the morning.
                  </p>
                </div>
              </div>

              {/* Your First Keeth House Experience */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Home className="h-5 w-5 text-primary mr-2" /> Your First
                  Keeth House Experience
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-foreground/80">
                    Step into Keeth House, nestled within the embrace of local
                    nature. While our commitment to cleanliness is unwavering,
                    our rustic setting invites occasional guests like insects,
                    furry caterpillars, frogs, snakes, and mice. Please bear
                    this in mind before booking, as we coexist harmoniously with
                    these creatures. Remember to illuminate your path at night
                    to navigate safely.
                  </p>
                </div>
              </div>

              {/* In-House Kitchen */}
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <ChefHat className="h-5 w-5 text-primary mr-2" /> In-House
                  Kitchen
                </h3>
                <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <p className="text-sm text-foreground/80">
                    We're delighted to offer South Indian Breakfast and Lunch
                    for our guests. Kindly inform us in advance. The breakfast
                    charge is 400 INR per couple, and lunch is 700 INR per
                    couple. Additionally, we'd be glad to suggest some cafés in
                    Auroville and Pondicherry for you to explore during your
                    stay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified decorative elements */}
        {!isReducedMotion && (
          <div
            className="absolute top-40 left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl -z-10"
            style={{
              animation: "pulse 10s infinite alternate",
            }}
          />
        )}
      </AnimatedSection>

       {/* House Rules Section */}
       <HouseRules />

      {mounted && <ScrollToTop />}
    </div>
  );
}
