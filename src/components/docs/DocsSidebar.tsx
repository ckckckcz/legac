'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export interface DocsSection {
  title: string
  count?: number
  items: string[]
}

interface DocsSidebarProps {
  sections: DocsSection[]
  activeItem?: string
}

function NavTree({
  sections,
  activeItem,
  onItemClick,
}: {
  sections: DocsSection[]
  activeItem?: string
  onItemClick?: (item: string) => void
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
                  <Button
                    key={item}
                    variant="ghost"
                    className={`w-full justify-start text-sm font-normal h-8 px-2 ${
                      activeItem === item ? 'bg-accent' : ''
                    }`}
                    onClick={() => onItemClick?.(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function DocsSidebar({ sections, activeItem }: DocsSidebarProps) {
  return (
    <>
      {/* Mobile Sheet trigger */}
      <div className="md:hidden fixed left-14 top-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open docs navigation">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="px-4 pt-4 pb-2">
              <SheetTitle>Documentation</SheetTitle>
            </SheetHeader>
            <NavTree sections={sections} activeItem={activeItem} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 border-r border-border h-screen overflow-y-auto">
        <div className="px-4 py-4 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Documentation
          </p>
        </div>
        <NavTree sections={sections} activeItem={activeItem} />
      </aside>
    </>
  )
}
