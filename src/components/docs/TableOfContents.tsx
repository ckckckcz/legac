'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export interface TocEntry {
  label: string
  anchor: string
}

interface TableOfContentsProps {
  entries: TocEntry[]
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card className="mb-6">
      <CardHeader className="py-3 px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Table of Contents</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? 'Collapse table of contents' : 'Expand table of contents'}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 pb-3 px-4">
          <ul className="flex flex-col gap-1">
            {entries.map((entry) => (
              <li key={entry.anchor}>
                <a
                  href={entry.anchor}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}
