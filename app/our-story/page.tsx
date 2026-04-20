"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import HostStory from "@/components/host-story";
import { Star, Award, Trophy } from "lucide-react";
import TeamSection from "@/components/team-section";
import { useSimpleParallax } from "@/hooks/use-simple-parallax";
import { motion } from "framer-motion";

export default function OurStoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const { y: parallaxY } = useSimpleParallax({ speed: 0.3 });

  useEffect(() => {
    setIsMounted(true);
    window.scrollTo(0, 0);
  }, []);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen">
        {/* ═════════ HERO — mirrors home page exactly ═════════ */}
        <section className="relative min-h-[100svh] flex items-center overflow-hidden no-overflow-x">
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              transform: `translateY(${parallaxY}px)`,
              transition: "transform 0.1s linear",
              willChange: "transform",
            }}
          >
            <img
              src="/images/our-story/our-story-2.webp"
              srcSet="/images/our-story/our-story-2-sm.webp 900w, /images/our-story/our-story-2.webp 1600w"
              sizes="100vw"
              alt="A Keeth House where nature is a neighbour"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/45"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(255, 255, 255, 0.03) 0.4px, transparent 0.4px)",
                backgroundSize: "3px 3px",
              }}
            />
          </motion.div>

          <div className="container mx-auto px-4 relative z-10 pt-56 mobile-spacing">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="text-[3.5rem] font-normal text-white leading-tight mb-2 md:mb-3 mx-auto"
              >
                Our Story
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                className="text-center mx-auto text-[14px] font-normal text-white mb-6 md:mb-10 max-w-xl leading-relaxed"
              >
                Keeth House is a memory of the land and it's people.
              </motion.p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button
              onClick={scrollToStory}
              className="flex flex-col items-center focus:outline-none"
              aria-label="Read our story"
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                className="text-white text-sm font-medium mb-2 tracking-wider"
              >
                Read our story
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

        {/* ═════════ STORY ═════════ */}
        <div ref={storyRef}>
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          <SectionFive />
        </div>

        <div className="bg-story-paper">
          <HostStory />
          <TeamSection />
          <RecognitionSection />
          <section className="container mx-auto px-4 pb-20 md:pb-24 pt-4 text-center">
            <Link href="/">
              <Button
                size="lg"
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
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

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — "Keeth — The Memory of the Land"
   Cream paper · editorial spread · hand-drawn keeth mark
   ═══════════════════════════════════════════════════════════ */
