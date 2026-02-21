'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Search } from 'lucide-react'

export interface SearchEntry {
  label: string
  anchor: string
}

interface DocsSearchProps {
  entries: SearchEntry[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocsSearch({ entries, open, onOpenChange }: DocsSearchProps) {
  const handleSelect = (anchor: string) => {
    onOpenChange(false)
    // Allow dialog close animation before scrolling
    setTimeout(() => {
      const el = document.getElementById(anchor)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search documentation..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          {entries.map((entry) => (
            <CommandItem
              key={`${entry.label}-${entry.anchor}`}
              onSelect={() => handleSelect(entry.anchor)}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <span>{entry.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
