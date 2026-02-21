## Context

`CommandDialog` in `src/components/ui/command.tsx` wraps Radix UI's `Dialog` primitives to produce a command-palette modal. It currently renders `<DialogHeader>` (which is a plain `<div>`) as a **direct child of `<Dialog>`** — i.e., `DialogPrimitive.Root` — outside of `<DialogContent>`:

```tsx
<Dialog {...props}>
  <DialogHeader className="sr-only">   ← outside DialogContent / portal
    <DialogTitle>...</DialogTitle>
    <DialogDescription>...</DialogDescription>
  </DialogHeader>
  <DialogContent ...>
    <Command>{children}</Command>
  </DialogContent>
</Dialog>
```

`DialogPrimitive.Root` renders no DOM node — it is purely a state container. A `<div>` placed inside it (but outside `<DialogContent>`) is injected into the normal document flow at the call site. Since `DocsSearch` is rendered inside the `DocsShell` layout which uses `h-screen` and `overflow-hidden`, this out-of-flow `<div>` has no visual effect. More critically, Radix's `DialogPrimitive.Content` requires `DialogPrimitive.Title` and `DialogPrimitive.Description` to be **inside** the content node for accessibility wiring (aria-labelledby / aria-describedby). When they are outside, the content panel may not receive its accessible name, and in some Radix versions this can prevent the portal from rendering the content correctly.

The result: only the `DialogOverlay` (`bg-black/50`) renders visibly; the content panel is absent.

## Goals / Non-Goals

**Goals:**
- Move `<DialogHeader>` (containing `<DialogTitle>` and `<DialogDescription>`) inside `<DialogContent>` in `CommandDialog`
- Restore correct rendering: search modal panel appears when `open={true}`
- Maintain `className="sr-only"` so the title/description remain screen-reader-only and don't affect visual layout

**Non-Goals:**
- Redesigning `CommandDialog`'s API or props
- Changing `DocsSearch` or any consumer
- Fixing the pre-existing `activity-logger.ts` TypeScript error

## Decisions

### Move `<DialogHeader>` inside `<DialogContent>`, before `<Command>`

**Decision:** Relocate the `<DialogHeader sr-only>` block to be the first child inside `<DialogContent>`, directly before `<Command>`.

**Rationale:** `<DialogContent>` renders via `DialogPortal`, which appends to `document.body` outside any `overflow: hidden` ancestor. This is the only correct location for Radix accessibility nodes (`DialogTitle`, `DialogDescription`) — they must be descendants of `DialogPrimitive.Content` for `aria-labelledby` and `aria-describedby` to be wired correctly. Placing them here also ensures they render into the portal where they are visible to screen readers in context.

**Alternative considered:** Remove `<DialogHeader>` entirely and rely on Radix's `aria-label` props instead. Rejected — shadcn convention uses `<DialogTitle>` / `<DialogDescription>` for accessibility, and removing them would generate Radix console warnings about missing accessible names.

**Alternative considered:** Wrap `<DialogHeader>` in a `<DialogPortal>` of its own. Rejected — unnecessary complexity; `<DialogContent>` already includes its own `<DialogPortal>`, so nesting inside it is the correct approach.

## Risks / Trade-offs

- **Visual layout shift risk:** `<DialogHeader className="sr-only">` is visually hidden. Moving it inside `<DialogContent>` adds it to the DOM inside the modal panel, but `sr-only` uses `position: absolute; width: 1px; height: 1px; overflow: hidden` which does not affect layout.
  → Mitigation: None needed — `sr-only` is layout-inert.

- **Regression on other `CommandDialog` consumers:** Currently `DocsSearch` is the only consumer. The change is backward-compatible (no prop or API changes).
  → Mitigation: Verify visually after fix.

## Migration Plan

1. Edit `CommandDialog` in `src/components/ui/command.tsx`: move `<DialogHeader>` block inside `<DialogContent>`, before `<Command>`
2. Verify: open `/docs`, click the search trigger or press `Ctrl+K` — modal panel should appear
3. Run `pnpm build` to confirm no new TypeScript errors

No data migrations, no environment changes, no deployment steps beyond a normal build.

**Rollback:** Single-commit revert.

## Open Questions

- None. Root cause is confirmed by code inspection.
