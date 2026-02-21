'use client'

import { Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import type { DocsSection } from '@/components/docs/DocsLayout'

interface DocsSidebarProps {
  sections: DocsSection[]
  activeAnchor?: string
  onSearchOpen?: () => void
}

export function DocsSidebar({ sections, activeAnchor, onSearchOpen }: DocsSidebarProps) {
  const params = useParams()
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-zinc-100 bg-white py-6 pl-6 pr-4 sticky top-[72px] h-[calc(100vh-72px)] overflow-y-auto">
      {/* Search Bar */}
      <div className="mb-8">
        <button
          onClick={onSearchOpen}
          className="flex items-center w-full gap-3 px-3 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-sm text-zinc-400 hover:border-zinc-300 hover:bg-zinc-100 transition-all group"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left text-xs">Search</span>
          <div className="flex gap-1">
            <kbd className="h-5 px-1 bg-white border border-zinc-200 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400">⌘</kbd>
            <kbd className="h-5 px-1 bg-white border border-zinc-200 rounded flex items-center justify-center text-[10px] font-mono text-zinc-400">K</kbd>
          </div>
        </button>
      </div>

      <nav className="flex flex-col gap-8 pb-10">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 pl-2">
              {section.title}
            </h5>
            <div className="flex flex-col gap-0.5">
              {section.items.map((item) => {
                const isActive = activeAnchor === item.anchor
                // If the anchor doesn't start with '#', it's a sub-page of the current doc
                const href = item.anchor.startsWith('#')
                  ? item.anchor
                  : `/docs/${params.id}?page=${item.anchor}`

                return (
                  <Link
                    key={item.anchor}
                    href={href}
                    className={`flex items-center justify-between group px-2 py-1.5 rounded-md text-[13px] font-medium transition-all ${isActive
                      ? 'bg-brand-blue/5 text-brand-blue'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                      }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-brand-blue opacity-50" />}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
