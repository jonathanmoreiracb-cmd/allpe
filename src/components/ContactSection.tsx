"use"
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");

    try {
      // Direct insertion to Supabase 'leads' table
      const { error } = await supabase.from("leads").insert([
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          mensagem: formData.mensagem,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Handle Success
      setIsSuccess(true);
      setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (err: any) {
      console.error("Erro ao enviar lead para Supabase:", err);
      setIsError(true);
      setErrorMessage(
        err.message || "Ocorreu um erro ao enviar seus dados. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contato" className="w-full bg-white py-24 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Column 1: Info and Text Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-start items-start"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.35em] text-[#86868B] mb-4 block">
              Contato Técnico
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#1D1D1F] leading-[1.15] mb-8">
              Vamos construir <br />
              <span className="font-semibold text-[#1D1D1F]">algo juntos.</span>
            </h2>
            <p className="text-sm md:text-base text-[#86868B] font-light leading-relaxed mb-12 max-w-sm">
              Tem um projeto em mente ou precisa de regularização técnica? Entre em contato agora. Nossa equipe está pronta para atendê-lo com rapidez e excelência.
            </p>

            {/* List of elegant placeholders */}
            <div className="space-y-6 w-full">
              {[
                {
                  icon: <Mail size={16} className="text-[#1D1D1F]" />,
                  title: "E-mail Corporativo",
                  value: "contato@allpeengenharia.com.br",
                  href: "mailto:contato@allpeengenharia.com.br",
                },
                {
                  icon: <Phone size={16} className="text-[#1D1D1F]" />,
                  title: "Telefone / WhatsApp",
                  value: "+55 (24) 99812-6163",
                  href: "https://api.whatsapp.com/send/?phone=5524998126163&text&type=phone_number&app_absent=0&utm_source=ig",
                },
                {
                  icon: <MapPin size={16} className="text-[#1D1D1F]" />,
                  title: "Sede Administrativa",
                  value: "Rua Quaresma Júnior, 160 - Centro, Angra dos Reis, RJ",
                  href: "https://maps.google.com",
                },
              ].map((contact, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="p-3 bg-[#FAF9F6] border border-black/5 rounded-xl text-[#1D1D1F] flex items-center justify-center">
                    {contact.icon}
                  </div>
                  <div className="flex flex-col justify-start items-start text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#86868B]">
                      {contact.title}
                    </span>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-xs md:text-sm font-medium text-[#1D1D1F] hover:opacity-70 transition-opacity duration-300 mt-1"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 w-full bg-[#FAF9F6] rounded-3xl border border-black/[0.04] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.01)]"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 size={48} className="text-[#1D1D1F] mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2 uppercase tracking-wider">
                    Mensagem Enviada
                  </h3>
                  <p className="text-xs md:text-sm text-[#86868B] font-light max-w-sm leading-relaxed mb-6">
                    Agradecemos seu contato. Seus dados foram inseridos em nosso sistema e um engenheiro de nossa equipe retornará muito em breve.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-[10px] font-bold uppercase tracking-[0.25em] bg-[#1D1D1F] hover:bg-black text-white px-6 py-3 rounded-full transition-colors duration-300"
                  >
                    Enviar Nova Mensagem
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Nome input */}
                  <div className="flex flex-col text-left">
                    <label
                      htmlFor="nome"
                      className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
                    >
                      Nome Completo
                    </label>
                    <input
                      required
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: Carlos Silva"
                      className="w-full bg-white border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 rounded-xl px-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Two columns: Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col text-left">
                      <label
                        htmlFor="email"
                        className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
                      >
                        E-mail
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: carlos@email.com"
                        className="w-full bg-white border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 rounded-xl px-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <label
                        htmlFor="telefone"
                        className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
                      >
                        Telefone
                      </label>
                      <input
                        required
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="Ex: (24) 99999-9999"
                        className="w-full bg-white border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 rounded-xl px-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Mensagem TextArea */}
                  <div className="flex flex-col text-left">
                    <label
                      htmlFor="mensagem"
                      className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
                    >
                      Mensagem / Detalhes do Projeto
                    </label>
                    <textarea
                      required
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Descreva brevemente sua necessidade..."
                      className="w-full bg-white border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 rounded-xl px-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Error Notification Alert */}
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs text-left"
                    >
                      <AlertTriangle size={16} className="flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full group inline-flex items-center justify-center space-x-3 bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold uppercase tracking-[0.25em] px-8 py-4 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed select-none"
                  >
                    <span>{isLoading ? "Enviando..." : "Enviar Mensagem"}</span>
                    {!isLoading && (
                      <Send
                        size={12}
                        className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-white"
                      />
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
