"use"
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  FileText, 
  Copy, 
  Check, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Layers, 
  X,
  Compass,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  created_at: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load leads from Supabase on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads dynamically on search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLeads(leads);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = leads.filter(
      (lead) =>
        lead.nome?.toLowerCase().includes(term) ||
        lead.email?.toLowerCase().includes(term) ||
        lead.telefone?.toLowerCase().includes(term) ||
        lead.mensagem?.toLowerCase().includes(term)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (err) {
      console.error("Erro ao carregar leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
    } catch (err) {
      console.error("Erro ao sair da sessão:", err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper WhatsApp click formatting
  const formatWhatsAppLink = (phone: string) => {
    const cleanNumber = phone.replace(/\D/g, "");
    // If the number doesn't have country code, prepend 55 (Brazil)
    const finalNumber = cleanNumber.startsWith("55") ? cleanNumber : `55${cleanNumber}`;
    return `https://api.whatsapp.com/send?phone=${finalNumber}&text=Ol%C3%A1%2C%20vi%20sua%20solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20no%20site%20da%20ALLPE%20Engenharia.`;
  };

  // --- Dynamic Dashboard Metrics ---
  const totalLeads = leads.length;
  
  // Dynamic calculation of leads received today
  const leadsToday = leads.filter((lead) => {
    const today = new Date().toDateString();
    const leadDate = new Date(lead.created_at).toDateString();
    return today === leadDate;
  }).length;

  // Simple analytics: count mentions of keywords to detect most requested services
  const getMostRequestedService = () => {
    if (leads.length === 0) return "Nenhum";
    
    let topografiaCount = 0;
    let projetoCount = 0;
    let legalizacaoCount = 0;
    let construcaoCount = 0;
    let laudoCount = 0;

    leads.forEach(lead => {
      const msg = lead.mensagem?.toLowerCase() || "";
      if (msg.includes("topografia") || msg.includes("levantamento") || msg.includes("lote") || msg.includes("georreferenciamento")) topografiaCount++;
      if (msg.includes("projeto") || msg.includes("arquitetonico") || msg.includes("planta") || msg.includes("eletrico") || msg.includes("hidraulico")) projetoCount++;
      if (msg.includes("legaliza") || msg.includes("alvara") || msg.includes("habite") || msg.includes("desmembramento") || msg.includes("usucapiao")) legalizacaoCount++;
      if (msg.includes("constru") || msg.includes("obra") || msg.includes("reforma") || msg.includes("pintura")) construcaoCount++;
      if (msg.includes("laudo") || msg.includes("inspecao") || msg.includes("estrutura") || msg.includes("avaliacao")) laudoCount++;
    });

    const counts = [
      { name: "Topografia", val: topografiaCount },
      { name: "Projetos", val: projetoCount },
      { name: "Legalização", val: legalizacaoCount },
      { name: "Construção Civil", val: construcaoCount },
      { name: "Laudos & Sondagem", val: laudoCount }
    ];

    counts.sort((a, b) => b.val - a.val);
    return counts[0].val > 0 ? counts[0].name : "Projetos";
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-24 pb-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Admin Top Header Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-black/[0.04] pb-6 mb-12 gap-6">
          <div className="text-left">
            <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#86868B] mb-2 block">
              Controle Geral
            </span>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-[#1D1D1F]">
              Painel de <span className="font-semibold text-[#1D1D1F]">Orçamentos & Leads</span>
            </h1>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-black/5 hover:bg-black/10 text-[#1D1D1F] text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-3 rounded-full transition-colors duration-300 focus:outline-none"
          >
            <span>Sair do Painel</span>
            <LogOut size={12} strokeWidth={2} />
          </button>
        </div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Total Leads */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="bg-white border border-black/[0.04] rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]"
          >
            <div className="flex flex-col justify-start items-start text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-1">
                Total de Solicitações
              </span>
              <span className="text-3xl md:text-4xl font-light text-[#1D1D1F]">
                {isLoading ? "..." : totalLeads}
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF9F6] text-[#1D1D1F] rounded-2xl border border-black/5">
              <Users size={20} strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Card 2: Leads Received Today */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-black/[0.04] rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]"
          >
            <div className="flex flex-col justify-start items-start text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-1">
                Novos Leads Hoje
              </span>
              <span className="text-3xl md:text-4xl font-light text-[#1D1D1F]">
                {isLoading ? "..." : leadsToday}
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF9F6] text-[#1D1D1F] rounded-2xl border border-black/5">
              <TrendingUp size={20} strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Card 3: Top Service Category */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white border border-black/[0.04] rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.01)]"
          >
            <div className="flex flex-col justify-start items-start text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-1">
                Área Mais Procurada
              </span>
              <span className="text-xl md:text-2xl font-semibold text-[#1D1D1F] mt-1.5">
                {isLoading ? "..." : getMostRequestedService()}
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF9F6] text-[#1D1D1F] rounded-2xl border border-black/5">
              <Layers size={20} strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-8 w-full max-w-md text-left">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86868B]">
            <Search size={16} strokeWidth={1.5} />
          </span>
          <input
            type="text"
            placeholder="Pesquisar por nome, e-mail ou mensagem..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 rounded-2xl pl-12 pr-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
          />
        </div>

        {/* Dynamic Leads List Table */}
        <div className="bg-white rounded-3xl border border-black/[0.04] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.01)]">
          {isLoading ? (
            <div className="py-24 text-center text-[#86868B] text-xs font-light">
              Carregando leads em tempo real...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-24 text-center text-[#86868B] text-xs font-light">
              Nenhuma solicitação encontrada no momento.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/[0.04] bg-[#FAF9F6]">
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-[#86868B] w-[25%]">
                      Cliente
                    </th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-[#86868B] w-[25%]">
                      Canais de Contato
                    </th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-[#86868B] w-[35%]">
                      Trecho da Mensagem
                    </th>
                    <th className="px-6 py-4 text-[9px] font-bold uppercase tracking-wider text-[#86868B] w-[15%]">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03]">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-black/[0.01] transition-colors duration-200 cursor-pointer group"
                    >
                      {/* Name column */}
                      <td className="px-6 py-5 align-middle">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-[#FAF9F6] text-[#1D1D1F] rounded-xl border border-black/5 flex items-center justify-center">
                            <User size={14} strokeWidth={1.5} />
                          </div>
                          <span className="text-xs md:text-sm font-semibold text-[#1D1D1F] block truncate max-w-[180px]">
                            {lead.nome}
                          </span>
                        </div>
                      </td>

                      {/* Contact Channels with Action Buttons */}
                      <td className="px-6 py-5 align-middle" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center space-x-3 text-xs text-[#86868B] font-light">
                          {/* Copy Email Button */}
                          <div className="relative group/copy">
                            <button
                              onClick={() => copyToClipboard(lead.email, lead.id)}
                              className="p-2 bg-[#FAF9F6] hover:bg-black/5 text-[#1D1D1F] rounded-lg border border-black/5 transition-colors duration-300"
                              title="Copiar E-mail"
                            >
                              {copiedId === lead.id ? <Check size={12} className="text-green-600" /> : <Mail size={12} />}
                            </button>
                            {/* Copy indicator tooltip */}
                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[8px] tracking-wider uppercase font-bold rounded opacity-0 pointer-events-none group-hover/copy:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                              {copiedId === lead.id ? "Copiado!" : "Copiar E-mail"}
                            </span>
                          </div>

                          {/* WhatsApp Click-to-Chat Button */}
                          <a
                            href={formatWhatsAppLink(lead.telefone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-[#FAF9F6] hover:bg-black/5 text-[#1D1D1F] rounded-lg border border-black/5 transition-colors duration-300 flex items-center justify-center"
                            title="Chamar no WhatsApp"
                          >
                            <Phone size={12} />
                          </a>
                          
                          <span className="text-[11px] font-medium text-[#1D1D1F]/70 select-text">
                            {lead.telefone}
                          </span>
                        </div>
                      </td>

                      {/* Message Preview Column */}
                      <td className="px-6 py-5 align-middle">
                        <span className="text-xs text-[#86868B] font-light block truncate max-w-[340px]">
                          {lead.mensagem}
                        </span>
                      </td>

                      {/* Creation Date Column */}
                      <td className="px-6 py-5 align-middle">
                        <div className="flex items-center justify-between text-xs text-[#86868B] font-light">
                          <span>
                            {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                          </span>
                          <span className="text-black/20 group-hover:text-[#1D1D1F] transform group-hover:translate-x-0.5 transition-all duration-300 pr-2">
                            <ChevronRight size={14} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Sliding Lead Details Inspection Panel Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <>
            {/* Dark background modal overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-[#FBFBFB] border-l border-black/[0.04] shadow-2xl z-50 p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-black/[0.04] pb-6 mb-8 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-white text-[#1D1D1F] rounded-xl border border-black/5">
                      <FileText size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#86868B] block">
                        Detalhes do Lead
                      </span>
                      <h3 className="text-base font-semibold text-[#1D1D1F]">
                        Ficha Técnica de Solicitação
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-2 text-[#86868B] hover:text-[#1D1D1F] transition-colors duration-300 focus:outline-none"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Metadata details block */}
                <div className="space-y-6 text-left mb-8">
                  {/* Name field */}
                  <div className="bg-white border border-black/[0.03] rounded-2xl p-4 flex items-start space-x-3">
                    <div className="text-[#86868B] mt-0.5"><User size={14} /></div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#86868B]">Nome</span>
                      <span className="text-xs font-semibold text-[#1D1D1F] mt-0.5">{selectedLead.nome}</span>
                    </div>
                  </div>

                  {/* Contact row: Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email field */}
                    <div className="bg-white border border-black/[0.03] rounded-2xl p-4 flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-[#86868B] mt-0.5"><Mail size={14} /></div>
                        <div className="flex flex-col max-w-[140px] md:max-w-none">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-[#86868B]">E-mail</span>
                          <span className="text-xs font-semibold text-[#1D1D1F] mt-0.5 block truncate select-text">
                            {selectedLead.email}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard(selectedLead.email, selectedLead.id + "-email")}
                        className="p-1.5 hover:bg-[#FAF9F6] text-[#86868B] hover:text-[#1D1D1F] rounded-md transition-colors"
                        title="Copiar"
                      >
                        {copiedId === selectedLead.id + "-email" ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      </button>
                    </div>

                    {/* Phone field */}
                    <div className="bg-white border border-black/[0.03] rounded-2xl p-4 flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-[#86868B] mt-0.5"><Phone size={14} /></div>
                        <div className="flex flex-col">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-[#86868B]">Telefone</span>
                          <span className="text-xs font-semibold text-[#1D1D1F] mt-0.5 select-text">{selectedLead.telefone}</span>
                        </div>
                      </div>
                      <a
                        href={formatWhatsAppLink(selectedLead.telefone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-[#FAF9F6] text-[#86868B] hover:text-[#1D1D1F] rounded-md transition-colors flex items-center justify-center"
                        title="Chamar no WhatsApp"
                      >
                        <Compass size={12} />
                      </a>
                    </div>
                  </div>

                  {/* Creation Date field */}
                  <div className="bg-white border border-black/[0.03] rounded-2xl p-4 flex items-start space-x-3">
                    <div className="text-[#86868B] mt-0.5"><Calendar size={14} /></div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#86868B]">Data de Recebimento</span>
                      <span className="text-xs font-semibold text-[#1D1D1F] mt-0.5">
                        {new Date(selectedLead.created_at).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })} às {new Date(selectedLead.created_at).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Message details box */}
                  <div className="bg-white border border-black/[0.03] rounded-3xl p-6 flex flex-col text-left">
                    <div className="flex items-center space-x-2 border-b border-black/[0.03] pb-3 mb-4">
                      <span className="text-[#86868B]"><MessageSquare size={14} /></span>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#86868B]">Mensagem Completa</span>
                    </div>
                    <p className="text-xs md:text-sm text-[#1D1D1F] leading-relaxed font-light whitespace-pre-wrap select-text">
                      {selectedLead.mensagem}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Connect Action Trigger */}
              <a
                href={formatWhatsAppLink(selectedLead.telefone)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-3 bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.25em] px-8 py-4 rounded-xl transition-colors duration-300"
              >
                <span>Falar no WhatsApp</span>
                <Compass size={12} className="text-white animate-pulse" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
