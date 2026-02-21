'use client'

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
    <div className="flex flex-col min-h-screen bg-white text-zinc-900 font-sans">
      {/* Body: sidebar + content + toc */}
      <div className="flex flex-1 pt-[72px] max-w-7xl mx-auto w-full">
        {/* Docs nav sidebar (Left) - Kept as requested */}
        <div className="hidden lg:block">
          <DocsSidebar sections={sections} activeAnchor={activeAnchor} onSearchOpen={onSearchOpen} />
        </div>

        {/* Main Content Area - Now scrolls with the page */}
        <div className="flex-1 scroll-smooth">
          {children}
        </div>
      </div>
    </div>
  )
}
