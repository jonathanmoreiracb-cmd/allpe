import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FAF9F6] border-t border-black/5 py-12 md:py-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12">
          {/* Column 1: Brand brief */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-[0.25em] text-[#1D1D1F]">
                ALLPE
              </span>
              <span className="text-[8px] font-semibold tracking-[0.45em] text-[#86868B] uppercase -mt-0.5 ml-0.5">
                Engenharia
              </span>
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed max-w-[280px]">
              Há 5 anos oferecendo soluções completas de engenharia civil de alta gama, topografia de precisão e legalizações fundiárias no Rio de Janeiro.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1D1D1F]">
              Mapa do Site
            </h4>
            <nav className="flex flex-col space-y-2.5">
              {[
                { name: "Sobre a Empresa", href: "#sobre" },
                { name: "Serviços de Engenharia", href: "#servicos" },
                { name: "Nosso Portfólio", href: "#portfolio" },
                { name: "Contato Técnico", href: "#contato" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-300 w-fit"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#1D1D1F]">
              Canais de Contato
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-[#86868B]">
              <p>
                Email:{" "}
                <a
                  href="mailto:contato@allpeengenharia.com.br"
                  className="text-[#1D1D1F] hover:opacity-75 transition-opacity duration-300"
                >
                  contato@allpeengenharia.com.br
                </a>
              </p>
              <p>Rua Quaresma Júnior, 160 - Centro<br />Angra dos Reis, RJ</p>
              <p className="pt-2">
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/allpe_engenharia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D1D1F] hover:opacity-75 transition-opacity duration-300"
                >
                  @allpe_engenharia
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright and Scroll-to-top */}
        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-[10px] text-[#86868B] tracking-[0.1em] uppercase font-semibold">
          <div>
            © {currentYear} ALLPE ENGENHARIA LTDA. TODOS OS DIREITOS RESERVADOS.
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center space-x-2 text-[#1D1D1F] hover:opacity-60 transition-opacity duration-300 focus:outline-none"
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={10} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
