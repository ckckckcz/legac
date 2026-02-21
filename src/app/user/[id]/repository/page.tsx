'use client'

import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Sidebar } from '@/components/sidebar'
import { RepoList } from '@/components/repos/RepoList'

export default function RepositoryPage() {
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
                onUploadClick={() => {}}
            />

            <main className="flex-1 overflow-auto md:ml-0">
                {/* Header */}
                <div className="sticky top-0 z-20 border-b border-border bg-background">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-1">Repository</h1>
                        <p className="text-muted-foreground">
                            Your public and private GitHub repositories
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <RepoList />
                </div>
            </main>
        </div>
    )
}
