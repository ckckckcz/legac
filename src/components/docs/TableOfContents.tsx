'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface TocEntry {
  label: string
  anchor: string
}

interface TableOfContentsProps {
  entries: TocEntry[]
}

export function TableOfContents({ entries }: TableOfContentsProps) {
  return (
    <div className="mb-6">
      <Accordion type="single" collapsible defaultValue="toc" className="w-full border rounded-lg bg-muted/20 px-4">
        <AccordionItem value="toc" className="border-none">
          <AccordionTrigger className="hover:no-underline py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Table of Contents
          </AccordionTrigger>
          <AccordionContent>
            <ul className="flex flex-col gap-2 pb-2">
              {entries.map((entry) => (
                <li key={entry.anchor}>
                  <a
                    href={entry.anchor}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block py-0.5"
                  >
                    {entry.label}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
