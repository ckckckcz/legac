'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { DocsSidebar } from '@/components/docs/DocsSidebar'

export interface DocsSection {
  title: string
  count?: number
  items: string[]
}

interface DocsLayoutProps {
  sections: DocsSection[]
  children: React.ReactNode
}

export function DocsLayout({ sections, children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* App sidebar — fixed width on left */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onUploadClick={() => {}}
      />

      {/* Docs nav sidebar — w-56, hidden on mobile */}
      <DocsSidebar sections={sections} />

      {/* Main content — scrollable */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
