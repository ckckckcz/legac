'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Menu, X, Files, BarChart3, Settings, LogOut, Upload, FolderOpen, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
            className={`w-full justify-start px-3 gap-3 transition-colors ${
                isDestructive
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
    const [isLoggingOut, setIsLoggingOut] = useState(false)
    const [logoutError, setLogoutError] = useState<string | null>(null)

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
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background transform transition-transform duration-300 md:relative md:translate-x-0 md:transform-none ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
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
                                icon={<FolderOpen className="w-5 h-5 text-muted-foreground" />}
                                label="Categories"
                                onClick={handleNavClick}
                            />
                            <SidebarNavItem
                                icon={<BarChart3 className="w-5 h-5 text-muted-foreground" />}
                                label="Statistics"
                                onClick={handleNavClick}
                            />
                        </div>

                        {/* Upload Button */}
                        <Button
                            onClick={() => {
                                onUploadClick()
                                handleNavClick()
                            }}
                            className="w-full mb-8"
                            size="lg"
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Document
                        </Button>
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
                            icon={<Settings className="w-5 h-5 text-muted-foreground" />}
                            label="Settings"
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
