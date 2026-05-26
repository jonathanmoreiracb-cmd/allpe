"use"
"use client";

import { motion } from "framer-motion";
import { 
  Compass, 
  ClipboardCheck, 
  Scale, 
  Ruler, 
  HardHat, 
  Map, 
  Check 
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "projetos",
    icon: <Compass className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Projetos",
    description: "Desenvolvimento de soluções técnicas completas, integrando estética e precisão estrutural.",
    items: [
      "Projetos Arquitetônicos",
      "Projetos de Instalações Elétricas",
      "Projetos Hidráulicos & Hidrossanitários",
      "Projetos Legais (Aprovações)",
      "Projetos Topográficos"
    ]
  },
  {
    id: "laudos",
    icon: <ClipboardCheck className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Laudos & Sondagem",
    description: "Estudos de solo e vistorias prediais para garantir segurança jurídica e viabilidade técnica.",
    items: [
      "Sondagem por Percussão (SPT)",
      "Laudo de Avaliação de Imóvel",
      "Laudo Ambiental",
      "Laudo de Estrutura & Patologias",
      "Laudo de Zoneamento"
    ]
  },
  {
    id: "legalizacao",
    icon: <Scale className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Legalização",
    description: "Trâmites burocráticos completos para regularizar seu imóvel perante os órgãos públicos.",
    items: [
      "Alvará de Construção & Reforma",
      "Alvará de Habite-se / Certidão",
      "Desmembramento & Remembramento",
      "Usucapião Extrajudicial",
      "Legalização de Estruturas Náuticas"
    ]
  },
  {
    id: "topografia",
    icon: <Ruler className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Topografia Avançada",
    description: "Mapeamento tridimensional com Estação Total e receptores GNSS de alta precisão (GPS/RTK).",
    items: [
      "Levantamento Planialtimétrico",
      "Georreferenciamento de Imóveis",
      "Locação e Marcação de Obras",
      "Elaboração de Loteamentos",
      "Memorial Descritivo Técnico"
    ]
  },
  {
    id: "construcao",
    icon: <HardHat className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Construção Civil",
    description: "Execução física e gerenciamento total do canteiro de obras com rigor nos prazos.",
    items: [
      "Execução de Obras Residenciais",
      "Reformas Estruturais & Fachadas",
      "Administração de Obras Integrada",
      "Acompanhamento Técnico Permanente",
      "Instalações Hidráulicas & Elétricas"
    ]
  },
  {
    id: "cartografia",
    icon: <Map className="text-[#1D1D1F]" size={22} strokeWidth={1.5} />,
    title: "Cartografia & Assessoria",
    description: "Serviços especializados de consultoria técnica e mapeamento cadastral geográfico.",
    items: [
      "Assessoria Técnica em Engenharia",
      "Levantamentos Cadastrais Urbanos",
      "Cartografia Temática & Plantas",
      "Inspeções e Avaliações Prediais",
      "Divisão Amigável de Terras"
    ]
  }
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="w-full bg-[#FAF9F6] border-t border-black/5 py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#86868B] mb-4 block"
          >
            Nossas Especialidades
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-light tracking-tight text-[#1D1D1F] leading-tight mb-6"
          >
            Soluções completas com <br className="hidden md:inline" />
            <span className="font-semibold">qualidade e precisão.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-[#86868B] font-light leading-relaxed"
          >
            Uma gama abrangente de engenharia civil de alta gama, topografia computadorizada e legalizações imobiliárias.
          </motion.p>
        </div>

        {/* Services Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.05 * index, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl border border-black/[0.04] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between group"
            >
              <div>
                {/* Icon Container with subtle offset border */}
                <div className="p-3.5 bg-[#FBFBFB] w-fit rounded-2xl border border-black/5 mb-6 group-hover:bg-[#1D1D1F] group-hover:border-[#1D1D1F] transition-colors duration-500 ease-out">
                  <span className="group-hover:text-white transition-colors duration-500 ease-out block">
                    {service.icon}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-lg font-semibold tracking-wide text-[#1D1D1F] mb-3">
                  {service.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-[#86868B] leading-relaxed font-light mb-6">
                  {service.description}
                </p>

                {/* Subitems List */}
                <ul className="space-y-3.5 border-t border-black/[0.04] pt-6">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-xs text-[#86868B] leading-normal font-light">
                      <span className="p-0.5 bg-black/[0.03] border border-black/5 rounded-full mt-0.5 text-[#1D1D1F] block flex-shrink-0">
                        <Check size={8} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
