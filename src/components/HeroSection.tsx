"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden">
      {/* Background Image & Cinematic Muted Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="ALLPE Engenharia - Fachada Moderna de Alto Padrão"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Subtle dual-layer gradient overlay to ensure perfect contrast and premium aesthetic */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
        <div className="max-w-3xl">
          {/* Tagline Animation */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/70 mb-4 block"
          >
            ALLPE Engenharia
          </motion.span>

          {/* Heading Animation - Mixed weights and tracking for Apple premium feel */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl font-extralight tracking-tight text-white leading-[1.1] mb-6"
          >
            Engenharia de <br />
            <span className="font-semibold">Alta Qualidade.</span>
          </motion.h1>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-lg text-white/80 font-light leading-relaxed max-w-xl mb-10"
          >
            Oferecemos soluções completas em construção civil, topografia e legalização para atender todas as suas necessidades com precisão absoluta.
          </motion.p>

          {/* Translucent Glass CTA Button with elegant hover inversion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#portfolio"
              className="group inline-flex items-center space-x-3 bg-white/10 hover:bg-white backdrop-blur-md border border-white/20 hover:border-white text-white hover:text-[#1D1D1F] text-xs font-semibold uppercase tracking-[0.25em] px-8 py-4 rounded-full transition-all duration-500 ease-out shadow-lg"
            >
              <span>Conheça nosso Portfólio</span>
              <ArrowRight size={13} className="transform group-hover:translate-x-1 group-hover:text-[#1D1D1F] transition-all duration-500 ease-out text-white" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating minimal scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
      >
        <span className="text-[8px] uppercase tracking-[0.3em] text-white font-medium">
          Descobrir
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