function SectionOne() {
  return (
    <section
      id="s1"
      className="relative bg-story-paper story-grain min-h-[100svh] flex items-center py-20 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT — image stack */}
          <FadeIn className="md:col-span-5 order-2 md:order-1">
            <div className="relative max-w-sm mx-auto md:mx-0">
              <Parallax range={25}>
                <div className="relative aspect-[3/4] overflow-hidden shadow-[0_30px_60px_-24px_rgba(29,25,20,0.5)]">
                  <img
                    src="/images/our-story/our-story-1.webp"
                    srcSet="/images/our-story/our-story-1-sm.webp 900w, /images/our-story/our-story-1.webp 1600w"
                    sizes="(min-width: 768px) 40vw, 90vw"
                    alt="A Keeth House woven from leaves and reeds"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Parallax>
              <div className="absolute -z-10 -bottom-4 -left-4 w-28 h-28 md:w-32 md:h-32 border-2 border-[var(--story-gold)]/60" />
              <div className="absolute -z-10 -top-3 -right-3 w-16 h-16 bg-[var(--story-gold-bright)]/20 rounded-full blur-xl" />
            </div>
          </FadeIn>

          {/* RIGHT — text */}
          <FadeIn delay={0.08} className="md:col-span-7 order-1 md:order-2">
            <div className="max-w-xl">
              <div className="h-[2px] w-16 bg-[var(--story-gold)] mb-6" />
              <h2 className="font-semiboldtext-[2.1rem] sm:text-[2.5rem] md:text-[3.2rem] leading-[1.02] text-[var(--story-ink)] mb-7">
                Keeth{" "}
                <span className="text-[var(--story-gold)]">—</span>{" "}
                <span className="text-[var(--story-ink)]/95">
                  The Memory
                </span>{" "}
                of the Land
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] leading-[1.8] text-[var(--story-ink)]/80">
                <p>
                  The leaves carry the memory of the soil — the warmth of the
                  earth they once sprouted from, the water that coursed through
                  their veins, the air that whispered along their edges. The
                  reeds remember how the river flowed around them, bending and
                  swaying, yet never breaking. And the houses — woven from
                  these very leaves and reeds — carry the imprints of the
                  people who shaped them: the hands that wove them together,
                  turning what once belonged to the wilderness into a home.
                </p>
                <p>
                  Keeth House is more than a shelter; it is a memory of the
                  land and its people. A house that breathes, sways with the
                  wind, absorbs the rains, and dries under the sun. A house
                  that ages, just as we do.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — "A Living, Breathing House"
   Moss canvas · image blooms from the right · quote weaves
   between heading and body for a cinematic two-beat read
   ═══════════════════════════════════════════════════════════ */
function SectionTwo() {
  return (
    <section
      id="s2"
      className="relative min-h-[100svh] bg-[var(--story-moss)] text-[var(--story-paper)] overflow-hidden flex items-center"
    >
      {/* soft noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* warm halo behind the image */}
      <div
        aria-hidden
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] h-[80vh] bg-[var(--story-gold-bright)]/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 py-20 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          {/* text column */}
          <FadeIn className="md:col-span-6">
            <div className="max-w-xl">
              <div className="h-[2px] w-16 bg-[var(--story-gold-bright)] mb-7" />
              <h2 className="font-semiboldtext-[2.1rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.02] mb-8">
                A Living,{" "}
                <span className="text-[var(--story-gold-bright)]">
                  Breathing
                </span>{" "}
                House
              </h2>

              <p className="text-[15px] md:text-[17px] leading-[1.8] text-[var(--story-paper)]/85 mb-9">
                Life in a Keeth House is not separate from nature — it is
                intertwined with it. Just as we call it home, other creatures
                find comfort here too. Squirrels scurry across the roof, while
                frogs, foxes, snakes, and even peacocks pass by, reminding you
                that the water channel is near and the land is still wild and
                undisturbed enough for them to belong.
              </p>

              {/* inline pull line — typographic centrepiece */}
              <div className="relative pl-6 border-l-2 border-[var(--story-gold-bright)]/60">
                <p
                  className="italic leading-[1.12] text-[var(--story-paper)]"
                  style={{
                    fontSize: "clamp(1.4rem, 2.6vw, 2.1rem)",
                    fontWeight: 400,
                  }}
                >
                  They are not intruders; they are{" "}
                  <span className="text-[var(--story-gold-bright)]">
                    neighbours
                  </span>
                  .
                </p>
                <p className="mt-3 text-[14px] md:text-[15px] leading-[1.75] text-[var(--story-paper)]/75">
                  Living proof of a world where the boundaries between humans
                  and nature blur.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* image column — tall cinematic portrait with soft vignette */}
          <FadeIn delay={0.08} className="md:col-span-6">
            <div className="relative max-w-md mx-auto md:mx-0 md:ml-auto">
              <Parallax range={28}>
                <div className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-[var(--story-gold-bright)]/15">
                  <img
                    src="/images/our-story/our-story-2.webp"
                    srcSet="/images/our-story/our-story-2-sm.webp 900w, /images/our-story/our-story-2.webp 1600w"
                    sizes="(min-width: 768px) 45vw, 90vw"
                    alt="A Keeth House where nature is a neighbour"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* warm inner vignette */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 55%, rgba(22,30,23,0.6) 100%)",
                    }}
                  />
                </div>
              </Parallax>
              {/* offset thin gold frame */}
              <div className="hidden md:block absolute -top-4 -right-4 w-full h-full border border-[var(--story-gold-bright)]/40 -z-10" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 3 — "Craft We Choose to Keep Alive"
   Amber · museum plate composition · botanical technical drawing
   ═══════════════════════════════════════════════════════════ */
