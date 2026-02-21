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
            <rect width="28" height="28" rx="6" fill="#3d6b4f" />
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
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#3d6b4f] to-[#2a4a36] border border-[rgba(120,180,140,0.4)] px-6 py-2.5 text-sm font-medium text-white no-underline shadow-[0_0_15px_rgba(61,107,79,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:opacity-90 transition"
        >
          Start for free
          <span className="text-lg font-light">›</span>
        </a>
      </nav>

      {/* ============ HERO SECTION ============ */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-4 overflow-hidden">
        {/* Left Floating Card */}
        <div className="absolute left-[5%] top-1/2 -translate-y-1/2 -rotate-[4deg] animate-fade-in-left z-10">
          <div className="relative w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&h=800&fit=crop&crop=center"
              alt="Burj Khalifa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(61,107,79,0.85)] via-[rgba(61,107,79,0.4)] to-transparent pointer-events-none" style={{ background: "linear-gradient(to top, rgba(61,107,79,0.85) 0%, rgba(61,107,79,0.4) 25%, transparent 50%)" }} />
            <div className="absolute bottom-4 left-4 right-4 text-white text-base z-10">
              <span className="font-bold">Khalifa Burj</span>{" "}
              <span className="opacity-85">Joined us!</span>
            </div>
          </div>
        </div>

        {/* Right Floating Card */}
        <div className="absolute right-[5%] top-1/3 -translate-y-1/2 rotate-[4deg] animate-fade-in-right z-10">
          <div className="relative w-[300px] h-[420px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=700&fit=crop&crop=center"
              alt="Modern Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(61,107,79,0.85) 0%, rgba(61,107,79,0.4) 25%, transparent 80%)" }} />
            <div className="absolute bottom-4 left-4 right-4 text-white text-base z-10">
              <span className="font-bold">New Properties</span>{" "}
              <span className="opacity-85">Here!</span>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-2 text-sm text-gray-600 mb-6 animate-fade-in-up">
          <span className="text-green-700">✦</span>
          Welcome To <strong className="text-gray-900">Propy AI</strong>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight mb-6 animate-fade-in-up-delay-1">
          <span className="bg-gradient-to-r from-[#3d6b4f] to-[#b5c7b0] bg-clip-text text-transparent">
            AI-Powered
          </span>{" "}
          Real
          <br />
          Estate Analytics
        </h1>

        <p className="max-w-xl text-gray-500 text-lg mb-8 animate-fade-in-up-delay-2">
          NexBrick revolutionizes real estate analytics with AI insights from trusted sources, empowering smart buying, selling, and investing.
        </p>

        <div className="flex items-center gap-4 mb-10 animate-fade-in-up-delay-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#3d6b4f] to-[#2a4a36] border border-[rgba(120,180,140,0.4)] px-8 py-3.5 text-base font-medium text-white no-underline shadow-[0_0_20px_rgba(61,107,79,0.35),inset_0_1px_0_rgba(255,255,255,0.1)] hover:opacity-90 transition"
          >
            Start for free
            <span className="text-xl font-light">›</span>
          </a>
          <a href="#" className="text-sm font-medium text-gray-600 no-underline hover:text-gray-900 transition">
            Explore Properties
          </a>
        </div>

        {/* Install Command */}
        <InstallCommand />  
      </section>
    </>
  );
}
