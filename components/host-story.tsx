"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function HostStory() {
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

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div
          ref={ref}
          className="grid md:grid-cols-12 gap-10 md:gap-16 items-center max-w-6xl mx-auto"
        >
          {/* Portrait — side image, clean aspect, no rings or blobs */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="md:col-span-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden max-w-md md:max-w-none mx-auto">
              <Image
                src="/images/our-story/host.webp"
                alt="Sankar — Keeth House Host"
                fill
                sizes="(min-width: 768px) 50vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Editorial copy — same kicker + divider language as Our Story */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(18px)",
              transition:
                "opacity 0.8s 0.1s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s 0.1s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="md:col-span-6"
          >
            <div className="max-w-xl mx-auto">
              <p
                className="uppercase text-[var(--story-ink)]/85 mb-6 text-center"
                style={{
                  letterSpacing: "0.28em",
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Meet Sankar N S
              </p>
              <div
                aria-hidden
                className="h-px bg-[var(--story-ink)]/15 w-10 mx-auto mb-6"
              />
              <div className="space-y-4 text-[13.5px] md:text-[14.5px] leading-[1.85] text-[var(--story-ink)]/75 font-light text-center">
                <p>
                  My love for exploring new places and connecting with people
                  has been with me since childhood. Living in the heart of
                  Auroville gave me the opportunity to meet travellers from
                  around the world, and before I even realised it, I had
                  started hosting — a passion that quickly became a way of
                  life.
                </p>
                <p>
                  Through Couchsurfing, I began opening my home to guests from
                  different cultures and walks of life. Listening to their
                  stories, learning about their journeys, and sharing a part
                  of mine became an experience I cherished deeply.
                </p>
                <p>
                  Keeth House was born from this passion — a dream nurtured by
                  the little things I love. What began as a small personal
                  project for my family and me gradually blossomed into a
                  warm and welcoming eco-stay, opening its doors to guests in
                  2019.
                </p>
                <p>
                  Rooted in a minimalist and sustainable lifestyle, Keeth
                  House reflects my values in every detail. From working with
                  local artisans to using natural, organic materials, each
                  element was thoughtfully chosen to create an authentic and
                  grounded experience.
                </p>
                <p>
                  After four fulfilling years of hosting in Keeth House Phase
                  1, we felt inspired to grow. With months of planning and
                  dedication, Keeth House Phase 2 came to life — adding three
                  unique cottages and a cosy tree house, bringing our total
                  to seven distinctive stays designed to reconnect you with
                  nature and simplicity.
                </p>
                <p>
                  We invite you to experience Keeth House — where every
                  corner tells a story, and every stay feels like home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
