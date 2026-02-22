'use client';

import { useState } from 'react';
import { DocsShell } from '@/components/docs/DocsLayout';
import { Button } from '@/components/ui/button';
import { Copy, Terminal, Check } from 'lucide-react';
import Link from 'next/link';

export default function DocsInstallationPage() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const steps = [
        {
            title: 'Instalasi',
            description: 'Instal package secara global melalui npm atau gunakan npx jika kamu tidak ingin menginstalnya secara global.',
            command: 'npm install -g legacyver',
            alternative: 'Atau gunakan npx legacyver',
            id: 'step-1',
        },
        {
            title: 'Login (Cloud Sync)',
            description: 'Masuk ke akun Legacyver kamu untuk mengaktifkan sinkronisasi cloud dan menyimpan dokumentasi di dashboard:',
            command: 'legacyver login',
            id: 'step-2',
        },
        {
            title: 'Inisialisasi Konfigurasi (Optional)',
            description: 'Jalankan wizard setup untuk menyimpan API key anda (Groq, Gemini, dll.) agar token generate document lebih banyak dan membuat file konfigurasi .legacyverrc:',
            command: 'legacyver init',
            id: 'step-3',
        },
        {
            title: 'Analisis & Generate',
            description: 'Jalankan perintah utama untuk menganalisis folder project kamu. Flag --incremental memastikan hanya file yang dimodifikasi yang akan diproses ulang (lebih cepat & hemat).',
            command: 'legacyver analyze ./src --incremental',
            id: 'step-4',
        },
    ];

    const coreCommands = [
        { name: 'legacyver analyze [target]', description: 'Utama: Generate dokumentasi dari folder code lu.' },
        { name: 'legacyver init', description: 'Setup awal buat simpen API Key dan bikin config .legacyverrc.' },
        { name: 'legacyver providers', description: 'Cek daftar AI provider yang aktif & model yang ready.' },
        { name: 'legacyver cache clear', description: 'Hapus cache biar scan ulang dari nol.' },
        { name: 'legacyver login/logout', description: 'Sinkronisasi hasil dokumentasi ke cloud dashboard.' },
        { name: 'legacyver -v / --version', description: 'Cek versi tool yang kepasang.' },
        { name: 'legacyver --help', description: 'Nampilin panduan bantuan.' },
    ];

    const analyzeFlags = [
        { name: '--out <dir>', default: './legacyver-docs', description: 'Folder output hasil dokumentasi' },
        { name: '--format <fmt>', default: 'markdown', description: 'Format output: markdown, html, json' },
        { name: '--provider <p>', default: 'groq', description: 'Provider AI: groq, gemini, ollama, openrouter' },
        { name: '--incremental', default: 'false', description: 'Hanya proses file yang berubah (lebih cepat)' },
        { name: '--dry-run', default: 'false', description: 'Estimasi penggunaan token tanpa memanggil AI' },
        { name: '--no-confirm', default: '—', description: 'Lewati konfirmasi estimasi biaya' },
    ];

    return (
        <DocsShell
            sections={[]}
            onSearchOpen={() => setSearchOpen(true)}
        >
            <div className="flex w-full bg-white">
                <main className="flex-1 px-6 lg:px-8 py-8 max-w-3xl mx-auto font-sans">
                    <div className="space-y-3 mb-12">
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                            Panduan Instalasi
                        </h1>
                        <p className="text-base text-zinc-600 leading-relaxed">
                            Ikuti langkah-langkah di bawah ini untuk mensetup Legacyver dan mulai mendokumentasikan codebase kamu.
                        </p>
                    </div>

                    {/* Continuous Stepper Container */}
                    <div className="relative space-y-12 mb-20">
                        {/* The "Cable" (Continuous Line) */}
                        <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-zinc-100" />

                        {steps.map((step, index) => (
                            <div key={step.id} className="relative pl-12">
                                {/* Step Circle */}
                                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-black font-bold text-sm z-10 shadow-sm">
                                    {index + 1}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-950">{step.title}</h3>
                                        <div className="text-sm text-zinc-600 leading-relaxed mt-1.5 space-y-2">
                                            <p>{step.description}</p>
                                            {step.alternative && <p className="text-xs font-medium text-zinc-400 italic">{step.alternative}</p>}
                                        </div>
                                    </div>

                                    {/* White-themed Code Block */}
                                    <div className="relative group">
                                        <div className="relative bg-zinc-50/50 text-zinc-900 p-4 rounded-xl font-mono text-sm overflow-x-auto border border-zinc-200 transition-all group-hover:border-zinc-300 group-hover:shadow-md">
                                            <div className="flex items-center">
                                                <span className="text-zinc-400 mr-3 select-none">$</span>
                                                <code className="flex-1">{step.command}</code>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(step.command, step.id)}
                                                className="absolute right-3 top-3 p-2 rounded-lg bg-white border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                                            >
                                                {copiedId === step.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-16">
                        {/* CLI Commands Section */}
                        <section className="space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-zinc-950 flex items-center gap-2">
                                    <Terminal className="h-6 w-6" />
                                    🛠️ Daftar Perintah (CLI Commands)
                                </h2>
                                <p className="text-sm text-zinc-500">Daftar lengkap perintah yang tersedia di Legacyver CLI.</p>
                            </div>

                            <div className="space-y-10">
                                {/* Command Group: Core */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2">1. Command Inti (legacyver)</h3>
                                    <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-zinc-50/50 border-b border-zinc-200">
                                                    <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Command</th>
                                                    <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Kegunaan</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {coreCommands.map((cmd) => (
                                                    <tr key={cmd.name} className="hover:bg-zinc-50/30 transition-colors">
                                                        <td className="px-5 py-4 font-mono text-[13px] text-zinc-900 font-semibold">{cmd.name}</td>
                                                        <td className="px-5 py-4 text-[13px] text-zinc-600 leading-relaxed whitespace-pre-wrap">{cmd.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Command Group: Analyze Flags */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-2">2. Opsi/Flags analyze (Lengkap)</h3>
                                    <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-zinc-50/50 border-b border-zinc-200">
                                                    <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[25%]">Flag</th>
                                                    <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider w-[20%]">Default</th>
                                                    <th className="px-5 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Deskripsi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-100">
                                                {analyzeFlags.map((flag) => (
                                                    <tr key={flag.name} className="hover:bg-zinc-50/30 transition-colors">
                                                        <td className="px-5 py-4 font-mono text-[13px] text-zinc-900 font-semibold">{flag.name}</td>
                                                        <td className="px-5 py-4 font-mono text-[12px] text-zinc-500">{flag.default}</td>
                                                        <td className="px-5 py-4 text-[13px] text-zinc-600 leading-relaxed">{flag.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-20 flex items-center justify-between border-t border-zinc-100 pt-10">
                        <Link href="/docs" className="flex flex-col gap-1.5 group text-left">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Previous</span>
                            <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-950 transition-colors">Documentation Overview</span>
                        </Link>
                        <div className="flex-1" />
                        <Link href="/" className="flex flex-col gap-1.5 group text-right">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">Finish</span>
                            <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-950 transition-colors">Back to Home</span>
                        </Link>
                    </div>
                </main>
            </div>
        </DocsShell>
    );
}
