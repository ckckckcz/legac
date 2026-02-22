'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Global Application Sidebar (Narrow Mode) */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onUploadClick={() => { }}
        isNarrow={true}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Desktop Layout with Nested Sidebars */}
        <div className="flex-1 flex overflow-hidden">
          {/* Secondary Sidebar (Doc Navigation Pane) */}
          <aside className="hidden lg:block w-72 shrink-0 border-r border-border bg-card/30 backdrop-blur-sm overflow-y-auto">
            <DocsSidebar
              sections={sections}
              activeAnchor={activeAnchor}
              onSearchOpen={onSearchOpen}
            />
          </aside>

          {/* Main Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto scroll-smooth bg-background">
            {/* Mobile Header for Doc Navigation (only inside content area on mobile) */}
            <div className="lg:hidden flex items-center justify-between px-6 py-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                  <Menu className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm font-bold tracking-tight">Doc Menu</span>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 border-l border-border w-72 bg-background/95 backdrop-blur-xl">
                  <div className="h-full overflow-y-auto pt-10">
                    <DocsSidebar
                      sections={sections}
                      activeAnchor={activeAnchor}
                      onSearchOpen={onSearchOpen}
                      className="w-full"
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
