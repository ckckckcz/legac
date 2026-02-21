'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export interface DocsSection {
  title: string
  count?: number
  items: { label: string; anchor: string }[]
}

interface DocsShellProps {
  sections: DocsSection[]
  activeAnchor?: string
  onSearchOpen?: () => void
  children: React.ReactNode
}

export function DocsShell({ sections, activeAnchor, onSearchOpen, children }: DocsShellProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Docs nav sidebar */}
        <DocsSidebar sections={sections} activeAnchor={activeAnchor} onSearchOpen={onSearchOpen} />

        {/* Main content — independently scrollable */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
