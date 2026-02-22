"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import InstallCommand from "@/components/ui/install-command";
import { LandingAbout } from "@/components/landing/LandingAbout";
import { LandingWhyUs } from "@/components/landing/LandingWhyUs";
import { LandingFeatures } from "@/components/landing/LandingFeatures";
import LandingBanner from "@/components/landing/LandingBanner";
import LandingFooter from "@/components/landing/LandingFooter";
import SplitText from "@/components/ui/split-text";

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
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden bg-white">
        {/* Decorative Gradients */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-blue/20 rounded-full blur-[700px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-brand-green/20 rounded-full blur-[200px] pointer-events-none" />

        {/* Dot Background Layers */}
        <div
          className="absolute inset-0 z-0 [background-size:20px_20px] [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] opacity-70"
        />
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        {/* Left Floating Card */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 -rotate-[10deg] animate-fade-in-left z-10 hidden xl:block">
          <div className="relative w-80 h-full">
            <img
              src="./illus-1.png"
              alt="Codebase Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="absolute right-[5%] top-1/3 -translate-y-1/2 rotate-[11deg] animate-fade-in-right z-10 hidden xl:block">
          <div className="relative w-80 h-full">
            <img
              src="./illus-2.png"
              alt="Legacy Code"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-600 mb-6 animate-fade-in-up">
            <span className="text-green-700 text-xl">✦</span>
            <strong className="text-gray-900">Codebase Legacy</strong>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[1.05] mb-8 flex flex-wrap justify-center gap-x-4">
            <div className="w-full flex justify-center gap-x-4">
              <SplitText
                text="AI-Powered"
                className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent"
                delay={50}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
              <SplitText
                text="Code"
                className="text-gray-900"
                delay={50}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
            <div className="w-full flex justify-center">
              <SplitText
                text="Revitalization"
                className="text-gray-900"
                delay={50}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>
          </h1>

          <div className="max-w-xl mb-10">
            <SplitText
              text="Legac memetakan struktur database, endpoint, dan logika aplikasi legacy Anda secara otomatis. Berhenti meraba dalam kegelapan dan mulai refactor dengan percaya diri."
              className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed"
              delay={30}
              duration={0.5}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>

          {/* Install Command */}
          <InstallCommand />
        </div>
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
