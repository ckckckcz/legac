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
    <Card className="mb-4">
      <CardHeader className="py-2 px-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Table of Contents</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? 'Collapse table of contents' : 'Expand table of contents'}
          >
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0 pb-2 px-3">
          <ul className="flex flex-col gap-0.5">
            {entries.map((entry) => (
              <li key={entry.anchor}>
                <a
                  href={entry.anchor}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
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
