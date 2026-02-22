'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Menu, X, Files, LogOut, User, Github, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { broadcastSessionClear } from '@/lib/utils/storage-sync'

interface SidebarProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    onUploadClick: () => void
}

interface NavItemProps {
    icon: React.ReactNode
    label: string
    href?: string
    onClick?: () => void
    variant?: 'default' | 'destructive'
    badge?: number
    disabled?: boolean
    active?: boolean
}

function SidebarNavItem({
    icon,
    label,
    href,
    onClick,
    variant = 'default',
    badge,
    disabled,
    active
}: NavItemProps) {
    const isDestructive = variant === 'destructive'

    const content = (
        <Button
            variant="ghost"
            className={`w-full justify-start px-2.5 h-9 gap-2.5 transition-all duration-200 ${isDestructive
                ? 'text-destructive hover:text-destructive hover:bg-destructive/5'
                : active
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            <div className={`p-1 rounded-md transition-colors ${active ? 'bg-primary/10' : ''}`}>
                {icon}
            </div>
            <span className="text-sm font-semibold flex-1 text-left tracking-tight">{label}</span>
            {badge !== undefined && (
                <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px] font-bold">
                    {badge}
                </Badge>
            )}
        </Button>
    )

    if (href) {
        return <Link href={href} className="block">{content}</Link>
    }

    return content
}

export function Sidebar({ isOpen, setIsOpen, onUploadClick }: SidebarProps) {
    const { data: session } = useSession()
    const username = (session?.user as any)?.username as string | undefined
    const userId = session?.user?.id
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [logoutError, setLogoutError] = useState<string | null>(null)
    const [githubLink, setGithubLink] = useState('')

    const handleNavClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false)
        }
    }

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            setLogoutError(null)
            broadcastSessionClear()
            await signOut({ redirect: true, callbackUrl: '/' })
        } catch (err) {
            console.error('Sign-out error:', err)
            setLogoutError('Failed to sign out.')
            setIsLoggingOut(false)
        }
    }

    return (
        <>
            {/* Toggle Button - Mobile Only */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-3 top-3 z-40 md:hidden h-9 w-9 border border-border/50 bg-background/80 backdrop-blur"
                aria-label="Toggle sidebar"
            >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>

            {/* Backdrop - Mobile Only */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-[240px] border-r border-border/50 bg-background/50 backdrop-blur-xl transition-all duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col p-4">
                    {/* Header */}
                    <div className="mb-6 mt-2">
                        <Link href="/" className="flex items-center gap-2.5 px-1 group">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                                <Image src="/logo.png" alt="Logo" width={60} height={60} className="w-16 h-full" />
                            </div>
                            <span className="text-lg font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">Legacyver</span>
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-6">
                        {/* Main Nav */}
                        <div className="space-y-1">
                            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 mb-2">Workspace</p>
                            <SidebarNavItem
                                icon={<Files size={18} />}
                                label="Documents"
                                href={userId ? `/user/${userId}` : undefined}
                                onClick={handleNavClick}
                            />
                            <SidebarNavItem
                                icon={<Github size={18} />}
                                label="Repositories"
                                href={userId ? `/user/${userId}/repository` : undefined}
                                onClick={handleNavClick}
                            />
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="mt-auto space-y-1.5 pt-4 border-t border-border/50">
                        <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/50 mb-2">Account</p>
                        <SidebarNavItem
                            icon={<User size={18} />}
                            label="Profile"
                            href={username ? `/user/profile/${username}` : undefined}
                            onClick={handleNavClick}
                        />
                        <SidebarNavItem
                            icon={<Heart size={18} />}
                            label="Donation"
                            href={userId ? `/user/${userId}/donation` : undefined}
                            onClick={handleNavClick}
                        />
                        <SidebarNavItem
                            icon={<LogOut size={18} />}
                            label={isLoggingOut ? 'Leaving...' : 'Logout'}
                            variant="destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        />
                        {logoutError && (
                            <p className="text-destructive text-[10px] px-3 font-medium">{logoutError}</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}
