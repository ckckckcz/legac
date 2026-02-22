'use client'

import { DocsSidebar } from '@/components/docs/DocsSidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-zinc-100 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Legac Logo" className="w-8 h-8 object-contain" />
          <span className="text-lg font-bold tracking-tight text-zinc-900">Legac</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-zinc-500">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none w-72">
            <div className="h-full overflow-y-auto pt-10">
              <DocsSidebar sections={sections} activeAnchor={activeAnchor} onSearchOpen={onSearchOpen} className="flex w-full h-full border-none shadow-none static top-0 py-0" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

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
