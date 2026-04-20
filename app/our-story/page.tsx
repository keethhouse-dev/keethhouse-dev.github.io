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
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--story-paper)" }}>
        {/* ═════════ HERO ═════════ */}
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
                className="text-[3.5rem] font-normal text-white leading-tight mb-6 md:mb-10 mx-auto"
              >
                Our Story
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

        {/* ═════════ STORY — editorial spread on one cream paper ═════════ */}
        <div ref={storyRef} className="relative" style={{ backgroundColor: "var(--story-paper)" }}>
          <StoryRow
            index={0}
            kicker="Keeth — The Memory of the Land"
            image="/images/our-story/our-story-1.webp"
            imageSm="/images/our-story/our-story-1-sm.webp"
            alt="A Keeth House woven from leaves and reeds"
            aspect="aspect-[16/10]"
            layout="side"
          >
            <p>
              The leaves carry the memory of the soil—the warmth of the earth
              they once sprouted from, the water that coursed through their
              veins, the air that whispered along their edges. The reeds
              remember how the river flowed around them, bending and swaying,
              yet never breaking. And the houses—woven from these very leaves
              and reeds—carry the imprints of the people who shaped them: the
              hands that wove them together, turning what once belonged to the
              wilderness into a home.
            </p>
            <p>
              Keeth House is more than a shelter; it is a memory of the land
              and its people. A house that breathes, sways with the wind,
              absorbs the rains, and dries under the sun. A house that ages,
              just as we do.
            </p>
          </StoryRow>

          <StoryRow
            index={1}
            kicker="A Living, Breathing House"
            image="/images/our-story/our-story-2.webp"
            imageSm="/images/our-story/our-story-2-sm.webp"
            alt="A Keeth House where nature is a neighbour"
            aspect="aspect-[16/10]"
            layout="overlap"
          >
            <p>
              Life in a Keeth House is not separate from nature—it is
              intertwined with it. Just as we call it home, other creatures
              find comfort here too. Squirrels scurry across the roof, while
              frogs, foxes, snakes, and even peacocks pass by, reminding you
              that the water channel is near and the land is still wild and
              undisturbed enough for them to belong.
            </p>
            <p>
              They are not intruders; they are neighbours—living proof of a
              world where the boundaries between humans and nature blur.
            </p>
          </StoryRow>

          <StoryRow
            index={2}
            kicker="Craft We Choose to Keep Alive"
            image="/images/our-story/our-story-3.webp"
            imageSm="/images/our-story/our-story-3-sm.webp"
            alt="Woven coconut-leaf roof of a Keeth House"
            aspect="aspect-[16/10]"
            layout="side"
          >
            <p>
              Keeth is a symbol of climate adaptability—a craft honed over
              generations, yet slowly disappearing. India's traditional
              architecture is known for structures that have endured time and
              nature. Some stand strong in durability, while others, like
              Keeth Houses, thrive in adaptability. Woven from coconut or palm
              leaves, these homes remain naturally cool, their elevated roofs
              allowing hot air to escape. One can find them across South
              India, where the summers are intense. When layered with{" "}
              <em>Vezhal</em> (reed), it further strengthens the structure,
              shielding from the monsoons and the winters.
            </p>
            <p>
              These homes do not resist nature—they move with it, breathe with
              it, and adapt to it. With each Keeth House we build, we also
              ensure that this craft stays alive.
            </p>
          </StoryRow>

          <StoryRow
            index={3}
            kicker="Bringing Back the Culture of Nurture"
            image="/images/our-story/our-story-4.webp"
            imageSm="/images/our-story/our-story-4-sm.webp"
            alt="Tending to a Keeth House after the rains"
            aspect="aspect-[16/10]"
            layout="overlap"
          >
            <p>
              A Keeth House is not a place you simply live in—it is a home
              that asks for your care. Unlike a concrete structure, it does
              not stand apart from you, demanding nothing in return. Instead,
              it invites you into a relationship. It asks you to watch over
              it, to tend to it, to ensure the ants do not feed on its fibers,
              to check if its structure remains intact. It asks you to build
              a community, one where people come together when the rain
              falls, repairing and restoring what the seasons take away.
            </p>
            <p>
              To live in a Keeth House is to understand the rhythm of nature.
              It is to embrace the cycle of building, tending, and renewing.
              It is to cherish what is closest to us—both the Earth and the
              people who share it with us.
            </p>
          </StoryRow>

          <StoryRow
            index={4}
            kicker="From Land, Back to Land"
            image="/images/our-story/our-story-5.webp"
            imageSm="/images/our-story/our-story-5-sm.webp"
            alt="A Keeth House settling gently into the land it rose from"
            aspect="aspect-[16/10]"
            layout="side"
          >
            <p>
              With every Keeth House that is built, a piece of land is spared
              from the weight of concrete. With every home woven from leaves
              and reeds, a craft is kept alive. Livelihoods are created for
              artisans who still remember the old ways, and through them,
              more people find their way back to the wisdom of using natural
              materials. We hope to create a space that gives back more than
              it takes—a space where the land is honoured, the craft is
              protected, and life coexists in harmony with nature.
            </p>
            <p>
              A Keeth House is more than a home. It is a story of the land. A
              story of the people. A story that continues, as long as we
              choose to remember.
            </p>
          </StoryRow>
        </div>

        <div style={{ backgroundColor: "var(--story-paper)" }}>
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
   StoryRow — editorial spread row
   layout="side":    image one side · text panel the other
   layout="overlap": wide image · cream card overlaps onto it
   ═══════════════════════════════════════════════════════════ */
