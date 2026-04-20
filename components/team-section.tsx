"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay = 0) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s ${delay}s cubic-bezier(0.22, 1, 0.36, 1)`,
  });

  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 md:px-8">
        {/* Intro — same kicker + divider language as Our Story */}
        <div className="max-w-xl mx-auto text-center mb-14 md:mb-20">
          <p
            style={{
              ...fade(0),
              letterSpacing: "0.28em",
              fontSize: "11px",
              fontWeight: 500,
            }}
            className="uppercase text-[var(--story-ink)]/85 mb-5"
          >
            Our Team
          </p>
          <div
            aria-hidden
            style={{
              width: isVisible ? "2.5rem" : "0",
              opacity: isVisible ? 1 : 0,
              transition: "width 0.7s 0.1s, opacity 0.7s 0.1s",
            }}
            className="h-px bg-[var(--story-ink)]/15 mx-auto mb-6"
          />
          <p
            style={fade(0.15)}
            className="text-[13.5px] md:text-[14.5px] leading-[1.85] text-[var(--story-ink)]/75 font-light"
          >
            Meet the dedicated people who make Keeth House a place of warmth,
            comfort, and natural beauty. A team bringing together local
            knowledge, traditional skills, and a shared passion for
            sustainable living.
          </p>
        </div>

        {/* Image-dominant row — 8/4 split like Our Story */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          <div style={fade(0)} className="md:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src="/images/our-story/team.webp"
                alt="The Keeth House Team"
                fill
                sizes="(min-width: 768px) 66vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          <div style={fade(0.1)} className="md:col-span-4">
            <div className="max-w-sm mx-auto">
              <p
                className="uppercase text-[var(--story-ink)]/85 mb-5 text-center"
                style={{
                  letterSpacing: "0.28em",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Our Extended Family
              </p>
              <div
                aria-hidden
                className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-6"
              />
              <div className="space-y-3.5 text-[13px] md:text-[13.5px] leading-[1.8] text-[var(--story-ink)]/75 font-light text-center">
                <p>
                  At Keeth House, we're more than just a team — we're a
                  family. Many of our staff members come from nearby villages,
                  carrying generations of traditional knowledge and
                  craftsmanship that shape the experience we offer.
                </p>
                <p>
                  From skilled artisans who maintain our bamboo structures to
                  kitchen staff who prepare local cuisine, each person plays
                  a vital role in the Keeth House experience.
                </p>
                <p>
                  Guest-relations managers, hospitality leads, chefs cooking
                  from locally-sourced ingredients, grounds keepers and
                  housekeepers — each one tends to a corner of the home.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values — editorial tri-column */}
        <div
          style={fade(0.25)}
          className="max-w-5xl mx-auto mt-20 md:mt-28"
        >
          <div className="text-center mb-10">
            <p
              className="uppercase text-[var(--story-ink)]/85 mb-4"
              style={{
                letterSpacing: "0.28em",
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              Our Values
            </p>
            <div
              aria-hidden
              className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <ValueCard
              label="Sustainability"
              body="A commitment to environmentally responsible practices in every part of how we build and host."
            />
            <ValueCard
              label="Community"
              body="Supporting local communities by providing employment and sourcing materials close to home."
              middle
            />
            <ValueCard
              label="Authenticity"
              body="Preserving and sharing traditional knowledge and craft with every guest who arrives."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  label,
  body,
  middle = false,
}: {
  label: string;
  body: string;
  middle?: boolean;
}) {
  return (
    <div
      className={`px-6 py-8 md:py-10 text-center ${
        middle
          ? "md:border-x md:border-[var(--story-ink)]/10"
          : ""
      }`}
    >
      <p
        className="uppercase text-[var(--story-ink)]/85 mb-4"
        style={{
          letterSpacing: "0.3em",
          fontSize: "11px",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <div
        aria-hidden
        className="h-px bg-primary/50 w-8 mx-auto mb-5"
      />
      <p className="text-[13px] md:text-[13.5px] leading-[1.8] text-[var(--story-ink)]/75 font-light">
        {body}
      </p>
    </div>
  );
}
