"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Facebook,
  Instagram,
  ArrowRight,
  ExternalLink,
  ChevronUp,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });

  // Set mounted state when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle newsletter submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send this to your API
    console.log("Submitted email:", email);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setEmail("");
  };

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.3 + i * 0.1,
      },
    }),
  };

  return (
    // Enhance the footer for better mobile responsiveness
    <footer ref={footerRef} className="relative text-gray-800 overflow-hidden">
      {/* Curved background shape */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-primary/5"></div>
        <svg
          className="absolute bottom-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "70%" }}
        >
          <path
            fill="#f1b04c"
            fillOpacity="0.05"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#f1b04c"
            fillOpacity="0.1"
            d="M0,160L48,170.7C96,181,192,203,288,202.7C384,203,480,181,576,165.3C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="absolute top-0 left-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ height: "40%" }}
        >
          <path
            fill="#f1b04c"
            fillOpacity="0.05"
            d="M0,96L48,106.7C96,117,192,139,288,133.3C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/30 via-primary to-primary/30"></div>

      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>

      <motion.div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full border border-primary/10"
        animate={{
          rotate: 360,
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-primary/10"
        animate={{
          rotate: -360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt="Keeth House Logo"
                width={120}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm mt-4">
              Experience natural living in our eco-friendly cottages near
              Auroville. Disconnect from the city and reconnect with nature.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-primary">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {/* Social Media Links with animations */}
              <div className="flex flex-col space-y-3 mt-6">
                <motion.div
                  custom={1}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  <a
                    href="https://www.instagram.com/keethhouse/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 mr-3">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-gray-600 group-hover:text-primary transition-colors">
                      @Keethhouse
                    </span>
                  </a>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ width: "40px", height: "40px" }}
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  <a
                    href="https://wa.me/918124338124"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 mr-3">
                      <MessageCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-gray-600 group-hover:text-primary transition-colors">
                      WhatsApp Message
                    </span>
                  </a>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ width: "40px", height: "40px" }}
                  />
                </motion.div>

                <motion.div
                  custom={1}
                  variants={socialVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                  className="relative"
                >
                  <a
                    href="mailto:reservations@keethhouse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 mr-3">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-gray-600 group-hover:text-primary transition-colors">
                      reservations@keethhouse.com
                    </span>
                  </a>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-primary/50"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                    style={{ width: "40px", height: "40px" }}
                  />
                </motion.div>
              </div>
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Our Story", href: "/our-story" },
                { name: "Our Houses", href: "/#phase-1" },
                { name: "Before You Arrive", href: "/before-you-arrive" },
                { name: "Frequently Asked Questions", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Contact", href: "/contact" },
              ].map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Phases Location */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-primary">
              Our Locations
            </h3>
            <ul className="space-y-4">
              {[
                {
                  phase: "Phase I",
                  location:
                    "Lakshya Township, 237 Second Cross Street, near Auroville, Irumbai, Tamil Nadu 605111",
                },
                {
                  phase: "Phase II",
                  location:
                    "117, Edayanchavadi Rd, near Red Earth Riding School, Irumbai, Tamil Nadu 605111",
                },
                {
                  phase: "Phase III",
                  location:
                    "118, Cross Road, near Red Earth Riding School, Phase III, Auroville, Edayanchavadi, Tamil Nadu 605111",
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start group"
                  whileHover={{
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                >
                  <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {item.phase}
                    </span>
                    <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                      {item.location}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Book Now Button */}
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Link href="/">
                <Button className="w-full bg-primary hover:bg-primary/80 text-white relative overflow-hidden group">
                  <span className="relative z-10 flex items-center">
                    Book Your Stay Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%", opacity: 0.3 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-primary/20 mt-12 pt-8 flex justify-center"
        >
          <p className="text-sm text-gray-600">
            &copy; 2025 Keeth House. All rights reserved. Keeth House
            <sup>®</sup> 2019
          </p>
        </motion.div>
      </div>

      {/* Scroll to top button - only render when mounted */}
      {mounted && showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
};

export default Footer;