function StoryRow({
  index,
  kicker,
  image,
  imageSm,
  alt,
  aspect,
  layout,
  children,
}: {
  index: number;
  kicker: string;
  image: string;
  imageSm: string;
  alt: string;
  aspect: string;
  layout: "side" | "overlap";
  children: React.ReactNode;
}) {
  // alternate which side the image sits on, evolve-back style
  const imageOnRight = index % 2 === 1;

  if (layout === "side") {
    return (
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
            <FadeIn
              className={`md:col-span-8 ${
                imageOnRight ? "md:order-2" : "md:order-1"
              }`}
            >
              <Parallax range={16}>
                <div className={`relative ${aspect} overflow-hidden`}>
                  <img
                    src={image}
                    srcSet={`${imageSm} 900w, ${image} 1600w`}
                    sizes="(min-width: 768px) 66vw, 92vw"
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </Parallax>
            </FadeIn>

            <FadeIn
              delay={0.08}
              className={`md:col-span-4 ${
                imageOnRight ? "md:order-1" : "md:order-2"
              }`}
            >
              <StoryCopy kicker={kicker}>{children}</StoryCopy>
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }

  // overlap layout — cream card sits over one edge of a wider image
  return (
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="relative grid md:grid-cols-12 items-center max-w-7xl mx-auto">
          {/* image */}
          <FadeIn
            className={`md:row-start-1 ${
              imageOnRight
                ? "md:col-start-3 md:col-end-13"
                : "md:col-start-1 md:col-end-11"
            }`}
          >
            <Parallax range={16}>
              <div className={`relative ${aspect} overflow-hidden`}>
                <img
                  src={image}
                  srcSet={`${imageSm} 900w, ${image} 1600w`}
                  sizes="(min-width: 768px) 82vw, 92vw"
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </Parallax>
          </FadeIn>

          {/* overlapping text card */}
          <FadeIn
            delay={0.1}
            className={`md:row-start-1 md:z-10 relative -mt-12 md:mt-0 mx-4 md:mx-0 ${
              imageOnRight
                ? "md:col-start-1 md:col-end-6"
                : "md:col-start-8 md:col-end-13"
            }`}
          >
            <div className="bg-[#faf4e4] px-6 py-8 md:px-9 md:py-10 shadow-[0_24px_50px_-28px_rgba(29,25,20,0.25)]">
              <StoryCopy kicker={kicker}>{children}</StoryCopy>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* shared editorial copy block — small-caps kicker + serif body */
function StoryCopy({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-sm mx-auto">
      <p
        className="uppercase text-[var(--story-ink)]/85 mb-5 text-center"
        style={{
          letterSpacing: "0.28em",
          fontSize: "11px",
          fontWeight: 500,
        }}
      >
        {kicker}
      </p>
      <div
        aria-hidden
        className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-6"
      />
      <div className="space-y-3.5 text-[13px] md:text-[13.5px] leading-[1.8] text-[var(--story-ink)]/75 font-light text-center">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Recognition — re-skinned to the paper palette
   ═══════════════════════════════════════════════════════════ */
function RecognitionSection() {
  return (
    <section id="recognition" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="uppercase text-[var(--story-ink)]/85 mb-3"
            style={{ letterSpacing: "0.32em", fontSize: "12px", fontWeight: 500 }}
          >
            Recognition
          </p>
          <h2 className="text-2xl md:text-[2.2rem] leading-[1.15] text-[var(--story-ink)] mb-3 font-normal">
            A quiet kind of applause
          </h2>
          <div className="h-px bg-[var(--story-ink)]/15 mx-auto w-16 mb-5" />
          <p className="max-w-xl mx-auto text-[14px] text-[var(--story-ink)]/70 leading-[1.8]">
            Keeth House has been recognised across leading booking platforms
            for our commitment to sustainable living and guest experiences.
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

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <RecognitionBlock
            title="Airbnb Featured Property"
            body="Keeth House I was the first property from India to be featured on Airbnb's social media, drawing global attention — maintaining a Superhost title for around 6 years."
            chips={["Keeth House I", "First from India", "Superhost 6 Years"]}
          />
          <RecognitionBlock
            title="Award-Winning Properties"
            body="Awarded twice by Times of India and Make My Trip for Keeth House II and The Khaya Nest under the top 10 unique homestays in India out of 7,500 properties."
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
   Award cards — cream paper · subtle primary accent only
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
    <div className="bg-[#faf4e4] border border-[var(--story-ink)]/10 p-5 md:p-6 flex items-center">
      <div className="relative w-14 h-14 md:w-20 md:h-20 flex-shrink-0 mr-4 md:mr-6">
        <Image src={logo} alt={alt} fill className="object-contain" />
      </div>
      <div>
        <h3 className="text-base md:text-lg mb-1 text-[var(--story-ink)] font-medium">
          {title}
        </h3>
        <div className="flex items-center mb-1.5">
          <Award className="h-4 w-4 text-primary mr-1.5" />
          <p className="text-[13px] md:text-[14px] text-[var(--story-ink)]/80">
            {label}
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex mr-2">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 text-primary fill-primary" />
            ))}
          </div>
          <p className="text-[13px] text-[var(--story-ink)]/70">{rating}</p>
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
    <div className="bg-[#faf4e4] border border-[var(--story-ink)]/10 p-6 md:p-7">
      <div className="flex items-start mb-4">
        <Trophy className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg mb-2 text-[var(--story-ink)] font-medium">
            {title}
          </h3>
          <p className="text-[14px] text-[var(--story-ink)]/75 leading-[1.75]">
            {body}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {chips.map((c) => (
          <span
            key={c}
            className="bg-white/60 border border-[var(--story-ink)]/10 px-3 py-1 rounded-full text-[11px] tracking-wider uppercase text-[var(--story-ink)]/70"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
