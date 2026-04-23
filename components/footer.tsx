"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, Instagram, ChevronUp, MessageCircle } from "lucide-react";

const SERIF = "Georgia, 'Times New Roman', serif";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };
  const rise = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const links = [
    { name: "Our Story", href: "/our-story" },
    { name: "Our Houses", href: "/#phase-1" },
    { name: "Before You Arrive", href: "/before-you-arrive" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy", href: "/privacy-policy" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative text-[var(--story-ink)] [background-color:var(--story-paper-2)] overflow-hidden"
    >
      {/* single top hairline — keeps the transition quiet */}
      <div aria-hidden className="h-px bg-[var(--story-ink)]/15" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 md:px-6 pt-10 md:pt-14 pb-6 md:pb-8 relative"
      >
        {/* ——— The single moment: the logo, centered ——— */}
        <motion.div variants={rise} className="text-center">
          <Link href="/" className="inline-block" aria-label="Keeth House home">
            <Image
              src="/logo.svg"
              alt="Keeth House"
              width={240}
              height={120}
              priority={false}
              className="h-20 md:h-24 w-auto mx-auto"
            />
          </Link>
          <p
            className="mt-5 max-w-xl mx-auto text-[13px] leading-[1.7] text-[var(--story-ink)]/80"
          >
            Experience natural living in our eco-friendly cottages near
            Auroville. Disconnect from the city and reconnect with nature.
          </p>
          <div
            aria-hidden
            className="h-px w-10 bg-[var(--story-ink)]/30 mx-auto mt-5"
          />
        </motion.div>

        {/* ——— Contact + social — single tidy strip ——— */}
        <motion.div
          variants={rise}
          className="mt-10 md:mt-12 max-w-3xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left"
        >
          <a
            href="mailto:reservations@keethhouse.in"
            className="self-center md:self-auto text-[var(--story-ink)] border-b border-[var(--story-ink)]/25 pb-1 hover:text-primary hover:border-primary transition-colors"
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: "13px",
              letterSpacing: "0.01em",
            }}
          >
            reservations@keethhouse.in
          </a>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://www.instagram.com/keethhouse/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[var(--story-ink)]/55 hover:text-[var(--story-ink)] transition-colors"
            >
              <Instagram className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </a>
            <a
              href="https://wa.me/918124338124"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-[var(--story-ink)]/55 hover:text-[var(--story-ink)] transition-colors"
            >
              <MessageCircle className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </a>
            <a
              href="mailto:reservations@keethhouse.in"
              aria-label="Email"
              className="text-[var(--story-ink)]/55 hover:text-[var(--story-ink)] transition-colors"
            >
              <Mail className="h-[17px] w-[17px]" strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>

        {/* ——— Quick links (raised — sit right under contact row) ——— */}
        <motion.nav variants={rise} className="mt-6 md:mt-7">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="uppercase text-[var(--story-ink)]/70 hover:text-[var(--story-ink)] transition-colors"
                  style={{
                    fontSize: "10.5px",
                    letterSpacing: "0.22em",
                    fontWeight: 500,
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* ——— Reserve Your Stay — primary amber CTA ——— */}
        <motion.div variants={rise} className="mt-7 flex justify-center">
          <a
            href="https://bookings.keethhouse.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center uppercase overflow-hidden bg-primary text-white px-8 py-3.5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(241,176,76,0.65)]"
            style={{
              fontSize: "11px",
              letterSpacing: "0.32em",
              fontWeight: 500,
            }}
          >
            {/* hover wash — deepens the amber on hover */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--primary)) 0%, #c68a2c 100%)",
              }}
            />
            <span className="relative flex items-center">
              Reserve Your Stay
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </a>
        </motion.div>

        {/* ——— Copyright — centered, slightly bigger ——— */}
        <motion.div
          variants={rise}
          className="mt-10 md:mt-12 pt-6 border-t border-[var(--story-ink)]/15 text-center"
        >
          <p
            className="uppercase text-[var(--story-ink)]/65"
            style={{
              fontSize: "12px",
              letterSpacing: "0.28em",
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} Keeth House · Near Auroville, Tamil Nadu
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll to top — neutral overlay chip */}
      {mounted && showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          whileHover={{ y: -2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white text-[var(--story-ink)] border border-[var(--story-ink)]/15 p-2.5 rounded-full shadow-sm hover:border-[var(--story-ink)]/40 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-4 w-4" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
