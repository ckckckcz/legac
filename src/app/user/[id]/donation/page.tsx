'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Sidebar } from '@/components/sidebar'
import { SaweriaCard } from '@/components/donation/SaweriaCard'
import { KreateCard } from '@/components/donation/KreateCard'

export default function DonationPage() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login?callbackUrl=/user/dashboard')
        }
    }, [status, router])

    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    if (status !== 'authenticated' || !session?.user) {
        return null
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                onUploadClick={() => { }}
            />

            <main className="flex-1 overflow-auto md:ml-0">
                {/* Header */}
                <div className="sticky top-0 z-20 border-b border-border bg-background">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-1">Donation</h1>
                        <p className="text-muted-foreground">
                            Support the developer via Saweria or Kreate.gg
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold tracking-tight">Select Platform</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <SaweriaCard />
                            <KreateCard />
                        </div>
                    </div>

                    <div className="bg-muted/30 border border-border/50 rounded-2xl p-8 text-center space-y-4">
                        <h3 className="text-lg font-bold">Why support us?</h3>
                        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                            Your support helps us maintain the infrastructure for Legac and keep shipping new features to help teams understand their legacy codebases better.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
