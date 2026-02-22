import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import SplitText from "@/components/ui/split-text";
import CountUp from "@/components/ui/count-text";

export function LandingAbout() {
  return (
    <section id="about" className="lg:py-32 py-16 px-4 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        <Badge variant="outline" className="text-sm px-4 py-1.5 border-brand-blue/20 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors animate-fade-in-up">
          About Us
        </Badge>

        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15] flex flex-wrap justify-start md:justify-center gap-x-3 text-left md:text-center">
          <SplitText
            text="Kami membantu tim memahami"
            className="text-gray-900 text-left md:text-center"
            delay={50}
            duration={0.5}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
          <SplitText
            text="kode yang paling kompleks sekalipun"
            className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent text-left md:text-center"
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
        </h2>

        <SplitText
          text="Legacyver adalah platform berbasis AI yang dirancang untuk tim yang mewarisi codebase besar dan kompleks. Kami memetakan struktur database, endpoint API, dan alur logika bisnis secara otomatis — sehingga Anda bisa memahami, mendokumentasikan, dan merefactor dengan percaya diri."
          className="max-w-2xl lg:block hidden text-gray-600 text-sm sm:text-base md:text-xl leading-relaxed text-left md:text-center"
          delay={10}
          duration={0.5}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <div className="flex flex-row lg:flex-col gap-4 mt-4 text-left md:text-center">
          <Link href="/login">
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 h-12 rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:scale-105 active:scale-95">
              Mulai Sekarang
            </Button>
          </Link>
          <Link href="/docs">
          
          <Button size="lg" variant="outline" className="px-8 h-12 rounded-full border-gray-200 hover:bg-gray-50 transition-all">
            Baca Docs
          </Button>
          </Link>
        </div>
      </div>
      {/* Bottom Metrics */}
      <div className="lg:mt-32 mt-20 lg:pt-20 pt-10 border-t border-gray-100 w-full bg-white relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0 justify-start md:justify-center items-start md:items-center px-6">
          <div className="flex-1 text-left md:text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter text-left md:text-center">
              <CountUp to={90} duration={2} />%
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-500 font-medium text-left md:text-center">Client satisfaction</p>
          </div>

          <div className="hidden md:block w-px h-20 bg-gray-100 mx-8 lg:mx-16" />

          <div className="flex-1 text-left md:text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter text-left md:text-center">
              <CountUp to={180} duration={2} />+
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-500 font-medium text-left md:text-center">Project Successfully Done</p>
          </div>

          <div className="hidden md:block w-px h-20 bg-gray-100 mx-8 lg:mx-16" />

          <div className="flex-1 text-left md:text-center space-y-2">
            <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter text-left md:text-center">
              <CountUp to={10} duration={2} />K+
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-500 font-medium text-left md:text-center">Overall Revenue Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
}
