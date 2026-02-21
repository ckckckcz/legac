import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Map, ShieldCheck, GitBranch, Clock, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueProp {
  icon: LucideIcon;
  title: string;
  description: string;
}

const VALUE_PROPS: ValueProp[] = [
  {
    icon: Map,
    title: "Pemetaan Otomatis",
    description:
      "Legac memetakan seluruh struktur kodebase Anda — database, endpoint, dan logika bisnis — tanpa konfigurasi manual.",
  },
  {
    icon: Zap,
    title: "Analisis Instan",
    description:
      "Dapatkan pemahaman mendalam tentang kode legacy dalam hitungan menit, bukan minggu.",
  },
  {
    icon: ShieldCheck,
    title: "Refactor dengan Aman",
    description:
      "Identifikasi dependency dan risiko sebelum melakukan perubahan, sehingga refactoring lebih aman dan terkontrol.",
  },
  {
    icon: GitBranch,
    title: "Dokumentasi Hidup",
    description:
      "Dokumentasi yang selalu sinkron dengan kode aktual — bukan dokumen yang kadaluarsa di wiki.",
  },
  {
    icon: Clock,
    title: "Hemat Waktu Onboarding",
    description:
      "Developer baru bisa produktif lebih cepat dengan peta kode yang jelas dan terstruktur.",
  },
  {
    icon: Users,
    title: "Kolaborasi Tim",
    description:
      "Seluruh tim berbagi pemahaman yang sama tentang sistem, mengurangi miskomunikasi dan bottleneck.",
  },
];

export function LandingWhyUs() {
  return (
    <section id="why-us" className="py-24 px-4 bg-gray-50/50 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-sm px-4 py-1.5 border-brand-blue/20 text-brand-blue bg-white mb-6">
            Mengapa Legac?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
            Kenapa tim memilih Legac
          </h2>
          <p className="mt-6 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Legac bukan sekadar tools dokumentasi — ini adalah copilot untuk
            memahami dan menguasai sistem yang paling kompleks sekalipun.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUE_PROPS.map((prop) => {
            const Icon = prop.icon;
            return (
              <Card key={prop.title} className="border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 text-brand-blue group-hover:text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-brand-blue transition-colors">{prop.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed font-medium">
                    {prop.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
