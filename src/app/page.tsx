"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ClientsSection from "@/components/ClientsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col bg-[#FBFBFB]">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <ClientsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
