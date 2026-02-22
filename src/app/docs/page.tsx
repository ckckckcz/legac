'use client';

import { useState } from 'react';
import { DocsShell } from '@/components/docs/DocsLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Rocket, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DocsOverviewPage() {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <DocsShell
            sections={[]}
            onSearchOpen={() => setSearchOpen(true)}
        >
            <div className="flex w-full bg-white">
                <main className="flex-1 px-6 lg:px-10 py-10 max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="space-y-4 mb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-950">
                            Dokumentasi Legac
                        </h1>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Selamat datang di dokumentasi Legac. Pelajari cara mengaudit, mendokumentasikan, dan memodernisasi codebase legacy Anda dengan alat berbasis AI kami.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Audit Tanpa Konfigurasi</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Pindai repositori Anda secara otomatis dan identifikasi modul inti, skema database, dan endpoint API tanpa menulis satu baris konfigurasi pun.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Dokumentasi AI</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Hasilkan dokumentasi berkualitas tinggi dan mutakhir untuk kode legacy Anda menggunakan mesin analisis berbasis AI kami yang canggih.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Jalur Modernisasi</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Dapatkan saran yang jelas dan dapat ditindaklanjuti tentang cara mem-refactor kode Anda ke standar modern dengan tetap menjaga kompatibilitas penuh.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Integrasi Tanpa Hambatan</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Hubungkan akun GitHub Anda dan sinkronkan dokumentasi langsung ke repositori Anda hanya dengan satu klik.
                            </p>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="p-8 rounded-2xl bg-zinc-900 text-white flex flex-col items-center text-center space-y-4 shadow-xl">
                        <h2 className="text-2xl font-bold">Siap memodernisasi kode Anda?</h2>
                        <p className="text-zinc-400 max-w-lg">
                            Ikuti panduan instalasi langkah demi langkah kami untuk menjalankan Legac di lingkungan Anda dalam hitungan menit.
                        </p>
                        <Link href="/docs/installation">
                            <Button className="bg-white text-zinc-950 hover:bg-zinc-100 h-11 px-8 rounded-full font-bold gap-2">
                                Ke Halaman Instalasi
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        </DocsShell>
    );
}