function SectionThree() {
  return (
    <section
      id="s3"
      className="relative min-h-[100svh] flex items-center py-20 md:py-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--story-stone) 0%, #e2c595 100%)",
      }}
    >
      {/* grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center max-w-6xl mx-auto">
          {/* museum plates — two stacked images */}
          <FadeIn className="md:col-span-5">
            <div className="relative max-w-sm mx-auto md:mx-0">
              <Parallax range={20}>
                <div className="relative aspect-[4/5] overflow-hidden shadow-[0_30px_60px_-24px_rgba(29,25,20,0.4)]">
                  <img
                    src="/images/our-story/our-story-3.webp"
                    srcSet="/images/our-story/our-story-3-sm.webp 900w, /images/our-story/our-story-3.webp 1600w"
                    sizes="(min-width: 768px) 40vw, 90vw"
                    alt="Woven coconut-leaf roof of a Keeth House"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Parallax>
              {/* offset thin frame */}
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border border-[var(--story-ink)]/30 -z-10" />
            </div>
          </FadeIn>

          {/* text column */}
          <FadeIn delay={0.08} className="md:col-span-7">
            <div className="max-w-xl">
              <div className="h-[2px] w-16 bg-[var(--story-terra)] mb-6" />
              <h2 className="font-semiboldtext-[2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.03] text-[var(--story-ink)] mb-7">
                Craft We Choose to{" "}
                <span className="text-[var(--story-terra)]">
                  Keep Alive
                </span>
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16.5px] leading-[1.75] text-[var(--story-ink)]/80">
                <p>
                  Keeth is a symbol of climate adaptability — a craft honed
                  over generations, yet slowly disappearing. India's
                  traditional architecture is known for structures that have
                  endured time and nature. Some stand strong in durability,
                  while others, like Keeth Houses, thrive in adaptability.
                  Woven from coconut or palm leaves, these homes remain
                  naturally cool, their elevated roofs allowing hot air to
                  escape. One can find them across South India, where the
                  summers are intense. When layered with{" "}
                  <span className="story-mark text-[var(--story-ink)] font-medium">
                    Vezhal
                  </span>{" "}
                  (reed), it further strengthens the structure, shielding from
                  the monsoons and the winters.
                </p>
                <p className="italic text-[1.25rem] md:text-[1.4rem] leading-snug text-[var(--story-terra)] pt-2">
                  These homes do not resist nature — they move with it,
                  breathe with it, and adapt to it.
                </p>
                <p>
                  With each Keeth House we build, we also ensure that this
                  craft stays alive.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 4 — "Bringing Back the Culture of Nurture"
   Warm stone · arched image portal · woven-thread motif
   ═══════════════════════════════════════════════════════════ */
