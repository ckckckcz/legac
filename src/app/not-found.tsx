'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden font-sans">
            {/* Decorative background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-md w-full px-6 text-center">
                {/* Logo/Icon Container */}
                <div className="mb-8 inline-flex items-center justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center animate-pulse">
                        <span className="text-4xl font-bold text-primary">404</span>
                    </div>
                </div>

                <h1 className="text-4xl font-black tracking-tighter text-foreground mb-4">
                    Page Not Found
                </h1>

                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                    Oops! The page you're looking for seems to have vanished into the legacy codebase.
                    Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                        <Button className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </Button>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                        Legacyver Documentation & Modernization
                    </p>
                </div>
            </div>
        </div>
    )
}
