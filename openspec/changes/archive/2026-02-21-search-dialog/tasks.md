## 1. Fix CommandDialog Structure

- [x] 1.1 In `src/components/ui/command.tsx`, move the `<DialogHeader className="sr-only">` block (containing `<DialogTitle>` and `<DialogDescription>`) from outside `<DialogContent>` to inside it, as the first child before `<Command>`

## 2. Verification

- [x] 2.1 Open `/docs`, click the search trigger button in the top bar — confirm the modal panel (input field + results list) appears visibly on screen
- [x] 2.2 Press `Ctrl+K` on the docs page — confirm the modal opens correctly
- [x] 2.3 Type a query and confirm results filter; select a result and confirm page scrolls to the anchor
- [x] 2.4 Run `pnpm build` and confirm no new TypeScript or build errors
