import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Network,
  FileSearch,
  TerminalSquare,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
}

const FEATURES: Feature[] = [
  {
    icon: Brain,
    title: "AI Code Understanding",
    description:
      "Model AI kami membaca dan memahami kode legacy Anda, termasuk pola yang tidak terdokumentasi dan logika bisnis tersembunyi.",
    badge: "AI",
  },
  {
    icon: Network,
    title: "Dependency Graph",
    description:
      "Visualisasikan hubungan antar modul, service, dan database secara otomatis dalam bentuk graf interaktif.",
    badge: "Visualisasi",
  },
  {
    icon: FileSearch,
    title: "Endpoint Discovery",
    description:
      "Temukan dan dokumentasikan semua endpoint API secara otomatis, lengkap dengan parameter dan response schema.",
    badge: "API",
  },
  {
    icon: TerminalSquare,
    title: "CLI Integration",
    description:
      "Integrasikan Legac ke workflow CI/CD Anda dengan CLI yang powerful dan dapat dikonfigurasi.",
    badge: "DevOps",
  },
  {
    icon: RefreshCw,
    title: "Live Sync",
    description:
      "Dokumentasi dan peta kode selalu tersinkronisasi dengan perubahan terbaru di repository Anda.",
    badge: "Otomasi",
  },
  {
    icon: BookOpen,
    title: "Auto Documentation",
    description:
      "Generate dokumentasi teknis yang komprehensif dari kode Anda dalam berbagai format: Markdown, HTML, atau PDF.",
    badge: "Docs",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 px-4 bg-white relative">
      <div className="max-w-7xl  mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-sm px-4 py-1.5 border-brand-blue/20 text-brand-blue bg-brand-blue/5 mb-6">
            Fitur
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Semua yang Anda butuhkan
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Dari analisis kode hingga dokumentasi otomatis — Legac menyediakan
            semua tools yang dibutuhkan tim Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
              >
                <CardContent className="pt-8 pb-8 flex flex-col gap-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-brand-blue group-hover:text-white" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-bold bg-gray-100 text-gray-500 border-none group-hover:bg-brand-green/20 group-hover:text-brand-green transition-colors">
                      {feature.badge}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-blue transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
