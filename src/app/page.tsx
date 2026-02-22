"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import InstallCommand from "@/components/ui/install-command";
import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingWhyUs } from "@/components/landing/LandingWhyUs";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import LandingBanner from "@/components/landing/LandingBanner";
import LandingFooter from "@/components/landing/LandingFooter";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i legac");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      {/* ============ HERO SECTION ============ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden">
        {/* Left Floating Card */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 -rotate-[10deg] animate-fade-in-left z-10">
          <div className="relative w-80 h-full">
            <img
              src="./illus-1.png"
              alt="Codebase Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="absolute right-[5%] top-1/3 -translate-y-1/2 rotate-[11deg] animate-fade-in-right z-10">
          <div className="relative w-80 h-full">
            <img
              src="./illus-2.png"
              alt="Legacy Code"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-600 mb-6 animate-fade-in-up">
          <span className="text-green-700 text-xl">✦</span>
          <strong className="text-gray-900">Codebase Legacy</strong>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[1.05] mb-8 animate-fade-in-up">
          <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Code
          <br />
          Revitalization
        </h1>

        <p className="max-w-xl text-gray-500 text-lg md:text-xl mb-10 animate-fade-in-up font-medium leading-relaxed" style={{ animationDelay: '200ms' }}>
          Legac memetakan struktur database, endpoint, dan logika aplikasi legacy Anda secara otomatis. Berhenti meraba dalam kegelapan dan mulai refactor dengan percaya diri.
        </p>

        {/* Install Command */}
        <InstallCommand />
      </section>

      {/* ============ ABOUT SECTION ============ */}
      <LandingAbout />

      {/* ============ WHY US SECTION ============ */}
      <LandingWhyUs />

      {/* ============ FEATURES SECTION ============ */}
      <LandingFeatures />

      <LandingBanner />

      {/* ============ FOOTER SECTION ============ */}
      <LandingFooter />
    </>
  );
}
