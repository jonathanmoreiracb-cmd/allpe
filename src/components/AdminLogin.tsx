"use"
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, AlertTriangle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");

    try {
      // Attempt signIn using Supabase Auth
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Handle Success
      onLoginSuccess();
    } catch (err: any) {
      console.error("Erro ao autenticar administrador:", err);
      setIsError(true);
      setIsError(true);
      setErrorMessage(
        err.message === "Invalid login credentials"
          ? "Credenciais inválidas. Verifique seu e-mail e senha."
          : err.message || "Erro de conexão ao autenticar. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-3xl border border-black/[0.04] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]"
      >
        {/* Brand Logo Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="flex flex-col items-center mb-4">
            <span className="text-xl font-extrabold tracking-[0.25em] text-[#1D1D1F]">
              ALLPE
            </span>
            <span className="text-[8px] font-semibold tracking-[0.45em] text-[#86868B] uppercase -mt-0.5 ml-0.5">
              Engenharia
            </span>
          </div>
          <h2 className="text-sm font-semibold tracking-wide text-[#1D1D1F] uppercase mb-1">
            Painel do Engenheiro
          </h2>
          <p className="text-xs text-[#86868B] font-light leading-relaxed">
            Identifique-se para acessar o controle de leads e orçamentos.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div className="flex flex-col text-left">
            <label
              htmlFor="email"
              className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
            >
              E-mail Administrativo
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86868B]">
                <Mail size={14} strokeWidth={1.5} />
              </span>
              <input
                required
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@allpeengenharia.com"
                className="w-full bg-[#FAF9F6] border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="flex flex-col text-left">
            <label
              htmlFor="password"
              className="text-[9px] font-bold uppercase tracking-wider text-[#86868B] mb-2 ml-1"
            >
              Senha de Acesso
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#86868B]">
                <Lock size={14} strokeWidth={1.5} />
              </span>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF9F6] border border-black/5 focus:border-black/20 focus:ring-1 focus:ring-black/20 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-[#1D1D1F] font-light outline-none transition-all duration-300"
              />
            </div>
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
            <span>{isLoading ? "Acessando..." : "Entrar no Painel"}</span>
            {!isLoading && (
              <ArrowRight
                size={12}
                className="transform group-hover:translate-x-0.5 transition-transform duration-300 text-white"
              />
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
