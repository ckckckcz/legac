## Why

Clicking the docs search trigger shows only a black overlay — the modal panel itself never appears. The `CommandDialog` component renders `<DialogHeader>` as a direct child of `<Dialog>` (the Radix `Root`) outside of `<DialogContent>`, which means the content panel is either not portalled correctly or is clipped by the surrounding layout, leaving only the overlay visible.

## What Changes

- Fix `CommandDialog` in `src/components/ui/command.tsx`: move `<DialogHeader>` inside `<DialogContent>` so the accessibility title/description are co-located with the modal panel inside the portal

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `docs-search`: The search modal SHALL render its visible panel (input + results) when opened — currently only the overlay renders due to the misplaced `<DialogHeader>` outside `<DialogContent>`

## Impact

- `src/components/ui/command.tsx` — `CommandDialog`: `<DialogHeader>` moved inside `<DialogContent>`; no API changes, no prop changes
- All consumers of `CommandDialog` (currently only `DocsSearch`) benefit automatically
