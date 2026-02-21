'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Menu, X, Files, BarChart3, Settings, LogOut, Upload, FolderOpen, User, Github, Heart, } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
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
}

/**
 * SidebarNavItem - Reusable navigation item using shadcn Button
 */
function SidebarNavItem({
    icon,
    label,
    href,
    onClick,
    variant = 'default',
    badge,
    disabled,
}: NavItemProps) {
    const isDestructive = variant === 'destructive'

    const content = (
        <Button
            variant="ghost"
            className={`w-full justify-start px-3 gap-3 transition-colors ${isDestructive
                ? 'text-destructive hover:text-destructive hover:bg-destructive/10'
                : 'text-foreground hover:bg-accent'
                }`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
            <span className="text-sm font-medium flex-1 text-left">{label}</span>
            {badge !== undefined && (
                <Badge variant="secondary" className="ml-auto">
                    {badge}
                </Badge>
            )}
        </Button>
    )

    if (href) {
        return <Link href={href}>{content}</Link>
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
        // Close sidebar on mobile when navigation item is clicked
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
            setLogoutError('Failed to sign out. Please try again.')
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
                className="fixed left-4 top-4 z-40 md:hidden"
                aria-label="Toggle sidebar"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Sidebar Background Overlay - Mobile Only */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transform transition-transform duration-300 md:relative md:translate-x-0 md:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Sidebar Content */}
                <div className="h-full flex flex-col p-6">
                    {/* Header */}
                    <div className="mb-8 mt-12 md:mt-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <Files className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-xl font-bold text-foreground">Legac</h1>
                        </div>
                        <p className="text-sm text-muted-foreground">Manage your documents</p>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex-1">
                        <div className="space-y-1 mb-8">
                            <SidebarNavItem
                                icon={<Files className="w-5 h-5 text-muted-foreground" />}
                                label="All Documents"
                                onClick={handleNavClick}
                            />
                            <SidebarNavItem
                                icon={<Github className="w-5 h-5 text-muted-foreground" />}
                                label="Repository"
                                href={userId ? `/user/${userId}/repository` : undefined}
                                onClick={handleNavClick}
                            />
                        </div>

                        {/* GitHub Import Section */}
                        <div className="mb-6 px-1">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 ml-1">Connect GitHub</p>
                            <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/40 border border-border/50">
                                <Input
                                    placeholder="github.com/user/repo"
                                    className="h-8 text-xs bg-background border-border/50 focus-visible:ring-primary/20"
                                    value={githubLink}
                                    onChange={(e) => setGithubLink(e.target.value)}
                                />
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full text-xs h-8 font-bold hover:bg-primary hover:text-primary-foreground transition-all"
                                    onClick={() => {
                                        if (githubLink) {
                                            alert(`Importing from: ${githubLink}`)
                                            setGithubLink('')
                                        }
                                    }}
                                >
                                    <Github className="w-3.5 h-3.5 mr-2" />
                                    Connect Link
                                </Button>
                            </div>
                        </div>
                    </nav>

                    {/* User Section */}
                    <div className="space-y-1 border-t border-border pt-6">
                        <SidebarNavItem
                            icon={<User className="w-5 h-5 text-muted-foreground" />}
                            label="Profile"
                            href={username ? `/user/profile/${username}` : undefined}
                            onClick={handleNavClick}
                        />
                        <SidebarNavItem
                            icon={<Heart className="w-5 h-5 text-muted-foreground" />}
                            label="Donation"
                            href={userId ? `/user/${userId}/donation` : undefined}
                            onClick={handleNavClick}
                        />
                        <SidebarNavItem
                            icon={<LogOut className="w-5 h-5" />}
                            label={isLoggingOut ? 'Signing out...' : 'Logout'}
                            variant="destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                        />
                        {logoutError && (
                            <p className="text-destructive text-xs px-3 pt-1">{logoutError}</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}
