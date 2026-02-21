'use client'

import { useState } from 'react'
import { Menu, X, Files, BarChart3, Settings, LogOut, Upload, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    onUploadClick: () => void
}

export function Sidebar({ isOpen, setIsOpen, onUploadClick }: SidebarProps) {
    return (
        <>
            {/* Toggle Button */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 z-40 md:hidden"
            >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {/* Sidebar Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background p-6 transform transition-transform duration-300 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="mb-8 mt-12 md:mt-0">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <Files className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-bold">Legac</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">Manage your documents</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 mb-8">
                    <div className="px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                        <Files className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">All Documents</span>
                    </div>
                    <div className="px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                        <FolderOpen className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">Categories</span>
                    </div>
                    <div className="px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">Statistics</span>
                    </div>
                </nav>

                {/* Upload Button */}
                <Button
                    onClick={onUploadClick}
                    className="w-full mb-8 bg-primary hover:bg-primary/90"
                    size="lg"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>

                {/* Settings Section */}
                <div className="space-y-1 border-t border-border pt-6">
                    <div className="px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors flex items-center gap-3">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">Settings</span>
                    </div>
                    <div className="px-3 py-2 rounded-lg hover:bg-accent cursor-pointer transition-colors flex items-center gap-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                    </div>
                </div>
            </aside>
        </>
    )
}
