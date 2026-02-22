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
                            Documentation Overview
                        </h1>
                        <p className="text-lg text-zinc-600 leading-relaxed">
                            Welcome to the Legac documentation. Learn how to audit, document, and modernize your legacy codebases with our AI-powered tools.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Zero-Config Audit</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Automatically scan your repository and identify core modules, database schemas, and API endpoints without writing a single line of config.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">AI Documentation</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Generate high-quality, up-to-date documentation for your legacy code using our advanced AI-driven analysis engine.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                                <Shield className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Modernization Paths</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Get clear, actionable advice on how to refactor your code to modern standards while maintaining full backwards compatibility.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:border-brand-blue/20 transition-colors group">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4 text-orange-600 group-hover:scale-110 transition-transform">
                                <Rocket className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-900 mb-2">Seamless Integration</h3>
                            <p className="text-sm text-zinc-600 leading-relaxed">
                                Connect your GitHub account and sync documentation directly to your repository with a single click.
                            </p>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="p-8 rounded-2xl bg-zinc-900 text-white flex flex-col items-center text-center space-y-4 shadow-xl">
                        <h2 className="text-2xl font-bold">Ready to modernize your code?</h2>
                        <p className="text-zinc-400 max-w-lg">
                            Follow our step-by-step installation guide to get Legac running in your environment in minutes.
                        </p>
                        <Link href="/docs/installation">
                            <Button className="bg-white text-zinc-950 hover:bg-zinc-100 h-11 px-8 rounded-full font-bold gap-2">
                                Go to Installation
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        </DocsShell>
    );
}
