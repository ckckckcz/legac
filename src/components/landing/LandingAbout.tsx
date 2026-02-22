import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function LandingAbout() {
  return (
    <section id="about" className="py-32 px-4 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        <Badge variant="outline" className="text-sm px-4 py-1.5 border-brand-blue/20 text-brand-blue bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors">
          About Us
        </Badge>

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15]">
          Kami membantu tim memahami{" "}
          <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
            kode yang paling kompleks
          </span>{" "}
          sekalipun
        </h2>

        <p className="max-w-2xl text-gray-600 text-lg md:text-xl leading-relaxed">
          Legac adalah platform berbasis AI yang dirancang untuk tim yang
          mewarisi codebase besar dan kompleks. Kami memetakan struktur database,
          endpoint API, dan alur logika bisnis secara otomatis — sehingga Anda
          bisa memahami, mendokumentasikan, dan merefactor dengan percaya diri.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 h-12 rounded-full shadow-lg shadow-brand-blue/20 transition-all hover:scale-105 active:scale-95">
            Mulai Sekarang
          </Button>
          <Button size="lg" variant="outline" className="px-8 h-12 rounded-full border-gray-200 hover:bg-gray-50 transition-all">
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
      {/* Bottom Metrics */}
      <div className="mt-32 pt-20 border-t border-gray-100 w-full bg-white relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-0 justify-center items-center px-6">
          <div className="flex-1 text-center space-y-2">
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">90%</h3>
            <p className="text-base md:text-lg text-gray-500 font-medium">Client satisfaction</p>
          </div>

          <div className="hidden md:block w-px h-20 bg-gray-100 mx-8 lg:mx-16" />

          <div className="flex-1 text-center space-y-2">
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">180+</h3>
            <p className="text-base md:text-lg text-gray-500 font-medium">Project Successfully Done</p>
          </div>

          <div className="hidden md:block w-px h-20 bg-gray-100 mx-8 lg:mx-16" />

          <div className="flex-1 text-center space-y-2">
            <h3 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tighter">10K+</h3>
            <p className="text-base md:text-lg text-gray-500 font-medium">Overall Revenue Raised</p>
          </div>
        </div>
      </div>
    </section>
  );
}
