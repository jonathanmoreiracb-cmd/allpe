"use"
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="sobre" className="w-full bg-[#FBFBFB] py-20 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Column 1: Typography and Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-start items-start"
          >
            {/* Small Discrete Label */}
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#86868B] mb-4 block">
              Sobre a ALLPE
            </span>

            {/* Headline Title */}
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#1D1D1F] leading-[1.15] mb-8">
              Construindo parcerias <br className="hidden md:inline" />
              <span className="font-semibold">sólidas há 5 anos.</span>
            </h2>

            {/* Core Narrative Paragraphs */}
            <div className="space-y-6 text-sm md:text-base text-[#86868B] font-light leading-relaxed max-w-xl">
              <p>
                Somos uma empresa de Engenharia Civil com profissionais habilitados e qualificados. Atuamos nas áreas de legalização fundiária, topografia, projetos, cartografia, laudos, inspeções, construção e reforma.
              </p>
              <p>
                Há cinco anos no mercado, atuamos em obras privadas, públicas municipais e estaduais, além de atuarmos como incorporadora.
              </p>
            </div>

            {/* Elegant Blockquote for Vision Statement */}
            <motion.blockquote 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 pl-6 border-l-2 border-[#1D1D1F]/30 italic text-sm md:text-base text-[#1D1D1F]/90 leading-relaxed font-light max-w-xl"
            >
              "A ALLPE Engenharia não possui clientes, mas sim parceiros de negócios. O nosso objetivo é entregar nossos serviços de forma que esses parceiros fiquem completamente satisfeitos com o nosso trabalho."
            </motion.blockquote>
          </motion.div>

          {/* Column 2: Premium Visual Discussion */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative w-full h-[320px] md:h-[480px]"
          >
            {/* Subtle light background card offset for high-end styling */}
            <div className="absolute inset-0 -m-4 bg-[#FAF9F6] rounded-[2rem] -z-10 transform rotate-1 scale-95" />

            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5">
              <Image
                src="/about-team.png"
                alt="Reunião de Engenharia da ALLPE"
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
