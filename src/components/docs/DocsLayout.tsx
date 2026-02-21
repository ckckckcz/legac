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
      {/* Top bar */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border shrink-0">
        <Link href="/" className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Legac Docs
        </Link>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-sm text-muted-foreground h-8 px-3"
          onClick={onSearchOpen}
          aria-label="Search docs (Ctrl+K)"
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </Button>
      </header>

      {/* Body: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Docs nav sidebar */}
        <DocsSidebar sections={sections} activeAnchor={activeAnchor} />

        {/* Main content — independently scrollable */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