function SectionFour() {
  return (
    <section
      id="s4"
      className="relative bg-story-paper story-grain min-h-[100svh] flex items-center py-20 md:py-24 overflow-hidden"
    >
      {/* large ochre disc behind image */}
      <div
        aria-hidden
        className="hidden md:block absolute -left-24 top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-[var(--story-gold-bright)]/25 to-transparent blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          {/* text column */}
          <FadeIn className="md:col-span-6 order-2 md:order-1">
            <div className="max-w-xl">
              <div className="h-[2px] w-16 bg-[var(--story-gold)] mb-6" />
              <h2 className="font-semiboldtext-[2.1rem] sm:text-[2.5rem] md:text-[3.1rem] leading-[1.03] text-[var(--story-ink)] mb-7">
                Bringing Back the{" "}
                <span className="text-[var(--story-gold)]">
                  Culture of Nurture
                </span>
              </h2>
              <div className="space-y-5 text-[15px] md:text-[17px] leading-[1.8] text-[var(--story-ink)]/80">
                <p>
                  A Keeth House is not a place you simply live in — it is a
                  home that asks for your care. Unlike a concrete structure,
                  it does not stand apart from you, demanding nothing in
                  return. Instead, it invites you into a relationship. It
                  asks you to watch over it, to tend to it, to ensure the
                  ants do not feed on its fibers, to check if its structure
                  remains intact. It asks you to build a community, one where
                  people come together when the rain falls, repairing and
                  restoring what the seasons take away.
                </p>
                <p>
                  To live in a Keeth House is to understand the rhythm of
                  nature. It is to embrace the cycle of{" "}
                  <span className="story-mark text-[var(--story-ink)] font-medium">
                    building, tending, and renewing
                  </span>
                  . It is to cherish what is closest to us — both the Earth
                  and the people who share it with us.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* image column — clean framed portrait with offset golden block */}
          <FadeIn delay={0.08} className="md:col-span-6 order-1 md:order-2">
            <div className="relative max-w-md mx-auto md:mx-0 md:ml-auto">
              {/* offset golden warm block behind */}
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 w-full h-full bg-gradient-to-br from-[var(--story-gold-bright)]/40 to-[var(--story-gold)]/25 rounded-sm -z-0" />
              <Parallax range={24}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_40px_80px_-30px_rgba(29,25,20,0.5)]">
                  <img
                    src="/images/our-story/our-story-4.webp"
                    srcSet="/images/our-story/our-story-4-sm.webp 900w, /images/our-story/our-story-4.webp 1600w"
                    sizes="(min-width: 768px) 45vw, 90vw"
                    alt="Tending to a Keeth House after the rains"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Parallax>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 5 — "From Land, Back to Land"
   Dusk finale · centered ritual · ornament + large italic close
   ═══════════════════════════════════════════════════════════ */
function SectionFive() {
  return (
    <section
      id="s5"
      className="relative min-h-[100svh] flex items-center justify-center bg-[var(--story-dusk)] text-[var(--story-paper)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <Parallax range={40}>
          <img
            src="/images/our-story/our-story-5.webp"
            srcSet="/images/our-story/our-story-5-sm.webp 900w, /images/our-story/our-story-5.webp 1600w"
            sizes="100vw"
            alt="A Keeth House settling gently into the land it rose from"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--story-dusk)] via-[var(--story-dusk)]/75 to-[var(--story-dusk)]" />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        {/* golden vignette glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[70vh] rounded-full bg-[var(--story-gold-bright)]/15 blur-3xl" />
      </div>

      <FadeIn className="relative z-10 max-w-3xl text-center px-6 py-20 md:py-24">
        <div className="h-[2px] w-16 bg-[var(--story-gold-bright)]/70 mx-auto mb-8" />
        <h2 className="font-semiboldtext-[2.3rem] sm:text-[2.8rem] md:text-[3.6rem] leading-[1.03] mb-8">
          From Land,{" "}
          <span className="text-[var(--story-gold-bright)]">
            Back to Land
          </span>
        </h2>
        <div className="space-y-6 text-[15px] md:text-[17px] leading-[1.85] text-[var(--story-paper)]/85">
          <p>
            With every Keeth House that is built, a piece of land is spared
            from the weight of concrete. With every home woven from leaves
            and reeds, a craft is kept alive. Livelihoods are created for
            artisans who still remember the old ways, and through them, more
            people find their way back to the wisdom of using natural
            materials. We hope to create a space that gives back more than
            it takes — a space where the land is honoured, the craft is
            protected, and life coexists in harmony with nature.
          </p>
        </div>

        {/* closing hero quote */}
        <div className="mt-12 pt-10 border-t border-[var(--story-gold-bright)]/25">
          <p
            className="italic text-[var(--story-paper)] leading-[1.15]"
            style={{ fontSize: "clamp(1.4rem, 3.6vw, 2.4rem)", fontWeight: 400 }}
          >
            <span className="text-[var(--story-gold-bright)]">"</span>
            A Keeth House is more than a home. It is a story of the land. A
            story of the people. A story that continues, as long as we choose
            to remember.
            <span className="text-[var(--story-gold-bright)]">"</span>
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Preserved — Recognition
   ═══════════════════════════════════════════════════════════ */
