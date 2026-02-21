'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { DocsSection } from '@/components/docs/DocsLayout'

interface DocsSidebarProps {
  sections: DocsSection[]
  activeAnchor?: string
  onSearchOpen?: () => void
}

function NavTree({
  sections,
  activeAnchor,
}: {
  sections: DocsSection[]
  activeAnchor?: string
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  return (
    <nav className="flex flex-col gap-1 p-2">
      {sections.map((section) => {
        const isOpen = openSections[section.title] ?? false
        return (
          <div key={section.title}>
            {/* Section header row */}
            <button
              onClick={() => toggleSection(section.title)}
              className="flex items-center w-full gap-2 px-2 py-1.5 rounded-md text-sm font-medium hover:bg-accent transition-colors"
            >
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              )}
              <span className="flex-1 text-left">{section.title}</span>
              {section.count !== undefined && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {section.count}
                </Badge>
              )}
            </button>

            {/* Child items */}
            {isOpen && (
              <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
                {section.items.map((item) => (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    className={`flex items-center w-full text-sm font-normal h-8 px-2 rounded-md transition-colors hover:bg-accent ${
                      activeAnchor === item.anchor ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar({ sections, activeAnchor, onSearchOpen }: DocsSidebarProps) {
  return (
    <>
      {/* Mobile Sheet trigger */}
      <div className="md:hidden fixed left-4 top-16 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open docs navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="px-4 pt-4 pb-2">
              <SheetTitle>Legac</SheetTitle>
            </SheetHeader>
            {onSearchOpen && (
              <div className="px-2 pb-1">
                <button
                  onClick={onSearchOpen}
                  className="flex items-center w-full gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors"
                  aria-label="Search docs (Ctrl+K)"
                >
                  <Search className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left text-xs">Search docs...</span>
                  <kbd className="inline-flex items-center rounded border border-border bg-background px-1.5 py-2 text-xs font-mono text-muted-foreground">
                    CTRL + K
                  </kbd>
                </button>
              </div>
            )}
            <NavTree sections={sections} activeAnchor={activeAnchor} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border overflow-y-auto">
        <div className="px-4 py-4 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Documentation
          </p>
        </div>
        {onSearchOpen && (
          <div className="px-2 pt-2">
            <button
              onClick={onSearchOpen}
              className="flex items-center w-full gap-2 px-3 py-1.5 rounded-md border border-border bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Search docs (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 text-left text-xs">Search docs...</span>
              <kbd className="inline-flex items-center rounded border border-border bg-background px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                CTRL + K
              </kbd>
            </button>
          </div>
        )}
        <NavTree sections={sections} activeAnchor={activeAnchor} />
      </aside>
    </>
  )
}
