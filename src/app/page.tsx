"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import InstallCommand from "@/components/ui/command";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm i legac");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      {/* ============ NAVBAR ============ */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold text-gray-900 no-underline">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#wwwwwwwwww" />
            <path
              d="M7 20V8h4.5c1.2 0 2.2.35 2.9 1.05.7.7 1.05 1.6 1.05 2.7 0 1.1-.35 2-.05 2.7-.7.7-1.7 1.05-2.9 1.05H9.5V20H7zm2.5-6.5h1.8c.6 0 1.05-.15 1.35-.45.3-.3.45-.7.45-1.25s-.15-.95-.45-1.25c-.3-.3-.75-.45-1.35-.45H9.5v3.4z"
              fill="white"
            />
            <rect x="17" y="8" width="4" height="12" rx="2" fill="white" opacity="0.7" />
          </svg>
          Legac
        </a>

        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          <li><a href="#" className="text-sm font-medium text-gray-900 no-underline hover:text-green-700">Home</a></li>
          <li><a href="#features" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Features</a></li>
          <li><a href="#testimonial" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Testimonial</a></li>
          <li><a href="#blogs" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">Blogs</a></li>
          <li><a href="#about" className="text-sm font-medium text-gray-500 no-underline hover:text-green-700">About Us</a></li>
        </ul>

        <a
          href="/login"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#34558b] to-[#2a4a36] border border-[rgba(120,180,140,0.4)] px-6 py-2.5 text-sm font-medium text-white no-underline shadow-[0_0_15px_rgba(61,107,79,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:opacity-90 transition"
        >
          Start for free
          <span className="text-lg font-light">›</span>
        </a>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden">
        {/* Left Floating Card */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 -rotate-[4deg] animate-fade-in-left z-10">
          <div className="relative w-80 h-full">
            <img
              src="./illus-1.png"
              alt="Codebase Map"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="absolute right-[5%] top-1/3 -translate-y-1/2 rotate-[4deg] animate-fade-in-right z-10">
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

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-6 animate-fade-in-up-delay-1">
          <span className="bg-gradient-to-r from-[#34558b] to-[#b5c7b0] bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Code
          <br />
          Revitalization
        </h1>

        <p className="max-w-xl text-gray-500 text-lg mb-8 animate-fade-in-up-delay-2">
          Legac memetakan struktur database, endpoint, dan logika aplikasi legacy Anda secara otomatis. Berhenti meraba dalam kegelapan dan mulai refactor dengan percaya diri.
        </p>

        {/* Install Command */}
        <InstallCommand />
      </section>
    </>
  );
}