function RecognitionSection() {
  return (
    <section id="recognition" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-semiboldtext-3xl md:text-[2.6rem] leading-[1.05] mb-3">
            Recognition &{" "}
            <span className="text-primary">Awards</span>
          </h2>
          <div className="h-[2px] bg-primary mx-auto mb-6 w-16" />
          <p className="max-w-2xl mx-auto text-foreground/80">
            Keeth House has been recognised across leading booking platforms
            for our commitment to sustainable living and exceptional guest
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AwardCard
            logo="/images/airbnb-logo.svg"
            alt="Airbnb logo"
            title="Airbnb"
            label="Superhost Status"
            stars={5}
            rating="4.9 / 5"
          />
          <AwardCard
            logo="/images/mt-award.webp"
            alt="Make My Trip — Unique Homestay of the Year 2022"
            title="Make My Trip"
            label="Unique Homestay of the Year 2022"
            stars={5}
            rating="Exceptional"
          />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <RecognitionBlock
            title="Airbnb Featured Property"
            body="Keeth House I was the first property from India to be featured on Airbnb's Social Media Platforms which drew global attention to Keeth House and maintaining a Superhost title for around 6 years now."
            chips={["Keeth House I", "First from India", "Superhost for 6 Years"]}
          />
          <RecognitionBlock
            title="Award-Winning Properties"
            body="Awarded twice by Times of India and Make My Trip for Keeth House II and The Khaya Nest under top 10 unique homestays in India out of 7500 properties."
            chips={["Keeth House II", "The Khaya Nest", "Top 10 Unique Homestays"]}
          />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Helpers — FadeIn, Parallax
   ═══════════════════════════════════════════════════════════ */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
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
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
      }}
    >
      {children}
    </div>
  );
}

/** Tiny scroll-linked parallax wrapper for images — subtle, not jumpy. */
function Parallax({
  children,
  range = 30,
}: {
  children: React.ReactNode;
  range?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress -1 (below) .. 0 (center) .. 1 (above)
      const p = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(Math.max(-1, Math.min(1, p)) * range);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        handler();
        raf = 0;
      });
    };
    handler();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transform: `translate3d(0, ${-offset}px, 0)`, willChange: "transform" }}
      className="h-full w-full"
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Awards cards (unchanged)
   ═══════════════════════════════════════════════════════════ */
function AwardCard({
  logo,
  alt,
  title,
  label,
  stars,
  rating,
}: {
  logo: string;
  alt: string;
  title: string;
  label: string;
  stars: number;
  rating: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-6 flex items-center">
      <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 mr-4 md:mr-6">
        <Image src={logo} alt={alt} fill className="object-contain" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <div className="flex items-center mb-2">
          <Award className="h-4 w-4 text-primary mr-1" />
          <p className="text-gray-700 font-medium">{label}</p>
        </div>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-primary fill-primary" />
            ))}
          </div>
          <p className="text-gray-700 font-medium">{rating}</p>
        </div>
      </div>
    </div>
  );
}

function RecognitionBlock({
  title,
  body,
  chips,
}: {
  title: string;
  body: string;
  chips: string[];
}) {
  return (
    <div className="bg-primary/10 rounded-xl p-6 md:p-7">
      <div className="flex items-start mb-4">
        <Trophy className="h-8 w-8 text-primary mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{body}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {chips.map((c) => (
          <span
            key={c}
            className="bg-white px-3 py-1.5 rounded-full shadow-sm text-xs font-medium text-primary"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
