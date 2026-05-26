"use"
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Sobre", href: "#sobre" },
  { name: "Serviços", href: "#servicos" },
  { name: "Portfólio", href: "#portfolio" },
  { name: "Contato", href: "#contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to update header transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "glassmorphism py-3" 
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="group flex flex-col justify-start items-start focus:outline-none">
            <span className="text-xl md:text-2xl font-extrabold tracking-[0.25em] text-[#1D1D1F] transition-colors duration-300">
              ALLPE
            </span>
            <span className="text-[8px] md:text-[9px] font-medium tracking-[0.45em] text-[#86868B] group-hover:text-[#1D1D1F] transition-colors duration-300 uppercase -mt-0.5 ml-0.5">
              Engenharia
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="interactive-hover text-xs font-semibold uppercase tracking-[0.2em] text-[#1D1D1F]/80 hover:text-[#1D1D1F] transition-colors duration-300 focus:outline-none"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2 text-[#1D1D1F] focus:outline-none hover:opacity-70 transition-opacity duration-300"
            aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#FBFBFB] flex flex-col justify-between pt-28 pb-12 px-8"
          >
            {/* Nav links list */}
            <nav className="flex flex-col space-y-8 mt-4">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={link.href}
                    className="text-3xl font-extralight tracking-wide text-[#1D1D1F] hover:text-[#86868B] transition-colors duration-300 block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom info section of drawer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="border-t border-black/5 pt-8"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#86868B] mb-2">
                ALLPE Engenharia Civil
              </p>
              <p className="text-xs text-[#1D1D1F]/70">
                contato@allpeengenharia.com.br
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
