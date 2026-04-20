"use client";

import { useState } from "react";

type Props = {
  videoId: string;
  poster?: string;
  alt?: string;
};

export default function AboutVideo({
  videoId,
  poster,
  alt = "Keeth House film",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const posterSrc =
    poster ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // youtube-nocookie + hidden chrome for a more cinematic embed
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1&color=white&iv_load_policy=3`;

  return (
    <figure className="group relative">
      <div className="relative aspect-video overflow-hidden bg-[var(--story-ink)]">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label="Play Keeth House film"
            className="absolute inset-0 w-full h-full text-left focus:outline-none"
          >
            <img
              src={posterSrc}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
            />

            {/* soft vignette — hides YouTube-looking edges */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 55%, rgba(20,16,12,0.55) 100%)",
              }}
            />

            {/* play mark — frosted amber disc, sits at 80% from top */}
            <span
              aria-hidden
              className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            >
              <span className="relative flex items-center justify-center w-20 h-12 md:w-20 md:h-12 rounded-full bg-primary/70 backdrop-blur-md ring-1 ring-white/25 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:bg-primary/90 group-hover:scale-105">
                <svg
                  viewBox="0 0 24 24"
                  className="w-12 h-12 ml-1"
                  fill="var(--story-ink)"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>

            {/* bottom caption bar — editorial, not youtube */}
            <div
              aria-hidden
              className="absolute left-0 right-0 bottom-0 px-5 md:px-7 py-4 md:py-5 flex items-end justify-center text-white"
            >
              <span
                className="uppercase text-center"
                style={{
                  letterSpacing: "0.3em",
                  fontSize: "10.5px",
                  fontWeight: 500,
                }}
              >
                A Film · Keeth House
              </span>
            </div>
          </button>
        ) : (
          <iframe
            src={embedSrc}
            title="Keeth House film"
            className="absolute inset-0 w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </figure>
  );
}
