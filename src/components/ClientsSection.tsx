"use"
"use client";

import { motion } from "framer-motion";
import { Landmark, Shield, Cpu, Factory, Car, Building, Bus, Compass, Anchor } from "lucide-react";

interface ClientBrand {
  name: string;
  sub: string;
  icon: React.ReactNode;
}

const CLIENTS_DATA: ClientBrand[] = [
  {
    name: "CECIERJ",
    sub: "FUNDAÇÃO ESTADUAL",
    icon: <Landmark size={14} strokeWidth={1.5} />
  },
  {
    name: "LAGOA",
    sub: "EMPREENDIMENTOS",
    icon: <Anchor size={14} strokeWidth={1.5} />
  },
  {
    name: "GAZOL",
    sub: "METALÚRGICA",
    icon: <Factory size={14} strokeWidth={1.5} />
  },
  {
    name: "FITCH",
    sub: "TECHNOLOGY",
    icon: <Cpu size={14} strokeWidth={1.5} />
  },
  {
    name: "GC",
    sub: "INCORPORADORA",
    icon: <Compass size={14} strokeWidth={1.5} />
  },
  {
    name: "VAUTIVECAR",
    sub: "LOGÍSTICA",
    icon: <Car size={14} strokeWidth={1.5} />
  },
  {
    name: "IMPÉRIO",
    sub: "AUTOPEÇAS",
    icon: <Shield size={14} strokeWidth={1.5} />
  },
  {
    name: "VAR",
    sub: "VIAÇÃO ANGRA DOS REIS",
    icon: <Bus size={14} strokeWidth={1.5} />
  },
  {
    name: "VEF",
    sub: "TECNOLOGIA & ENGENHARIA",
    icon: <Building size={14} strokeWidth={1.5} />
  },
  {
    name: "REUNIDAS",
    sub: "TRANSPORTES COLETIVOS",
    icon: <Bus size={14} strokeWidth={1.5} />
  }
];

export default function ClientsSection() {
  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [...CLIENTS_DATA, ...CLIENTS_DATA, ...CLIENTS_DATA];

  return (
    <section className="w-full bg-[#FBFBFB] py-16 md:py-24 border-t border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.35em] text-[#86868B] text-center mb-2 block"
        >
          Confiança & Parceria
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs md:text-sm text-[#1D1D1F] font-semibold text-center uppercase tracking-[0.2em]"
        >
          Empresas que confiam em nosso trabalho
        </motion.h3>
      </div>

      {/* Endless Marquee Loop Wrapper */}
      <div className="relative w-full overflow-hidden py-4 flex items-center mask-gradient">
        {/* Soft edge gradients for smooth fade out */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-r from-[#FBFBFB] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-36 bg-gradient-to-l from-[#FBFBFB] to-transparent z-10 pointer-events-none" />

        {/* Marquee sliding track */}
        <div className="animate-marquee flex items-center space-x-8 pr-8 hover:[animation-play-state:paused] transition-all duration-300">
          {marqueeItems.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex items-center space-x-4 bg-white border border-black/[0.04] rounded-2xl py-4 px-6 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 ease-out cursor-pointer select-none flex-shrink-0"
            >
              {/* Minimal geometric icon */}
              <div className="p-2 bg-[#FAF9F6] text-[#1D1D1F] rounded-lg border border-black/5 flex items-center justify-center">
                {client.icon}
              </div>
              
              {/* Client brand info */}
              <div className="flex flex-col justify-start items-start text-left">
                <span className="text-xs font-bold tracking-[0.25em] text-[#1D1D1F]">
                  {client.name}
                </span>
                <span className="text-[7px] font-semibold tracking-wider text-[#86868B] uppercase mt-0.5">
                  {client.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
