'use client'

import { Search } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import type { DocsSection } from '@/components/docs/DocsLayout'
import { cn } from '@/lib/utils'

interface DocsSidebarProps {
  sections: DocsSection[]
  activeAnchor?: string
  onSearchOpen?: () => void
  className?: string
}

export function DocsSidebar({ sections, activeAnchor, onSearchOpen, className }: DocsSidebarProps) {
  const params = useParams()
  const pathname = usePathname()

  const isDynamicPage = !!params.id

  const staticSections: DocsSection[] = !isDynamicPage ? [
    {
      title: 'Getting Started',
      items: [
        { label: 'Overview', anchor: '/docs' },
        { label: 'Installation', anchor: '/docs/installation' },
      ],
    },
  ] : []

  const allSections = [...staticSections, ...sections]

  return (
    <div className={cn(
      "flex flex-col w-full h-full py-6 px-5 overflow-y-auto",
      className
    )}>

      {/* Search Bar */}
      <div className="mb-6">
        <button
          onClick={onSearchOpen}
          className="flex items-center w-full gap-3 px-3 py-2 rounded-lg bg-accent/50 border border-border text-sm text-muted-foreground hover:border-primary/30 hover:bg-accent transition-all group"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left text-xs">Search</span>
          <div className="flex gap-1">
            <kbd className="h-5 px-1 bg-background border border-border rounded flex items-center justify-center text-[10px] font-mono text-muted-foreground">⌘</kbd>
            <kbd className="h-5 px-1 bg-background border border-border rounded flex items-center justify-center text-[10px] font-mono text-muted-foreground">K</kbd>
          </div>
        </button>
      </div>

      <nav className="flex flex-col gap-6 pb-10">
        {allSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/60 pl-2">
              {section.title}
            </h5>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isStatic = item.anchor.startsWith('/docs')
                const isActive = isStatic
                  ? pathname === item.anchor
                  : activeAnchor === item.anchor

                // Construct href
                let href = item.anchor
                if (!isStatic) {
                  href = item.anchor.startsWith('#')
                    ? item.anchor
                    : `/docs/${params.id}?page=${item.anchor}`
                }

                return (
                  <Link
                    key={item.anchor}
                    href={href}
                    className={cn(
                      "flex items-center justify-between group px-3 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
