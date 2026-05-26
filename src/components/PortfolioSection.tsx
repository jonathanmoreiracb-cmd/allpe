"use"
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: "Fachadas" | "Interiores" | "Topografia" | "Obras";
  location: string;
  imageUrl: string;
}

const CATEGORIES = ["Todos", "Fachadas", "Interiores", "Topografia", "Obras"] as const;

type CategoryFilter = typeof CATEGORIES[number];

const PROJECTS_DATA: Project[] = [
  {
    id: "pmerj",
    title: "Polícia Militar - Posto e Apoio",
    category: "Obras",
    location: "Angra dos Reis, RJ",
    imageUrl: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fitch",
    title: "Loja Fitch Technology",
    category: "Obras",
    location: "Angra dos Reis, RJ",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cecierj",
    title: "Espaço Maker CECIERJ",
    category: "Obras",
    location: "Rio de Janeiro, RJ",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "residencia-mambucaba",
    title: "Residência Mambucaba M&A",
    category: "Fachadas",
    location: "Mambucaba, Angra dos Reis",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "residencia-lagoa",
    title: "Residência Lagoa Azul",
    category: "Fachadas",
    location: "Ilha Grande, RJ",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cobertura-tijuca",
    title: "Cobertura Minimalista",
    category: "Interiores",
    location: "Barra da Tijuca, RJ",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "lounge-allpe",
    title: "Espaço Integrado ALLPE",
    category: "Interiores",
    location: "Volta Redonda, RJ",
    imageUrl: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gnss-araruama",
    title: "Georreferenciamento de Divisas",
    category: "Topografia",
    location: "Lagoa de Araruama, RJ",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "loteamento-frade",
    title: "Locação de Obra Porto Frade",
    category: "Topografia",
    location: "Porto Frade, Angra dos Reis",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
  }
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todos");

  const filteredProjects = activeCategory === "Todos"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="w-full bg-[#0C0C0E] py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-white/50 mb-4 block">
              Portfólio de Projetos
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight max-w-xl">
              Obras com assinatura de <br className="hidden sm:inline" />
              <span className="font-semibold text-white">rigor e excelência.</span>
            </h2>
          </div>
          
          {/* Navigation Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-2 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(category => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 focus:outline-none cursor-pointer ${
                    isActive ? "text-white" : "text-white/40 hover:text-white/80"
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={project.id}
                className="relative aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer bg-neutral-900 border border-white/[0.04]"
              >
                {/* Project Image */}
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Cinematic Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-10" />

                {/* Text and Badges container */}
                <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end items-start pointer-events-none">
                  {/* Category Pill */}
                  <div className="mb-3 transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1 text-[8px] font-bold uppercase tracking-[0.2em]">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base md:text-lg font-semibold tracking-wide text-white transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
                    {project.title}
                  </h3>

                  {/* Location */}
                  <p className="text-[10px] font-medium tracking-wider text-white/60 uppercase mt-1 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-150">
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
