"use"
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // 1. Initial active session query
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    // 2. Real-time auth session listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setCheckingSession(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    // Recheck session status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  };

  const handleLogout = () => {
    setSession(null);
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center justify-center text-[#86868B] text-xs font-light tracking-widest uppercase">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-extrabold tracking-[0.25em] text-[#1D1D1F]">
              ALLPE
            </span>
            <span className="text-[8px] font-semibold tracking-[0.45em] text-[#86868B] uppercase -mt-0.5 ml-0.5">
              Engenharia
            </span>
          </div>
          <span className="pt-2 text-[9px]">Verificando Sessão...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {session ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdminDashboard onLogout={handleLogout} />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
