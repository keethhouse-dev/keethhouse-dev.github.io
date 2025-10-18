"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Users,
  Calendar,
  Check,
} from "lucide-react";
import { ScrollToTop } from "@/components/scroll-to-top";
import { phaseData } from "@/lib/house-data";
import { getBlurDataURL } from "@/lib/image-loader";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // ✅ unwrap the Promise
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [scrollData, setScrollData] = useState({ y: 0, opacity: 1 });
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the house data
  const houseData = useRef<{ house: any; phase: any } | null>(null);

  // Initialize house data and handle mounting
  useEffect(() => {
    // Find the house data
    for (const p of phaseData) {
      const foundHouse = p.houses.find((h) => h.id === id);
      if (foundHouse) {
        houseData.current = {
          house: foundHouse,
          phase: p,
        };
        break;
      }
    }

    // Set mounted state
    setMounted(true);

    // If house not found, redirect to stays page
    if (!houseData.current) {
      router.push("/");
    } else {
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
    }
  }, [id, router]);

  // Set up scroll effects after mounting
  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const scrollProgress = Math.min(scrollPosition / containerHeight, 1);

      setScrollData({
        y: scrollProgress * 150,
        opacity: 1 - scrollProgress * 0.5,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const openGallery = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeGallery = useCallback(() => {
    setGalleryOpen(false);
    document.body.style.overflow = "";
  }, []);

  // Navigate through gallery images
  const navigateGallery = useCallback((direction: "next" | "prev") => {
    if (!houseData.current) return;

    const { house } = houseData.current;
    const totalImages = house.images.length;

    if (direction === "next") {
      setSelectedImageIndex((prev) =>
        prev === totalImages - 1 ? 0 : prev + 1
      );
    } else {
      setSelectedImageIndex((prev) =>
        prev === 0 ? totalImages - 1 : prev - 1
      );
    }
  }, []);

  if (!mounted || !houseData.current) {
    return null; // Will redirect in useEffect or show loading state
  }

  const { house, phase } = houseData.current;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <motion.div
          style={{
            y: scrollData.y,
            opacity: scrollData.opacity,
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={house.images[0] || "/placeholder.svg"}
            alt={house.name}
            fill
            priority
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          {/* Simple dot overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255, 255, 255, 0.03) 0.4px, transparent 0.4px)",
              backgroundSize: "3px 3px",
              opacity: mounted ? 1 : 0,
              transition: "opacity 1.5s",
            }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-white hover:text-primary transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to All Stays</span>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {house.name}
            </h1>
            <div className="flex items-center text-white/90 mb-4">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm">
                {phase.title} · Near Auroville, Tamil Nadu
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2">
            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">
                The Story of {house.name}
              </h2>
              <p className="text-foreground/80 mb-6 leading-relaxed whitespace-pre-line">
                {house.description}
              </p>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {house.images
                  .slice(0, 6)
                  .map((image: string, index: number) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => openGallery(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${house.name} - Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover hover:scale-110 transition-transform duration-500"
                      />
                      {index === 5 && house.images.length > 6 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium">
                            +{house.images.length - 6} more
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/10"
                  onClick={() => openGallery(0)}
                >
                  View All Photos
                </Button>
              </div>
            </section>

            <Link
              href={`https://bookings.keethhouse.in/?chainId=7859&propertyId=${house.propertyId}&house=${house.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="sm:hidden w-full bg-primary hover:bg-primary/90 py-6 relative overflow-hidden group">
                <span className="relative z-10 flex items-center justify-center text-lg font-bold">
                  Book Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%", opacity: 0.3 }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </Link>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 mb-8">
                {house.specializations.map((spec: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <spec.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground/80">{spec.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Location</h2>

              <div className="relative h-auto md:h-100 pb-4">
                <img src={house.map} alt="Map" className="object-cover" />
                <div className="absolute top-4 right-4 z-10">
                  <a
                    href={house.navigation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center shadow-md"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    Navigate
                  </a>
                </div>
              </div>

              <p className="text-foreground/80 mb-4">
                {house.name} is located in our {phase.title} property near
                Auroville, Tamil Nadu. The exact location and directions will be
                provided after booking.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Near Auroville</p>
                    <p className="text-sm text-foreground/70">
                      2 minutes from Auroville Visitor Center
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Pondicherry</p>
                    <p className="text-sm text-foreground/70">
                      10 minutes drive
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Chennai International Airport</p>
                    <p className="text-sm text-foreground/70">
                      2.5 hours drive
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Booking Info */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <section className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Check-in</span>
                    </div>
                    <span className="text-foreground/80">12:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Check-out</span>
                    </div>
                    <span className="text-foreground/80">10:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span className="font-medium">Max Guests</span>
                    </div>
                    <span className="text-foreground/80">{house.guests} Guests</span>
                  </div>
                </div>
                <Link
                  href={`https://bookings.keethhouse.in/?chainId=7859&propertyId=${house.propertyId}&house=${house.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 py-6 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center justify-center text-lg font-bold">
                      Book Now
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%", opacity: 0.3 }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </Link>
              </section>

              <section className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <p className="text-foreground/80 mb-4">
                  Have questions about this cottage or want to make special
                  arrangements? We're here to help!
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10 mb-3"
                  >
                    Contact Us
                  </Button>
                </Link>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={() => navigateGallery("prev")}
              className="absolute left-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={() => navigateGallery("next")}
              className="absolute right-4 z-50 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl h-[80vh] overflow-hidden"
            >
              <Image
                src={house.images[selectedImageIndex] || "/placeholder.svg"}
                alt={`Gallery image ${selectedImageIndex + 1}`}
                fill
                priority
                sizes="100vw"
                placeholder="blur"
                blurDataURL={getBlurDataURL()}
                className="object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {house.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === selectedImageIndex
                        ? "bg-primary"
                        : "bg-white/50"
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </div>
  );
}
