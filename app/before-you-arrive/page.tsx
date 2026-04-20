"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { useSimpleParallax } from "@/hooks/use-simple-parallax";

const SECTIONS: { title: string; paragraphs: (string | React.ReactNode)[] }[] = [
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
      "There are venomous snakes in this region, thus we urge you to turn on your lights when moving around in the night. Snakes would never attack you — you just need to make sure not to step on them. Please, don't touch furry caterpillars; they can bruise your skin and bring a rash. Despite our diligent efforts, encounters with spiders, bugs, and mosquitoes are part of our natural surroundings.",
      "If these encounters make you uncomfortable, perhaps an alternative accommodation might better suit your preferences. Embrace the off-the-grid experience with us at Keeth House.",
    ],
  },
  {
    title: "In-House Kitchen",
    paragraphs: [
      "We're delighted to offer South Indian Breakfast which is included, and the Lunch charges are 700 INR for a couple. Kindly inform us in advance. We have the Tree Top Kafe in Phase III — an exclusive café set atop a tree, offering a truly unique experience. Do take some time to visit and unwind with the views, sounds, and stillness around you. We provide RO water and kindly request our guests to refill their bottles at the designated refill station.",
      "Additionally, we'd be glad to suggest some cafés in Auroville and Pondicherry for you to explore during your stay at Keeth House. Swiggy and Zomato deliveries are not permitted, to help us reduce plastic containers and packaging entering the premises.",
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
      "While days might be a bit warm, evenings are incredibly pleasant. Surrounded by trees, the natural environment creates a cooling effect. You'll experience a noticeable temperature drop, providing a refreshing and chilly night ambiance.",
      "We're committed to making your stay enjoyable and relaxing, regardless of the weather.",
    ],
  },
  {
    title: "Location",
    paragraphs: [
      "Keeth House is located in Edayanchavadi, just a short 5–10 minute drive from the cafés and places to explore in Auroville, while Pondicherry town is about 20–30 minutes away. Pondicherry Airport is a convenient 25-minute drive, and Chennai International Airport is around 3 hours away. For getting around comfortably, we recommend renting a scooter.",
    ],
  },
];

export default function BeforeYouArrivePage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { y: parallaxY } = useSimpleParallax({ speed: 0.3 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SmoothScrollProvider>
      <div
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: "var(--story-paper)" }}
      >
        {/* ═════════ HERO ═════════ */}
        <section className="relative min-h-[100svh] flex items-end overflow-hidden no-overflow-x">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${parallaxY}px)`,
              transition: "transform 0.1s linear",
              willChange: "transform",
            }}
          >
            <img
              src="/images/before-you-arrive/hero.jpg"
              sizes="100vw"
              alt="The Keeth House team — friends and families from local villages near Auroville"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10 pb-28 md:pb-32 mobile-spacing">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="text-[3.5rem] font-normal text-white leading-tight mx-auto"
              >
                Before You Arrive
              </motion.h1>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button
              onClick={scrollToContent}
              className="flex flex-col items-center focus:outline-none"
              aria-label="Read the guide"
            >
              <span className="text-white text-[11px] uppercase mb-2" style={{ letterSpacing: "0.3em" }}>
                Read on
              </span>
              <motion.div
                className="h-14 w-9 border border-white/50 rounded-full flex justify-center p-2"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255, 255, 255, 0)",
                    "0 0 0 4px rgba(255, 255, 255, 0.1)",
                    "0 0 0 0 rgba(255, 255, 255, 0)",
                  ],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0], height: ["20%", "40%", "20%"] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="bg-primary w-1 rounded-full"
                />
              </motion.div>
            </button>
          </motion.div>
        </section>

        {/* ═════════ CONTENT — Evolve Back editorial FAQ ═════════ */}
        <div
          ref={contentRef}
          className="relative"
          style={{ backgroundColor: "var(--story-paper)" }}
        >
          <div className="container mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-20 md:pb-28">
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="grid md:grid-cols-2 gap-y-6 md:gap-y-12 gap-x-12 md:gap-x-20">
                  {SECTIONS.map((s) => (
                    <GuideCard
                      key={s.title}
                      title={s.title}
                      paragraphs={s.paragraphs}
                    />
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Closing CTA — matches Our Story close */}
          <section className="container mx-auto px-4 pb-24 md:pb-32 text-center">
            <div
              aria-hidden
              className="h-px bg-[var(--story-ink)]/15 w-16 mx-auto mb-10"
            />
            <p
              className="italic text-[var(--story-ink)]/75 leading-[1.55] max-w-xl mx-auto mb-10"
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", fontWeight: 400 }}
            >
              We hope this gives you a gentle sense of what to expect — so the
              first evening can simply be yours.
            </p>
            <Link href="/">
              <Button
                size="lg"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base"
              >
                <span className="flex items-center">
                  Explore Our Houses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </section>
        </div>
      </div>
      <ScrollToTop />
    </SmoothScrollProvider>
  );
}

function GuideCard({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: (string | React.ReactNode)[];
}) {
  return (
    <div className="px-2 md:px-4 py-6 md:py-8 text-center">
      <h2
        className="text-[var(--story-ink)] mb-6"
        style={{
          fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
          fontWeight: 500,
          letterSpacing: "0.005em",
          lineHeight: 1.25,
        }}
      >
        {title}
      </h2>
      <div className="space-y-4 text-[13.5px] md:text-[14px] leading-[1.9] text-[var(--story-ink)]/75 font-light">
        {paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
    </div>
  );
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}
