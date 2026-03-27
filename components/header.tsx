"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { phaseData } from "@/lib/house-data"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Revert back to the original menu order with "Stays" first
  const navLinks = [
    {
      title: "Houses",
      href: "/",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Our Story",
      href: "/our-story",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Tree Top Kafe",
      href: "/tree-top-kafe",
      onClick: () => window.scrollTo(0, 0),
    },
    {
      title: "Contact",
      href: "/contact",
      onClick: () => window.scrollTo(0, 0),
    },
  ]

  // Animation variants
  const mobileMenuVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const menuItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      x: 20,
      opacity: 0,
    },
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 py-4 md:py-6 flex items-center",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="relative z-10">
            <Image src="/logo.svg" alt="Keeth House Logo" width={160} height={80} className="h-12 md:h-16 w-auto" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-10"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="flex items-center"
            >
              <Link
                href={link.href}
                onClick={link.onClick}
                className={cn(
                  "text-base font-medium transition-colors duration-200 hover:text-primary relative",
                  pathname === link.href ? "text-primary" : isScrolled ? "text-foreground" : "text-white",
                )}
              >
                {link.title}
                {pathname === link.href && (
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            ref={dropdownRef}
            className="relative"
          >
            <button
              className="flex flex-row items-center group relative bg-primary/10 hover:bg-primary/30 rounded-full py-2 px-6 transition-all duration-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span
                className={`text-base font-medium text-primary transition-colors duration-200 group-hover:text-primary/80`}
              >
                Our Houses
              </span>
              <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform text-primary group-hover:text-primary/80 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden z-50 w-auto min-w-[600px] border border-primary/20"
                >
                  <div className="py-3 px-4">
                    {phaseData.map((phase, phaseIndex) => (
                      <div key={phase.id} className="mb-3 last:mb-0">
                        <h3 className="text-sm font-semibold text-primary border-b border-primary/20 pb-1 mb-2">
                          {phase.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {phase?.houses?.map((house) => (
                            <Link
                              key={house.id}
                              href={`/stays/${house.id}`}
                              onClick={() => setIsDropdownOpen(false)}
                              className="px-4 py-2 text-sm bg-gray-50/80 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300 whitespace-nowrap transform hover:scale-105 shadow-sm"
                            >
                              {house.name}
                            </Link>
                          ))}
                        </div>
                        {phaseIndex < phaseData.length - 1 && <div className="h-px w-full bg-gray-100 my-2"></div>}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-4 rounded-full touch-target ${isScrolled ? "text-foreground bg-gray-100" : "text-white bg-black/20"}`}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-white z-40 md:hidden pt-20 overflow-y-auto"
          >
            <motion.nav className="flex flex-col items-center space-y-4 p-6">
              {navLinks.map((link) => (
                <motion.div
                  key={link.title}
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => {
                      setIsOpen(false)
                      link.onClick && link.onClick()
                    }}
                    className="text-lg font-medium hover:text-primary block py-5 text-center w-full border-b border-gray-100 mobile-nav-item touch-target"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} className="w-full pt-6 relative" ref={dropdownRef}>
                <button
                  className="flex flex-col items-center w-full py-4 text-center bg-primary/10 rounded-full mb-4 relative"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={`text-lg font-medium text-primary ${isDropdownOpen ? "font-bold" : ""}`}>
                    Our Houses
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 mt-1 transition-transform text-primary ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden z-50 border border-primary/20"
                    >
                      <div className="py-4 px-4">
                        {phaseData.map((phase, phaseIndex) => (
                          <div key={phase.id} className="mb-4 last:mb-0">
                            <h3 className="text-sm font-semibold text-primary border-b border-primary/20 pb-1 mb-2">
                              {phase.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {phase?.houses?.map((house) => (
                                <Link
                                  key={house.id}
                                  href={`/stays/${house.id}`}
                                  onClick={() => {
                                    setIsDropdownOpen(false)
                                    setIsOpen(false)
                                  }}
                                  className="px-3 py-1.5 text-xs bg-gray-50/80 text-gray-700 hover:bg-primary/10 hover:text-primary rounded-full transition-all duration-300"
                                >
                                  {house.name}
                                </Link>
                              ))}
                            </div>
                            {phaseIndex < phaseData.length - 1 && <div className="h-px w-full bg-gray-100 my-3"></div>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
