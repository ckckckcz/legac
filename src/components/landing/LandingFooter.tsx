"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import SplitText from "@/components/ui/split-text";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LegacyverFooter() {
  return (
    <footer
      className="relative overflow-hidden bg-white"
    >
      <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12"

          >
            <div className="w-full md:w-80 lg:w-96">
              <div className="mb-4 flex items-center gap-3">
                <img src="/logo.png" alt="Legac Logo" className="w-12 h-12 object-contain" />
                <SplitText
                  text="Legacyver"
                  className="text-2xl sm:text-3xl font-bold text-black font-bricolage"
                  delay={100}
                  duration={1.5}
                  splitType="chars"
                  textAlign="left"
                />
              </div>
              <div className="mb-6">
                <SplitText
                  text="Untangling the complexity of legacy codebases. Legac provides automated, high-quality documentation and architectural insights, transforming technical debt into clear, maintainable, and actionable knowledge."
                  className="text-gray-400 text-xs sm:text-sm leading-relaxed font-bricolage"
                  delay={30}
                  duration={1}
                  splitType="words"
                  textAlign="left"
                />
              </div>
              {/* Contact info */}
              <div className="space-y-3" >
                <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm font-bricolage">
                  <Mail className="w-4 h-4 text-black" />
                  hello@legacyver.co.id
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm font-bricolage">
                  <Phone className="w-4 h-4 text-black" />
                  +62 812-3456-7890
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm font-bricolage">
                  <MapPin className="w-4 h-4 text-black" />
                  Malang, Indonesia
                </div>
              </div>
              {/* Stay Updated */}
              <div className="mt-5" >
                <h3 className="text-base sm:text-lg font-semibold text-black mb-4 font-bricolage">Stay Updated</h3>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent border-2 border-gray-600 text-black placeholder:text-gray-400 font-bricolage text-xs sm:text-sm focus:!border-[#30353F] focus:!ring-[#30353F] focus:!ring-1"
                  />
                  <Button
                    size="sm"
                    className="px-3 sm:px-4 font-bricolage text-black h-8 sm:h-9 cursor-pointer bg-black text-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Services */}
            <div
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-24"

            >
              {/* Meet our team */}
              <div className="flex flex-col w-full sm:w-1/3">
                <h3 className="text-base sm:text-lg font-semibold text-black mb-4 sm:mb-6 font-bricolage">Our Team</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {["Aqwenna", "Riovaldo", "Husein", "Dhanil",].map((item) => (
                    <li key={item} >
                      <a href="#" className="text-gray-400 hover:text-black transition-colors text-xs sm:text-sm font-bricolage">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-center pointer-events-none mt-8 overflow-visible"
          >
            <div className="text-7xl sm:text-9xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold font-bricolage bg-gradient-to-b from-[white] to-[#34558b] bg-clip-text text-transparent leading-none py-12">
              Legacyv
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}